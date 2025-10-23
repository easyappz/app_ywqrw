const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('@src/models/User');
const { JWT_SECRET } = require('@src/constants/security');

function toUserResponse(user) {
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt
  };
}

exports.register = async (req, res) => {
  try {
    const { email, name, password } = req.body || {};

    if (!email || !name || !password) {
      return res.status(400).json({ error: 'email, name and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ email, name, passwordHash });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({ token, user: toUserResponse(user) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({ token, user: toUserResponse(user) });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
