const { deleteUser } = require("../../../db/queries")
const logger = require("../../../logger")

module.exports = async (req, res, next) => {
  try {
    const { id } = req.body

    console.log("\n\nid", id)

    if (!id) {
      return res.status(400).json({ error: "user id is required" })
    }
    const deletedUser = await deleteUser(id)
    res.status(200).json(deletedUser[0])
  } catch (error) {
    next(error)
  }
}
