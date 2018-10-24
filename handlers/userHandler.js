const db = require('../model')

module.exports = {
  get,
  register,
  getAllByRole,
  getById
}
async function get(req, res, next) {
  const user = await db.TrUser.findOne({ email: req.body.email, password: req.body.password })

  if (user == undefined) {
    res.status(204)
  }
  else {
    let userDetail = await getUserDetail(user.id, user.role)
    userDetail = userDetail.toObject()
    userDetail.id = user.id
    userDetail.role = user.role
    res.json(userDetail).send()
  }
}

async function getById(req, res, next) {
  const { userId } = req.params
  try {
    const user = await db.TrUser.findById(userId)
    if (!user)
      next({
        message: 'Invalid id',
        status: 400
      })
    const detail = await getUserDetail(user.id, user.role);
    const returnJson = detail.toObject()
    returnJson.email = user.email
    res.status(200).json(returnJson).send()
  }
  catch (ex) {
    next(ex)
  }
}

async function getAllByRole(req, res, next) {
  const { role } = req.query
  try {
    switch (role) {
      case "teacher":
        const teachers = await db.TrTeacherDetail.find({})
        res.json(teachers).send()
        break;
      case "student":
        const students = await db.TrStudentDetail.find({})
        res.json(students).send()
        break;
      default:
        res.status(204).send()
    }
  }
  catch (ex) {
    next(ex.message)
  }
}

async function getUserDetail(userId, role) {
  switch (role) {
    case "teacher":
      return await db.TrTeacherDetail.findOne({ userId: userId })
        .populate("pendingCoursePlaces")
        .populate("ongoingCoursePlaces")
        .populate("rejectedCoursePlaces")
        .populate("onprogressCoursePlaces")

    case "student":
      return await db.TrStudentDetail.findOne({ userId: userId })
        .populate("ongoingCoursePlaces")
        .populate("pendingCoursePlaces")
    case "admin":
      return await db.TrAdminDetail.findOne({ userId: userId })
        .populate("TrCoursePlace")
  }
}

async function register(req, res, next) {
  const {
    name, phone, education, role, email, password, courseplaceId
  } = req.body

  try {
    switch (role) {
      case "teacher":
        const teacher = await db.TrUser.create({
          email: email,
          password: password,
          role: "teacher"
        })

        await db.TrTeacherDetail.create({
          userId: teacher.id,
          name: name,
          phone: phone
        })
        break;
      case "student":
        const student = await db.TrUser.create({
          email: email,
          password: password,
          role: "student"
        })

        await db.TrStudentDetail.create({
          userId: student.id,
          name: name,
          phone: phone,
          education: education
        })
        break;
      case "admin":
        const admin = await db.TrUser.create({
          email: email,
          password: password,
          role: "admin"
        })

        await db.TrAdminDetail.create({
          userId: admin.id,
          name: name,
          phone: phone,
          courseplaceId: courseplaceId
        })
    }
    res.status(200).send()
  }
  catch (ex) {
    return next(ex.message)
  }
}
