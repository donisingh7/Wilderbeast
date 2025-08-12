const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const userId = (req.user && (req.user._id || req.user.userId));

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: missing user on request' });
    }

    const {
      car,
      pickupDate,
      dropoffDate,
      totalAmount,
    } = req.body;

    if (!car || !pickupDate || !dropoffDate || typeof totalAmount !== 'number') {
      return res.status(400).json({ message: 'Missing or invalid booking data' });
    }

    const booking = new Booking({
      user: userId,
      car,
      pickupDate,
      dropoffDate,
      totalAmount,
    });

    await booking.save();
    const populated = await Booking.findById(booking._id)
      .populate('car', 'make model dailyRate');

    return res.status(201).json(populated);
  } catch (err) {
    console.error('Error in createBooking:', err);
    return res.status(500).json({ message: 'Server error creating booking', error: err.message });
  }
};

exports.getBookingHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('car', 'make model dailyRate');

    if (!bookings) {
      return res.json([]);
    }

    return res.status(200).json(bookings);
  } catch (err) {
    console.error('Error in getBookingHistory:', err);
    return res.status(500).json({ message: 'Server error fetching booking history' });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId)
      .populate('user', 'name email')
      .populate('car', 'make model dailyRate');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.json(booking);
  } catch (err) {
    console.error('Error in getBookingById:', err);
    return res.status(500).json({ message: 'Server error fetching booking', error: err.message });
  }
};

exports.listBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.user) filter.user = req.query.user;

    const bookings = await Booking.find(filter)
      .sort('-createdAt')
      .populate('car', 'make model dailyRate');

    return res.json(bookings);
  } catch (err) {
    console.error('Error in listBookings:', err);
    return res.status(500).json({ message: 'Server error fetching bookings', error: err.message });
  }
};
