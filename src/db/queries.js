const db = require("./index")



async function getAllUsers() {
  return db`SELECT * FROM users`
}

// Classes

async function getUserClasses(userId) {
  return db`SELECT * FROM classes WHERE user_id = ${userId}`
}


//add new class
async function createClass(name, professor, details, userId) {
  try {
    const result = await db`
      INSERT INTO classes (name, professor, details, user_id)
      VALUES (${name}, ${professor}, ${details}, ${userId})
      RETURNING *;
    `;
    return result;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
}

//delete
async function deleteClass(classId) {
  try {
    const result = await db`
      DELETE FROM classes
      WHERE class_id = ${classId}
      RETURNING *;
    `;
    return result;
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error;
  }
}

module.exports = {
  getAllUsers,
  getUserClasses,
  createClass,
  deleteClass
};
