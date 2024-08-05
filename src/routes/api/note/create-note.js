const {
  createSuccessResponse,
  createErrorResponse,
} = require("../../../response");
const queries = require("../../../db/queries");
const logger = require("../../../logger");

async function createNote(req, res) {
  try {
    const { name, class_id, user_id } = req.body;
    //const userId = req.auth.userId
    logger.debug("Input values:", { name, class_id, user_id });

    if (!name || !class_id || !user_id) {
      return res
        .status(400)
        .json(createErrorResponse(400, "Missing required fields"));
    }

    const newNote = await queries.createNote(name, "", class_id, user_id);
    res.status(201).json(createSuccessResponse(newNote));
  } catch (error) {
    next(error);
  }
}

module.exports = createNote;
