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
    res.json(userDetail).send()
  }
}

async function getById(req, res, next) {
  const { userId } = req.params
  const user = await db.TrUser.findById(userId)
  switch (user.role) {
    case "student":
      const studentDetail = await db.TrStudentDetail.findOne({ userId: userId })
      res.json(studentDetail).send()
      break;
    case "teacher":
      const teacherDetail = await db.TrTeacherDetail.findOne({ userId: userId })
      res.json(teacherDetail).send()
      break;
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
    case "student":
      return await db.TrStudentDetail.findOne({ userId: userId })
  }
}

async function register(req, res, next) {
  const {
    name, phone, education, role, email, password
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
    }
    res.status(200).send()
  }
  catch (ex) {
    return next(ex.message)
  }
}