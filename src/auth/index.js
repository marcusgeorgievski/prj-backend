const e = require("express")

if (process.env.NODE_ENV === "production") {
  module.exports = require("./auth-middleware")
} else {
  module.exports = require("./auth-middleware")
}
