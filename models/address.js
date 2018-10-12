const mongoose = require('mongoose');
const env = require('../config/.env');

const AddressSchema = mongoose.Schema({
    data: {
        type: Object,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    country:{
        type: String,
        required: true
    },
    city: {
        type: Object,
        required: true
    },
    latitude: {
        type: String,
        required: false
    },
    longitude: {
        type: String,
        required: false
    }

});

const Address = module.exports = mongoose.model('Address', AddressSchema);

/**
 * This function will add a new order to the database
 * 
 * @param {*} newOrder - The new order object to add
 * @param {*} callback - The callback function to execute after adding
 */
module.exports.addOrder = function (newAddress, callback) {
    newAddress.save(callback);
}

/**
 * 
 * @param {*} id 
 * @param {*} callback 
 */
module.exports.getAddressById = function (id, callback) {
    Address
    .findById(id)
    .populate('user')
    .exec(callback);
}

module.exports.getAddressByUser = function (username, callback) {
    const query = {
        'user.username': username
    };

    Address
    .find(query)
    .populate('user')
    .exec(callback);
}