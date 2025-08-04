// routes/extras.js
const express = require('express');
const router = express.Router();

const {
  listExtras,
  getExtraById,
  createExtra,
  updateExtra,
  deleteExtra
} = require('../controllers/extraController');


router.get('/', listExtras);


router.get('/:id', getExtraById);


router.post('/', createExtra);


// @access  Admin
router.put('/:id', updateExtra);

// @access  Admin
router.delete('/:id', deleteExtra);

module.exports = router;
