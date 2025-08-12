import React, { useState, useEffect } from "react";

const SearchSidebar = ({ onFilterChange, currentFilters = {} }) => {
  const [filters, setFilters] = useState({
    location: currentFilters.location || '',
    pickupDate: currentFilters.pickupDate || '',
    dropoffDate: currentFilters.dropoffDate || ''
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  useEffect(() => {
    setFilters({
      location: currentFilters.location || '',
      pickupDate: currentFilters.pickupDate || '',
      dropoffDate: currentFilters.dropoffDate || ''
    });
  }, [currentFilters]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full max-w-sm p-6 rounded-xl bg-white shadow-md border border-gray-200">
      <div className="flex flex-col gap-6">

        <div>
          <label className="block text-lg font-semibold mb-2 text-black">
            Pickup Location
          </label>
          <input
            type="text"
            placeholder="City, airport, address or hotel"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2 text-black">
            Pickup Date
          </label>
          <input
            type="date"
            value={filters.pickupDate}
            min={today} 
            onChange={(e) => handleFilterChange('pickupDate', e.target.value)}
            className="w-full bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2 text-black">
            Drop-off Date
          </label>
          <input
            type="date"
            value={filters.dropoffDate}
            min={filters.pickupDate || today} 
            disabled={!filters.pickupDate} 
            onChange={(e) => handleFilterChange('dropoffDate', e.target.value)}
            className="w-full bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none disabled:bg-gray-200"
          />
        </div>

        <button 
          className="w-full bg-[#1971f9] text-white text-sm font-semibold py-3 rounded-md hover:bg-blue-700"
          onClick={handleSearch} 
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchSidebar;
