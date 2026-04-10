const bcrypt = require('bcryptjs');
const generateToken = require('../Utils/generateToken');
const { addUser, findUserByNumber } = require('../data/store');

const loginUser = async (req, res) => {
    try {
        const { number, password } = req.body;
        const user = findUserByNumber(number);

        if (!user) {
            return res.status(401).json({ message: 'Invalid number or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid number or password' });
        }

        res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            number: user.number,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, number, password } = req.body;

        if (!name || !number || !password) {
            return res.status(400).json({ message: 'Please provide name, number, and password' });
        }

        const existingUser = findUserByNumber(number);
        if (existingUser) {
            return res.status(400).json({ message: 'Number already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = addUser({ name, number, password: hashedPassword });

        res.status(201).json({
            success: true,
            _id: user._id,
            name: user.name,
            number: user.number,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
};