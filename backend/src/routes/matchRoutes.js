const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const authMiddleware = require('../middlewares/authMiddleware'); // Güvenlik kalkanımız!

// POST /api/matches/request - Sadece giriş yapmış kullanıcılar talep oluşturabilir
router.post('/request', authMiddleware, matchController.createStudyRequest);

module.exports = router;