const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path:'../.env'})
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const TOKEN_SECRET = process.env.TOEKN_SECRET
//the google login route 
router.get('/auth/google'
  ,passport.authenticate('google',{scope:['profile','email']}))

//google callback route 
//passport.authenticate second time here is to verify the user was authenticated successfully
router.get('/auth/google/callback'
  ,passport.authenticate('google',{failureRedirect:'/error'}),
  function(req,res){
    const token = jwt.sign({id:req.user.sub,name:req.user.name},TOKEN_SECRET,{
      expiresIn:60*60
    })
    res.cookie('auth',token,{httpOnly:true})
    res.redirect('http://localhost:3000/')
})// http only to make it not accessible to a javascript code for security reasons


module.exports = router;
