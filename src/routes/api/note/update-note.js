const { updateNote } = require('../../../db/queries');
const logger = require('../../../logger');

module.exports = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { name, content } = req.body;

    logger.debug(noteId, req.body);

    if (!name || !noteId) {
      logger.error('name and noteId are required');
      return res
        .status(400)
        .json({ error: 'name and noteId are required' });
    }

    const updatedNote = await updateNote(noteId, name, content);
    logger.info('Updated note:', updatedNote);
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};
