import React, { useState } from "react";

const SearchSidebar = ({ onFilterChange, currentFilters = {} }) => {
  const [filters, setFilters] = useState({
    city: currentFilters.city || '',
    brand: currentFilters.brand || '',
    priceMin: currentFilters.priceMin || '',
    priceMax: currentFilters.priceMax || ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  
  React.useEffect(() => {
    setFilters({
      city: currentFilters.city || '',
      brand: currentFilters.brand || '',
      priceMin: currentFilters.priceMin || '',
      priceMax: currentFilters.priceMax || ''
    });
  }, [currentFilters]);

  return (
    <div className="w-full max-w-sm p-6 rounded-xl bg-white shadow-md border border-gray-200">
      <div className="flex flex-col gap-6">

        <div>
          <label className="block text-lg font-semibold mb-2 text-black">
            Find rentals near
          </label>
          <input
            type="text"
            placeholder="City, airport, address or hotel"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2 text-black">
            Brand
          </label>
          <input
            type="text"
            placeholder="Car brand (e.g., BMW, Toyota)"
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="w-full bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2 text-black">
            Price Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min price"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              className="w-1/2 bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max price"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              className="w-1/2 bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none"
            />
          </div>
        </div>

        <button 
          className="w-full bg-[#1971f9] text-white text-sm font-semibold py-3 rounded-md hover:bg-blue-700"
          onClick={() => onFilterChange(filters)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchSidebar;
