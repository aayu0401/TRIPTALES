import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Trip } from '../lib/supabase';
import { useEffect, useState } from 'react';

interface TripCardProps {
  trip: Trip;
  onViewDetails: (trip: Trip) => void;
}

export default function TripCard({ trip, onViewDetails }: TripCardProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(trip.start_date) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [trip.start_date]);

  const spotsLeft = trip.max_participants - trip.current_participants;
  const startDate = new Date(trip.start_date);
  const endDate = new Date(trip.end_date);
  const duration = Math.ceil((+endDate - +startDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img
          src={trip.image_url}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full font-semibold text-sm">
          ₹{trip.price.toLocaleString('en-IN')}
        </div>
        {spotsLeft <= 5 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm animate-pulse">
            Only {spotsLeft} spots left!
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{trip.destination}</span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">{trip.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{trip.description}</p>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{duration} Days / {duration - 1} Nights</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">{trip.current_participants}/{trip.max_participants} Joined</span>
          </div>
        </div>

        {timeLeft.days > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-600 mb-2 text-center font-medium">Trip starts in:</p>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{timeLeft.days}</div>
                <div className="text-xs text-gray-600">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{timeLeft.hours}</div>
                <div className="text-xs text-gray-600">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{timeLeft.minutes}</div>
                <div className="text-xs text-gray-600">Mins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{timeLeft.seconds}</div>
                <div className="text-xs text-gray-600">Secs</div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => onViewDetails(trip)}
          className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition font-semibold flex items-center justify-center space-x-2"
        >
          <span>View Details</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
