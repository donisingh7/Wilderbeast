import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarRentalHome from "./CarRentalHome";
import ChooseCar from "./ChooseCar";
import TeslaModelPage from "./ModelPage/index.jsx";
import BookingPage from "./BookingPage/index.jsx";
import ProfilePage from "./ProfilePage/index.jsx";
import ConfirmationFinalPage from "./ConfirmationPage/index.jsx";
import ContactPage from "./ContactPage";
import AboutPage from "./AboutPage"; 
import CartPage from "./CartPage";
import BookingHistoryPage from "./BookingHistoryPage";


// 🔽 Import login and register pages
import LoginPage from "./AuthPages/LoginPage";
import RegisterPage from "./AuthPages/RegisterPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CarRentalHome />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />


  
      <Route path="/homepage" element={<CarRentalHome />} />
      <Route path="/choose-car" element={<ChooseCar />} />
      <Route path="/model" element={<TeslaModelPage />} />
      <Route path="/model/:carId" element={<TeslaModelPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/confirm" element={<ConfirmationFinalPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/booking-history" element={<BookingHistoryPage />} />


    </Routes>
  </Router>
);

export default App;
