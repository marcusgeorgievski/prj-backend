const db = require("./index")

// Users

async function getAllUsers() {
  return db`SELECT * FROM users`
}

// Classes

async function getUserClasses(userId) {
  return db`SELECT * FROM classes WHERE user_id = ${userId}`
}

module.exports = {
  getAllUsers,
  getUserClasses,
}
