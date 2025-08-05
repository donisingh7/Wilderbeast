import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b shadow-sm bg-white">
      <div className="flex items-center gap-3 select-none">
        <img src="/images/wilderbeast-logo.jpg" alt="Wilder Beast Logo" className="h-10 w-auto object-contain" />
        <span className="text-xl font-extrabold text-black tracking-wide leading-tight">WILDER BEAST</span>
      </div>

      <div className="flex items-center space-x-8 text-sm text-gray-700">
        <a href="#" className="hover:text-black">Rent a car</a>
        <a href="/about" className="hover:text-black">About Us</a>
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
}
