import React from 'react'
import Navbar from '../custom/Navbar';
import HeroSection from './HeroSection';
import FeaturedVehicles from './FeaturedVehicles';
import ExploreMore from './ExploreMore';
import Footer from '../custom/Footer';

const CarRentalHome = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <HeroSection />
      <FeaturedVehicles />
      <ExploreMore />
      <Footer />
    </div>
  );
}

export default CarRentalHome