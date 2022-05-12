const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isInt } = require('validator');

// Defining Item Schema
const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

// Create and export model
module.exports = Item = mongoose.model('item', ItemSchema);