import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 border-gray-200 bg-white shadow-md">
      <div className="text-5xl text-red-200 font-extrabold">DriveNow</div>
      <div className="flex items-center space-x-6">
        <a href="#" className="text-sm">Rent</a>
        <a href="#" className="text-sm">Eat</a>
        <a href="#" className="text-sm">Charter</a>
        <button className="border border-gray-200 px-4 py-1 rounded">Log In</button>
        <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="avatar" className="w-8 h-8 rounded-full" />
      </div>
    </nav>
  );
}

export default Navbar