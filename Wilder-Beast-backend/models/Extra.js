const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExtraSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dailyPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Extra', ExtraSchema);
