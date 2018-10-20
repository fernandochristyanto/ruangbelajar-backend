const mongoose = require('mongoose');

const trCoursePlace = new mongoose.Schema({
    name: {
        type: String
    },
    rating: {
      type: Number,
      max: 5,
      min: 0
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    description: {
      type: String
    },
    wanting: [{
      type: String
    }],
    minSalary: {
      type: Number
    },
    maxSalary: {
      type: Number
    },
    interestedTeachers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrUser'
    }],
    agreement: {
      type: String
    },
    currentTeachers: [{
      type: mongoose.Schema.Types.ObjectId
    }]
},{
    timestamps: true
});

const TrCoursePlace = mongoose.model('TrCoursePlace', trCoursePlace);

module.exports = TrCoursePlace;