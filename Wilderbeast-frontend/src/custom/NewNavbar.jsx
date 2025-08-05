import React from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <div className="flex items-center space-x-10">
        <div className="flex items-center gap-3 select-none">
          <img src="/images/wilderbeast-logo.jpg" alt="Wilder Beast Logo" className="h-10 w-auto object-contain" />
          <span className="text-xl font-extrabold text-black tracking-wide leading-tight">WILDER BEAST</span>
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-800">
          <a href="#" className="text-sm">Rent</a>
          <a href="/about" className="text-sm">About Us</a>
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
