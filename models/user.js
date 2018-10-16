const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const env = require('../config/.env');

//User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  username: {
    type: String,
    required:true,
    unique:true
  },
  email: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0.00
  },
  password: {
    type: String,
    required: true
  },
  wallet: {
    type: String,
    required:false
  },
  role: {
    type: String,
    required: true,
    default: 'buyer'
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: [],
    ref: 'Order'
  }]

});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User
  .findById(id)
  .populate('orders')
  .exec(callback);
}

module.exports.getUserByUsername= function(username, callback){
  const query = {username : username};
  User
  .findOne(query)
  .populate('orders')
  .exec(callback);
}

module.exports.topupUser = function(id,newBalance, callback){
  const query = {_id : id};
  User.findOneAndUpdate(query, {$set: {balance: newBalance}}, {new:true},callback);
}

module.exports.purchaseProduct = function(id,newBalance, callback){
  const query = {_id : id};
  User.findOneAndUpdate(query, {$set: {balance: newBalance}}, {new:true},callback);
}

module.exports.addUser = function (newUser, callback){
   bcrypt.genSalt(10, (err, salt) => {
     bcrypt.hash(newUser.password, salt, (err, hash)=>{
    if(err) throw err;
       newUser.password = hash;
       newUser.save(callback);

     });
   });
}

module.exports.comparePassword = function( candidatePassword, hash,callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
