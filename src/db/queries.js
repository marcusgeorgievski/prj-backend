const logger = require("../logger");
const db = require("./index")



async function getAllUsers() {
  return db`SELECT * FROM users`
}

// Get user's classes
async function getUserClasses(userId) {
  try {
    const result = await db`
      SELECT * FROM classes
      WHERE user_id = ${userId}
    `;
    return result;
  }
  catch (error) {
    logger.error('Error getting user classes:',error)
    throw error;
  }
}


// Create new class
async function createClass(name, professor, details, userId) {
  try {
    const result = await db`
      INSERT INTO classes (name, professor, details, user_id)
      VALUES (${name}, ${professor}, ${details}, ${userId})
      RETURNING *;
    `;
    return result;
  } catch (error) {
    logger.error('Error creating class:',error)
    throw error;
  }
}

// Delete class
async function deleteClass(classId) {
  try {
    const result = await db`
      DELETE FROM classes
      WHERE class_id = ${classId}
      RETURNING *;
    `;
    return result;
  } catch (error) {
    logger.error('Error deleting class:',error)
    throw error;
  }
}

module.exports = {
  getAllUsers,
  getUserClasses,
  createClass,
  deleteClass
};
