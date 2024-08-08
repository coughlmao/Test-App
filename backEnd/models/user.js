// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    whatsappNumber: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+\d{1,3}\d{1,14}$/, 'Please use a valid WhatsApp number with country code.'],
    },
});

module.exports = mongoose.model('User', userSchema);