const { createSuccessResponse, createErrorResponse } = require("../../../response")
const queries = require("../../../db/queries")

async function deleteNote(req, res) {
  try {
    const { noteId } = req.params

    const deletedNote = await queries.deleteNote(noteId)
    res.status(200).json(createSuccessResponse(deletedNote))
  } catch (error) {
    res.status(500).json(createErrorResponse(500, error.message))
  }
}

module.exports = deleteNote