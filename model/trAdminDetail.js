const mongoose = require('mongoose');

const trAdminDetail = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrUser',
    required: true
  },
  courseplaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrCoursePlace',
    required: true
  }
});

const TrAdminDetail = mongoose.model('TrAdminDetail', trAdminDetail);

module.exports = TrAdminDetail;