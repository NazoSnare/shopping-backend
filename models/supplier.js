'use strict';

const mongoose = require('mongoose');
const env = require('../config/.env');

const SupplierSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cellphone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    banking: {
        type: Object,
        required: true
    }

});

const Supplier = module.exports = mongoose.model('Supplier', SupplierSchema);

/**
 * Adds a new supplier to the database
 * @param { Object } newSupplier - the supplier to add.
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - the added supplier with the _id
 */
module.exports.addSupplier = function (newSupplier, callback) {
    newSupplier.save(callback);

}

/**
 * Retrieves a supplier whose id matches the given supplierId
 * @param { Object } supplierId - the requested supplier's id.
 * @param {*} callback  - the callback function to execute afterwards
 * @returns - a supplier with the id or null
 */
module.exports.getSupplierById = function (supplierId, callback) {
    const query = {
        _id: supplierId
    };

    Supplier
        .findOne(query)
        .populate('categories')
        .exec(callback);
}