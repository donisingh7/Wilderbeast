
const Car = require('../models/Car');


exports.listCars = async (req, res) => {
  try {
    const { city, size, brand, priceMin, priceMax } = req.query;
    const filter = {};

    if (city) {
      filter['location.city'] = new RegExp(city, 'i');
    }


    if (size) {
      if (size === 'small')      filter.seats = 2;
      else if (size === 'medium') filter.seats = 4;
      else if (size === 'large')  filter.seats = { $gte: 6 };
    }

    if (brand) {
      filter.make = new RegExp(brand, 'i');
    }

    if (priceMin || priceMax) {
      filter.dailyRate = {};
      if (priceMin) filter.dailyRate.$gte = Number(priceMin);
      if (priceMax) filter.dailyRate.$lte = Number(priceMax);
    }

    const cars = await Car.find(filter).limit(100);
    res.json(cars);

  } catch (err) {
    console.error('Error in listCars:', err);
    res.status(500).json({ message: 'Server error fetching cars' });
  }
};


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
