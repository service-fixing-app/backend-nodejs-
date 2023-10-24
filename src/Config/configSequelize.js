const { Sequelize } = require('sequelize');
const config = require('./dbConfig'); // Import your configuration file

const sequelize = new Sequelize({
  dialect: 'mysql', // Choose your database dialect
  host: config.database.host, // Use the host from your configuration
  username: config.database.user, // Use the user from your configuration
  password: config.database.password, // Use the password from your configuration
  database: config.database.db_name, // Use the database name from your configuration
});

// Export the initialized sequelize object
module.exports = sequelize;