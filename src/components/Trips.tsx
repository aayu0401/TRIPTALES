import { useEffect, useState } from 'react';
import { supabase, Trip } from '../lib/supabase';
import TripCard from './TripCard';
import TripDetails from './TripDetails';
import JoinTripForm from './JoinTripForm';
import { Search, Compass, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export default function Trips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [bookingTrip, setBookingTrip] = useState<Trip | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Climbing', 'Trekking', 'Relaxation', 'Cultural'];

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    let result = trips;

    if (searchQuery) {
      result = result.filter(trip =>
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategory !== 'All') {
      // Assuming description or highlights might contain keywords, or we'd need a category field.
      // For now, we'll simulate categorical filtering based on title/desc keywords
      result = result.filter(trip =>
        trip.description.toLowerCase().includes(activeCategory.toLowerCase()) ||
        trip.title.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    setFilteredTrips(result);
  }, [trips, searchQuery, activeCategory]);

  const fetchTrips = async () => {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('status', 'upcoming')
      .order('start_date', { ascending: true });

    if (data && !error) {
      setTrips(data);
      setFilteredTrips(data);
    }
  };

  return (
    <>
      <section id="trips" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm tracking-wide uppercase"
            >
              Curated Experiences
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-slate-900"
            >
              Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Adventure</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 max-w-2xl mx-auto font-medium"
            >
              Handpicked destinations designed for small groups and lifelong memories.
            </motion.p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-16 space-y-8">
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2">
              <Search className="text-slate-400 ml-4" />
              <input
                type="text"
                placeholder="Search destinations (e.g., 'Spiti', 'Bali')..."
                className="flex-1 h-12 bg-transparent border-none focus:ring-0 text-lg placeholder:text-slate-300 text-slate-900 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="rounded-xl px-8">Search</Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrips.map((trip, i) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onViewDetails={setSelectedTrip}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 opacity-50">
              <Compass size={48} className="mx-auto mb-4 text-slate-300" />
              <p className="text-xl font-medium text-slate-400">No adventures found matching your criteria.</p>
              <Button variant="ghost" onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setBookingTrip(null)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition z-10"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
            <JoinTripForm
              tripTitle={bookingTrip.title}
              onSubmit={(data) => {
                console.log("Join Request Submitted:", data);
                // Here you would send data to Supabase
                setBookingTrip(null);
                alert("Request sent! We'll be in touch.");
              }}
              onCancel={() => setBookingTrip(null)}
            />
          </div>
        </div>
      )}
    </>
  );
}
