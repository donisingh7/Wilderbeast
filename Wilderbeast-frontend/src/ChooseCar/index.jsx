import React from 'react'
import Navbar from '../custom/Navbar';
import HeroSection from './HeroSection';
import VehicleListing from './VehiclesListing';

const ChooseCar = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection />
      <VehicleListing />

    </div>
  );
}

export default ChooseCar;
