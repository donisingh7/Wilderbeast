const router   = require('express').Router();
const { listCars, getCarById } = require('../controllers/carController');

router.get('/', listCars);

router.get('/:carId', getCarById);

module.exports = router;
