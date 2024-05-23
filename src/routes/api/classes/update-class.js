const { updateClass } = require("../../../db/queries")

const logger = require("../../../logger")

module.exports = async (req, res, next) =>{
    try{
        const {classId, user_id, name, professor, details} = req.body
        logger.debug(req.body)

        if (!name || !user_id || !classId) {
            return res
              .status(400)
              .json({ error: "name, professor, and userId are required" })
          }
    
          const updatedClass = await updateClass(classId, user_id, name, professor, details)
          logger.info("update class", updatedClass)
          res.status(201).json(updatedClass)
    } catch (error) {
        next(error)
    }
}