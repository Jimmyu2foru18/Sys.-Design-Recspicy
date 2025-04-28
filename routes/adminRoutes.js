const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin login route (public)
router.post('/login', adminController.login);

// Protected admin routes
router.get('/dashboard', protect, admin, adminController.getDashboard);

module.exports = router;