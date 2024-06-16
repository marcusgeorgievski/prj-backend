const { updateClass } = require("../../../db/queries")

const logger = require("../../../logger")

module.exports = async (req, res, next) => {
  try {
    const { classId } = req.params
    const { name, professor, details } = req.body

    logger.debug(classId, req.body)

    if (!name || !classId) {
      const error = new Error("name and classId are required")
      error.code = 400
      throw error
    }

    const updatedClass = await updateClass(classId, name, professor, details)
    res.status(201).json(updatedClass)
  } catch (error) {
    next(error)
  }
}
