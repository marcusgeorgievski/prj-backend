// routes/api/delete-class.js
const db = require('../../db');

module.exports = async (req, res, next) => {
  try {
    const { classId } = req.params;

    // Check if the classId is provided
    if (!classId) {
      return res.status(400).json({ error: 'classId is required' });
    }

    // Delete the class from the database
    const query = `
      DELETE FROM classes
      WHERE class_id = $1
      RETURNING *;
    `;
    const values = [classId];
    const deletedClass = await db.query(query, values);

    if (deletedClass.rows.length === 0) {
      return res.status(404).json({ error: 'Class not found' });
    }

    res.status(200).json(deletedClass.rows[0]);
  } catch (error) {
    next(error);
  }
};