const router = require('express').Router();
const {
  listUsers,
  getUserById,
  createUser,     // ✅ NEW
  updateUser,
  deleteUser
} = require('../controllers/userController');

router.post('/', createUser); // ✅ NEW

router.get('/', listUsers);

router.get('/:userId', getUserById);

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);

module.exports = router;
