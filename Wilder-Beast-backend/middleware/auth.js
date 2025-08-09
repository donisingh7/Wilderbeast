// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const raw = req.header('Authorization') || '';
  const token = raw.startsWith('Bearer ') ? raw.slice(7) : raw;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Your tokens are signed as { userId: <ObjectId> }
    if (!decoded?.userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }
    req.user = { _id: decoded.userId }; // <-- controllers can now use req.user._id
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
