const { updateClass } = require("../../../db/queries")

const logger = require("../../../logger")

module.exports = async (req, res, next) => {
  try {
    const { classId } = req.params
    const { name, professor, details } = req.body

    logger.debug(classId, req.body)

    if (!name || !classId) {
      logger.error("name and classId are required")
      return res.status(400).json({ error: "name and classId are required" })
    }

    const updatedClass = await updateClass(classId, name, professor, details)
    logger.info("update class", updatedClass)
    res.status(201).json(updatedClass)
  } catch (error) {
    next(error)
  }
}
