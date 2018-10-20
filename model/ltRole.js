const mongoose = require('mongoose');

const ltRole = new mongoose.Schema({
    role: {
        type: String,
        unique: true
    }
});

const LtRole = mongoose.model('LtRole', ltRole);

module.exports = LtRole;