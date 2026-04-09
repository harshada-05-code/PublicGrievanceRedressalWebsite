const express=require("express");
const dotenv=require('dotenv');
const connectDB=require('./config/db');

dotenv.config();
connectDB();


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// const root=ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/",(req,res)=>{
  res.send("Server is working");
});

app.post("./api/complaints",(req,res)=>{
  res.send("Complint received");
})

