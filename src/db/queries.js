const logger = require("../logger")
const db = require("./index")

async function getAllUsers() {
  return db`SELECT * FROM users`
}

async function createUser(userId) {
  try {
    const result = await db`
      INSERT INTO users (user_id)
      VALUES (${userId})
      RETURNING *;
    `
    return result
  } catch (error) {
    logger.error("Error creating user:", error)
    throw error
  }
}

async function deleteUser(userId) {
  try {
    const result = await db`
      DELETE FROM users
      WHERE user_id = ${userId}
      RETURNING *;
    `
    return result
  } catch (error) {
    logger.error("Error deleting user:", error)
    throw error
  }
}

// Get user's classes
async function getUserClasses(userId) {
  try {
    const result = await db`
      SELECT * FROM classes
      WHERE user_id = ${userId}
    `
    return result
  } catch (error) {
    logger.error("Error getting user classes:", error)
    throw error
  }
}

// Create new class
async function createClass(name, professor, details, userId) {
  try {
    const result = await db`
      INSERT INTO classes (name, professor, details, user_id)
      VALUES (${name}, ${professor}, ${details}, ${userId})
      RETURNING *;
    `
    return result
  } catch (error) {
    logger.error("Error creating class:", error)
    throw error
  }
}

// Delete class
async function deleteClass(classId) {
  try {
    const result = await db`
      DELETE FROM classes
      WHERE class_id = ${classId}
      RETURNING *;
    `
    return result
  } catch (error) {
    logger.error("Error deleting class:", error)
    throw error
  }
}

//Update class
async function updateClass(classId, name, professor, details) {
  try {
    const result = await db`
    UPDATE classes
    SET name = ${name},
        professor = ${professor},
        details = ${details}
    WHERE class_id = ${classId} 
    RETURNING *
    `
    return result
  } catch (error) {
    logger.error("Error updating class:", error)
    throw error
  }
}

// Get assessments by classId
async function getAssessmentsByClassId(classId) {
  try {
    const result = await db`
      SELECT * FROM assessments
      WHERE class_id = ${classId}
    `;
    return result;
  } catch (error) {
    logger.error("Error getting assessments by class ID:", error);
    throw error;
  }
}

// Get assessments by userId
async function getAssessmentsByUserId(userId) {
  try {
    const result = await db`
      SELECT * FROM assessments
      WHERE user_id = ${userId}
    `;
    return result;
  } catch (error) {
    logger.error("Error getting assessments by user ID:", error);
    throw error;
  }
}

// Create a new assessment
async function createAssessment(name, description, status, weight, dueDate, classId, userId) {
  try {
    logger.debug("createAssessment parameters:", { name, description, status, weight, dueDate, classId, userId });

    if (!name || !userId || !classId) {
      throw new Error('Missing required fields ' + ' name' + name + ' user id '+ userId + ' class id '+ classId);
    }

    const result = await db`
      INSERT INTO assessments (name, description, status, weight, due_date, class_id, user_id)
      VALUES (${name}, ${description}, ${status}, ${weight}, ${dueDate}, ${classId}, ${userId})
      RETURNING *;
    `;
    return result;
  } catch (error) {
    logger.error('Error creating assessment:', error);
    throw error;
  }
}


// Delete assessment
async function deleteAssessment(assessmentId) {
  try {
    const result = await db`
      DELETE FROM assessments
      WHERE assessment_id = ${assessmentId}
      RETURNING *;
    `;
    return result;
  } catch (error) {
    logger.error("Error deleting assessment:", error);
    throw error;
  }
}

//update assessment
async function updateAssessment(assessment_id, name, description, dueDate, status, weight, classId){
  try {
    const result = await db`
    UPDATE assessments
    SET name = ${name},
        description = ${description},
        due_date = ${dueDate},
        status = ${status},
        updated_at = now(),
        weight = ${weight},
        class_id = ${classId}
    WHERE assessment_id = ${assessment_id} 
    RETURNING *
    `
    return result
}catch (error){
  logger.error("Error updating assessment:", error)
  throw error
  }
}



module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getUserClasses,
  createClass,
  deleteClass,
  updateClass,
  getAssessmentsByClassId,
  getAssessmentsByUserId,
  createAssessment,
  deleteAssessment,
  updateAssessment,
}
