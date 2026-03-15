// Core Modules
const path = require('path');

// External Module
const express = require('express');
const userRouter = express.Router();

const rootDir = require('../Utils/pathUtils');  
const usercontroller = require('../controllers/userController');

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

module.exports = userRouter;