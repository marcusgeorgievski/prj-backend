const { getAssessmentById, getAssessmentsByClassId, getAssessmentsByUserId } = require("../../../db/queries");
const logger = require("../../../logger");

module.exports = async (req, res, next) => {
  try {
    const { assessmentId, classId, userId } = req.query;

    // Log the input values
    logger.debug("Input values:", { assessmentId, classId, userId });

    let assessments;

    if (assessmentId) {
      assessments = await getAssessmentById(assessmentId);
    } else if (classId) {
      assessments = await getAssessmentsByClassId(classId);
    } else if (userId) {
      assessments = await getAssessmentsByUserId(userId);
    } else {
      return res.status(400).json({ error: "Please provide an assessmentId, classId, or userId to retrieve assessments" });
    }

    if (!assessments || assessments.length === 0) {
      return res.status(404).json({ error: "No assessments found" });
    }

    logger.info("Assessments retrieved:", assessments);
    res.status(200).json(assessments);
  } catch (error) {
    logger.error("Error retrieving assessments:", error);
    next(error);
  }
};
