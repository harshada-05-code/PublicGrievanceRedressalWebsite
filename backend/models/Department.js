const { db } = require('../config/db');

const Department = {
    findAll: async () => {
        const [rows] = await db.query('SELECT * FROM departments');
        return rows;
    },
    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM departments WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { name, description } = data;
        const [result] = await db.query('INSERT INTO departments (name, description) VALUES (?, ?)', [name, description]);
        return { id: result.insertId, name, description };
    }
};

module.exports = Department;
