const { deleteClass } = require('../../db/queries');

module.exports = async (req, res, next) => {
  try {
    const { classId } = req.params;

    // Check if the classId is provided
    if (!classId) {
      return res.status(400).json({ error: 'classId is required' });
    }

    const deletedClass = await deleteClass(classId);

    if (deletedClass.length === 0) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json(deletedClass[0]);
  } catch (error) {
    next(error);
  }
};