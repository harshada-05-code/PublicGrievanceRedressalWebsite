const express = require("express");
const router = express.Router();

// Example controller function
router.post("/register", (req, res) => {
  res.send("User registered");
});

module.exports = router;