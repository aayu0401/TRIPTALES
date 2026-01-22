import { Plane, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold">TripTales</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Creating unforgettable travel experiences and lifelong friendships, one trip at a time.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#trips" className="text-gray-400 hover:text-emerald-400 transition">Upcoming Trips</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-emerald-400 transition">About Us</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-emerald-400 transition">Testimonials</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-emerald-400 transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>hello@triptales.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91 88794 47678</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex items-center space-x-4">
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-emerald-600 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} TripTales. All rights reserved. Travel with strangers, return with friends.</p>
        </div>
      </div>
    </footer>
  );
}
