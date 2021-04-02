const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerationValidation, loginValidation} = require('../validation');


router.post('/register', async (req, res) => {
   //validate data before adding user to DB
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