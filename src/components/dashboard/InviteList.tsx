import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { UserPlus, Send, Mail, CheckCircle, Clock } from "lucide-react"

interface Invite {
    id: string;
    email: string;
    status: 'pending' | 'accepted' | 'expired';
    sentAt: string;
}

export default function InviteList() {
    // Mock data for now
    const invites: Invite[] = [
        { id: "1", email: "alex@example.com", status: "accepted", sentAt: "2024-01-20" },
        { id: "2", email: "sarah@wander.com", status: "pending", sentAt: "2024-01-25" },
    ]

    const remaining = 20 - invites.length;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-900">Invite Management</h3>
                    <p className="text-sm text-slate-500">You can host up to 20 private invites.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining</p>
                        <p className="text-2xl font-black text-emerald-600">{remaining}/20</p>
                    </div>
                    <Button variant="gradient" className="gap-2" size="sm">
                        <UserPlus size={16} />
                        Send Invite
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {invites.map((invite) => (
                    <GlassCard key={invite.id} className="p-4" hover={false}>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${invite.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                <Mail size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-slate-900 truncate">{invite.email}</p>
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                    {invite.status === 'accepted' ? (
                                        <><CheckCircle size={12} className="text-emerald-500" /> Accepted</>
                                    ) : (
                                        <><Clock size={12} className="text-blue-500" /> Pending</>
                                    )}
                                    <span>• Sent {invite.sentAt}</span>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300">
                                <Send size={14} />
                            </Button>
                        </div>
                    </GlassCard>
                ))}

                {/* Empty Slots */}
                {Array.from({ length: Math.min(3, remaining) }).map((_, i) => (
                    <div key={`empty-${i}`} className="border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-slate-300">
                        <UserPlus size={24} className="mb-2 opacity-20" />
                        <span className="text-xs font-semibold uppercase tracking-widest opacity-30">Slot Available</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
