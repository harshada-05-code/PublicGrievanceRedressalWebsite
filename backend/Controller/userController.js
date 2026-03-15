// backend/controllers/userController.js
const User = require("../models/User"); // Import your Mongoose Model

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, number, password } = req.body;

        // 1. Check if user exists in MongoDB
        const existingUser = await User.findOne({ number });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Phone number already registered.' });
        }

        // 2. Create and Save to Database
        const newUser = await User.create({ name, number, password });

        res.status(201).json({ success: true, message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { number, password } = req.body;

        // 1. Find user in MongoDB
        const user = await User.findOne({ number });
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // 2. Check Password
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Incorrect password.' });
        }

        res.status(200).json({ success: true, message: 'Login successful.', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};