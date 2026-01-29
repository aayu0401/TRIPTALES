import { Plane, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Plane className="w-8 h-8 text-emerald-600 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">TripTales</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#trips" className="text-gray-600 hover:text-emerald-600 font-bold transition text-sm uppercase tracking-widest">Trips</a>
            <a href="#about" className="text-gray-600 hover:text-emerald-600 font-bold transition text-sm uppercase tracking-widest">About</a>
            <a href="#testimonials" className="text-gray-600 hover:text-emerald-600 font-bold transition text-sm uppercase tracking-widest">Stories</a>
            <Link to="/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition text-sm uppercase tracking-widest">
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          </nav>

          <Button
            variant="gradient"
            size="sm"
            className="rounded-full px-8 shadow-lg shadow-emerald-500/20"
            onClick={() => window.location.href = '#trips'}
          >
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
}
