const { createAssessment } = require("../../../db/queries");
const logger = require("../../../logger");
const { isAuthenticated } = require("../../../auth/auth-middleware");

module.exports = [
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { name, description, status, weight, dueDate, classId } = req.body;
      const userId = req.user.userId;

      // Input validation
      if (!name) {
        logger.error("Name is required");
        return res.status(400).json({ error: "Name is required" });
      }

      // Cache the assessment data temporarily (e.g., in the session or in-memory cache)
      req.session.tempAssessment = { name, description, status, weight, dueDate, classId };

      const assessment = await createAssessment(
        name,
        description,
        status,
        weight,
        dueDate,
        classId,
        userId
      );

      logger.info("New assessment:", assessment);
      res.status(201).json(assessment[0]);
    } catch (error) {
      logger.error("Error creating assessment:", error);
      next(error);
    }
  }
];