const { updateAssessment } = require('../../../db/queries');

const logger = require('../../../logger');

module.exports = async (req, res, next) => {
  try {
    const { assessmentId } = req.params;
    const { name, description, dueDate, status, weight, classId } =
      req.body;

    console.log(req.params);
    logger.debug(assessmentId, req.body);

    if (!name || !assessmentId) {
      logger.error('title and assessmentId are required');
      return res
        .status(400)
        .json({ error: 'title and assessmentId are required' });
    }

    const updatedAssessment = await updateAssessment(
      assessmentId,
      name,
      description,
      dueDate,
      status,
      weight,
      classId
    );
    logger.info('update class', updatedAssessment);
    res.status(201).json(updatedAssessment);
  } catch (error) {
    next(error);
  }
};
