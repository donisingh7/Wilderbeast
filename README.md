# Wilder Beast - Car Rental Application

A full-stack car rental application built with React (frontend) and Node.js/Express (backend).

## 🚀 Features

- **Car Rental Management**: Browse and book cars
- **User Authentication**: Secure login and registration
- **Booking System**: Complete booking workflow
- **Review System**: User reviews and ratings
- **Admin Panel**: Manage cars, users, and bookings
- **Responsive Design**: Mobile-friendly interface

## 📁 Project Structure

```
Wilder_Beast/
├── Wilder-Beast-backend/     # Node.js/Express API
│   ├── config/              # Database configuration
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Authentication middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   └── server.js           # Main server file
└── Wilderbeast-frontend/    # React application
    ├── src/
    │   ├── CarRentalHome/  # Homepage components
    │   ├── ChooseCar/      # Car selection components
    │   ├── BookingPage/    # Booking components
    │   ├── ProfilePage/    # User profile components
    │   └── custom/         # Shared components
    └── public/             # Static assets
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Wilder_Beast
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Setup**
   ```bash
   # Backend environment variables
   cd Wilder-Beast-backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. **Start the application**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:backend  # Backend only (port 5000)
   npm run dev:frontend # Frontend only (port 5173)
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Add new car (admin)
- `PUT /api/cars/:id` - Update car (admin)
- `DELETE /api/cars/:id` - Delete car (admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Reviews
- `GET /api/reviews` - Get reviews
- `POST /api/reviews` - Add review

## 🔧 Development

### Backend Development
```bash
cd Wilder-Beast-backend
npm run dev  # Start with nodemon
```

### Frontend Development
```bash
cd Wilderbeast-frontend
npm run dev  # Start Vite dev server
```

### Database Seeding
```bash
cd Wilder-Beast-backend
node seed.js      # Seed all data
node seedUsers.js # Seed users only
node seedCars.js  # Seed cars only
```

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/wilder-beast
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- Backend Development
- Frontend Development
- UI/UX Design

---

**Wilder Beast** - Making car rental simple and efficient! 🚗✨ 