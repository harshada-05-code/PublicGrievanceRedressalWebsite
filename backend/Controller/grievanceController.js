const Grievance = require('../models/Grievance');
const User = require('../models/User');

// @desc    Create new grievance
// @route   POST /api/grievances
exports.addGrievance = async (req, res) => {
    try {
        const { title, description, category, address } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        }

        const createdGrievance = await Grievance.create({
            userId,
            title,
            description,
            category,
            address,
            imageUrls,
        });

        res.status(201).json({ success: true, data: createdGrievance });
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

        const grievances = await Grievance.findAll({
            where: { userId },
            include: [
                { model: User, attributes: ['name', 'number'] },
            ],
        });

        res.status(200).json({ success: true, data: grievances });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ALL grievances (Admin / Global)
exports.getAllGrievances = async (req, res) => {
    try {
        const grievances = await Grievance.findAll({
            include: [
                { model: User, attributes: ['name', 'number'] },
            ],
        });

        res.status(200).json({ success: true, data: grievances });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update grievance status (Admin / Officer Only)
exports.updateGrievanceStatus = async (req, res) => {
    try {
        const { status, remarks } = req.body;
        const grievance = await Grievance.findByPk(req.params.id);

        if (grievance) {
            grievance.status = status;

            const history = Array.isArray(grievance.history) ? grievance.history : [];
            history.push({
                status,
                updatedAt: new Date(),
                remarks: remarks || `Status updated to ${status}`,
            });
            grievance.history = history;

            const updatedGrievance = await grievance.save();
            res.json({ success: true, data: updatedGrievance });
        } else {
            res.status(404).json({ message: 'Grievance not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
