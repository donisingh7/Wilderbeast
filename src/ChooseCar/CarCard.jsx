import React from 'react';

const CarCard = ({ title, price, image }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6 hover:shadow-lg transition-shadow duration-200">
      {/* Left: Text Content */}
      <div className="flex flex-col">
        <p className="text-xs text-gray-500 mb-1">5 seats | Auto</p>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">Nissan Versa or similar</p>
        <span className="mt-3 inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-md">
          ${price}/day
        </span>
      </div>

      {/* Right: Image */}
      <div className="w-36 h-24 rounded-md overflow-hidden ml-4 flex-shrink-0">
        <img
          src={image}
          alt={`${title} car`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CarCard;
