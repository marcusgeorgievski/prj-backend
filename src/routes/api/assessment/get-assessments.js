const logger = require("../../../logger");

const getAssessmentsByUserId =
  require("../../../db/queries").getAssessmentsByUserId;

module.exports = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      const error = new Error("user_id is required");
      error.code = 400;
      throw error;
    }

    const assessments = await getAssessmentsByUserId(user_id);
    logger.info(assessments);
    res.status(200).json(assessments);
  } catch (error) {
    next(error);
  }
};
