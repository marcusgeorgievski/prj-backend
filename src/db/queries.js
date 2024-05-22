const db = require("./index")

// Testing connection
function testConnection() {
  db`SELECT NOW()`
    .then(result => {
      console.log('Connected to the database:', result[0].now);
    })
    .catch(error => {
      console.error('Error connecting to the database:', error);
    });
}


// Users

async function getAllUsers() {
  return db`SELECT * FROM users`
}

// Classes

async function getUserClasses(userId) {
  return db`SELECT * FROM classes WHERE user_id = ${userId}`
}

module.exports = {
  testConnection,
  getAllUsers,
  getUserClasses,
}
