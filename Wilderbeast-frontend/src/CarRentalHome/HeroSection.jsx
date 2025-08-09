import React from 'react';

const HeroSection = () => (
  <section
    className="relative w-full h-[550px] bg-cover bg-center rounded-2xl overflow-hidden mt-4 mx-auto max-w-screen-xl"
    style={{
      backgroundImage: "url('/images/hero.jpg')",
    }}
  >
    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        Find Your Perfect Ride
      </h1>
      <p className="max-w-2xl mb-8 drop-shadow-md">
        Explore a wide selection of vehicles for your next adventure. Book your
        rental car today and hit the road in style.
      </p>
    </div>
  </section>
);

export default HeroSection;
