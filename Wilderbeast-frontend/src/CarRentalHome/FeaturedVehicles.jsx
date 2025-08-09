import React from "react";

const FeaturedVehicles = () => {
  return (
    <section className="max-w-screen-xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Featured Vehicles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Sedan */}
        <div className="text-center">
          <img
            src="/images/sedan.jpg"
            alt="Sedan"
            className="mx-auto mb-4 h-40 object-cover rounded-lg shadow-md"
          />
          <h3 className="text-lg font-semibold">Sedan</h3>
          <p className="text-sm text-gray-600">Ideal for city driving and business trips.</p>
        </div>

        {/* SUV */}
        <div className="text-center">
          <img
            src="/images/SUV.jpg"
            alt="SUV"
            className="mx-auto mb-4 h-40 object-cover rounded-lg shadow-md"
          />
          <h3 className="text-lg font-semibold">SUV</h3>
          <p className="text-sm text-gray-600">Perfect for family vacations and off-road adventures.</p>
        </div>

        {/* Compact */}
        <div className="text-center">
          <img
            src="/images/compact.jpg"
            alt="Compact"
            className="mx-auto mb-4 h-40 object-cover rounded-lg shadow-md"
          />
          <h3 className="text-lg font-semibold">Compact</h3>
          <p className="text-sm text-gray-600">Great for budget-conscious travelers and short trips.</p>
        </div>

      </div>
    </section>
  );
};

export default FeaturedVehicles;
