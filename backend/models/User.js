const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true }, // unique prevents duplicate registrations
    password: { type: String, required: true },
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

module.exports = mongoose.model('User', userSchema);
