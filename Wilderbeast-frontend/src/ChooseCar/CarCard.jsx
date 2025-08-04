import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ title, price, image, car }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to booking page with car data
    navigate('/booking', { state: { car } });
  };

  // Get the first image from the images array or use fallback
  const getCarImage = () => {
    if (car?.images && car.images.length > 0) {
      // Use public folder path
      return `/images/${car.images[0]}`;
    }
    if (image) {
      return image;
    }
    // Return appropriate fallback image based on car make
    const make = car?.make || 'compact';
    switch (make.toLowerCase()) {
      case 'toyota':
        return '/images/compact.jpg';
      case 'bmw':
        return '/images/bmw.jpg';
      case 'tesla':
        return '/images/tesla.jpg';
      default:
        return '/images/compact.jpg';
    }
  };

  return (
    <div 
      className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Left: Text Content */}
      <div className="flex flex-col">
        <p className="text-xs text-gray-500 mb-1">
          {car?.seats || 5} seats | {car?.transmission || 'Auto'}
        </p>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">
          {car?.make} {car?.model} or similar
        </p>
        <span className="mt-3 inline-block bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-md">
          ${price}/day
        </span>
      </div>

      {/* Right: Image */}
      <div className="w-36 h-24 rounded-md overflow-hidden ml-4 flex-shrink-0">
        <img
          src={getCarImage()}
          alt={`${title} car`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CarCard;
