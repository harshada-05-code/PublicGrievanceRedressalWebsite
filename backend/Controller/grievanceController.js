const Grievance = require('../models/Grievance');

// @desc    Create new grievance
// @route   POST /api/grievances
exports.addGrievance = async (req, res) => {
    try {
        const { title, description, category, address } = req.body;

        const grievance = await Grievance.create({
            user: req.user._id, // Got from Protect middleware
            title,
            description,
            category,
            address
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
        const grievances = await Grievance.find({ user: req.user._id });
        res.status(200).json({ success: true, data: grievances });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ALL grievances (Admin Only)
exports.getAllGrievances = async (req, res) => {
    try {
        const grievances = await Grievance.find().populate('user', 'name number');
        res.status(200).json({ success: true, data: grievances });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update grievance status (Admin Only)
exports.updateGrievanceStatus = async (req, res) => {
    try {
        const { status } = req.body; // e.g., "Resolved"
        const grievance = await Grievance.findById(req.params.id);

        if (grievance) {
            grievance.status = status;
            const updatedGrievance = await grievance.save();
            res.json(updatedGrievance);
        } else {
            res.status(404).json({ message: "Grievance not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};