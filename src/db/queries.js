import db from "."

function getUserClasses(userId) {
  return db.query(`SELECT * FROM classes WHERE user_id = ${userId}`)
}
