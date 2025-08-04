// controllers/bookingController.js
const Booking = require('../models/Booking');

/**
 * POST /api/bookings
 * Creates a new booking
 */
exports.createBooking = async (req, res) => {
  try {
    const { user, car, pickupDate, dropoffDate, extras } = req.body;
    const booking = new Booking({ user, car, pickupDate, dropoffDate, extras });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error('Error in createBooking:', err);
    res.status(500).json({ message: 'Server error creating booking' });
  }
};

/**
 * GET /api/bookings/:bookingId
 * Retrieves a single booking by ID
 */
exports.getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate('user', 'name email')
      .populate('car', 'make model dailyRate')
      .populate('extras', 'name dailyPrice');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    console.error('Error in getBookingById:', err);
    res.status(500).json({ message: 'Server error fetching booking' });
  }
};

/**
 * GET /api/bookings?user=<userId>
 * Lists bookings, optionally filtered by user
 */

exports.listBookings = async (req, res) => {
  console.log('🔍 listBookings called, query:', req.query);

  try {
    const filter = {};
    if (req.query.user) {
      filter.user = req.query.user;
    }
    console.log('🔍 Using filter:', filter);

    // Make sure Booking.find actually exists
    console.log('🔧 Booking.find is', typeof Booking.find);

    const bookings = await Booking
      .find(filter)
      .sort('-createdAt')
      .populate('car', 'make model dailyRate')
      .populate('extras', 'name dailyPrice')
      .exec();

    console.log('✅ Found bookings:', bookings);
    return res.json(bookings);

  } catch (err) {
    console.error('🔥 listBookings error:', err.stack);
    return res
      .status(500)
      .json({
        message: 'Server error fetching bookings',
        error: err.message   // include the real error message in the JSON
      });
  }
};
