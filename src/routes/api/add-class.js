const ClassModel = require('../../../models/Class');

module.exports = async (req, res, next) => {
  try {
    const { name, professor, details } = req.body;
    const userId = req.auth.userId; // Assuming you have the user ID in req.auth.userId
    const newClass = await ClassModel.create(userId, name, professor, details);
    res.status(201).json(newClass);
  } catch (err) {
    next(err);
  }
};