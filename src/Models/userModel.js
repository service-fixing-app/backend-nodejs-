const { DataTypes } = require('sequelize');
const sequelize = require('../Config/configSequelize');
const bcrypt = require('bcrypt'); // Import the bcrypt library

const User = sequelize.define('User', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Exclude createdAt and updatedAt timestamps
});

module.exports = User;