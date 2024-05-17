const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

// Create an express app instance we can use to attach middleware and HTTP routes
const app = express()

app.use(helmet()) // Use helmetjs security middleware
app.use(cors()) // Use CORS middleware so we can make requests across origins

// Routes
app.use("/", require("./routes"))

module.exports = app
