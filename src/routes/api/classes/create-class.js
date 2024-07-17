// routes/api/add-class.js
const { createClass } = require('../../../db/queries');
const logger = require('../../../logger');

module.exports = async (req, res, next) => {
  try {
    const { name, professor, details, user_id } = req.body;
    logger.debug('Creating class: ' + req.body);

    if (!name || !user_id) {
      const error = new Error('name and user_id are required');
      error.code = 400;
      throw error;
    }

    const newClass = await createClass(name, professor, details, user_id);
    logger.info('New class:', newClass);
    res.status(201).json(newClass[0]);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
