// models/permission.js
const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    entry: {
        type: Boolean,
        default: false,
    },
    exit: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Permission', permissionSchema);
