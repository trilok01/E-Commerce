const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining Cart Schema
const CartSchema = new Schema({
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
        required: true,
        default: 0
    }
});

// Create and export model
module.exports = Cart = mongoose.model('cart', CartSchema);