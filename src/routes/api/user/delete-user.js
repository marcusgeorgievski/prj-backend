const { deleteUser } = require("../../../db/queries");
const logger = require("../../../logger");

module.exports = async (req, res, next) => {
  try {
    const { data } = req.body;
    const id = data.id;

    logger.debug(`Deleting user with id: ${id}`);

    if (!id) {
      const error = new Error("user id is required");
      error.code = 400;
      throw error;
    }
    const deletedUser = await deleteUser(id);
    res.status(200).json(deletedUser[0]);
  } catch (error) {
    next(error);
  }
};
