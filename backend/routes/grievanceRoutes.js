const express = require('express');
const router = express.Router();
const grrievanceController = require('../Controllers/grievanceController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { 
    addGrievance, 
    getMyGrievances, 
    getAllGrievances, 
    updateGrievanceStatus 
} = require('../controllers/grievanceController');

// Citizen Routes
router.post('/', protect, addGrievance);
router.get('/my', protect, getMyGrievances);

// Admin Routes
router.get('/admin/all', protect, admin, getAllGrievances);
router.put('/admin/:id', protect, admin, updateGrievanceStatus);


module.exports = router;