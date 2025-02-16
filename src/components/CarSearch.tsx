import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { TruckIcon } from '@heroicons/react/24/solid';
import "react-datepicker/dist/react-datepicker.css";

export const CarSearch = () => {
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [location, setLocation] = useState('');

  return (
      <div className="max-w-3xl mx-auto mt-20">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Find Your Perfect Rental Car</h2>

          {/* Search Form */}
          <div className="space-y-4">
            {/* Location Input */}
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
              <input
                  type="text"
                  placeholder="Select Pick-up Location"
                  className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Date Pickers */}
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
              <DatePicker
                  selected={pickupDate}
                  onChange={(date) => setPickupDate(date)}
                  placeholderText="Pick-up Date"
                  className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  dateFormat="MM/dd/yyyy"
              />
            </div>

            <div className="relative">
              <CalendarIcon className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
              <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  placeholderText="Return Date"
                  className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  dateFormat="MM/dd/yyyy"
              />
            </div>

            {/* Search Button */}
            <button className="w-full bg-teal-600 text-white p-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
              <TruckIcon className="h-6 w-6" />
              Search Vehicles
            </button>
          </div>
        </div>
      </div>
  );
};