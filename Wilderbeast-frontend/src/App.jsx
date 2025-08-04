import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarRentalHome from "./CarRentalHome";
import ChooseCar from "./ChooseCar";
import TeslaModelPage from "./ModelPage/index.jsx";
import BookingPage from "./BookingPage/index.jsx";
import ProfilePage from "./ProfilePage/index.jsx";
import ConfirmationFinalPage from "./ConfirmationPage/index.jsx";
import ContactPage from "./ContactPage";


// 🔽 Import login and register pages
import LoginPage from "./AuthPages/LoginPage";
import RegisterPage from "./AuthPages/RegisterPage";

const App = () => (
  <Router>
    <Routes>
      {/* 🔽 Auth Routes - Login as default */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 🔽 Main App Routes */}
      <Route path="/homepage" element={<CarRentalHome />} />
      <Route path="/choose-car" element={<ChooseCar />} />
      <Route path="/model" element={<TeslaModelPage />} />
      <Route path="/model/:carId" element={<TeslaModelPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/confirm" element={<ConfirmationFinalPage />} />
      <Route path="/contact" element={<ContactPage />} />

    </Routes>
  </Router>
);

export default App;
