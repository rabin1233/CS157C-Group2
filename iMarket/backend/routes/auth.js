const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerationValidation, loginValidation} = require('../validation');


router.get('/', (req, res) => {
    const {name, age} = req.query;
    console.log(name, age);
    res.send('Hello from server');
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const {name, age} = req.query;
    console.log(id);
    console.log(name, age);

    res.send(`Thisis item with id ${id}`);
})

router.post('/register', async (req, res) => {
   //validate data before adding user to DB
   console.log('connected');
   return res.status(200).json({message: 'tyou are connected'});
   const {error} = registerationValidation(req.body);
   if (error){
       return res.status(400).send(error.details[0].message);
   }

   //check for unique users
   const emailExists = await User.findOne({email: req.body.email});
   if (emailExists){
       return res.status(400).send('Email already exists');
   }

   //hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPw = await bcrypt.hash(req.body.password, salt);

   const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: hashedPw
   });
   try{
       const savedUser = await user.save();
       res.send({user: user._id});
   }catch(err){
       res.status(400).send(err)
   }
});

router.post('/login', async (req, res) => {
   const {error} = loginValidation(req.body);
   if (error){
       return res.status(400).send(error.details[0].message);
   }

   const user = await User.findOne({email: req.body.email});
   if (!user){
       return res.status(400).send('Email or password is wrong');
   }
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if (!validPass){
       return res.status(400).send('Invalid password');
   }

   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   res.header('auth-token', token).send(token);
});



module.exports = router;