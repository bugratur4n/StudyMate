const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, courseController.listCourses);
router.get('/:id', authMiddleware, courseController.getCourse);

module.exports = router;
