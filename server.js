
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const config = require('./src/Config/dbConfig');
require('dotenv').config();
const auth = require('./src/Middleware/auth');

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

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    // Handle JSON parsing errors
    console.error('JSON parsing error:', err);
    res.status(400).json({ message: 'Invalid JSON data' });
  } else {
    next(err);
  }
});

// Import and use the userRoutes
const userRoutes = require('./src/Routes/userRouter');
app.use('/api', userRoutes);

// Define a route
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.post('/welcome', auth, (req, res) => {
  res.status(200).send({ message: 'Welcome'});
});

app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}`);
});
