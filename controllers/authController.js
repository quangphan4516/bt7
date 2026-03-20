const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const privateKey = fs.readFileSync(path.join(__dirname, '../keys', 'private.pem'), 'utf8');

exports.login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Username and password are required'
      });
    }

    const db = require('../models/db');
    const user = db.users.find(u => u.username === username && u.password === password && !u.isDeleted);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials or account is disabled/deleted'
      });
    }

    // Update login count
    User.update(user._id, { loginCount: user.loginCount + 1 });

    // Generate JWT token with RS256
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      privateKey,
      { algorithm: 'RS256', expiresIn: '2h' }
    );

    res.json({
      status: 'success',
      data: {
        token: token,
        expiresIn: '2h',
        user: {
          id: user._id,
          username: user.username,
          fullName: user.fullName,
          avatarUrl: user.avatarUrl,
          role: user.role
        }
      },
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getMe = (req, res) => {
  try {
    const user = User.getById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Don't send password back
    const { password, ...userWithoutPassword } = user;

    res.json({
      status: 'success',
      data: userWithoutPassword,
      message: 'Get profile successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.changePassword = (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id; // From verifyToken middleware

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Old password and new password are required'
      });
    }

    // Validation basic (require min length 6 chars)
    if (newPassword.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'New password must be at least 6 characters long'
      });
    }

    const updatedUser = User.changePassword(userId, oldPassword, newPassword);

    if (updatedUser.error) {
      return res.status(400).json({
        status: 'error',
        message: updatedUser.error
      });
    }

    res.json({
      status: 'success',
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
