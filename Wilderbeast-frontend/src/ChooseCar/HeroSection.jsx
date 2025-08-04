import React from 'react';

const HeroSection = () => {
  return (
    <div
      className="py-24 px-10 bg-cover bg-center bg-no-repeat text-black flex items-start justify-start"
      style={{
        backgroundImage: "url('/src/assets/images/choosecar.jpg')",
      }}
    >
      <div>
        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-lg">Cruise Smart</h1>
        <p className="text-lg font-extrabold drop-shadow-md">Find the right car for your journey</p>
      </div>
    </div>
  );
};

export default HeroSection;
