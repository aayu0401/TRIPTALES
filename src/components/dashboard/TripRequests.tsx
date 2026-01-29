import { useState } from "react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { Linkedin, Instagram, CheckCircle, XCircle, ExternalLink, Mail, Phone, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Request {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    trip_name: string;
    linkedin_url?: string;
    instagram_handle?: string;
    message?: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

const mockRequests: Request[] = [
    {
        id: "1",
        full_name: "Aisha Sharma",
        email: "aisha.s@example.com",
        phone: "+91 9876543210",
        trip_name: "Spiti Valley Expedition",
        linkedin_url: "https://linkedin.com/in/aisha-sharma-mock",
        instagram_handle: "aishatravels",
        message: "I'm a solo traveler looking to meet new people. I've heard great things about your trips!",
        status: 'pending',
        created_at: "2024-03-15T10:30:00Z"
    },
    {
        id: "2",
        full_name: "Rahul Verma",
        email: "rahul.v@example.com",
        phone: "+91 9898989898",
        trip_name: "Meghalaya Backpacking",
        linkedin_url: "https://linkedin.com/in/rahul-verma-mock",
        instagram_handle: "rahul_v_pics",
        message: "Photographer by profession. Would love to capture the landscapes.",
        status: 'pending',
        created_at: "2024-03-14T14:45:00Z"
    }
]

export default function TripRequests() {
    const [requests, setRequests] = useState<Request[]>(mockRequests)

    const handleAction = (id: string, action: 'approved' | 'rejected') => {
        setRequests(prev => prev.map(req =>
            req.id === id ? { ...req, status: action } : req
        ))
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Clock className="text-orange-500" />
                Pending Join Requests
            </h3>

            <div className="grid gap-6">
                <AnimatePresence>
                    {requests.filter(r => r.status === 'pending').map((request) => (
                        <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            layout
                        >
                            <GlassCard className="p-0 overflow-hidden" hover={false}>
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="space-y-4 flex-1">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h4 className="text-xl font-bold text-slate-900">{request.full_name}</h4>
                                                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200">
                                                        {request.trip_name}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                    <div className="flex items-center gap-1">
                                                        <Mail size={14} />
                                                        {request.email}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Phone size={14} />
                                                        {request.phone}
                                                    </div>
                                                </div>
                                            </div>

                                            {request.message && (
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-600 text-sm italic">
                                                    "{request.message}"
                                                </div>
                                            )}

                                            <div className="flex gap-4">
                                                {request.linkedin_url && (
                                                    <a href={request.linkedin_url} target="_blank" rel="noreferrer"
                                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-sm font-semibold">
                                                        <Linkedin size={16} />
                                                        LinkedIn Profile
                                                        <ExternalLink size={12} className="opacity-50" />
                                                    </a>
                                                )}
                                                {request.instagram_handle && (
                                                    <a href={`https://instagram.com/${request.instagram_handle.replace('@', '')}`} target="_blank" rel="noreferrer"
                                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors text-sm font-semibold">
                                                        <Instagram size={16} />
                                                        @{request.instagram_handle.replace('@', '')}
                                                        <ExternalLink size={12} className="opacity-50" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex md:flex-col justify-end gap-3 min-w-[140px]">
                                            <Button
                                                variant="outline"
                                                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                                                onClick={() => handleAction(request.id, 'rejected')}
                                            >
                                                <XCircle size={18} className="mr-2" />
                                                Reject
                                            </Button>
                                            <Button
                                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
                                                onClick={() => handleAction(request.id, 'approved')}
                                            >
                                                <CheckCircle size={18} className="mr-2" />
                                                Approve
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}

                    {requests.filter(r => r.status === 'pending').length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-slate-400">
                            <p className="text-lg font-medium">No pending requests</p>
                            <p className="text-sm">You're all caught up!</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
