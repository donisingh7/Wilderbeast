const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make:           { type: String, required: true }, 
  model:          { type: String, required: true },  
  year:           { type: Number, required: true },  
  seats:          { type: Number, required: true },  
  transmission:   { type: String, enum: ['manual','automatic'], default: 'automatic' },
  dailyRate:      { type: Number, required: true },  
  securityDeposit:{ type: Number, default: 0 },      
  images:         { type: [String], default: [] },   
  features:       { type: [String], default: [] },   
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


module.exports = mongoose.model('Car', carSchema);
