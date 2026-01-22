import { X, Calendar, Users, MapPin, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { Trip } from '../lib/supabase';
import { useState } from 'react';

interface TripDetailsProps {
  trip: Trip;
  onClose: () => void;
  onBook: (trip: Trip) => void;
}

export default function TripDetails({ trip, onClose, onBook }: TripDetailsProps) {
  const spotsLeft = trip.max_participants - trip.current_participants;
  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);
  const duration = Math.ceil((+endDate - +startDate) / (1000 * 60 * 60 * 24));

  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in the ${trip.title} trip. Can you provide more details?`;
    window.open(`https://wa.me/918879447678?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">{trip.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <img
            src={trip.image_url}
            alt={trip.title}
            className="w-full h-80 object-cover rounded-xl mb-6"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <MapPin className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Destination</p>
              <p className="font-semibold text-gray-900">{trip.destination}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold text-gray-900">{duration}D/{duration-1}N</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Spots Left</p>
              <p className="font-semibold text-gray-900">{spotsLeft}/{trip.max_participants}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <Calendar className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Starts On</p>
              <p className="font-semibold text-gray-900">{startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">About This Trip</h3>
            <p className="text-gray-700 leading-relaxed">{trip.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Trip Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trip.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Day-by-Day Itinerary</h3>
            <div className="space-y-4">
              {trip.itinerary.map((day) => (
                <div key={day.day} className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Day {day.day}: {day.title}
                  </h4>
                  <ul className="space-y-1">
                    {day.activities.map((activity, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2" />
                What's Included
              </h3>
              <ul className="space-y-2">
                {trip.inclusions.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-emerald-600 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <XCircle className="w-5 h-5 text-red-600 mr-2" />
                What's Not Included
              </h3>
              <ul className="space-y-2">
                {trip.exclusions.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-6 text-white mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Trip Cost</p>
                <p className="text-4xl font-bold">₹{trip.price.toLocaleString('en-IN')}</p>
                <p className="text-sm opacity-90 mt-2">Pay only 50% now: ₹{(trip.price / 2).toLocaleString('en-IN')}</p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Us</span>
                </button>
                <button
                  onClick={() => onBook(trip)}
                  className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
