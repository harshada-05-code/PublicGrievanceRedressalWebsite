const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/grievances", grievanceRoutes);

console.log("MONGO_URI:", process.env.MONGO_URI);

const dbURI = process.env.MONGO_URI;

if (!dbURI) {
    console.log("❌ ERROR: Could not find MONGO_URI. Check your .env file!");
} else {
    mongoose.connect(dbURI)
        .then(() => console.log("✅ BOOM! Cloud MongoDB Connected!"))
        .catch((err) => console.log("❌ Connection Error: ", err.message));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
