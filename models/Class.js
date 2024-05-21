const pool = require('../config/db');

class ClassModel {
  static async create(userId, name, professor, details) {
    const query = `
      INSERT INTO classes (user_id, name, professor, details)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [userId, name, professor, details];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(userId) {
    const query = `
      SELECT * FROM classes
      WHERE user_id = $1
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async findById(classId) {
    const query = 'SELECT * FROM classes WHERE class_id = $1';
    const values = [classId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async deleteById(classId) {
    const query = 'DELETE FROM classes WHERE class_id = $1 RETURNING *';
    const values = [classId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = ClassModel;