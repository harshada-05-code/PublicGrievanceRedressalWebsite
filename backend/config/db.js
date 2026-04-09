const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
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