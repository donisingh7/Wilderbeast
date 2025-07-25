import React from "react";
import Navbar from "../src/custom/NewNavbar";

const TeslaModelPage = () => {
  return (
    <div className="bg-white text-black">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <p className="text-sm text-gray-600 mb-2">
          <a href="#" className="text-blue-600">
            Rent
          </a>{" "}
          / <span className="font-semibold">2023 Tesla Model 3</span>
        </p>

        <div className="w-full h-auto bg-gray-200 mb-6 rounded-lg flex justify-center items-center">
          <img
            src="../src/assets/images/tesla.jpg"
            alt="Tesla Model 3"
            className="w-full h-auto rounded-md shadow"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2">2023 Tesla Model 3</h2>
        <p className="mb-6 text-gray-700">
          This Tesla Model 3 is a sleek and modern electric vehicle, perfect for
          city driving and longer trips. It features a spacious interior,
          advanced technology, and a smooth, quiet ride. Enjoy the benefits of
          electric driving with zero emissions and instant torque.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Specifications</h3>
          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-800">
            <div>
              <strong>Make</strong>: Tesla
            </div>
            <div>
              <strong>Model</strong>: Model 3
            </div>
            <div>
              <strong>Year</strong>: 2023
            </div>
            <div>
              <strong>Fuel Type</strong>: Electric
            </div>
            <div>
              <strong>Transmission</strong>: Automatic
            </div>
            <div>
              <strong>Mileage</strong>: 15,000 miles
            </div>
            <div>
              <strong>Color</strong>: White
            </div>
            <div>
              <strong>Features</strong>: Autopilot, Premium Sound System,
              Navigation
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Rental Terms</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-800">
            <div>
              <strong>Daily Rate</strong>: $89/day
            </div>
            <div>
              <strong>Security Deposit</strong>: $500
            </div>
            <div>
              <strong>Insurance</strong>: Optional
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
          <div className="flex items-center mb-2">
            <span className="text-3xl font-bold">4.7</span>
            <span className="ml-2 text-sm text-gray-500">★ 125 reviews</span>
          </div>

          <div className="space-y-1 text-sm text-gray-700 mb-4">
            {[5, 4, 3, 2, 1].map((star, i) => (
              <div key={i} className="flex items-center gap-2">
                <span>{star}</span>
                <div className="w-40 h-2 bg-gray-200 rounded">
                  <div
                    className="bg-black h-full rounded"
                    style={{ width: `${[60, 25, 10, 3, 2][i]}%` }}
                  ></div>
                </div>
                <span>{[60, 25, 10, 3, 2][i]}%</span>
              </div>
            ))}
          </div>

          <div className="mb-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="w-8 h-8 rounded-full"
                />
                <span>Ethan Carter</span>
                <span className="text-gray-400">• May 15, 2024</span>
              </div>
              <p className="text-gray-700 mt-1">
                The Tesla Model 3 was an absolute pleasure to drive! The
                electric acceleration is exhilarating, and the car is incredibly
                comfortable and quiet. The autopilot feature made highway
                driving a breeze. Highly recommend!
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="w-8 h-8 rounded-full"
                />
                <span>Olivia Bennett</span>
                <span className="text-gray-400">• April 22, 2024</span>
              </div>
              <p className="text-gray-700 mt-1">
                Overall, a great experience renting the Tesla Model 3. The car
                was clean and well-maintained. The only minor issue was the
                navigation system, which could be a bit more intuitive.
              </p>
            </div>
          </div>

          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeslaModelPage;
