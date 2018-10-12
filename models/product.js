const mongoose = require('mongoose');
const env = require('../config/.env');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  imageUrl: {
    type: String,
    required: true,
    default: ''
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    default: []
  }],
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  supplierData: {
    type: Object,
    required: false
  }

});

const Product = module.exports = mongoose.model('Product', ProductSchema);

/**
 * Adds a new product to the database
 * @param { Object } newProduct - the product to add.
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - a new product
 */
module.exports.addProduct = function (newProduct, callback) {
  newProduct.save(callback);

}

/**
 * Retrieves a product whose id matches the given productId
 * @param { Object } productId - the requested product's id.
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - a product with the id or null
 */
module.exports.getProductById = function (productId, callback) {
  const query = {
    _id: productId
  };

  Product
  .findOne(query)
  .populate('categories')
  .exec(callback);
}

/**
 * Retrieves all the products
 * @param 
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - All products from the database
 */

module.exports.getProducts = function (callback) {
  const query = {};
  Product
  .find(query)
  .populate('categories')
  .exec(callback);
}