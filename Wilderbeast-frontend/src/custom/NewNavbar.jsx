import React from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <div className="flex items-center space-x-10">
        <div className="text-xl font-bold text-black flex items-center space-x-1">
          <div className="w-5 h-5 bg-black mt-1 mr-1" />
          <div className="text-5xl text-red-200 font-extrabold mb-1">
            DriveGo
          </div>
        </div>
        <div className="flex space-x-6 text-sm text-gray-800">
          <a href="#" className="text-sm">
            Rent
          </a>
          <a href="#" className="text-sm">
            Sell
          </a>
          <a href="#" className="text-sm">
            Ride
          </a>
          <a href="#" className="text-sm">
            Finance
          </a>
          <a href="#" className="text-sm">
            Insurance
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-1.5 rounded-full border border-gray-300 bg-gray-100 text-sm focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>

        <button className="border border-gray-300 px-4 py-1.5 cursor-pointer rounded text-sm text-gray-800">
          Log in
        </button>

        <Link to="/profile">
          <img
            src="https://randomuser.me/api/portraits/women/79.jpg"
            alt="avatar"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
