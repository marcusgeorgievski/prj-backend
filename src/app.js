const express = require("express")
const cors = require("cors")
const helmet = require("helmet")

// Create an express app instance we can use to attach middleware and HTTP routes
const app = express();

// Parse JSON request bodies
app.use(express.json());

app.use(helmet()) // Use helmetjs security middleware
app.use(cors()) // Use CORS middleware so we can make requests across origins

// Routes
app.use("/", require("./routes"));

//error handling:
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  });

module.exports = app
