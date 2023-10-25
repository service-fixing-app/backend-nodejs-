const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/signup', userController.signup);
router.put('/editUser/:id', userController.editUser);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getOneUser/:id', userController.getOneUser);

module.exports = router;
