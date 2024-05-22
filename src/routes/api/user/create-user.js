// create user

const { createUser } = require('../../../db/queries');

module.exports = async (req, res, next) => {
    try {
        const { id } = req.body;
    
        if (!id) {
        return res.status(400).json({ error: 'user id is required' });
        }
        const newUser = await createUser(id);
        res.status(201).json(newUser[0]);
    } catch (error) {
        next(error);
    }
    }

delete user
