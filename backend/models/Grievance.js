const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Roads', 'Water', 'Electricity', 'Waste', 'Other'],
  },
  status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Resolved'] },
  address: { type: String, required: true },
},
{ timestamps: true }
);

module.exports=mongoose.model('Grievance', grievanceSchema);