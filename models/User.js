const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

// Defining User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid Password'],
        minlength: [6, 'Minimum Password length must be 6 Characters']
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

// Create and export model
module.exports = User = mongoose.model('user', UserSchema);