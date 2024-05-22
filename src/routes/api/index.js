const express = require('express');
const router = express.Router();

const getClassesRoute = require('./get-classes');
const addClassRoute = require('./create-class');
const deleteClassRoute = require('./delete-class');

router.get('/classes', getClassesRoute);
router.post('/classes', addClassRoute);
router.delete('/classes/:classId', deleteClassRoute);

module.exports = router;