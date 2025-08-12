import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "./Nav";
import { CalendarDays } from "lucide-react";

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const car = location.state?.car;

  const [protection, setProtection] = useState("Basic");
  const [extras, setExtras] = useState({ GPS: false, childSeat: false, additionalDriver: false });
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [showAccessories, setShowAccessories] = useState(true); 

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/accessories`)
      .then(res => res.json())
      .then(data => setAccessories(data))
      .catch(err => console.error(err));
  }, []);

  const calculateDays = () => {
    if (!pickupDate || !dropoffDate || new Date(dropoffDate) <= new Date(pickupDate)) return 0;
    const diff = new Date(dropoffDate) - new Date(pickupDate);
    return Math.ceil(diff / (1000*60*60*24));
  };

  const calculateTotal = () => {
    const days = calculateDays();
    if (days <= 0) return 0;
    const base = car?.dailyRate || 0;
    const protCost = protection === 'Basic' ? 15 : protection === 'Standard' ? 25 : 35;
    const extrasCost = Object.values(extras).filter(Boolean).length * 10;
    const accCost = selectedAccessories.reduce((sum,a)=> sum + (a.price_inr||0),0);
    return (base * days) + (protCost * days) + (extrasCost * days) + accCost;
  };

  const handleSubmit = async () => {
    setError('');
    if (!pickupDate || !dropoffDate) { setError('Please select both pickup and drop-off dates.'); return; }
    
    if (new Date(dropoffDate) <= new Date(pickupDate)) {
      setError('Drop-off date must be after the pickup date.');
      return;
    }

    if (!user) { setError('You must be logged in to book.'); return; }

    const booking = {
      car: car._id,
      pickupDate,
      dropoffDate,
      protection,
      extras: Object.keys(extras).filter(k=>extras[k]),
      accessories: selectedAccessories.map(a=>a._id),
      totalAmount: calculateTotal()
    };

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify(booking)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate('/confirm',{state:{booking:data}});
    } catch(err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const today = new Date().toISOString().split("T")[0];

  if (!car || !car._id) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-10 text-center">
                <h1 className="text-2xl font-semibold mb-4 text-red-600">Car Details Not Found</h1>
                <p className="text-gray-600 mb-6">It seems the car information was lost. Please go back and select a car again.</p>
                <Link to="/choose-car" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                    Select a Car
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="text-sm text-gray-500 mb-2">
          <a href="#" className="underline">Rent a car</a> / <a href="#" className="underline">Select your car</a> / Your booking
        </div>
        <h1 className="text-2xl font-semibold mb-6">Your booking</h1>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold">{car.make} {car.model}</h3>
          <p className="text-gray-600">₹{car.dailyRate.toLocaleString('en-IN')}/day</p>
        </div>

        <div className="w-full bg-gray-200 h-1 mb-10">
          <div className="bg-black h-1 w-1/4"></div>
        </div>

        {error && <div className="mb-6 text-red-600 font-semibold p-3 bg-red-50 border border-red-200 rounded-lg">{error}</div>}

        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-4">1. Dates</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="date" value={pickupDate} min={today} onChange={e=>setPickupDate(e.target.value)} className="border p-2 rounded" />
            <input type="date" value={dropoffDate} min={pickupDate || today} onChange={e=>setDropoffDate(e.target.value)} className="border p-2 rounded" disabled={!pickupDate} />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-4">2. Protection</h2>
          {['Basic','Standard','Premium'].map(opt=> (
            <label key={opt} className={`block border p-4 mb-3 rounded ${protection===opt?'border-black':''}`} onClick={()=>setProtection(opt)}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{opt}</h3>
                  <p className="text-sm text-gray-500">
                    {opt==='Basic'?'Covers basic damages':opt==='Standard'?'Covers most damages':'Covers all damages'}
                  </p>
                </div>
                <input type="radio" name="protection" checked={protection===opt} readOnly />
              </div>
            </label>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-4">3. Extras</h2>
          {['GPS','childSeat','additionalDriver'].map(key => (
            <label key={key} className="inline-flex items-center mr-6">
              <input type="checkbox" checked={extras[key]} onChange={()=>setExtras(prev=>({...prev,[key]:!prev[key]}))} />
              <span className="ml-2 capitalize">{key.replace(/([A-Z])/g,' $1')}</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accessories.map(acc => (
                <label key={acc._id} className="flex items-center border p-3 rounded">
                  <input
                    type="checkbox"
                    checked={selectedAccessories.some(a => a._id === acc._id)}
                    onChange={() => {
                      setSelectedAccessories(prev =>
                        prev.some(a => a._id === acc._id)
                          ? prev.filter(a => a._id !== acc._id)
                          : [...prev, acc]
                      );
                    }}
                  />
                  <div className="ml-3">
                    <div className="font-medium text-sm">{acc.item}</div>
                    <div className="text-xs text-gray-500">{acc.category}</div>
                    <div className="text-xs text-green-600">₹{acc.price_inr}</div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </section>

        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-4">5. Review</h2>
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Rental days</span>
              <span>{calculateDays()} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Protection</span>
              <span>{protection}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Extras</span>
              <span>{Object.entries(extras).filter(([, v]) => v).map(([k]) => k.replace(/([A-Z])/g,' $1')).join(', ') || 'None'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Accessories</span>
              <span>{selectedAccessories.length > 0 ? `${selectedAccessories.length} selected` : 'None'}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{calculateTotal()}</span>
            </div>
          </div>
        </section>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded mt-4 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Continue to payment'}
        </button>
      </div>
    </div>
  );
}
