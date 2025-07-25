import React from "react";

const SearchSidebar = () => {
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
            className="w-full bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none"
          />
          <select className="w-full mt-3 bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none">
            <option>Select location</option>
          </select>
        </div>

 
        <div>
          <label className="block text-lg font-semibold mb-2 text-black">
            Return
          </label>
          <p className="text-sm font-medium text-gray-700 mb-2">Three Parkside</p>
          <input
            type="text"
            placeholder="Drop-off location"
            className="w-full bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none"
          />
          <select className="w-full mt-3 bg-[#f1f3f5] text-sm px-4 py-3 rounded-md focus:outline-none">
            <option>Select location</option>
          </select>
        </div>


        <button className="w-full bg-[#1971f9] text-white text-sm font-semibold py-3 rounded-md hover:bg-blue-700">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchSidebar;
