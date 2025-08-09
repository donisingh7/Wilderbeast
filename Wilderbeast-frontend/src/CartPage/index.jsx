import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch the user's cart from the server
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
            // If the response is not OK, log the status and return
            console.error("Failed to fetch cart:", res.status, await res.text());
            return;
        }

        const data = await res.json();
        // Log the data received from the backend to see what's in it
        console.log("Fetched cart data:", data);
        
        // Ensure data.items is an array before setting the state
        setCart(data.items || []);

      } catch (error) {
        console.error("An error occurred while fetching the cart:", error);
      }
    };

    fetchCart();
  }, [navigate]); // Dependency array is fine, but you could use [] if navigate is stable.

  // Remove an item from the cart
  const removeFromCart = async (carId) => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }
    
    try {
        const res = await fetch(`http://localhost:5000/api/cart/${carId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
            // **FIX:** Instead of relying on the response, update the state locally.
            // This provides immediate feedback to the user.
            setCart((prevCart) => prevCart.filter((item) => item.car._id !== carId));
        } else {
            console.error("Failed to remove item from cart:", res.status);
            // Optionally, show an error message to the user
        }
    } catch (error) {
        console.error("An error occurred while removing the item:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">No cars in cart.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            // Ensure item and item.car exist to prevent errors
            item && item.car && (
              <div key={item.car._id} className="border p-4 rounded-lg flex justify-between items-center transition-shadow hover:shadow-lg">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">{item.car.make} {item.car.model}</h2>
                  <p className="text-gray-600">₹{item.car.dailyRate}/day</p>
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
              onClick={() => navigate("/booking")}
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
