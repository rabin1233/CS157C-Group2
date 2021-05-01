const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {registerationValidation, loginValidation} = require('../validation');
const {signedToken} = require('../utils/token');

router.get('/', (req, res) => {
    const user = req.user;
    if(!user) {
        res.status(400).json({
            user: {},
            signin: false,
        })
        return;
    }

    res.status(200).json({
        user: user,
        signin: true,
    })

})

router.get('/signout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.status(500).json({status: 'BAD', message: 'something went wrong'})
            return;
        }
        res.status(200).json({
            message:'Status OK',
            user: {},
            signin: false,
        })
    })
})

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
       res.send({user: savedUser.id});
   }catch(err){
       res.status(400).send(err)
   }
});

router.post('/login', async (req, res) => {
   const {error} = loginValidation(req.body);
   if (error){
       return res.status(400).send(error.details[0].message);
   }
   console.log(req.body)

   const user = await User.findOne({email: req.body.email});
   if (!user){
       return res.status(400).send('Email or password is wrong');
   }
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if (!validPass){
       return res.status(400).send('Invalid password');
   }

   const sessionUser = {
       id: user.id,
       name: user.name,
       email: user.email,
   }

   const token = signedToken(sessionUser)
   req.session.user = token;
   res.status(200).json({
    signin: true,
    status: "OK"
   })
});



module.exports = router;