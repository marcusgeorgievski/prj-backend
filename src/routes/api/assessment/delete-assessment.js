const { deleteAssessment } = require("../../../db/queries");
const logger = require("../../../logger");


module.exports = 
  async (req, res, next) => {
    try {
      const assessmentId = req.params.id;
      const userId = req.user.userId;

      const deletedAssessment = await deleteAssessment(assessmentId, userId);

      if (deletedAssessment.length === 0) {
        return res.status(404).json({ error: "Assessment not found" });
      }

      logger.info("Assessment deleted:", deletedAssessment[0]);
      res.status(200).json(deletedAssessment[0]);
    } catch (error) {
      logger.error("Error deleting assessment:", error);
      next(error);
    }
};