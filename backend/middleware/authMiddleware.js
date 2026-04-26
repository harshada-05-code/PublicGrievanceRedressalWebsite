const jwt = require('jsonwebtoken');

const User = require('../models/User');

const protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        try {
            // Decrypt the token to see who the user is
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
            
            // Fetch the user from the database so we have access to their role
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }
            
            // Do not include the password in the request object
            delete user.password;
            req.user = user; 
            
            next(); // Move to the next function
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "No token, authorization denied" });
    }
};

module.exports = protect;