const logger = require('../../../logger');
const { getNoteById } = require('../../../db/queries');

// Get note by id
module.exports = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const note = await getNoteById(noteId);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
