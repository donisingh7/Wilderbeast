import React from 'react';
import CarCard from './CarCard';
import SearchSidebar from './SearchSidebar';
import {
  CreditCard,
  BadgePercent,
  Car,
  CarFront,
  Bus,
} from 'lucide-react';

const cars = [
  { title: "Compact", price: 58, image: "src/assets/images/compact.jpg" },
  { title: "Intermediate", price: 61, image: "src/assets/images/intermediate.jpg" },
  { title: "Standard", price: 64, image: "src/assets/images/standard.jpg" },
  { title: "Fullsize", price: 65, image: "src/assets/images/full-size.jpg" },
  { title: "Economy", price: 67, image: "src/assets/images/economy.jpg" },
];

const VehicleListing = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="grid md:grid-cols-3 px-4 py-10 ">
      <div>
        <SearchSidebar />
      </div>

      <div className="md:col-span-2 mr-20">
        <h2 className="text-2xl font-semibold mb-4">Choose a car</h2>

        <div className="flex gap-2 flex-wrap mb-6">
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-1 rounded text-sm">
            <CreditCard size={16} /> Payment options
          </button>
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-1 rounded text-sm">
            <BadgePercent size={16} /> Brands
          </button>
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-1 rounded text-sm">
            <Car size={16} /> Small
          </button>
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-1 rounded text-sm">
            <CarFront size={16} /> Medium
          </button>
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-1 rounded text-sm">
            <Bus size={16} /> Large
          </button>
        </div>

        {cars.map((car, i) => (
          <CarCard key={i} {...car} />
        ))}
      </div>
    </div>
      </div>
  );
};

export default VehicleListing;
