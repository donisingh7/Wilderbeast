import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const BookingHistoryPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/bookings`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch booking history');
        }

        const data = await response.json();
        
        const processedData = data.map(booking => {
            const now = new Date();
            const dropoffDate = new Date(booking.dropoffDate);
            if (booking.isCancelled) return {...booking, status: 'Cancelled'};
            if (dropoffDate < now) return {...booking, status: 'Completed'};
            return {...booking, status: 'Upcoming'};
        });

        setBookings(processedData);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingHistory();
  }, [navigate]);
  
  const filteredBookings = bookings.filter(booking => {
      if (filter === 'All') return true;
      return booking.status === filter;
  });

  const FilterButton = ({ name }) => (
    <button
      onClick={() => setFilter(name)}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
        filter === name
          ? 'bg-blue-600 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {name}
    </button>
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      Completed: 'bg-green-100 text-green-700 border border-green-200',
      Cancelled: 'bg-red-100 text-red-700 border border-red-200',
      Upcoming: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    };
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status}
      </span>
    );
  };

  if (isLoading) {
    return <div className="text-center p-10 font-semibold text-gray-600">Loading your booking history...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Booking History</h1>
          <p className="text-gray-500 mt-1">View and manage your past reservations</p>
        </header>

        <div className="bg-white p-2 rounded-full shadow-sm mb-8 inline-flex space-x-2 border border-gray-200">
          <FilterButton name="All" />
          <FilterButton name="Completed" />
          <FilterButton name="Cancelled" />
          <FilterButton name="Upcoming" />
        </div>

        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className={`p-3 rounded-lg ${
                    booking.status === 'Completed' ? 'bg-green-100' : 
                    booking.status === 'Cancelled' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                   <Car size={24} className={`${
                    booking.status === 'Completed' ? 'text-green-600' : 
                    booking.status === 'Cancelled' ? 'text-red-600' : 'text-blue-600'
                }`} />
                </div>

                <div className="flex-grow">
                  <h2 className="font-bold text-lg text-gray-800">{booking.car?.make} {booking.car?.model}</h2>
                  <p className="text-sm text-gray-500">Total: ₹{booking.totalAmount.toLocaleString()}</p>
                </div>

                <div className="flex-grow grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="font-semibold text-gray-700">Check-in</p>
                        <p className="text-gray-500">{new Date(booking.pickupDate).toLocaleDateString()}</p>
                    </div>
                     <div>
                        <p className="font-semibold text-gray-700">Check-out</p>
                        <p className="text-gray-500">{new Date(booking.dropoffDate).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <StatusBadge status={booking.status} />
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 w-full sm:w-auto">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center bg-white p-10 rounded-lg shadow-sm">
              <p className="text-gray-500">You have no past bookings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryPage;
