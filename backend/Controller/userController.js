const bcrypt = require('bcryptjs');
const generateToken = require('../Utils/generateToken');
const User = require('../models/User');

const loginUser = async (req, res) => {
    try {
        const { number, password } = req.body;
        const user = await User.findByNumber(number);

        if (!user) {
            return res.status(401).json({ message: 'Invalid number or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid number or password' });
        }

        res.status(200).json({
            success: true,
            _id: user.id,
            name: user.name,
            number: user.number,
            role: user.role,
            departmentId: user.departmentId,
            token: generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, number, password, role, departmentId } = req.body;

        if (!name || !number || !password) {
            return res.status(400).json({ message: 'Please provide name, number, and password' });
        }

        const existingUser = await User.findByNumber(number);
        if (existingUser) {
            return res.status(400).json({ message: 'Number already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, number, password: hashedPassword, role, departmentId });

        res.status(201).json({
            success: true,
            _id: user.id,
            name: user.name,
            number: user.number,
            role: user.role,
            departmentId: user.departmentId,
            token: generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
};