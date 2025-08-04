// controllers/carController.js
// controllers/carController.js
// Handles listing and retrieving individual car records

const Car = require('../models/Car');

/**
 * GET /api/cars
 * Query params:
 *   - city:      string (filters location.city, case-insensitive)
 *   - pickup:    ISO date string (optional—for availability logic)
 *   - dropoff:   ISO date string (optional—for availability logic)
 *   - size:      small|medium|large  (maps to seats: small→2, medium→4, large→6+)
 *   - brand:     string (filters make, case-insensitive)
 *   - priceMin:  number
 *   - priceMax:  number
 */
exports.listCars = async (req, res) => {
  try {
    const { city, size, brand, priceMin, priceMax } = req.query;
    const filter = {};

    // City filter
    if (city) {
      filter['location.city'] = new RegExp(city, 'i');
    }

    // Size → seats mapping
    if (size) {
      if (size === 'small')      filter.seats = 2;
      else if (size === 'medium') filter.seats = 4;
      else if (size === 'large')  filter.seats = { $gte: 6 };
    }

    // Brand filter
    if (brand) {
      filter.make = new RegExp(brand, 'i');
    }

    // Price range filter
    if (priceMin || priceMax) {
      filter.dailyRate = {};
      if (priceMin) filter.dailyRate.$gte = Number(priceMin);
      if (priceMax) filter.dailyRate.$lte = Number(priceMax);
    }

    // Fetch matching cars
    const cars = await Car.find(filter).limit(100);
    res.json(cars);

  } catch (err) {
    console.error('Error in listCars:', err);
    res.status(500).json({ message: 'Server error fetching cars' });
  }
};

/**
 * GET /api/cars/:carId
 * Returns the full car document by its ID.
 */
exports.getCarById = async (req, res) => {
  try {
    const { carId } = req.params;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: `Car with ID ${carId} not found` });
    }
    res.json(car);
  } catch (err) {
    console.error('Error in getCarById:', err);
    res.status(500).json({ message: 'Server error fetching car' });
  }
};
