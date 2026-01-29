import { ArrowRight, Users, MapPin, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export default function Hero() {
  return (
    <div className="relative pt-20 pb-32 bg-gradient-to-br from-emerald-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-3xl p-10"
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-sm font-bold mb-6 backdrop-blur-md border border-emerald-200">
              <Sparkles size={14} />
              <span>Hosting 20 Private Invites Only</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Travel with Strangers,
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Return with Friends</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Join curated group trips designed for solo travelers.
            Connect with 20 like-minded people and build your next legacy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="gradient" size="lg" className="w-full sm:w-auto gap-2 group" onClick={() => window.location.href = '#trips'}>
              <span>Explore Adventures</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = '#about'}>
              How It Works
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Users, title: "Small Groups", desc: "15-20 travelers per trip" },
              { icon: MapPin, title: "Curated Tours", desc: "Handpicked experiences" },
              { icon: Calendar, title: "Easy Booking", desc: "Pay 50% now, rest later" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                whileHover={{ y: -5 }}
                className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/40 border-b-white/20"
              >
                <feature.icon className="w-10 h-10 text-emerald-600 mb-4 mx-auto" strokeWidth={1.5} />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
