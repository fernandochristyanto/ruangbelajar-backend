const db = require('../model')
const { ObjectId } = require('mongoose').mongo

module.exports = {
  addNewCoursePlace,
  getAll,
  getById,
  applyToCourseplace,
  rejectTeacherFromRegistrants,
  approveTeacherFromRegistrants
}
async function addNewCoursePlace(req, res, next) {
  const {
    name,
    rating,
    phone,
    address,
    description,
    wanting,
    minSalary,
    maxSalary,
    agreement
  } = req.body

  try {
    await db.TrCoursePlace.create({
      name,
      rating,
      phone,
      address,
      description,
      wanting,
      minSalary,
      maxSalary,
      agreement
    })

    res.status(200).send()
  }
  catch (ex) {
    next(ex.message)
  }
}

async function applyToCourseplace(req, res, next) {
  const { teacherId, courseplaceId } = req.body
  try {
    const courseplace = await db.TrCoursePlace.findById(courseplaceId)
    if (!courseplace.interestedTeachers.includes(teacherId)) {
      courseplace.interestedTeachers.push(teacherId)
      await courseplace.save()

      const teacherDetail = await db.TrTeacherDetail.findOne({ userId: new ObjectId(teacherId) })
      teacherDetail.pendingCoursePlaces.push(courseplace.id)
      await teacherDetail.save()
    }
    res.status(200).send()
  } catch (ex) {
    next(ex.message)
  }
}

async function getById(req, res, next) {
  const { coursePlaceId } = req.params;
  try {
    const coursePlace = await db.TrCoursePlace.findById(coursePlaceId)
      .populate({
        "path": "interestedTeachers",
        "select": {
          "email": 1
        }
      })
    res.json(coursePlace).send()
  }
  catch (ex) {
    next(ex.message)
  }
}

async function rejectTeacherFromRegistrants(req, res, next) {
  const { teacherId, courseplaceId } = req.body
  try {
    const teacher = await db.TrTeacherDetail.findOne({ userId: teacherId });
    teacher.pendingCoursePlaces.remove(courseplaceId);
    await teacher.save()
    const courseplace = await db.TrCoursePlace.findById(courseplaceId)
    courseplace.interestedTeachers.remove(teacherId)
    await courseplace.save()
    res.status(200).send()
  }
  catch (ex) {
    next(ex)
  }
}

async function approveTeacherFromRegistrants(req, res, next) {
  const { teacherId, courseplaceId } = req.body
  try {
    const teacher = await db.TrTeacherDetail.findOne({ userId: teacherId });
    teacher.pendingCoursePlaces.remove(courseplaceId);
    teacher.ongoingCoursePlaces.push(courseplaceId);
    await teacher.save()
    const courseplace = await db.TrCoursePlace.findById(courseplaceId)
    courseplace.interestedTeachers.remove(teacherId)
    courseplace.currentTeachers.push(teacherId)
    await courseplace.save()
    res.status(200).send()
  }
  catch (ex) {
    next(ex)
  }
}

async function getAll(req, res, next) {
  try {
    const coursePlaces = await db.TrCoursePlace.find({})
    res.status(200).json(coursePlaces).send()
  }
  catch (ex) {
    next(ex.message)
  }
}