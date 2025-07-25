import React from 'react';

const ExploreMore = () => {
  return (
    <section className="max-w-screen-xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Explore More</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="w-full h-[360px] aspect-square overflow-hidden rounded-xl shadow-md">
            <img
              src="src/assets/images/vehicle_listing.jpg"
              alt="Vehicle Listings"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold mt-3">Vehicle Listings</h3>
          <p className="text-sm text-gray-600">
            Browse our full range of rental cars.
          </p>
        </div>
        <div>
          <div className="w-full h-[360px] overflow-hidden rounded-xl shadow-md">
            <img
              src="src/assets/images/contact_us.png"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold mt-3">Contact Us</h3>
          <p className="text-sm text-gray-600">
            Get in touch with our support team for assistance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExploreMore;
