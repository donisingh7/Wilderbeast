import React, { useState, useEffect } from "react";
import { Home, User, Clock, CreditCard, LogOut, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userData);
      setUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth || ''
      });
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Update localStorage with new user data
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white font-sans">

      <aside className="w-64 border-r px-6 py-8 flex flex-col justify-between bg-white">
        <div>
          <h1 className="text-4xl text-red-200 font-bold mb-5">DriveNow</h1>
          <nav className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
              <Home size={18} /> <span>Home</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
              <User size={18} /> <span>Bookings</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
              <Clock size={18} /> <span>Rental History</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded bg-gray-100 font-medium text-black">
              <User size={18} /> <span>Profile</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
              <CreditCard size={18} /> <span>Payment Methods</span>
            </div>
          </nav>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
            <HelpCircle size={18} /> <span>Help</span>
          </div>
          <div 
            className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-100 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut size={18} /> <span>Logout</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 px-16 py-12">
        <h2 className="text-3xl font-bold mb-8">Profile</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
            {success}
          </div>
        )}

        <div className="flex items-center space-x-6 mb-10">
          <img
            src="https://api.dicebear.com/6.x/adventurer/svg?seed=sophia"
            alt="Avatar"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold">{user?.name || 'User'}</h3>
            <p className="text-sm text-gray-500">
              Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024'}
            </p>
          </div>
        </div>

        <section>
          <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
          <form className="space-y-5 max-w-xl">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input 
                type="date" 
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </form>

          <div className="text-right mt-8">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
              onClick={handleUpdateProfile}
              disabled={saving}
            >
              {saving ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
