
const router = require('express').Router();
const { 
  createBooking, 
  getBookingHistory, 
  getBookingById 
} = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post('/', auth, createBooking);

router.get('/', auth, getBookingHistory);

router.get('/:bookingId', auth, getBookingById);

module.exports = router;
