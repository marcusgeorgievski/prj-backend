const express = require("express")
const router = express.Router()
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node")

// if (process.env.NODE_ENV === "production") {
//   router.use("/", ClerkExpressRequireAuth({}))
// }

router.get("/classes", require("./classes/get-classes"))
router.post("/classes", require("./classes/create-class"))
router.delete("/classes/:classId", require("./classes/delete-class"))
router.put("/classes/:classId", require("./classes/update-class"))

// Webhooks
router.post("/create-user", require("./user/create-user"))
router.post("/delete-user", require("./user/delete-user"))

// Route that requires authentication through Clerk
router.get("/clerk-test", (req, res) => {
  res.json({ result: "success", ...req.auth })
})

module.exports = router
