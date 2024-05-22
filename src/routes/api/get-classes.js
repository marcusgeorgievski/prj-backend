const getUserClasses = require("../../db/queries").getUserClasses

module.exports = async (req, res, next) => {
  // db code here
  const classes = await getUserClasses("user_1") // user_1 for sample data
  console.log("classes: ", classes)

  res.status(200).json(classes)
}
