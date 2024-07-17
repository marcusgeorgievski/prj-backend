const { createAssessment } = require('../../../db/queries');
const logger = require('../../../logger');

module.exports = async (req, res, next) => {
  try {
    const { name, description, status, weight, dueDate, classId, userId } =
      req.body;

    // Log the input values
    logger.debug('Input values:', {
      name,
      description,
      status,
      weight,
      dueDate,
      classId,
      userId,
    });

    // Input validation
    if (!name || !userId || !classId) {
      logger.error('Name, userId, and classId are required');
      return res
        .status(400)
        .json({ error: 'Name, userId, and classId are required' });
    }

    const assessment = await createAssessment(
      name,
      description,
      status,
      weight,
      dueDate,
      classId,
      userId
    );

    logger.info('New assessment:', assessment);
    res.status(201).json(assessment[0]);
  } catch (error) {
    logger.error('Error creating assessment:', error);
    next(error);
  }
};
