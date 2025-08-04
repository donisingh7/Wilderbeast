// server.js (excerpt)
const express    = require('express');
const cors       = require('cors');
require('dotenv').config();
const connectDB  = require('./config/db');

const carRoutes  = require('./routes/cars');
const bookingRoutes = require('./routes/bookings');
const extrasRoutes = require('./routes/extras');
// … other requires …

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// … your other app.use('/api/…') …

app.use('/api/cars', carRoutes);
app.use('/api/extras', extrasRoutes);
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reviews', require('./routes/reviews'));

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler - temporarily disabled
// app.use('/*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });



// … health-check, admin, etc …

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
