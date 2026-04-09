const express = require("express");
const router = express.Router();

const {
  addGrievance,
  getMyGrievances,
  getAllGrievances,
  updateGrievanceStatus,
} = require("../Controller/grievanceController"); 

// Routes
router.post("/", addGrievance);
router.get("/my", getMyGrievances);
router.get("/", getAllGrievances);
router.put("/:id", updateGrievanceStatus);

module.exports = router;