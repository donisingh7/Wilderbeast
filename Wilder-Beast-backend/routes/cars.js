// routes/cars.js
const router   = require('express').Router();
const { listCars, getCarById } = require('../controllers/carController');

// GET /api/cars        → listCars
router.get('/', listCars);

// GET /api/cars/:carId → getCarById
router.get('/:carId', getCarById);

module.exports = router;
