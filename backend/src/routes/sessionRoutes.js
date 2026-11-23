const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/usage', sessionController.getUsage);
router.get('/', sessionController.listSessions);
router.post('/', sessionController.startSession);
router.get('/:id', sessionController.getSession);
router.patch('/:id/end', sessionController.endSession);

module.exports = router;
