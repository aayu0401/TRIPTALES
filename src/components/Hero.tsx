import { ArrowRight, Users, MapPin, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-20 pb-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-5"></div>

      <div className="container mx-auto px-4 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Travel with Strangers,
            <span className="text-emerald-600"> Return with Friends</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Join curated group trips designed for solo travelers and adventure seekers.
            Experience the world, make lifelong connections, and create unforgettable memories.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#trips"
              className="bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>Explore Trips</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#about"
              className="bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-50 transition font-semibold text-lg border-2 border-gray-200"
            >
              How It Works
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <Users className="w-10 h-10 text-emerald-600 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 mb-2">Small Groups</h3>
              <p className="text-gray-600 text-sm">15-20 like-minded travelers per trip</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <MapPin className="w-10 h-10 text-emerald-600 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 mb-2">Curated Experiences</h3>
              <p className="text-gray-600 text-sm">Handpicked destinations & activities</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <Calendar className="w-10 h-10 text-emerald-600 mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Payments</h3>
              <p className="text-gray-600 text-sm">Pay 50% now, rest on trip day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
