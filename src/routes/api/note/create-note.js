const { createSuccessResponse, createErrorResponse } = require("../../../response")
const queries = require("../../../db/queries")
const logger = require("../../../logger");

async function createNote(req, res) {
  try {
    const { name, content, class_id ,user_id} = req.body
    //const userId = req.auth.userId
    logger.debug("Input values:", { name, content, class_id ,user_id});

    if (!name || !class_id || !user_id) {
      return res.status(400).json(createErrorResponse(400, "Missing required fields"))
    }

    const newNote = await queries.createNote(name, content, class_id, user_id)
    res.status(201).json(createSuccessResponse(newNote))
  } catch (error) {
    res.status(500).json(createErrorResponse(500, error.message))
  }
}

module.exports = createNote