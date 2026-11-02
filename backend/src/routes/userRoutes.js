const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/profile', userController.getProfile);
router.patch('/profile', userController.updateProfile);
router.post('/password', userController.changePassword);
router.post('/premium', userController.setPremium);
router.get('/courses', userController.listMyCourses);
router.post('/courses', userController.addCourse);
router.delete('/courses/:courseId', userController.removeCourse);
router.get('/:id/ratings', ratingController.listUserRatings);
router.get('/:id', userController.getPublicProfile);

module.exports = router;
