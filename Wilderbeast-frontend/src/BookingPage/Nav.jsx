import React from "react";
import { Link } from "react-router-dom";
import { Globe, HelpCircle } from "lucide-react";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <div className="flex items-center space-x-10">
        <div className="text-xl font-bold text-black flex items-center space-x-1">
          <div className="w-5 h-5 bg-black mr-1" />
          <div className="text-3xl text-red-200 font-extrabold mb-1">
            DriveGo
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6 text-sm text-gray-700">
        <a href="#" className="hover:underline">Rent a car</a>
        <a href="#" className="hover:underline">My bookings</a>
        <a href="#" className="hover:underline flex items-center space-x-1">
          <HelpCircle size={16} />
          <span>Help</span>
        </a>
        <button className="flex items-center space-x-1">
          <Globe size={16} />
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

export default Nav;
