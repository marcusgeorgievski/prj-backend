const logger = require('../../../logger');

const getUserClasses = require('../../../db/queries').getUserClasses;

module.exports = async (req, res, next) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      const error = new Error('user_id is required');
      error.code = 400;
      throw error;
    }

    const classes = await getUserClasses(user_id);
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
};
