const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/request', matchController.createStudyRequest);
router.get('/requests', matchController.listMyRequests);
router.delete('/requests/:id', matchController.cancelStudyRequest);
router.get('/', matchController.listMatches);
router.get('/:id', matchController.getMatch);

module.exports = router;
