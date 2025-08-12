import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import SearchSidebar from './SearchSidebar';
import {
  CreditCard,
  BadgePercent,
  Car,
  CarFront,
  Bus,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const VehicleListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 1. Filters state updated to include new search fields
  const [filters, setFilters] = useState({
    location: '',
    pickupDate: '',
    dropoffDate: '',
    size: '',
    brand: '',
    showBrands: false,
  });

  useEffect(() => {
    fetchCars();
  }, [filters]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      // 2. Send all active filters to the backend
      Object.entries(filters).forEach(([key, value]) => {
        if (value && key !== 'showBrands') {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`${API_URL}/api/cars?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch cars');
      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = newFilters => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      pickupDate: '',
      dropoffDate: '',
      size: '',
      brand: '',
      showBrands: false,
    });
  };

  if (loading) return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-lg">Loading cars...</div>
    </div>
  );

  if (error) return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-red-600">Error: {error}</div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="grid md:grid-cols-3 px-4 py-10">
        <div>
          <SearchSidebar onFilterChange={handleFilterChange} currentFilters={filters} />
        </div>

        <div className="md:col-span-2 mr-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Choose a car</h2>
            <span className="text-sm text-gray-600">
              {cars.length} car{cars.length !== 1 ? 's' : ''} found
            </span>
          </div>

          <div className="flex gap-2 flex-wrap mb-6">
            <button className="flex items-center gap-2 border border-gray-200 px-4 py-1 rounded text-sm">
              <CreditCard size={16} /> Payment options
            </button>
            <button
              className={`flex items-center gap-2 border px-4 py-1 rounded text-sm ${
                filters.showBrands ? 'border-black bg-black text-white' : 'border-gray-200'
              }`}
              onClick={() => handleFilterChange({ showBrands: !filters.showBrands })}
            >
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

          {filters.showBrands && (
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold mb-3">Select Brand</h4>
              <div className="flex flex-wrap gap-2">
                {['Toyota', 'BMW', 'Tesla', 'Honda', 'Maruti', 'Hyundai', 'Mercedes', 'Audi', 'Mahindra', 'Ford'].map(brand => (
                  <button
                    key={brand}
                    className={`px-3 py-1 rounded text-sm border ${
                      filters.brand === brand ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => handleFilterChange({ brand: filters.brand === brand ? '' : brand })}
                  >{brand}</button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Display for new filters has been added */}
          {(filters.location || filters.pickupDate || filters.size || filters.brand) && (
            <div className="mb-6 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {filters.location && <span className="px-2 py-1 bg-black text-white text-xs rounded">Location: {filters.location}</span>}
                  {filters.pickupDate && <span className="px-2 py-1 bg-black text-white text-xs rounded">From: {filters.pickupDate}</span>}
                  {filters.dropoffDate && <span className="px-2 py-1 bg-black text-white text-xs rounded">To: {filters.dropoffDate}</span>}
                  {filters.size && <span className="px-2 py-1 bg-black text-white text-xs rounded">Size: {filters.size}</span>}
                  {filters.brand && <span className="px-2 py-1 bg-black text-white text-xs rounded">Brand: {filters.brand}</span>}
                </div>
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-600 hover:text-black underline"
                >Clear All</button>
              </div>
            </div>
          )}

          {cars.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No cars found matching your criteria</div>
          ) : (
            cars.map((car, i) => (
              <CarCard
                key={car._id || i}
                title={`${car.make} ${car.model}`}
                price={car.dailyRate}
                image={car.images?.[0]}
                car={car}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleListing;
