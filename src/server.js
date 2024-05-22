const app = require("./app")

const port = parseInt(process.env.PORT || "8080", 10);

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})


module.exports = server
