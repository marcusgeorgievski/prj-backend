// routes/api/add-class.js
const { createClass } = require('../../db/queries');


module.exports = async (req, res, next) => {
    try {
      const { name, professor, details, user_id } = req.body;
      console.log(req.body)
  
      if (!name || !professor || !user_id) {
        return res.status(400).json({ error: 'name, professor, and userId are required' });
      }
  
      const newClass = await createClass(name, professor, details, user_id);
      console.log('New class:', newClass);
      res.status(201).json(newClass[0]);
    } catch (error) {
      next(error);
    }
  };