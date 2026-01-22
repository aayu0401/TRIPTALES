import { Plane } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plane className="w-8 h-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">TripTales</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#trips" className="text-gray-700 hover:text-emerald-600 transition">Trips</a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 transition">About</a>
            <a href="#testimonials" className="text-gray-700 hover:text-emerald-600 transition">Stories</a>
            <a href="#faq" className="text-gray-700 hover:text-emerald-600 transition">FAQ</a>
          </nav>
          <a
            href="#trips"
            className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition font-medium"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
