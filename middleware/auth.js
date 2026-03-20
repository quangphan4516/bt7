const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const publicKey = fs.readFileSync(path.join(__dirname, '../keys', 'public.pem'), 'utf8');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(403).json({
      status: 'error',
      message: 'A token is required for authentication'
    });
  }

  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid or expired Token'
    });
  }
  return next();
};

module.exports = { verifyToken };
