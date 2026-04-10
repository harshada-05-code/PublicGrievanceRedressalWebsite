const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ MONGO_URI is not defined. Add it to backend/.env with your MongoDB Atlas URI.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     // This looks into your .env file for the link
//     const conn = await mongoose.connect(process.env.MONGO_URI);
    
//     console.log(`✅ Success! MongoDB is now connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ Oh no! Connection failed: ${error.message}`);
//     process.exit(1); // Stops the server if it can't talk to the database
//   }
// };

// module.exports = connectDB;