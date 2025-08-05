import React from "react";
import { Link } from "react-router-dom";
import { Globe, HelpCircle } from "lucide-react";

const Nav = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md">
      <div className="flex items-center space-x-10">
        <div className="flex items-center gap-3 select-none">
          <img src="/images/wilderbeast-logo.jpg" alt="Wilder Beast Logo" className="h-10 w-auto object-contain" />
          <span className="text-xl font-extrabold text-black tracking-wide leading-tight">WILDER BEAST</span>
        </div>
      </div>

      <div className="flex items-center space-x-6 text-sm text-gray-700">
        <a href="#" className="hover:underline">Rent a car</a>
        <a href="/about" className="hover:underline">About Us</a>
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
