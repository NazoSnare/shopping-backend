const mongoose = require('mongoose');
const env = require('../config/.env');

const OrderSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: 'delivery'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    data: {
        type: Object,
        required: true
    },
    deliveryAddress: {
       // type: mongoose.Schema.Types.ObjectId,
        required: true,
        type:Object
       //  ref: 'Address'
    },
    products: [{
        required:true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]


});

const Order = module.exports = mongoose.model('Order', OrderSchema);

/**
 * This function will add a new order to the database
 * 
 * @param {*} newOrder - The new order object to add
 * @param {*} callback - The callback function to execute after adding
 */
module.exports.addOrder = function (newOrder, callback) {
    newOrder.save(callback);
}

/**
 * 
 * @param {*} id 
 * @param {*} callback 
 */
module.exports.getOrderById = function (id, callback) {
    Order.findById(id)
    .populate('user')
    .exec(callback);
}

module.exports.getOrders = function(callback){
    Order.find({})
    .populate('user')
    .exec(callback);

}



module.exports.getOrdersByUsername = function (username, callback) {
    const query = {
        'user.username': username
    };

    Order.find(query)
    .populate('user')
    .exec(callback);
}