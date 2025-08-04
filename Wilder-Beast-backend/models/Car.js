// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make:           { type: String, required: true },  // e.g. "Toyota"
  model:          { type: String, required: true },  // e.g. "Innova"
  year:           { type: Number, required: true },  // e.g. 2023
  seats:          { type: Number, required: true },  // e.g. 4 or 6
  transmission:   { type: String, enum: ['manual','automatic'], default: 'automatic' },
  dailyRate:      { type: Number, required: true },  // rental price per day
  securityDeposit:{ type: Number, default: 0 },      // deposit amount
  images:         { type: [String], default: [] },   // array of image URLs
  features:       { type: [String], default: [] },   // e.g. ["GPS","AC","Bluetooth"]
  location: {
    city:    { type: String, required: true },
    address: { type: String, required: true },
    coords:  {
      lat:  { type: Number },
      lng:  { type: Number }
    }
  },
  createdAt:      { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model('Car', carSchema);
