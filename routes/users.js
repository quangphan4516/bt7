var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Auth routes
router.post('/register', userController.createUser);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getMe);
router.post('/change-password', verifyToken, authController.changePassword);

// GET all users
router.get('/', userController.getAllUsers);

// CREATE new user
router.post('/', userController.createUser);

// ENABLE user (status = true) - must be before /:id routes
router.post('/enable', userController.enableUser);

// DISABLE user (status = false) - must be before /:id routes
router.post('/disable', userController.disableUser);

// GET user by id
router.get('/:id', userController.getUserById);

// UPDATE user
router.put('/:id', userController.updateUser);

// DELETE user (soft delete)
router.delete('/:id', userController.deleteUser);

module.exports = router;
