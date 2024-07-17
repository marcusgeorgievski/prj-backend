const express = require('express');
const { createSuccessResponse } = require('../../response');

const router = express.Router();

//routes for class
router.get('/classes', require('./classes/get-classes'));
router.get('/classes/:classId', require('./classes/get-class'));
router.post('/classes', require('./classes/create-class'));
router.delete('/classes/:classId', require('./classes/delete-class'));
router.put('/classes/:classId', require('./classes/update-class'));

//routes for assessments
router.get('/assessments', require('./assessment/get-assessments'));
router.post('/assessments', require('./assessment/create-assessment'));
router.delete(
  '/assessments/:assessmentId',
  require('./assessment/delete-assessment')
);
router.get(
  '/assessments/:classId',
  require('./assessment/get-assessments-by-class')
);
router.put(
  '/assessments/:assessmentId',
  require('./assessment/update-assessment')
);

//routes for notes
router.get('/notes', require('./note/get-notes'));
router.get('/notes/:noteId', require('./note/get-note'));
router.get('/notes/class/:classId', require('./note/get-notes-by-class'));
router.post('/notes', require('./note/create-note'));
router.put('/notes/:noteId', require('./note/update-note'));
router.delete('/notes/:noteId', require('./note/delete-note'));

// Webhooks
router.post('/create-user', require('./user/create-user'));
router.post('/delete-user', require('./user/delete-user'));

// Route that requires authentication through Clerk
router.get('/auth-test', (req, res) => {
  res.json(createSuccessResponse(req.auth));
});

module.exports = router;
