const logger = require("../../../logger");
const { getNotesByClassId } = require("../../../db/queries");

module.exports = async (req, res, next) => {
  try {
    const { classId } = req.params;

    const notes = await getNotesByClassId(classId);
    logger.info("Notes retrieved for class:", classId);

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};
