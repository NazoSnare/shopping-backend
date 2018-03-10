const mongoose = require('mongoose');
const env = require('../config/.env');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required:true
  },
  totalAmount: {
    type: Number,
    required: true
  }

});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.addProduct = function (newProduct, callback){
     newProduct.save(callback);

}

module.exports.getProductById= function(productId, callback){
  const query = {_id : productId};
  Product.findOne(query, callback);
}

module.exports.getProducts = function(callback){
  const query = {};
  Product.find(query, callback);
}
