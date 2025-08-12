import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          console.error("Failed to fetch cart:", res.status, await res.text());
          return;
        }

        const data = await res.json();
        console.log("Fetched API data:", data); 
        setCart(data.items || []);

      } catch (error) {
        console.error("An error occurred while fetching the cart:", error);
      }
    };

    fetchCart();
  }, [navigate]);

  const removeFromCart = async (carId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    try {
      const res = await fetch(`${API_URL}/api/cart/${carId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        // --- FIX START ---
        // Purane state ko filter karne ke bajaye, server se aaye naye cart ka istemal karein.
        const updatedCart = await res.json();
        setCart(updatedCart.items || []);
        // --- FIX END ---
      } else {
        console.error("Failed to remove item from cart:", res.status);
        alert("Could not remove the car. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred while removing the item:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleProceedToBooking = () => {
    console.log("Attempting to book with cart state:", cart);

    if (!cart.length || !cart[0]?.car?._id) {
      alert("Your cart is empty or the car details are missing. Please try adding the car again.");
      console.error("Booking failed. Cart state:", cart);
      return;
    }
    
    navigate('/booking', { state: { car: cart[0].car } });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">No cars in cart.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            item?.car && (
              <div key={item.car._id} className="border p-4 rounded-lg flex justify-between items-center transition-shadow hover:shadow-lg">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">
                    {item.car.make} {item.car.model}
                  </h2>
                  <p className="text-gray-600">₹{item.car.dailyRate}/day</p>
                  {item.quantity > 1 && (
                    <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                  )}
                </div>
                <button
                  onClick={() => removeFromCart(item.car._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            )
          ))}
          <div className="pt-6 border-t mt-6 flex justify-end">
            <button
              onClick={handleProceedToBooking}
              className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors text-lg"
            >
              Proceed to Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
