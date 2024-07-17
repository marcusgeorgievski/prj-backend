const logger = require('../../../logger');
const { getNotesByUserId } = require('../../../db/queries');

module.exports = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      const error = new Error('user_id is required');
      error.code = 400;
      throw error;
    }

    const notes = await getNotesByUserId(user_id);
    logger.info('Notes retrieved for user:', user_id);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};
