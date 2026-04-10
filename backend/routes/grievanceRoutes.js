const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
  addGrievance,
  getMyGrievances,
  getAllGrievances,
  updateGrievanceStatus,
} = require('../Controller/grievanceController');

// Routes
router.post('/', protect, addGrievance);
router.get('/my', protect, getMyGrievances);
router.get('/', protect, getAllGrievances);
router.put('/:id', protect, updateGrievanceStatus);

module.exports = router;