const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Grievance = sequelize.define('Grievance', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  assignedOfficerId: { type: DataTypes.INTEGER, allowNull: true },
  departmentId: { type: DataTypes.INTEGER, allowNull: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  category: { type: DataTypes.ENUM('Roads', 'Water', 'Electricity', 'Waste', 'Other'), allowNull: false },
  status: { type: DataTypes.ENUM('Pending', 'Assigned', 'In Progress', 'Resolved', 'Reopened'), defaultValue: 'Pending' },
  address: { type: DataTypes.STRING, allowNull: false },
  imageUrls: { type: DataTypes.TEXT, allowNull: true },
  feedbackRating: { type: DataTypes.INTEGER, allowNull: true },
  feedbackComments: { type: DataTypes.TEXT, allowNull: true },
  history: { type: DataTypes.JSON, allowNull: true },
}, {
  timestamps: true,
  tableName: 'grievances',
});

User.hasMany(Grievance, { foreignKey: 'userId' });
Grievance.belongsTo(User, { foreignKey: 'userId' });

module.exports = Grievance;