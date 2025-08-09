import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../BookingPage/Nav';
import { Star } from 'lucide-react';

export default function ModelPage() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const resCar = await fetch(`http://localhost:5000/api/cars/${carId}`);
        const resRev = await fetch(`http://localhost:5000/api/reviews?car=${carId}`);
        if (!resCar.ok) throw new Error('Car not found');
        const carData = await resCar.json();
        const revData = await resRev.json();
        setCar(carData);
        setReviews(revData);
      } catch (error) {
        console.error("Failed to fetch car data:", error);
      }
    }
    fetchData();
  }, [carId]);

  const handleRentNow = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to rent a car.");
      navigate('/login');
      return;
    }
    navigate('/booking', { state: { car } });
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to add a car to your cart.");
      navigate('/login');
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ carId: car._id })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Car added to cart!");
      } else {
        alert(data.message || "Failed to add car to cart");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to submit a review.");
      navigate('/login');
      return;
    }
    setSubmitting(true);
    const res = await fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ car: carId, rating, comment })
    });
    const newRev = await res.json();
    if (res.ok) {
      setReviews([newRev, ...reviews]);
      setComment('');
      setRating(5);
    } else {
      alert(newRev.message);
    }
    setSubmitting(false);
  };

  if (!car) return <div className="text-center mt-10">Loading...</div>;

  const {
    make, model, year, transmission, seats, dailyRate, features = [],
    images = [], fuelType = 'Petrol', color = 'N/A', securityDeposit = 0
  } = car;

  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {images.length > 0 && (
        <img
          src={images[0].startsWith('http') ? images[0] : `/images/${images[0]}`}
          alt={`${make} ${model}`}
          className="w-full max-h-[500px] object-contain bg-white"
        />
      )}

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-4">
        <h1 className="text-3xl font-bold">{year} {make} {model}</h1>
        <p className="text-gray-600">
          This {make} {model} is a sleek and modern vehicle, ideal for city driving and longer trips.
          It features a stylish design, comfortable seating, and advanced features for a smooth ride.
        </p>

        <h2 className="text-2xl font-semibold mt-8">Specifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 mt-2">
          <div><strong>Make:</strong> {make}</div>
          <div><strong>Model:</strong> {model}</div>
          <div><strong>Year:</strong> {year}</div>
          <div><strong>Fuel Type:</strong> {fuelType}</div>
          <div><strong>Transmission:</strong> {transmission}</div>
          <div><strong>Seats:</strong> {seats}</div>
          <div><strong>Color:</strong> {color}</div>
          <div><strong>Features:</strong> {features.join(', ') || '—'}</div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Rental Terms</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-700 mt-2">
          <div><strong>Daily Rate:</strong> ₹{dailyRate.toLocaleString()}/day</div>
          <div><strong>Security Deposit:</strong> ₹{securityDeposit.toLocaleString()}</div>
          <div><strong>Insurance:</strong> Optional</div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Customer Reviews</h2>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-4xl font-bold">{averageRating}</span>
          <div className="text-yellow-500 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} fill={i < Math.round(averageRating) ? 'currentColor' : 'none'} />
            ))}
          </div>
          <span className="text-gray-500">({reviews.length} reviews)</span>
        </div>

        <form onSubmit={handleReviewSubmit} className="mt-6 space-y-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-3 border rounded"
            required
          />
          <div className="flex gap-3 items-center">
            <label className="text-sm">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-2 rounded"
            >
              {[5, 4, 3, 2, 1].map(n => (
                <option key={n} value={n}>{n} Star{n > 1 && 's'}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>

        <div className="space-y-6 mt-6">
          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}
          {reviews.map((r) => (
            <div key={r._id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold">{r.user?.name || 'Anonymous'}</p>
                <p className="text-yellow-500 flex items-center gap-1">
                  <Star size={16} fill="currentColor" /> {r.rating}/5
                </p>
              </div>
              <p className="text-gray-700">{r.comment}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-between">
          <button
            onClick={handleRentNow}
            className="bg-black text-white px-6 py-2 rounded-lg text-base hover:bg-gray-800"
          >
            Rent Now
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-2 rounded-lg text-base hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
