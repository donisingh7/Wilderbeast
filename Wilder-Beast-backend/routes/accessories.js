const express = require('express');
const router = express.Router();

const {
  listAccessories,
  getAccessoriesByCategory,
  getAccessoryById
} = require('../controllers/accessoryController');

router.get('/', listAccessories);

router.get('/category/:category', getAccessoriesByCategory);

router.get('/:id', getAccessoryById);

module.exports = router; 