import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => (
  <section
    className="relative w-full h-[550px] bg-cover bg-center rounded-2xl overflow-hidden mt-4 mx-auto max-w-screen-xl"
    style={{
      backgroundImage: "url('/images/hero.jpg')",
    }}
  >
    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        Find Your Perfect Ride
      </h1>
      <p className="max-w-2xl mb-8 drop-shadow-md">
        Explore a wide selection of vehicles for your next adventure. Book your
        rental car today and hit the road in style.
      </p>
      <div className="bg-white rounded-xl flex items-center w-full max-w-md p-2 shadow-md">
        <Search className="w-5 h-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Enter your destination"
          className="flex-1 px-3 py-2 text-gray-800 outline-none"
        />
        <button className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all">
          Search
        </button>
      </div>
    </div>
  </section>
);

export default HeroSection;
