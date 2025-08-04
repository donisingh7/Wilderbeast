import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 border-gray-200 bg-white shadow-md">
      <div className="flex items-center gap-3 select-none">
        <img src="/images/wilderbeast-logo.jpg" alt="Wilder Beast Logo" className="h-12 w-auto object-contain" />
        <span className="text-2xl font-extrabold text-black tracking-wide leading-tight">WILDER BEAST</span>
      </div>
      <div className="flex items-center space-x-6">
        <a href="/choose-car" className="text-sm">Rent</a>
        <a href="/about" className="text-sm">About Us</a>
        <a href="#" className="text-sm">Eat</a>
        <a href="#" className="text-sm">Charter</a>
        {user ? (
          <>
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <button 
              onClick={handleLogout}
              className="border border-gray-200 px-4 py-1 rounded hover:bg-gray-100"
            >
              Log Out
            </button>
            <Link to="/profile">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                alt="avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button className="border border-gray-200 px-4 py-1 rounded hover:bg-gray-100">
              Log In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar