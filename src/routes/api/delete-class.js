const ClassModel = require('../../../models/Class');

module.exports = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const deletedClass = await ClassModel.deleteById(classId);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(deletedClass);
  } catch (err) {
    next(err);
  }
};