const Car = require('../models/Car');
const Booking = require('../models/Booking'); 

exports.listCars = async (req, res) => {
  try {
    
    const { city, size, brand, priceMin, priceMax, location, pickupDate, dropoffDate } = req.query;
    const filter = {};

    const locationQuery = city || location;
    if (locationQuery) {
      filter['location.city'] = new RegExp(locationQuery, 'i');
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

    let availableCars = await Car.find(filter).limit(100);

    if (pickupDate && dropoffDate) {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);

      const conflictingBookings = await Booking.find({
        $or: [
          { pickupDate: { $lt: end }, dropoffDate: { $gt: start } }
        ]
      });
      
      const bookedCarIds = conflictingBookings.map(booking => booking.car.toString());
      
      availableCars = availableCars.filter(car => !bookedCarIds.includes(car._id.toString()));
    }

    res.json(availableCars);

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
