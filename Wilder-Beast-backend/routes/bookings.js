// routes/bookings.js
const router = require('express').Router();
const { createBooking, getBookingById, listBookings } = require('../controllers/bookingController');

// Create a new booking
router.post('/', createBooking);

// List bookings (optional ?user=)
router.get('/', listBookings);

// Get single booking
router.get('/:bookingId', getBookingById);

module.exports = router;

