import React from 'react';
import { Link } from 'react-router-dom';

const ExploreMore = () => {
  return (
    <section className="max-w-screen-xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Explore More</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Vehicle Listings */}
        <Link to="/choose-car" className="block group">
          <div className="w-full h-[360px] aspect-square overflow-hidden rounded-xl shadow-md group-hover:scale-[1.02] transition">
            <img
              src="src/assets/images/vehicle_listing.jpg"
              alt="Vehicle Listings"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold mt-3 group-hover:underline">Vehicle Listings</h3>
          <p className="text-sm text-gray-600">Browse our full range of rental cars.</p>
        </Link>

        {/* Contact Us - wrapped in Link */}
        <Link to="/contact" className="block group">
          <div className="w-full h-[360px] overflow-hidden rounded-xl shadow-md group-hover:scale-[1.02] transition">
            <img
              src="src/assets/images/contact_us.png"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold mt-3 group-hover:underline">Contact Us</h3>
          <p className="text-sm text-gray-600">
            Get in touch with our support team for assistance.
          </p>
        </Link>

      </div>
    </section>
  );
};

export default ExploreMore;
