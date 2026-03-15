const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        
        if (!uri) {
            console.error("❌ CRITICAL: MONGO_URI is undefined. Check your .env file name and location!");
            // In dev, don't crash the whole server – just log the error.
            return;
        }

        const conn = await mongoose.connect(uri);
        console.log(`🚀 Success! Connected to Cloud: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Connection Error (MongoDB): ${error.message}`);
        // Do NOT exit(1) here so that the Express server can still run
        // even when MongoDB is temporarily unreachable.
        // You can re-enable process.exit(1) in production if required.
    }
};

module.exports = connectDB;