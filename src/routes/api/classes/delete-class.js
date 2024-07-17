const { deleteClass } = require('../../../db/queries');
const logger = require('../../../logger');

module.exports = async (req, res, next) => {
  try {
    const { classId } = req.params;

    // Check if the classId is provided
    if (!classId) {
      const error = new Error('classId is required');
      error.code = 400;
      throw error;
    }

    const deletedClass = await deleteClass(classId);

    if (deletedClass.length === 0) {
      const error = new Error('Class not found');
      error.code = 404;
      throw error;
    }

    res.status(200).json(deletedClass[0]);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
