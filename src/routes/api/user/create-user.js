// create user

const { createUser } = require("../../../db/queries");
const logger = require("../../../logger");

module.exports = async (req, res, next) => {
  try {
    const { data } = req.body;
    const { id } = data;
    const email = data.email_addresses[0].email_address;

    logger.debug(`Creating user with id and email:`, id, email);

    if (!id) {
      const error = new Error("Missing required fields: id");
      error.code = 400;
      throw error;
    }

    const newUser = await createUser(id, email);
    res.status(201).json(newUser[0]);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
