import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react'; // 1. Import the User icon

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      fetchCartCount();
    }
  }, []);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.items) {
        setCartCount(data.items.length);
      }
    } catch (err) {
      console.error("Error fetching cart count:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCartCount(0);
    navigate('/homepage');
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 border-gray-200 bg-white shadow-md">
      <div className="flex items-center gap-3 select-none">
        <img src="/images/wilderbeast-logo.jpg" alt="Wilder Beast Logo" className="h-12 w-auto object-contain" />
        <span className="text-2xl font-extrabold text-black tracking-wide leading-tight">WILDER BEAST</span>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/choose-car" className="text-sm">Rent</Link>
        <Link to="/about" className="text-sm">About Us</Link>

        {/* Cart with count */}
        <Link to="/cart" className="text-sm">
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>

        {user ? (
          <>
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <button 
              onClick={handleLogout}
              className="border border-gray-200 px-4 py-1 rounded hover:bg-gray-100"
            >
              Log Out
            </button>
            {/* --- CHANGES START HERE --- */}
            <Link to="/profile">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300">
                <User size={20} className="text-gray-600" />
              </div>
            </Link>
            {/* --- CHANGES END HERE --- */}
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="border border-gray-200 px-4 py-1 rounded hover:bg-gray-100">
                Log In
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
