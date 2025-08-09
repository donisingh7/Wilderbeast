const express    = require('express');
const cors       = require('cors');
require('dotenv').config();
const connectDB  = require('./config/db');

const carRoutes  = require('./routes/cars');
const bookingRoutes = require('./routes/bookings');
const extrasRoutes = require('./routes/extras');
const accessoriesRoutes = require('./routes/accessories');
const contactRoutes = require('./routes/contact');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();


app.use('/api/cars', carRoutes);
app.use('/api/extras', extrasRoutes);
app.use('/api/accessories', accessoriesRoutes);
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/contact', contactRoutes);
app.use("/api/cart", require("./routes/cartRoutes"));



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
