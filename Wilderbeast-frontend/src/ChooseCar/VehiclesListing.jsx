import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCard from './CarCard';
import SearchSidebar from './SearchSidebar';
import {
  CreditCard,
  BadgePercent,
  Car,
  CarFront,
  Bus,
} from 'lucide-react';

const VehicleListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    size: '',
    brand: '',
    priceMin: '',
    priceMax: ''
  });

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`http://localhost:5000/api/cars?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }

      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading cars...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="grid md:grid-cols-3 px-4 py-10">
        <div>
          <SearchSidebar onFilterChange={handleFilterChange} />
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
            <button 
              className={`flex items-center gap-2 border px-4 py-1 rounded text-sm ${
                filters.size === 'small' ? 'border-black bg-black text-white' : 'border-gray-200'
              }`}
              onClick={() => handleFilterChange({ size: filters.size === 'small' ? '' : 'small' })}
            >
              <Car size={16} /> Small
            </button>
            <button 
              className={`flex items-center gap-2 border px-4 py-1 rounded text-sm ${
                filters.size === 'medium' ? 'border-black bg-black text-white' : 'border-gray-200'
              }`}
              onClick={() => handleFilterChange({ size: filters.size === 'medium' ? '' : 'medium' })}
            >
              <CarFront size={16} /> Medium
            </button>
            <button 
              className={`flex items-center gap-2 border px-4 py-1 rounded text-sm ${
                filters.size === 'large' ? 'border-black bg-black text-white' : 'border-gray-200'
              }`}
              onClick={() => handleFilterChange({ size: filters.size === 'large' ? '' : 'large' })}
            >
              <Bus size={16} /> Large
            </button>
          </div>

          {cars.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No cars found matching your criteria
            </div>
          ) : (
            cars.map((car, i) => (
              <Link to={`/model/${car._id}`} key={car._id || i}>
                <CarCard 
                  title={`${car.make} ${car.model}`}
                  price={car.dailyRate}
                  image={car.images && car.images.length > 0 ? `/images/${car.images[0]}` : '/images/compact.jpg'}
                  car={car}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleListing;
