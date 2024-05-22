const {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
} = require("@clerk/clerk-sdk-node")

const router = express.Router()

// app.use(ClerkExpressWithAuth())
router.get("/clerk", (req, res) => {
  //   res.json(req.auth)
  res.json({ result: "success" })
})
