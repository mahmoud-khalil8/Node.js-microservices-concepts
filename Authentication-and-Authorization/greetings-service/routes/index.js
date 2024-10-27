const express = require('express');
const router = express.Router();
const passport = require('passport')
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//passport here takes the jwt and extract the user and info from it 
router.get('/greeting',(req,res,next)=>{
  passport.authenticate('jwt',{session:false},
    (err,user,info)=>{
      if(err){
        res.status(500).send('no greetings');
      }
      else{
        res.send({success:true,fullName:`${user.name.givenName}  ${user.name.familyName}`})
      }
    })(req,res,next)
})
module.exports = router;
