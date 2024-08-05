// get single class by class

const { getClassById } = require("../../../db/queries");
const logger = require("../../../logger");

module.exports = async (req, res, next) => {
  try {
    const { classId } = req.params;

    if (!classId) {
      const error = new Error("classId is required");
      error.code = 400;
      throw error;
    }

    const cls = await getClassById(classId);
    res.status(200).json(cls);
  } catch (error) {
    next(error);
  }
};
