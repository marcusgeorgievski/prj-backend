const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node")
const { createErrorResponse } = require("../response")

module.exports.AuthMiddleware = () => {
  return async function (req, res, next) {
    try {
      await ClerkExpressRequireAuth()(req, res, (err) => {
        // custom error
        if (err) {
          return res.status(401).json(createErrorResponse(401, "Unauthorized"))
        }
        next()
      })
    } catch (error) {
      res.status(401).json(createErrorResponse(401, "Unauthorized"))
    }
  }
}
