
const router = require('express').Router();
const { createBooking, getBookingById, listBookings } = require('../controllers/bookingController');

router.post('/', createBooking);

router.get('/', listBookings);

router.get('/:bookingId', getBookingById);

module.exports = router;

