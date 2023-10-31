const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const auth = require('../Middleware/auth');

router.post('/signup',userController.signup);
router.put('/editUser/:id', userController.editUser);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getOneUser/:id', userController.getOneUser);
router.delete('/deleteUser/:id', userController.deleteUser);
router.post('/login', userController.login);

module.exports = router;
