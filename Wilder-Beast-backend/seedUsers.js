// seedUsers.js
require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('./models/User');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('🔌 Connected to MongoDB for user seeding');

  // Remove any existing users
  await User.deleteMany({});

  // Create a test user
  const user = await User.create({
    name:     'Test User',
    email:    'test@example.com',
    password: 'Test123!'   // this will be hashed by your pre-save hook
  });

  console.log(`✅ Seeded user: ${user.email} (id: ${user._id})`);
  await mongoose.disconnect();
  console.log('🔌 Disconnected');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
