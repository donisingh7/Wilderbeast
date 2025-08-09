
require('dotenv').config();
const mongoose = require('mongoose');
const Car = require('./models/Car');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('🔌 Connected for seeding');

  // Clear existing cars
  await Car.deleteMany({});

  const cars = [
    {
      make: 'Hyundai',
      model: 'Verna',
      year: 2023,
      seats: 5,
      transmission: 'automatic',
      color: 'Black', 
      dailyRate: 3200,
      securityDeposit: 5000, 
      images: ['verna.jpg'],
      features: ['Bluetooth', 'AC', 'Rear Camera'],
      location: {
        city: 'Jaipur',
        address: 'Civil Lines, Jaipur',
        coords: { lat: 26.9124, lng: 75.7873 }
      }
    },
    {
      make: 'Hyundai',
      model: 'Venue',
      year: 2022,
      seats: 5,
      transmission: 'manual',
      color: 'White', 
      dailyRate: 3000,
      securityDeposit: 5000, 
      images: ['venue_car.jpg'],
      features: ['Bluetooth', 'AC', 'Rear Camera'],
      location: {
        city: 'Jaipur',
        address: 'Civil Lines, Jaipur',
        coords: { lat: 26.9124, lng: 75.7873 }
      }
    },
    {
      make: 'Maruti',
      model: 'Swift Dzire',
      year: 2021,
      seats: 5,
      transmission: 'manual',
      color: 'Blue', 
      dailyRate: 2500,
      securityDeposit: 7000,
      images: ['swift_dzire.jpg'],
      features: ['Bluetooth', 'AC', 'Fuel Efficient'],
      location: {
        city: 'Jaipur',
        address: 'Malviya Nagar, Jaipur',
        coords: { lat: 26.9124, lng: 75.7873 }
      }
    },
    {
      make: 'Honda',
      model: 'City',
      year: 2023,
      seats: 5,
      transmission: 'automatic',
      color: 'Silver', 
      dailyRate: 2800,
      securityDeposit: 6000,
      images: ['honda_city.jpg'],
      features: ['Bluetooth', 'Rear Camera', 'Fuel Efficient'],
      location: {
        city: 'Jaipur',
        address: 'C Scheme, Jaipur',
        coords: { lat: 26.9124, lng: 75.7873 }
      }
    },
    {
      make: 'Honda',
      model: 'Amaze',
      year: 2022,
      seats: 5,
      transmission: 'manual',
      color: 'Red', 
      dailyRate: 2400,
      securityDeposit: 5000,
      images: ['honda_amaze.jpg'],
      features: ['Bluetooth', 'AC', 'Economical'],
      location: {
        city: 'Jaipur',
        address: 'Vaishali Nagar, Jaipur',
        coords: { lat: 26.9124, lng: 75.7873 }
      }
    }
  ];

  await Car.insertMany(cars);
  console.log(`✅ Seeded ${cars.length} cars`);
  mongoose.connection.close();
}

seed().catch(err => {
  console.error('Seeding error:', err);
  mongoose.connection.close();
  process.exit(1);
});
