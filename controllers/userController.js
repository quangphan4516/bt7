const User = require('../models/User');

// GET all users
exports.getAllUsers = (req, res) => {
  try {
    const users = User.getAll();
    res.json({
      status: 'success',
      data: users,
      message: 'Get all users successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// GET user by id
exports.getUserById = (req, res) => {
  try {
    const { id } = req.params;
    const user = User.getById(parseInt(id));
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      data: user,
      message: 'Get user successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// CREATE new user
exports.createUser = (req, res) => {
  try {
    const { username, password, email, fullName, avatarUrl, role, status } = req.body;

    // Validation
    if (!username || !password || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Username, password and email are required'
      });
    }

    const newUser = User.create({
      username,
      password,
      email,
      fullName,
      avatarUrl,
      role,
      status
    });

    if (newUser.error) {
      return res.status(400).json({
        status: 'error',
        message: newUser.error
      });
    }

    res.status(201).json({
      status: 'success',
      data: newUser,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// UPDATE user
exports.updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = User.update(parseInt(id), updateData);

    if (!updatedUser) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      data: updatedUser,
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// DELETE user (soft delete)
exports.deleteUser = (req, res) => {
  try {
    const { id } = req.params;

    const deleted = User.delete(parseInt(id));

    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// POST enable user (status = true)
exports.enableUser = (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Username and email are required'
      });
    }

    const user = User.enable(username, email);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found or invalid credentials'
      });
    }

    res.json({
      status: 'success',
      data: user,
      message: 'User enabled successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// POST disable user (status = false)
exports.disableUser = (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Username and email are required'
      });
    }

    const user = User.disable(username, email);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found or invalid credentials'
      });
    }

    res.json({
      status: 'success',
      data: user,
      message: 'User disabled successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
