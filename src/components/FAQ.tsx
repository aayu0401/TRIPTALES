import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does the payment work?",
    answer: "We offer flexible payments! Pay only 50% of the trip cost upfront to secure your spot. The remaining 50% is due on the day of the trip. We accept payments through Razorpay, which supports UPI, cards, net banking, and wallets."
  },
  {
    question: "Is it safe to travel with strangers?",
    answer: "Absolutely! All our travelers go through a verification process. We maintain small group sizes (15-20 people) and have experienced trip coordinators accompanying every journey. Plus, we have a WhatsApp group created before the trip so everyone can connect beforehand."
  },
  {
    question: "What if I'm traveling solo?",
    answer: "Most of our travelers are solo adventurers! That's what makes TripTales special. You'll join a group of like-minded people, and our itineraries are designed with ice-breakers and group activities to help everyone bond quickly."
  },
  {
    question: "What's included in the trip cost?",
    answer: "Each trip varies, but typically includes accommodation, most meals, transportation during the trip, entry tickets to attractions, activities mentioned in the itinerary, and a dedicated trip coordinator. Flight tickets and personal expenses are usually excluded."
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, cancellations are allowed based on our policy: 100% refund if canceled 30+ days before trip, 50% refund if canceled 15-30 days before, and no refund within 15 days of the trip. Contact us via WhatsApp for cancellations."
  },
  {
    question: "How do I know who else is joining?",
    answer: "Once you book, you'll be added to a WhatsApp group with all other participants and the trip coordinator. This usually happens 2-3 weeks before the trip, giving everyone time to connect and get excited together!"
  },
  {
    question: "What is the age group of travelers?",
    answer: "Most of our travelers are between 22-35 years old, though we welcome everyone above 18 who loves adventure and making new friends. The vibe is young, energetic, and open-minded."
  },
  {
    question: "Are accommodations shared?",
    answer: "Yes, accommodations are typically shared (2-3 people per room, same gender) to keep costs affordable and encourage bonding. Private rooms may be available at an additional cost for some trips - check trip details or contact us."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about TripTales
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-50 to-white rounded-xl overflow-hidden border border-gray-200 hover:border-emerald-300 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-600 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
