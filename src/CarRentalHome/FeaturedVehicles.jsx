import React from 'react';

const FeaturedVehicles = () => {
  const cars = [
    {
      title: "Sedan",
      desc: "Ideal for city driving and business trips.",
      image: "src/assets/images/sedan.jpg"
    },
    {
      title: "SUV",
      desc: "Perfect for family vacations and off-road adventures.",
      image: "src/assets/images/SUV.jpg"
    },
    {
      title: "Compact",
      desc: "Great for budget-conscious travelers and short trips.",
      image: "src/assets/images/compact.jpg"
    }
  ];

  return (
    <section className="max-w-screen-xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Featured Vehicles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden bg-white">
            <img
              src={car.image}
              alt={car.title}
              className="w-full h-[250px] object-cover rounded-xl"
            />
            <h3 className="font-semibold mt-2">{car.title}</h3>
            <p className="text-sm text-gray-600">{car.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
