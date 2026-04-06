const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const grievanceRoutes = require('./routes/grievanceRoutes');
const connectDB= require('./config/db');
connectDB();

router.post('/register', registerUser);
router.post('/login', loginUser);

app.use('/api/grievances', grievanceRoutes);
module.exports = router;
