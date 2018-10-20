const db = require('../model')

module.exports = {
  get,
  register
}
async function get(req, res, next) {
  const user = await db.TrUser.findOne({ email: req.body.email, password: req.body.password })

  if (user == undefined) {
    res.status(204)
  }
  else {
    const userDetail = await getUserDetail(user.id, user.role)
    res.json(userDetail).send()
  }
}

async function getUserDetail(userId) {
  switch (user.role) {
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