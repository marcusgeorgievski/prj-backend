const getUserClasses = require("../../db/queries").getUserClasses

module.exports = async (req, res, next) => {
  try {
    const classes = await getUserClasses("user_1")
    res.status(200).json(classes)
  }
  catch (error) {
    next(error)
  }

  res.status(200).json(classes)
}
