import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { supabase, Testimonial } from '../lib/supabase';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (data && !error) {
      setTestimonials(data);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Stories from Our Community
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from real travelers who became lifelong friends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={testimonial.user_image}
                  alt={testimonial.user_name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.user_name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.trip_destination}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
