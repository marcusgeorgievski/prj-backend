const express = require("express")
const { createSuccessResponse } = require("../../response")

const router = express.Router()

// Class routes
router.get("/classes", require("./classes/get-classes"))
router.post("/classes", require("./classes/create-class"))
router.delete("/classes/:classId", require("./classes/delete-class"))
router.put("/classes/:classId", require("./classes/update-class"))

// Assessment routes
router.get("/assessment", require("./assessment/get-assessments"))
router.post("/assessment", require("./assessment/create-assessment"))
router.delete("/assessment/:assessmentId", require("./assessment/delete-assessment"))

// Webhooks
router.post("/create-user", require("./user/create-user"))
router.post("/delete-user", require("./user/delete-user"))

// Route that requires authentication through Clerk
router.get("/auth-test", (req, res) => {
  res.json(createSuccessResponse(req.auth))
})

module.exports = router
