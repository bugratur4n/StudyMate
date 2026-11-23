const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/users/profile -> Sadece giriş yapmış kullanıcılar erişebilir
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;