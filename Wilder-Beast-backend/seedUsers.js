require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('./models/User');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('🔌 Connected to MongoDB for user seeding');

  await User.deleteMany({});

  const user = await User.create({
    name:     'Test User',
    email:    'test@example.com',
    password: 'Test123!'   
  });

  console.log(`✅ Seeded user: ${user.email} (id: ${user._id})`);
  await mongoose.disconnect();
  console.log('🔌 Disconnected');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
