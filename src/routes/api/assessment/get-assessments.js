// src/routes/api/assessment/get-assessments.js

const logger = require("../../../logger")

const getUserAssessments = require("../../../db/queries").getUserAssessments

module.exports = async (req, res, next) => {
  try {
    const { user_id } = req.body

    if (!user_id) {
      const error = new Error("user_id is required")
      error.code = 400
      throw error
    }

    const assessments = await getUserAssessments(user_id)
    res.status(200).json(assessments)
  } catch (error) {
    next(error)
  }
}
