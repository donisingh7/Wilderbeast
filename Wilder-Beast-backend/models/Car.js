const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  seats: { type: Number, required: true },
  transmission: { type: String, required: true },
  dailyRate: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  images: [String],
  features: [String],
  color: { type: String },
  fuelType: { type: String },
  location: {
    city: String,
    address: String,
    coords: { lat: Number, lng: Number }
  }
});

module.exports = mongoose.model('Car', carSchema);
