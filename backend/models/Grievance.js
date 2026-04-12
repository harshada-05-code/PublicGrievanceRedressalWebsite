const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedOfficerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Roads', 'Water', 'Electricity', 'Waste', 'Other'],
  },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Assigned', 'In Progress', 'Resolved', 'Reopened'] },
  address: { type: String, required: true },
  imageUrls: [{ type: String }],
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comments: { type: String }
  },
  history: [{
    status: String,
    updatedAt: { type: Date, default: Date.now },
    remarks: String
  }],
},
{ timestamps: true }
);

module.exports=mongoose.model('Grievance', grievanceSchema);