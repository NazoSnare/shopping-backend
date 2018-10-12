const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Product = require('../../models/product');
const Transaction = require('../../models/transaction');
const env = require('../../config/.env');

// www.domain.com/api/v1/transactions

router.get('/', passport.authenticate('jwt', {session:false}),(req, res, next) => {
//  res.json({user:req.user, transactions: req.user.transactions});
Transaction.getTransactionsByUsername(req.user.username, (err, transactions) => {
  if(err){
    return res.json({success: false, msg: 'error getting transactions'});
  }else{
    res.json({success:true, transactions:transactions});
  }
});
});

router.get('/all', passport.authenticate('jwt', {session:false}),(req, res, next) => {
//  res.json({user:req.user, transactions: req.user.transactions});
//if admin users
if(req.user.username == 'Admin'){
  res.send('transactions by all users');
}else{
  res.status(401).json({success:false, msg: `don't push it!`});
}

});

//adding transaction to transactions collection so it is easier to view all transactions and saving bandwith
router.post('/add', (req, res, next) => {
  res.send('adding transaction')
});

module.exports = router;
