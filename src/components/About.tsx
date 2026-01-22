import { Heart, Shield, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How TripTales Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your journey from solo traveler to part of a travel family in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-emerald-600">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Browse & Choose</h3>
            <p className="text-gray-600">
              Explore our curated trips and pick the destination that excites you most
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Book & Pay 50%</h3>
            <p className="text-gray-600">
              Reserve your spot with just 50% payment. Rest on trip day!
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-purple-600">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Join WhatsApp Group</h3>
            <p className="text-gray-600">
              Connect with your travel squad before the trip begins
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-yellow-600">4</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Travel & Bond</h3>
            <p className="text-gray-600">
              Create unforgettable memories and lifelong friendships
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-emerald-500 to-blue-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Community First</h3>
            <p className="text-gray-600">
              We prioritize creating a warm, inclusive environment where everyone feels welcome
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Secure</h3>
            <p className="text-gray-600">
              Verified travelers, experienced coordinators, and 24/7 support for your peace of mind
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Small Groups</h3>
            <p className="text-gray-600">
              Intimate group sizes ensure everyone connects and no one feels left out
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Curated Excellence</h3>
            <p className="text-gray-600">
              Handpicked accommodations, activities, and experiences for the best value
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
