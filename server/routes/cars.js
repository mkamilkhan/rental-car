const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const Booking = require('../models/Booking');

// Get all cars (with availability check)
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, search } = req.query;
    
    let query = { available: true };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } }
      ];
    }

    let cars = await Car.find(query);

    // Filter out cars that are booked during the requested dates
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      const bookings = await Booking.find({
        status: { $in: ['pending', 'confirmed'] },
        $or: [
          { startDate: { $lte: end }, endDate: { $gte: start } }
        ]
      }).populate('car');

      const bookedCarIds = bookings.map(b => b.car._id.toString());
      cars = cars.filter(car => !bookedCarIds.includes(car._id.toString()));
    }

    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single car
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

