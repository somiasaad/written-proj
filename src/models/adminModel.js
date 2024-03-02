const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    fristName: {
        type: String,
        require: true,
        trim: true,

    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;