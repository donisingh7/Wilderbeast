import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b shadow-sm bg-white">
      <div className="flex items-center space-x-2 font-bold text-lg">
        <div className="w-5 h-5 bg-black rounded-sm"></div>
        <span className="text-3xl text-red-200 font-extrabold">DriveEasy</span>
      </div>

      <div className="flex items-center space-x-8 text-sm text-gray-700">
        <a href="#" className="hover:text-black">Ride</a>
        <a href="#" className="hover:text-black">Rent</a>
        <a href="#" className="hover:text-black">Eat</a>
        <a href="#" className="hover:text-black">Charter</a>
        <a href="#" className="bg-gray-100 px-4 py-1.5 rounded text-black font-medium">Help</a>
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
