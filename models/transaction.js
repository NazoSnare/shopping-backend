const mongoose = require('mongoose');
const env = require('../config/.env');

const TransactionSchema = mongoose.Schema({
  type: {
    type: String,
    required:true
  },
  user: {
    type: Object
  },
  data: {
    type: Object,
    required:true
  }

});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

module.exports.addTransaction = function (newTransaction, callback){
 newTransaction.save(callback);
}

module.exports.getTransactionById = function(id, callback){
  Transaction.findById(id, callback);
}

module.exports.getTransactionsByUsername= function(username, callback){
  const query = {'user.username':username};
  Transaction.find(query, callback);
}
