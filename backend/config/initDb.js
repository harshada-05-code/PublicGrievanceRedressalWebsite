const { db } = require('./db');

const initDB = async () => {
    try {
        // Create Users Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                number VARCHAR(20) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('citizen', 'admin', 'department_officer') DEFAULT 'citizen',
                departmentId INT DEFAULT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create Departments Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS departments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                description TEXT DEFAULT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Create Grievances Table
        await db.query(`
            CREATE TABLE IF NOT EXISTS grievances (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userId INT NOT NULL,
                assignedOfficerId INT DEFAULT NULL,
                departmentId INT DEFAULT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                category ENUM('Roads', 'Water', 'Electricity', 'Waste', 'Other') NOT NULL,
                status ENUM('Pending', 'Assigned', 'In Progress', 'Resolved', 'Reopened') DEFAULT 'Pending',
                address VARCHAR(255) NOT NULL,
                imageUrls JSON DEFAULT NULL,
                feedbackRating INT DEFAULT NULL,
                feedbackComments TEXT DEFAULT NULL,
                history JSON DEFAULT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        console.log('✅ Database tables initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing database tables:', error.message);
        process.exit(1);
    }
};

module.exports = initDB;
