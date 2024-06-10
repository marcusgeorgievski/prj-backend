const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node")
const express = require("express")
const author = require("../../package.json").author
const db = require("../db")
const { AuthMiddleware } = require("../auth/auth-middleware")

// Create a router that we can use to mount our API
const router = express.Router()

/**
 * Expose all of our API routes on /v1/* to include an API version.
 * Protect them all with middleware so you have to be authenticated
 * in order to access things.
 */
// router.use(`/`, authenticate(), require("./api"))
router.use(`/api`, AuthMiddleware(), require("./api"))

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get("/", async (req, res) => {
  const start = Date.now()

  try {
    // Perform a simple query to check the database connection
    await db`SELECT 1`
    const duration = Date.now() - start

    res.setHeader("Cache-Control", "no-cache")
    res.status(200).json({
      author,
      githubUrl: "https://github.com/marcusgeorgievski/prj-backend",
      time: new Date().toISOString(),
      dbStatus: "healthy",
      dbResponseTime: `${duration}ms`,
    })
  } catch (error) {
    const duration = Date.now() - start
    console.log(error)

    res.setHeader("Cache-Control", "no-cache")
    res.status(500).json({
      author,
      githubUrl: "https://github.com/marcusgeorgievski/prj-backend",
      time: new Date().toISOString(),
      dbStatus: "unhealthy",
      dbResponseTime: `${duration}ms`,
      error: error.message,
    })
  }
})

module.exports = router
