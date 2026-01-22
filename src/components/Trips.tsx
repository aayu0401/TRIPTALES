import { useEffect, useState } from 'react';
import { supabase, Trip } from '../lib/supabase';
import TripCard from './TripCard';
import TripDetails from './TripDetails';
import BookingModal from './BookingModal';

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [bookingTrip, setBookingTrip] = useState<Trip | null>(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('status', 'upcoming')
      .order('start_date', { ascending: true });

    if (data && !error) {
      setTrips(data);
    }
  };

  return (
    <>
      <section id="trips" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Upcoming Adventures
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked destinations, curated experiences, and unforgettable memories waiting to happen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onViewDetails={setSelectedTrip}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedTrip && (
        <TripDetails
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
          onBook={(trip) => {
            setSelectedTrip(null);
            setBookingTrip(trip);
          }}
        />
      )}

      {bookingTrip && (
        <BookingModal
          trip={bookingTrip}
          onClose={() => setBookingTrip(null)}
        />
      )}
    </>
  );
}
