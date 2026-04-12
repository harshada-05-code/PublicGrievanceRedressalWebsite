const Grievance = require('../models/Grievance');
const User = require('../models/User');

// @desc    Create new grievance
// @route   POST /api/grievances
// Note: image upload logic (multer) will be integrated here later.
exports.addGrievance = async (req, res) => {
    try {
        const { title, description, category, address } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Process uploaded images into local URLs
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        }

        const grievance = new Grievance({
            user: userId,
            title,
            description,
            category,
            address,
            imageUrls,
        });

        const createdGrievance = await grievance.save();
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

        const grievances = await Grievance.find({ user: userId })
            .populate('departmentId', 'name')
            .populate('assignedOfficerId', 'name');
            
        res.status(200).json({ success: true, data: grievances });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ALL grievances (Admin / Global)
exports.getAllGrievances = async (req, res) => {
    try {
        const grievances = await Grievance.find({})
            .populate('user', 'name number')
            .populate('departmentId', 'name')
            .populate('assignedOfficerId', 'name');

        res.status(200).json({ success: true, data: grievances });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update grievance status (Admin / Officer Only)
exports.updateGrievanceStatus = async (req, res) => {
    try {
        const { status, remarks } = req.body;
        const grievance = await Grievance.findById(req.params.id);

        if (grievance) {
            grievance.status = status;
            
            // Push history log
            if (remarks || status) {
                grievance.history.push({
                    status: status,
                    remarks: remarks || `Status updated to ${status}`
                });
            }

            const updatedGrievance = await grievance.save();
            res.json({ success: true, data: updatedGrievance });
        } else {
            res.status(404).json({ message: 'Grievance not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
