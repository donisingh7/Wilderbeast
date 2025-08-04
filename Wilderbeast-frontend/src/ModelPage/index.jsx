import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from "../custom/NewNavbar";

const TeslaModelPage = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const location = useLocation();
  const [car, setCar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const carFromState = location.state?.car;

  useEffect(() => {
    fetchCarAndReviews();
  }, [carId]);

  const fetchCarAndReviews = async () => {
    try {
      setLoading(true);
      
      if (carFromState) {
        setCar(carFromState);
      } else if (carId) {
        const carResponse = await fetch(`http://localhost:5000/api/cars/${carId}`);
        if (carResponse.ok) {
          const carData = await carResponse.json();
          setCar(carData);
        }
      }

      const reviewsResponse = await fetch(`http://localhost:5000/api/reviews?car=${carId || carFromState?._id}`);
      if (reviewsResponse.ok) {
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      }
    } catch (err) {
      setError('Failed to load car details');
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 4.7; // Default rating
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
    return distribution;
  };

  if (loading) {
    return (
      <div className="bg-white text-black">
        <Navbar />
        <div className="max-w-5xl mx-auto p-4">
          <div className="text-center py-8">Loading car details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white text-black">
        <Navbar />
        <div className="max-w-5xl mx-auto p-4">
          <div className="text-red-600 text-center py-8">{error}</div>
        </div>
      </div>
    );
  }

  const carData = car || {
    make: 'Tesla',
    model: 'Model 3',
    year: '2023',
    dailyRate: 89,
    image: '../src/assets/images/tesla.jpg',
    description: 'This Tesla Model 3 is a sleek and modern electric vehicle, perfect for city driving and longer trips. It features a spacious interior, advanced technology, and a smooth, quiet ride. Enjoy the benefits of electric driving with zero emissions and instant torque.'
  };

  const getCarImage = () => {
    if (car?.images && car.images.length > 0) {
      // Use public folder path
      return `/images/${car.images[0]}`;
    }
    if (car?.image) {
      return car.image;
    }
    const make = car?.make || carData.make;
    switch (make.toLowerCase()) {
      case 'toyota':
        return '/images/compact.jpg';
      case 'bmw':
        return '/images/bmw.jpg';
      case 'tesla':
        return '/images/tesla.jpg';
      default:
        return '/images/compact.jpg';
    }
  };

  const ratingDistribution = getRatingDistribution();
  const averageRating = calculateAverageRating();

  return (
    <div className="bg-white text-black">
      <Navbar />

      <div className="max-w-5xl mx-auto p-4">
        <p className="text-sm text-gray-600 mb-2">
          <a href="#" className="text-blue-600">
            Rent
          </a>{" "}
          / <span className="font-semibold">{carData.year} {carData.make} {carData.model}</span>
        </p>

        <div className="w-full h-auto bg-gray-200 mb-6 rounded-lg flex justify-center items-center">
          <img
            src={getCarImage()}
            alt={`${carData.make} ${carData.model}`}
            className="w-full h-auto rounded-md shadow"
          />
        </div>

        <h2 className="text-2xl font-bold mb-2">{carData.year} {carData.make} {carData.model}</h2>
        <p className="mb-6 text-gray-700">
          {carData.description}
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Specifications</h3>
          <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-800">
            <div><strong>Make</strong>: {carData.make}</div>
            <div><strong>Model</strong>: {carData.model}</div>
            <div><strong>Year</strong>: {carData.year}</div>
            <div><strong>Fuel Type</strong>: {carData.fuelType || 'Electric'}</div>
            <div><strong>Transmission</strong>: {carData.transmission || 'Automatic'}</div>
            <div><strong>Mileage</strong>: {carData.mileage || '15,000 miles'}</div>
            <div><strong>Color</strong>: {carData.color || 'White'}</div>
            <div><strong>Features</strong>: {carData.features || 'Autopilot, Premium Sound System, Navigation'}</div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Rental Terms</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-800">
            <div><strong>Daily Rate</strong>: ${carData.dailyRate}/day</div>
            <div><strong>Security Deposit</strong>: $500</div>
            <div><strong>Insurance</strong>: Optional</div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
          <div className="flex items-center mb-2">
            <span className="text-3xl font-bold">{averageRating}</span>
            <span className="ml-2 text-sm text-gray-500">★ {reviews.length} reviews</span>
          </div>

          <div className="space-y-1 text-sm text-gray-700 mb-4">
            {[5, 4, 3, 2, 1].map((star, i) => {
              const count = ratingDistribution[star] || 0;
              const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
              return (
                <div key={i} className="flex items-center gap-2">
                  <span>{star}</span>
                  <div className="w-40 h-2 bg-gray-200 rounded">
                    <div
                      className="bg-black h-full rounded"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span>{percentage}%</span>
                </div>
              );
            })}
          </div>

          <div className="mb-6 space-y-4">
            {reviews.length > 0 ? (
              reviews.slice(0, 2).map((review) => (
                <div key={review._id}>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <img
                      src={`https://randomuser.me/api/portraits/${review.user.gender || 'men'}/${review.user._id % 100}.jpg`}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{review.user.name}</span>
                    <span className="text-gray-400">• {new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 mt-1">
                    {review.comment}
                  </p>
                </div>
              ))
            ) : (
              // Show default reviews if no API reviews
              <>
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
              </>
            )}
          </div>

          <button
            onClick={() => navigate('/booking', { state: { car: carData } })}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeslaModelPage;
