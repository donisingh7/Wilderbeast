import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarRentalHome from "./CarRentalHome";
import ChooseCar from "./ChooseCar";
import TeslaModelPage from ".";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CarRentalHome />} />
      <Route path="/homepage" element={<CarRentalHome />} />
      <Route path="/choose-car" element={<ChooseCar />} />
      <Route path="/model" element={<TeslaModelPage />} />
    </Routes>
  </Router>
);

export default App;
