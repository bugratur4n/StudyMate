const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', resourceController.listResources);
router.post('/', resourceController.createResource);
router.delete('/:id', resourceController.deleteResource);

module.exports = router;
