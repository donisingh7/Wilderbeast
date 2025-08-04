require('dotenv').config();
const mongoose = require('mongoose');
const Car      = require('./models/Car');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('🔌 Connected for seeding');

  await Car.deleteMany({});

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
      images: ["SUV.jpg"],
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
    },
    {
      make: "Honda",
      model: "City",
      year: 2023,
      seats: 5,
      transmission: "automatic",
      dailyRate: 2500,
      securityDeposit: 8000,
      images: ["sedan.jpg"],
      features: ["AC","GPS","Bluetooth","Fuel Efficient"],
      location: {
        city: "Chennai",
        address: "T Nagar",
        coords: { lat: 13.082, lng: 80.270 }
      }
    },
    {
      make: "Maruti",
      model: "Swift",
      year: 2022,
      seats: 5,
      transmission: "manual",
      dailyRate: 1800,
      securityDeposit: 6000,
      images: ["economy.jpg"],
      features: ["AC","Bluetooth","Fuel Efficient"],
      location: {
        city: "Pune",
        address: "Koregaon Park",
        coords: { lat: 18.520, lng: 73.856 }
      }
    },
    {
      make: "Hyundai",
      model: "Creta",
      year: 2023,
      seats: 5,
      transmission: "automatic",
      dailyRate: 3500,
      securityDeposit: 11000,
      images: ["standard.jpg"],
      features: ["AC","GPS","Bluetooth","Sunroof"],
      location: {
        city: "Hyderabad",
        address: "Banjara Hills",
        coords: { lat: 17.406, lng: 78.470 }
      }
    },
    {
      make: "Mercedes",
      model: "E-Class",
      year: 2022,
      seats: 5,
      transmission: "automatic",
      dailyRate: 6000,
      securityDeposit: 18000,
      images: ["full-size.jpg"],
      features: ["AC","GPS","Bluetooth","Premium Sound","Leather Seats"],
      location: {
        city: "Kolkata",
        address: "Park Street",
        coords: { lat: 22.572, lng: 88.363 }
      }
    },
    {
      make: "Audi",
      model: "A4",
      year: 2023,
      seats: 5,
      transmission: "automatic",
      dailyRate: 4500,
      securityDeposit: 14000,
      images: ["sedan.jpg"],
      features: ["AC","GPS","Bluetooth","Premium Interior"],
      location: {
        city: "Ahmedabad",
        address: "Satellite",
        coords: { lat: 23.022, lng: 72.571 }
      }
    },
    {
      make: "Mahindra",
      model: "XUV500",
      year: 2022,
      seats: 7,
      transmission: "automatic",
      dailyRate: 3200,
      securityDeposit: 10000,
      images: ["SUV.jpg"],
      features: ["AC","GPS","Bluetooth","7 Seater"],
      location: {
        city: "Jaipur",
        address: "C Scheme",
        coords: { lat: 26.912, lng: 75.787 }
      }
    },
    {
      make: "Ford",
      model: "EcoSport",
      year: 2023,
      seats: 5,
      transmission: "automatic",
      dailyRate: 2800,
      securityDeposit: 9000,
      images: ["compact.jpg"],
      features: ["AC","GPS","Bluetooth","Compact SUV"],
      location: {
        city: "Lucknow",
        address: "Gomti Nagar",
        coords: { lat: 26.846, lng: 80.946 }
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
