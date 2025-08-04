const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

const productSchema = new mongoose.Schema({
  category: String,
  item: String,
  price_inr: Number,
  image: String,
});

const Product = mongoose.model('Product', productSchema);
const data = JSON.parse(fs.readFileSync('./accessories.json', 'utf8'));

async function seedData() {
  try {
    await Product.deleteMany();
    await Product.insertMany(data);
    console.log('✅ Data seeded successfully!');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
