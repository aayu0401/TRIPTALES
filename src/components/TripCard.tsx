import { Calendar, MapPin, Users, ArrowRight, Clock } from 'lucide-react';
import { Trip } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100 group"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={trip.image_url}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

        <div className="absolute top-5 right-5 backdrop-blur-md bg-white/30 border border-white/20 text-white px-5 py-2 rounded-2xl font-black text-lg">
          ₹{trip.price.toLocaleString('en-IN')}
        </div>

        {spotsLeft <= 5 && (
          <div className="absolute top-5 left-5 bg-red-500 text-white px-4 py-2 rounded-2xl font-bold text-xs uppercase tracking-widest animate-pulse shadow-lg">
            Almost Full
          </div>
        )}

        <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">
          <div className="backdrop-blur-md bg-black/30 px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
            <Users size={14} className="text-emerald-400" />
            <span className="text-xs font-bold">{trip.current_participants}/{trip.max_participants} Joined</span>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-2 text-emerald-600 mb-3">
          <MapPin size={16} strokeWidth={2.5} />
          <span className="text-sm font-black uppercase tracking-widest">{trip.destination}</span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-3 line-clamp-1">{trip.title}</h3>
        <p className="text-slate-500 mb-6 line-clamp-2 text-sm font-medium leading-relaxed">{trip.description}</p>

        <div className="flex items-center justify-between mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</span>
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Calendar size={14} className="text-blue-500" />
              <span className="text-sm">{duration} Days</span>
            </div>
          </div>
          <div className="w-[1px] h-8 bg-slate-200" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting In</span>
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Clock size={14} className="text-orange-500" />
              <span className="text-sm">{timeLeft.days}d {timeLeft.hours}h</span>
            </div>
          </div>
        </div>

        <Button
          variant="gradient"
          className="w-full h-14 rounded-2xl gap-3 group/btn"
          onClick={() => onViewDetails(trip)}
        >
          <span className="text-base">Secure My Spot</span>
          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
