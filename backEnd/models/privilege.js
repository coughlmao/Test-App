// models/privilege.js
const mongoose = require('mongoose');

const privilegeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    privilegeType: {
        type: String, // Boolean
        required: true,  //default : false
    },
    description: {
        type: String,
    },
});

module.exports = mongoose.model('Privilege', privilegeSchema);
