const User = require('../models/User');
const generateToken = require('../Utils/generateToken'); // Import the util

exports.loginUser = async (req, res) => {
    try {
        const { number, password } = req.body;
        const user = await User.findOne({ number });

        // In a real app, use bcrypt to compare. For now:
        if (user && user.password === password) {
            res.status(200).json({
                success: true,
                _id: user._id,
                name: user.name,
                number: user.number,
                token: generateToken(user._id), // <--- THE ID CARD
            });
        } else {
            res.status(401).json({ message: "Invalid number or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};