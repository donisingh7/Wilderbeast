// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, address, dateOfBirth } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      dateOfBirth
    });

    const savedUser = await newUser.save();
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: userWithoutPassword,
      token
    });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * GET /api/auth/me
 */
exports.getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.error('Error in getMe:', err);
    res.status(500).json({ message: 'Server error fetching user data' });
  }
};
