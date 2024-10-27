const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors') ;
const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv') 
const session = require('express-session')

dotenv.config() 

const indexRouter = require('./routes/index');

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
//serializing and deserializing the user from the session or to the session
passport.serializeUser(function(user,cb){
    cb(null,user)
})
passport.deserializeUser(function(obj,cb){
    cb(null,obj)
})
//telling passport we will use google authentication 
passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL
},
function(accessToken,refreshToken,profile,done){
    return done(null,profile)
}
))

app.use('/', indexRouter);

module.exports = app;
