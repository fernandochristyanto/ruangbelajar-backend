const db = require('../model')

module.exports = {
  seedRoles
}

async function seedRoles(req, res, next) {
  const { roles } = require('../data/seedData/roles')
  for(let i = 0 ; i < roles.length ; i++){
    await db.LtRole.create({
      role: roles[i].role
    })
  }

  res.status(200).send()
}