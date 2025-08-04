// seedBookings.js
require('dotenv').config();
const mongoose = require('mongoose');

const User    = require('./models/User'); 
const Car     = require('./models/Car');
const Extra   = require('./models/Extra');
const Booking = require('./models/Booking');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('🔌 Connected to MongoDB for booking seeding');

  await Booking.deleteMany({});

  const user   = await User.findOne();
  const cars   = await Car.find().limit(2);
  const extras = await Extra.find();

  if (!user || cars.length < 2) {
    console.error('❌ Make sure you have at least 1 user and 2 cars seeded first.');
    process.exit(1);
  }

  const now      = new Date();
  const tomorrow = new Date(now.getTime() + 24*60*60*1000);
  const dayAfter = new Date(now.getTime() + 48*60*60*1000);

  const bookings = [
    {
      user:           user._id,
      car:            cars[0]._id,
      // <-- match your schema field names
      pickupDate:     now,
      dropoffDate:    tomorrow,
      extras:         extras.slice(0,1).map(e => e._id),
      protectionPlan: 'standard',
      totalPrice:     (cars[0].dailyRate + (extras[0]?.dailyPrice||0)) * 1
    },
    {
      user:           user._id,
      car:            cars[1]._id,
      pickupDate:     tomorrow,
      dropoffDate:    dayAfter,
      extras:         extras.slice(1,3).map(e => e._id),
      protectionPlan: 'premium',
      totalPrice:     (cars[1].dailyRate + (extras[1]?.dailyPrice||0) + (extras[2]?.dailyPrice||0)) * 1
    }
  ];

  const inserted = await Booking.insertMany(bookings);
  console.log(`✅ Seeded ${inserted.length} bookings`);
  await mongoose.disconnect();
  console.log('🔌 Disconnected');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
