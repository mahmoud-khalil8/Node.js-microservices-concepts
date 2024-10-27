const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const session = require('express-session')
const indexRouter = require('./routes/index');
const passport = require('passport');
const { ExtractJwt,Strategy:jwtStrategy } = require('passport-jwt');
const dotenv = require('dotenv')
const app = express();
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
dotenv.config()
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
const cookieExtractor = function(req){
    let token = null 
    if(req && req.cookies){
        token = req.cookies['auth']
    }
    return token
}
const tokenSecret = process.env.TOKEN_SECRET
const opts =  {
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:tokenSecret ,
}
//here passport receives the jwt payload 
passport.use('jwt',
    new jwtStrategy(opts,(jwt_payload,done)=>{
        try{    
            console.log(jwt_payload)
            done(null,jwt_payload)
        }catch(err){
            console.log(err)
        }
    })
)
module.exports = app;
