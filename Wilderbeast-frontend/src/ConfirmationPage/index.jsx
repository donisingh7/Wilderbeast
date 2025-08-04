import React from "react";
import Navbar from "./Nav";
import { CalendarCheck, MapPin, Receipt } from "lucide-react";

export default function ConfirmationFinalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-2">Reservation confirmed</h1>
        <p className="text-gray-600 mb-8">
          Your car rental is confirmed. Here are the details of your booking:
        </p>

        <div className="flex items-start space-x-4 mb-6">
          <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
            R
          </div>
          <div>
            <p className="font-semibold">Reservation #7890123</p>
            <p className="text-sm text-blue-500">Compact · Toyota Corolla or similar</p>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-gray-500 mt-1" />
            <div>
              <p className="font-medium">Pick up at 123 Main Street</p>
              <p className="text-sm text-gray-500">Tue, August 15, 10:00 AM</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CalendarCheck className="w-6 h-6 text-gray-500 mt-1" />
            <div>
              <p className="font-medium">Return at 123 Main Street</p>
              <p className="text-sm text-gray-500">Thu, August 17, 10:00 AM</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Receipt className="w-6 h-6 text-gray-500 mt-1" />
            <div>
              <p className="font-medium">Estimated total: $120</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Contact Support</h3>
          <p className="text-sm text-gray-600">
            If you have any questions or need assistance, please contact our support team at
            <span className="font-medium"> (555) 123-4567</span>.
          </p>
        </div>

        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
            View Booking
          </button>
          <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded font-medium hover:bg-gray-200">
            Print
          </button>
        </div>
      </main>
    </div>
  );
}
