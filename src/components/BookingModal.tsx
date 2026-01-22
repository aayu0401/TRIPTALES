import { X, CreditCard, MessageCircle } from 'lucide-react';
import { Trip, supabase } from '../lib/supabase';
import { useState } from 'react';

interface BookingModalProps {
  trip: Trip;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BookingModal({ trip, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: 1
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }
    if (formData.participants < 1 || formData.participants > 5) {
      newErrors.participants = 'Participants must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const totalAmount = trip.price * formData.participants;
    const partialAmount = totalAmount / 2;

    try {
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          trip_id: trip.id,
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          participants_count: formData.participants,
          total_amount: totalAmount,
          paid_amount: partialAmount,
          payment_status: 'pending'
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: partialAmount * 100,
        currency: 'INR',
        name: 'TripTales',
        description: `${trip.title} - 50% Payment`,
        image: '/vite.svg',
        handler: async function (response: any) {
          const { error: updateError } = await supabase
            .from('bookings')
            .update({
              payment_id: response.razorpay_payment_id,
              payment_status: 'partial'
            })
            .eq('id', bookingData.id);

          if (!updateError) {
            const whatsappMessage = `🎉 Booking Confirmed!\n\nHi ${formData.name}!\n\nYour spot for ${trip.title} is confirmed!\n\n💰 Paid: ₹${partialAmount.toLocaleString('en-IN')}\n💰 Balance: ₹${partialAmount.toLocaleString('en-IN')} (due on trip day)\n\nWe'll add you to the trip WhatsApp group soon!\n\nBooking ID: ${bookingData.id}`;

            window.open(`https://wa.me/918879447678?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

            alert('Payment successful! Check your email for confirmation. You will be added to the WhatsApp group shortly.');
            onClose();
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#059669'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error processing your booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = trip.price * formData.participants;
  const partialAmount = totalAmount / 2;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold">Book Your Spot</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6 bg-emerald-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{trip.title}</h3>
            <p className="text-sm text-gray-600">Pay only 50% upfront, rest on trip day</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="9876543210"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Participants</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 1 })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.participants ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.participants && <p className="text-red-500 text-xs mt-1">{errors.participants}</p>}
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Total Amount:</span>
              <span className="font-semibold text-gray-900">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-emerald-600 font-medium">Pay Now (50%):</span>
              <span className="font-bold text-emerald-600 text-xl">₹{partialAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Pay on Trip Day:</span>
              <span className="text-gray-900">₹{partialAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <CreditCard className="w-5 h-5" />
            <span>{loading ? 'Processing...' : 'Proceed to Payment'}</span>
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Secure payment powered by Razorpay. Your data is safe with us.
          </p>
        </form>
      </div>
    </div>
  );
}
