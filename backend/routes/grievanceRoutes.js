const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
  addGrievance,
  getMyGrievances,
  getAllGrievances,
  updateGrievanceStatus,
  assignGrievanceToOfficer,
} = require('../Controller/grievanceController');

const upload = require('../middleware/uploadMiddleware');

// Routes
// Allows up to 3 images to be uploaded under the field name "images"
router.post('/', protect, upload.array('images', 3), addGrievance);
router.get('/my', protect, getMyGrievances);
router.get('/', protect, getAllGrievances);
router.put('/:id', protect, updateGrievanceStatus);
router.put('/:id/assign', protect, assignGrievanceToOfficer);

module.exports = router;