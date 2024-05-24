const logger = require("../../../logger")

const getUserClasses = require("../../../db/queries").getUserClasses

module.exports = async (req, res, next) => {
  try {
    const { user_id } = req.body
    const classes = await getUserClasses(user_id)
    res.status(200).json(classes)
  } catch (error) {
    logger.error(error)
    next(error)
  }
}
