const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('@src/constants/security');

module.exports = function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Authorization header is missing or malformed' });
    }
    const token = parts[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
