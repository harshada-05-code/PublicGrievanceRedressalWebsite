const express = require("express");
const router = express.Router();


const { registerUser, loginUser } = require("../Controller/userController");
// Example Controller function
router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
