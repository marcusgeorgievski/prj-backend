// create user

const { createUser } = require("../../../db/queries")
const logger = require("../../../logger")

module.exports = async (req, res, next) => {
  try {
    const { data } = req.body
    const id = data.id

    logger.debug(`Creating user with id: ${id}`)

    if (!id) {
      return res.status(400).json({ error: `user id is required: ${id}` })
    }
    const newUser = await createUser(id)
    res.status(201).json(newUser[0])
  } catch (error) {
    logger.error(error)
    next(error)
  }
}

delete user
