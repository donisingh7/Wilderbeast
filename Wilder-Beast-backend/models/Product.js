const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  price_inr: {
    type: Number,
    default: null
  },
  image: {
    type: String,
    default: 'placeholder'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema); 