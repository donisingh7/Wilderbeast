// seedCars.js
require('dotenv').config();
const mongoose = require('mongoose');
const Car      = require('./models/Car');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('🔌 Connected for seeding');

  // Clear old entries
  await Car.deleteMany({});

  // Sample payloads
  const cars = [
    {
      make: "Toyota",
      model: "Innova",
      year: 2023,
      seats: 6,
      transmission: "automatic",
      dailyRate: 3000,
      securityDeposit: 10000,
      images: ["compact.jpg"],
      features: ["AC","GPS","Bluetooth"],
      location: {
        city: "Delhi",
        address: "Connaught Place",
        coords: { lat: 28.634, lng: 77.219 }
      }
    },
    {
      make: "BMW",
      model: "X5",
      year: 2022,
      seats: 5,
      transmission: "automatic",
      dailyRate: 5000,
      securityDeposit: 15000,
      images: ["bmw.jpg"],
      features: ["AC","GPS","Bluetooth","Premium Sound"],
      location: {
        city: "Mumbai",
        address: "Bandra West",
        coords: { lat: 19.054, lng: 72.840 }
      }
    },
    {
      make: "Tesla",
      model: "Model 3",
      year: 2023,
      seats: 5,
      transmission: "automatic",
      dailyRate: 4000,
      securityDeposit: 12000,
      images: ["tesla.jpg"],
      features: ["AC","GPS","Bluetooth","Autopilot"],
      location: {
        city: "Bangalore",
        address: "Koramangala",
        coords: { lat: 12.971, lng: 77.594 }
      }
    }
  ];

  await Car.insertMany(cars);
  console.log(`✅ Seeded ${cars.length} cars`);
  await mongoose.connection.close();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
