const mongoose = require('mongoose');
const env = require('../config/.env');

const CategoriesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  }

});

const Category = module.exports = mongoose.model('Category', CategoriesSchema);

/**
 * Adds a new category to the database
 * @param { Object } newCategory - the category to add.
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - that newly added  category
 */
module.exports.addCategory = function (newCategory, callback) {
  newCategory.save(callback);

}

/**
 * Retrieves a product whose id matches the given productId
 * @param { Object } productId - the requested product's id.
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - a category with the id or null
 */
module.exports.getcategoryById = function (categoryId, callback) {
  const query = {
    _id: productId
  };

  Category
  .findOne(query)
  .exec(callback);
}

/**
 * Retrieves all the categories
 * @param 
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - An array of the categories from the database
 */
module.exports.getCategories = function (callback) {
  const query = {};
  Category
  .find(query)
  .exec(callback);
}