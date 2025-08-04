import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">ABOUT US</h1>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        {/* LIVE YOUR DREAMS Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              LIVE YOUR<br />DREAMS
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At Wilder Beast, our mission is to enable your travel adventures by providing reliable and comfortable rental vehicles for all your journeys.
            </p>
          </div>
          
                     <div className="flex justify-center">
             {/* Wilder Beast Logo */}
                           <img 
                src="/images/wilderbeast-logo.jpg" 
                alt="Wilder Beast Logo" 
                className="w-64 h-64 object-contain"
              />
           </div>
        </div>

        {/* OUR VALUES Section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-12">OUR VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Exploration</h3>
              <p className="text-gray-700 leading-relaxed">
                Encourage our adventurous self-growth and discovery.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Safety</h3>
              <p className="text-gray-700 leading-relaxed">
                Prioritize our well-being with meticulously maintained vehicles.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Trust</h3>
              <p className="text-gray-700 leading-relaxed">
                Foster transparent and dependable relationships through superior service.
              </p>
            </div>
          </div>
        </div>

        {/* Chirag Sharma Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4 leading-tight">
              CHIRAG<br />SHARMA
            </h2>
            <p className="text-lg text-gray-600 mb-6">Managing Director</p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Chirag Sharma has passion for travel and a rich experience in the Industry, he founded Wilder Beast to provide a trustworthy rental solutions.
            </p>
            
                         {/* Logo below text */}
             <div className="mt-8 flex justify-center">
                               <img 
                  src="/images/wilderbeast-logo.jpg" 
                  alt="Wilder Beast Logo" 
                  className="w-32 h-32 object-contain"
                />
             </div>
            
            <p className="text-center text-lg font-semibold text-gray-800 mt-4">
              A COMPLETE TRAVEL SOLUTION ..
            </p>
          </div>
          
          <div className="flex justify-center">
            {/* Chirag Sharma Photo */}
            <div className="w-80 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍💼</span>
                </div>
                <p className="text-gray-600">Chirag Sharma</p>
                <p className="text-sm text-gray-500">Managing Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 