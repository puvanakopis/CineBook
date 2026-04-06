const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/', protect, authorize('admin'), movieController.createMovie);

module.exports = router;