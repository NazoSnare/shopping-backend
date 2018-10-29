const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Transaction = require('../../models/transaction');
const env = require('../../config/.env');

// route ---> /api/v1/users/x

//Register
router.post('/', (req, res, next) => {
  console.log(req.body);
  let newUser = new User({
    name: req.body.newUser.name,
    email: req.body.newUser.email,
    username: req.body.newUser.username,
    password: req.body.newUser.password,
    balance: req.body.newUser.balance,
    wallet: req.body.newUser.wallet,
    role: req.body.newUser.role || 'buyer',
    orders: []
  });
  User.addUser(newUser, (err, user)=> {
     if(err){
       res.json({success: false, msg: 'failed to register user'});
     }else{
       res.json({success: true, msg: 'User registered', user});
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
            username: user.username,
            wallet: user.wallet,
            role: user.role,
            orders: user.orders
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

  User.topupUser(req.user._id, req.user.balance+req.body.amount, (err, updatedUser) => {
    if(err){
      throw err;
      res.json({ success:false, msg:err});
    }else{
      //add this transaction to transactions
      let newTransaction = new Transaction({
        user: req.user,
        type: 'Top up',
        data: {
          amount:req.body.amount,
          balanceBefore: req.user.balance,
          balanceAfter:updatedUser.balance,
          date: new Date()
        }
      });

      Transaction.addTransaction(newTransaction, (err, transaction)=> {
         if(err){
           res.json({success: false, msg: 'failed to complete transaction'});
         }else{
           res.json({success: true, msg: 'transaction successfully completed', updatedUser:updatedUser});
         }

      });//end Of add Transaction

    }//end of adding transaction and balances
  });


});

module.exports = router;
