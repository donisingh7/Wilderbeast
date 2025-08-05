import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Nav";
import { CalendarDays } from "lucide-react";

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [protection, setProtection] = useState("Basic");
  const [extras, setExtras] = useState({
    GPS: false,
    childSeat: false,
    additionalDriver: false,
  });
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [showAccessories, setShowAccessories] = useState(false); // ✅ New state added

  const car = location.state?.car || {};

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/accessories');
        const data = await response.json();
        setAccessories(data);
      } catch (error) {
        console.error('Error fetching accessories:', error);
      }
    };
    fetchAccessories();
  }, []);

  const toggleExtra = (extra) => {
    setExtras({ ...extras, [extra]: !extras[extra] });
  };

  const toggleAccessory = (accessory) => {
    setSelectedAccessories(prev => {
      const isSelected = prev.find(item => item._id === accessory._id);
      if (isSelected) {
        return prev.filter(item => item._id !== accessory._id);
      } else {
        return [...prev, accessory];
      }
    });
  };

  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const days = calculateDays();
    const basePrice = car.dailyRate || 0;
    const protectionCost = protection === "Basic" ? 15 : protection === "Standard" ? 25 : 35;
    const extrasCost = Object.values(extras).filter(Boolean).length * 10;
    const accessoriesCost = selectedAccessories.reduce((total, accessory) => {
      return total + (accessory.price_inr || 0);
    }, 0);

    return (basePrice * days) + (protectionCost * days) + (extrasCost * days) + accessoriesCost;
  };

  const handleSubmit = async () => {
    if (!user) {
      setError('Please login to create a booking');
      return;
    }

    if (!pickupDate || !dropoffDate) {
      setError('Please select pickup and dropoff dates');
      return;
    }

    if (!car._id) {
      setError('No car selected');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const bookingData = {
        user: user._id,
        car: car._id,
        pickupDate,
        dropoffDate,
        protection,
        extras: Object.keys(extras).filter(key => extras[key]),
        accessories: selectedAccessories.map(acc => acc._id),
        totalAmount: calculateTotal()
      };

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking');
      }

      navigate('/confirm', { state: { booking: data } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="text-sm text-gray-500 mb-2">
          <a href="#" className="underline">Rent a car</a> / <a href="#" className="underline">Select your car</a> / Your booking
        </div>
        <h1 className="text-2xl font-semibold mb-6">Your booking</h1>

        {car.make && car.model && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold">{car.make} {car.model}</h3>
            <p className="text-gray-600">${car.dailyRate}/day</p>
          </div>
        )}

        <div className="w-full bg-gray-200 h-1 mb-10">
          <div className="bg-black h-1 w-1/4"></div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-4">1. Dates</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="relative">
              <input
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-4">2. Protection</h2>
          {["Basic", "Standard", "Premium"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-between border px-6 py-4 rounded-lg mb-3 cursor-pointer ${
                protection === option ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setProtection(option)}
            >
              <div>
                <h3 className="font-semibold">{option}</h3>
                <p className="text-sm text-gray-500">
                  {option === "Basic"
                    ? "Covers basic damages"
                    : option === "Standard"
                    ? "Covers most damages"
                    : "Covers all damages"}
                </p>
              </div>
              <input
                type="radio"
                name="protection"
                value={option}
                checked={protection === option}
                readOnly
                className="w-5 h-5"
              />
            </label>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-4">3. Extras</h2>
          {[
            { label: "GPS", key: "GPS" },
            { label: "Child seat", key: "childSeat" },
            { label: "Additional driver", key: "additionalDriver" },
          ].map((extra) => (
            <label key={extra.key} className="flex items-center space-x-3 mb-3">
              <input
                type="checkbox"
                checked={extras[extra.key]}
                onChange={() => toggleExtra(extra.key)}
                className="w-4 h-4"
              />
              <span>{extra.label}</span>
            </label>
          ))}
        </section>

        <section className="mb-8">
          <h2 
            className="font-semibold text-lg mb-4 cursor-pointer"
            onClick={() => setShowAccessories(!showAccessories)}
          >
            4. Accessories {showAccessories ? '▲' : '▼'}
          </h2>

          {showAccessories && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accessories.map((accessory) => {
                const isSelected = selectedAccessories.find(item => item._id === accessory._id);
                return (
                  <label 
                    key={accessory._id} 
                    className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!isSelected}
                      onChange={() => toggleAccessory(accessory)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{accessory.item}</div>
                      <div className="text-xs text-gray-500">{accessory.category}</div>
                      {accessory.price_inr && (
                        <div className="text-xs text-green-600">₹{accessory.price_inr}</div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </section>

        <section className="mb-10">
          <h2 className="font-semibold text-lg mb-4">5. Review</h2>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Rental days</span>
              <span>{calculateDays()} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Protection</span>
              <span>{protection}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Extras</span>
              <span>
                {(() => {
                  const selected = Object.entries(extras)
                    .filter(([, v]) => v)
                    .map(([k]) => k.replace(/([A-Z])/g, " $1"));
                  return selected.length > 0 ? selected.join(", ") : "None";
                })()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Accessories</span>
              <span>
                {selectedAccessories.length > 0 
                  ? `${selectedAccessories.length} item${selectedAccessories.length !== 1 ? 's' : ''} selected`
                  : "None"
                }
              </span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </section>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white py-3 px-6 rounded w-full text-center font-medium hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Creating Booking...' : 'Continue to payment'}
        </button>
      </div>
    </div>
  );
}
