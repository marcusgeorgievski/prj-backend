const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node")
const express = require("express")
const author = require("../../package.json").author

// Create a router that we can use to mount our API
const router = express.Router()

/**
 * Expose all of our API routes on /v1/* to include an API version.
 * Protect them all with middleware so you have to be authenticated
 * in order to access things.
 */
// router.use(`/`, authenticate(), require("./api"))
router.use(`/`, require("./api"))

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get("/", (req, res) => {
  // Client's shouldn't cache this response (always request it fresh)
  res.setHeader("Cache-Control", "no-cache")
  res.status(200).json({
    author,
    githubUrl: "https://github.com/marcusgeorgievski/prj-backend",
  })
})

// Route that requires authentication through Clerk
router.get("/clerk-test", ClerkExpressRequireAuth({}), (req, res) => {
  res.json({ result: "success", ...req.auth })
})

module.exports = router
