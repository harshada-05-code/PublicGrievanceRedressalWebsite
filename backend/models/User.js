const { db } = require('../config/db');

const User = {
    findByNumber: async (number) => {
        const [rows] = await db.query('SELECT * FROM users WHERE number = ?', [number]);
        return rows[0];
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    findAll: async () => {
        const [rows] = await db.query('SELECT id, name, number, role, departmentId, createdAt FROM users');
        return rows;
    },

    create: async (data) => {
        const { name, number, password, role = 'citizen', departmentId = null } = data;
        const query = 'INSERT INTO users (name, number, password, role, departmentId) VALUES (?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [name, number, password, role, departmentId]);
        
        return {
            id: result.insertId,
            name,
            number,
            password,
            role,
            departmentId
        };
    }
};

module.exports = User;
