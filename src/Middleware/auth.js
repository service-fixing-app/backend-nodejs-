const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
require ('dotenv').config();

verifyToken = (req, res, next) => {
  let token = req.headers["token"] || req.body.token || req.query.token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
module.exports = verifyToken;