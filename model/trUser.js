const mongoose = require('mongoose');

const trUser = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
}, {
        timestamps: true
    });

const TrUser = mongoose.model('TrUser', trUser);

module.exports = TrUser;