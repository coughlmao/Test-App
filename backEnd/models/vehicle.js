// models/vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    licensePlate: {
        type: String,
        required: true,
    },
    vehicleModel: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);