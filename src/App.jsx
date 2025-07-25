import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarRentalHome from "./CarRentalHome";
import ChooseCar from "./ChooseCar";



const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<CarRentalHome />} />
      <Route path="/homepage" element={<CarRentalHome />} />
<Route path="/choose-car" element={<ChooseCar />} />
    </Routes>
  </Router>
);

export default App;
