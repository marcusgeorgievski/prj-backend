// routes/api/add-class.js
const db = require('../../db');

module.exports = async (req, res, next) => {
  try {
    const { name, professor, details, userId } = req.body;

    // Check if the required fields are provided
    if (!name || !professor || !userId) {
      return res.status(400).json({ error: 'name, professor, and userId are required' });
    }

    // Insert the new class into the database
    const query = `
      INSERT INTO classes (name, professor, details, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, professor, details, userId];
    const newClass = await db.query(query, values);

    res.status(201).json(newClass.rows[0]);
  } catch (error) {
    next(error);
  }
};