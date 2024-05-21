const express = require("express")

// Create a router on which to mount our API endpoints
const router = express.Router()

// Routes can go here. We can define the functions in other files
router.get("/classes", require("./get-classes"));
router.post("/classes", require("./add-class"));
router.delete("/classes/:id", require("./delete-class"));

module.exports = router
