const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining Order Schema
const OrderSchema = new Schema({
    userId: {
        type: String
    },
    items: [{
        productId: {
            type: String
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quanitiy can not be less than 1.'],
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

// Create and export model
module.exports = Order = mongoose.model('order', OrderSchema);