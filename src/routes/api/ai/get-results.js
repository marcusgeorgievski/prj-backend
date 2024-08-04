// routes/api/add-class.js
const logger = require("../../../logger")

module.exports = async (req, res, next) => {
  try {
    const { content } = req.body
    logger.debug({ content })

    if (!content) {
      const error = new Error("content is required")
      error.code = 400
      throw error
    }

    const results = []

    logger.info({ results })
    res.status(200).json(results)
  } catch (error) {
    logger.error(error)
    next(error)
  }
}
