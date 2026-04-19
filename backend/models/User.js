const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  number: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('citizen', 'admin', 'department_officer'), defaultValue: 'citizen' },
  departmentId: { type: DataTypes.INTEGER, allowNull: true },
}, {
  timestamps: true,
  tableName: 'users',
});

module.exports = User;