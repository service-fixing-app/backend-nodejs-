
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const dotenv = require('dotenv');
const config = require('./src/Config/dbConfig');

// Create a MySQL connection using config.database settings
const connection = mysql.createConnection(config.database);

// Test the MySQL connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL Database:', err);
    return;
  }
  console.log('Connected to MySQL Database!');
});

// Middleware
app.use(cors());
app.use(express.json());

// Import and use the userRoutes
const userRoutes = require('./src/Routes/userRouter');
app.use('/api', userRoutes);

// Define a route
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
