const logger = require('../../../logger');

const getAssessmentsByClassId =
  require('../../../db/queries').getAssessmentsByClassId;

module.exports = async (req, res, next) => {
  try {
    const { classId } = req.params;

    const assessments = await getAssessmentsByClassId(classId);
    logger.info(assessments);
    res.status(200).json(assessments);
  } catch (error) {
    next(error);
  }
};
