const mongoose = require('mongoose');
const env = require('../config/.env');

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    default: []
  }],
  discount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }

});

const Cart = module.exports = mongoose.model('Cart', CartSchema);

/**
 * Adds a new product to the database
 * @param { Object } newProduct - the product to add.
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - a new product
 */
module.exports.addCart = function (newCart, callback) {
  newCart.save(callback);

}

/**
 * Retrieves a product whose id matches the given productId
 * @param { Object } productId - the requested product's id.
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - a product with the id or null
 */
module.exports.getCartById = function (cartId, callback) {
  const query = {
    _id: cartId
  };

  Cart
  .findOne(query)
  .populate('user items')
  .exec(callback);
}

/**
 * Retrieves all the products
 * @param 
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - All products from the database
 */

module.exports.getCarts = function (callback) {
  const query = {};
  Cart
  .find(query)
  .populate('items user')
  .exec(callback);
}

module.exports.updateCart = function (cartId, newData){
   
}

// module.exports.getProductsByCategory = function (category,callback){
//   const query = {
//     categories : mongoose.Types.ObjectId(category)
//   };
  
//   Product
//   .find(query)
//   .populate('categories')
//   .exec(callback);
// }