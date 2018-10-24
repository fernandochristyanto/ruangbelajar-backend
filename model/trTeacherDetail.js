const mongoose = require('mongoose');

const trTeacherDetail = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  description: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrUser',
    required: true
  },
  pendingCoursePlaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrCoursePlace'
  }],
  ongoingCoursePlaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrCoursePlace'
  }],
  rejectedCoursePlaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrCoursePlace'
  }],
  onprogressCoursePlaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrCoursePlace'
  }]
});

const TrTeacherDetail = mongoose.model('TrTeacherDetail', trTeacherDetail);

module.exports = TrTeacherDetail;