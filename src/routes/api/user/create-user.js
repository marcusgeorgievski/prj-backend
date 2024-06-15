// create user

const { createUser } = require("../../../db/queries")
const logger = require("../../../logger")

module.exports = async (req, res, next) => {
  try {
    const { data } = req.body
    const id = data.id

    logger.debug(`Creating user with id: ${id}`)

    if (!id) {
      const error = new Error("id is required")
      error.code = 400
      throw error
    }

    const newUser = await createUser(id)
    res.status(201).json(newUser[0])
  } catch (error) {
    logger.error(error)
    next(error)
  }
}

delete user
