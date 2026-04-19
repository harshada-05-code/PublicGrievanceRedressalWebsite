const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const grievanceRoutes = require('./routes/grievanceRoutes');
const { sequelize, connectDB } = require('./config/db');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/grievances', grievanceRoutes);

app.get('/', (req, res) => res.send('Server is working'));

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});