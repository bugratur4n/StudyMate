const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', ratingController.createRating);
router.get('/me', ratingController.listUserRatings);

module.exports = router;
