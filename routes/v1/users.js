const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const env = require('../../config/.env');

// route ---> /api/v1/users/x

//Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    balance: req.body.balance
  });

  User.addUser(newUser, (err, user)=> {
     if(err){
       res.json({success: false, msg: 'failed to register user'});
     }else{
       res.json({success: true, msg: 'User registered'});
     }

  });
});

//Authenticate or login
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
 console.log(username);
  User.getUserByUsername(username, (err,user) =>{
    if(err) throw err;
    if(!user){
      return res.json({success:false, msg:'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), env.secret, {
          expiresIn: 604800 //1 week
        });
      //send user without password field
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            balance: user.balance,
            username: user.username
          }
        });

      }//if not isMatch
      else{
      return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', {session:false}),(req, res, next) => {
  res.json({user:req.user});
});


router.post('/topup', passport.authenticate('jwt', {session:false}),(req, res, next) => {
  // res.json({user:req.user});
  res.send('topup');
});

module.exports = router;
