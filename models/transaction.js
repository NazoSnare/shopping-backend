const mongoose = require('mongoose');
const env = require('../config/.env');

const TransactionSchema = mongoose.Schema({
  type: {
    type: String
  },
  user: {
    type: String
  },
  timeStamp: {
    type: String,
  },
  product: {
    type: String
  },
  amountToppedUp: {
    type: String
  }

});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);
