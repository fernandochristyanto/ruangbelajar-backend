const mongoose = require('mongoose');

const trStudentDetail = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  education: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrUser',
    required: true
  },
  ongoingCoursePlaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrCoursePlace'
  }],
  pendingCoursePlaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrCoursePlace'
  }]
});

const TrStudentDetail = mongoose.model('TrStudentDetail', trStudentDetail);

module.exports = TrStudentDetail;