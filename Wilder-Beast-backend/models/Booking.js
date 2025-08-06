const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  dropoffDate: {
    type: Date,
    required: true
  },
  extras: [{
    type: String
  }],
  protection: {
    type: String,
    enum: ['Basic', 'Standard', 'Premium'],
    default: 'Basic'
  },
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
