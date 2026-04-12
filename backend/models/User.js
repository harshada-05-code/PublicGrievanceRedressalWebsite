const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'citizen', enum: ['citizen', 'admin', 'department_officer'] },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
}, { timestamps: true });

// Before saving, hash the password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', userSchema);