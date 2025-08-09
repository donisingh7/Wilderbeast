import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react"; 

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
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300">
            <User size={20} className="text-gray-600" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
