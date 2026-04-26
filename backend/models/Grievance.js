const { db } = require('../config/db');

const Grievance = {
    create: async (data) => {
        const { userId, title, description, category, address, imageUrls = [] } = data;
        const query = 'INSERT INTO grievances (userId, title, description, category, address, imageUrls) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await db.query(query, [userId, title, description, category, address, JSON.stringify(imageUrls)]);
        return {
            id: result.insertId, userId, title, description, category, address, imageUrls
        };
    },
    
    findByPk: async (id) => {
        const [rows] = await db.query('SELECT * FROM grievances WHERE id = ?', [id]);
        if (rows[0] && rows[0].history) {
            rows[0].history = typeof rows[0].history === 'string' ? JSON.parse(rows[0].history) : rows[0].history;
        }
        return rows[0];
    },

    findAllByUserId: async (userId) => {
        const query = `
            SELECT g.*, u.name as userName, u.number as userNumber 
            FROM grievances g 
            LEFT JOIN users u ON g.userId = u.id 
            WHERE g.userId = ?
        `;
        const [rows] = await db.query(query, [userId]);
        return rows.map(row => {
             return {
                 ...row,
                 User: { name: row.userName, number: row.userNumber }
             };
        });
    },

    findAllByAssignedOfficerId: async (officerId) => {
        const query = `
            SELECT g.*, u.name as userName, u.number as userNumber 
            FROM grievances g 
            LEFT JOIN users u ON g.userId = u.id 
            WHERE g.assignedOfficerId = ?
        `;
        const [rows] = await db.query(query, [officerId]);
        return rows.map(row => {
             return {
                 ...row,
                 User: { name: row.userName, number: row.userNumber }
             };
        });
    },

    findAllGlobal: async () => {
        const query = `
            SELECT g.*, u.name as userName, u.number as userNumber, 
                   off.name as officerName 
            FROM grievances g 
            LEFT JOIN users u ON g.userId = u.id
            LEFT JOIN users off ON g.assignedOfficerId = off.id
        `;
        const [rows] = await db.query(query);
        return rows.map(row => {
             return {
                 ...row,
                 User: { name: row.userName, number: row.userNumber },
                 AssignedOfficer: row.officerName ? { name: row.officerName } : null
             };
        });
    },

    updateStatus: async (id, status, historyArray) => {
        const query = 'UPDATE grievances SET status = ?, history = ? WHERE id = ?';
        await db.query(query, [status, JSON.stringify(historyArray), id]);
        
        // Return updated pseudo-object
        const updated = await Grievance.findByPk(id);
        return updated;
    },

    assignOfficer: async (id, officerId, historyArray) => {
        const query = "UPDATE grievances SET assignedOfficerId = ?, status = 'Assigned', history = ? WHERE id = ?";
        await db.query(query, [officerId, JSON.stringify(historyArray), id]);
        return await Grievance.findByPk(id);
    }
};

module.exports = Grievance;
