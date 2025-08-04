// routes/users.js
const router = require('express').Router();
const {
  listUsers,
  getUserById,
  createUser,     // ✅ NEW
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Create a user
router.post('/', createUser); // ✅ NEW

// List all users
router.get('/', listUsers);

// Get a single user
router.get('/:userId', getUserById);

// Update a user
router.put('/:userId', updateUser);

// Delete a user
router.delete('/:userId', deleteUser);

module.exports = router;
