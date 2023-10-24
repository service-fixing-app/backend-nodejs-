require('dotenv').config(); // Load environment variables

module.exports = {
  database: {
    host: process.env.DB_HOST,
    db_name: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  server: {
    port: process.env.PORT || 3000,
  },
};

