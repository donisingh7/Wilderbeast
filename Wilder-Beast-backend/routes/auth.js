// routes/auth.js
const router = require('express').Router();
const { register, login, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user (protected route)
router.get('/me', auth, getMe);

module.exports = router;
