const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/[ENTRE2]-ruangbelajar", {
  keepAlive: true,
  useNewUrlParser: true
});

module.exports = {
  LtRole: require('./ltRole'),
  TrCoursePlace: require('./trCoursePlace'),
  TrStudentDetail: require('./trStudentDetail'),
  TrTeacherDetail: require('./trTeacherDetail'),
  TrUser: require('./trUser')
}