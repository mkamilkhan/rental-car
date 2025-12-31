const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0
  },
  price30min: {
    type: Number,
    min: 0
  },
  price60min: {
    type: Number,
    min: 0
  },
  currency: {
    type: String,
    default: 'AED'
  },
  seats: {
    type: Number,
    required: true,
    min: 1
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    required: true
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300?text=Car+Image'
  },
  available: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);

