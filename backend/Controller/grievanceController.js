const { addGrievance, getGrievancesByUserId, getAllGrievances, findGrievanceById, findUserById } = require('../data/store');

// @desc    Create new grievance
// @route   POST /api/grievances
exports.addGrievance = async (req, res) => {
    try {
        const { title, description, category, address } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const grievance = addGrievance({
            user: userId,
            title,
            description,
            category,
            address,
        });

        res.status(201).json({ success: true, data: grievance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get logged in user's grievances
// @route   GET /api/grievances/my
exports.getMyGrievances = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const grievances = getGrievancesByUserId(userId);
        res.status(200).json({ success: true, data: grievances });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ALL grievances (Admin Only)
exports.getAllGrievances = async (req, res) => {
    try {
        const grievances = getAllGrievances().map((grievance) => {
            const user = findUserById(grievance.user);
            return {
                ...grievance,
                user: user ? { name: user.name, number: user.number } : null,
            };
        });
        res.status(200).json({ success: true, data: grievances });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update grievance status (Admin Only)
exports.updateGrievanceStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const grievance = findGrievanceById(req.params.id);

        if (grievance) {
            grievance.status = status;
            res.json(grievance);
        } else {
            res.status(404).json({ message: 'Grievance not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
