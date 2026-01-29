import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

export default function Contact() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Message sent! We'll get back to you shortly.");
        }, 1500);
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-slate-900 text-white">
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm tracking-wide uppercase border border-emerald-500/30 mb-6">
                                Get in Touch
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                                Have questions about your next <span className="text-emerald-400">Adventure?</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                                Whether you're curious about an itinerary, payment options, or just want to verify our vibe, we're here to help.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Mail, label: "Email Us", value: "hello@triptales.com" },
                                { icon: Phone, label: "Call Us", value: "+91 98765 43210" },
                                { icon: MapPin, label: "Visit Us", value: "Hauz Khas Village, New Delhi" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{item.label}</p>
                                        <p className="text-lg font-semibold">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl relative"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <MessageSquare size={120} />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">Your Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-300 ml-1">Your Email</label>
                                    <input type="email" placeholder="john@example.com" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300 ml-1">Subject</label>
                                <select className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors">
                                    <option>General Enquiry</option>
                                    <option>Trip Customization</option>
                                    <option>Partnership</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300 ml-1">Message</label>
                                <textarea rows={4} placeholder="How can we help you?" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none" required></textarea>
                            </div>

                            <Button variant="gradient" className="w-full h-14 text-lg font-bold shadow-xl shadow-emerald-500/20" loading={loading}>
                                Send Message <Send className="ml-2" size={18} />
                            </Button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
