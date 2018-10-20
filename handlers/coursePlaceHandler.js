const db = require('../model')

module.exports = {
  addNewCoursePlace,
  getAll,
  getById
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

async function getById(req, res, next) {
  const { coursePlaceId } = req.params;
  try {
    const coursePlace = await db.TrCoursePlace.findById(coursePlaceId)
    res.json(coursePlace).send()
  }
  catch (ex) {
    next(ex.message)
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