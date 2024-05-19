import {
  ClerkExpressRequireAuth,
  ClerkExpressWithAuth,
} from "@clerk/clerk-sdk-node"
import app from "../app"

import { Router } from "express"

// app.use(ClerkExpressWithAuth())
router.get("/clerk", (req, res) => {
  //   res.json(req.auth)
  res.json({ result: "success" })
})
