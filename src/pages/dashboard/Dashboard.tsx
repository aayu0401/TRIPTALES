import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GlassCard } from "@/components/ui/GlassCard"
import { Button } from "@/components/ui/Button"
import { Calendar, Users, Layout, Settings, LogOut, PlusCircle, CheckCircle, IndianRupee, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import TripForm from "@/components/dashboard/TripForm"
import InviteList from "@/components/dashboard/InviteList"
import TripRequests from "@/components/dashboard/TripRequests"

export default function Dashboard() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("bookings")
    const [isCreatingTrip, setIsCreatingTrip] = useState(false)

    const menuItems = [
        { id: "overview", label: "Overview", icon: Layout },
        { id: "bookings", label: "Bookings", icon: Calendar },
        { id: "requests", label: "Trip Requests", icon: MessageSquare },
        { id: "trips", label: "Trips", icon: Calendar },
        { id: "invites", label: "Invites (20)", icon: PlusCircle },
        { id: "settings", label: "Settings", icon: Settings },
    ]

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        TRIPTALES
                    </h1>
                    <p className="text-xs text-slate-400 font-medium">Admin Dashboard</p>
                </div>

                <nav className="flex-1 p-4 space-y-1 mt-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id)
                                setIsCreatingTrip(false)
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${(activeTab === item.id && !isCreatingTrip)
                                ? "bg-emerald-50 text-emerald-600 shadow-sm"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {isCreatingTrip ? "Create New Adventure" : `Dashboard / ${menuItems.find(i => i.id === activeTab)?.label}`}
                        </h2>
                        <p className="text-slate-500">
                            {isCreatingTrip ? "Fill in the details to publish your next trip." : "Manage your travel business with ease."}
                        </p>
                    </div>
                    {!isCreatingTrip && (
                        <Button variant="gradient" className="gap-2" onClick={() => setIsCreatingTrip(true)}>
                            <PlusCircle size={18} />
                            Create New Trip
                        </Button>
                    )}
                </header>

                <AnimatePresence mode="wait">
                    {isCreatingTrip ? (
                        <motion.div
                            key="create-trip"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <GlassCard className="max-w-4xl" hover={false}>
                                <TripForm onSubmit={(data) => {
                                    console.log(data);
                                    setIsCreatingTrip(false);
                                    setActiveTab("trips");
                                }} />
                            </GlassCard>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            {/* Quick Stats (Only on Overview) */}
                            {activeTab === "overview" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { label: "Active Bookings", value: "12", icon: CheckCircle, color: "text-emerald-500" },
                                        { label: "Invites Used", value: "8/20", icon: Users, color: "text-blue-500" },
                                        { label: "Revenue", value: "₹45,000", icon: IndianRupee, color: "text-purple-500" },
                                        { label: "Pending Requests", value: "2", icon: MessageSquare, color: "text-orange-500" },
                                    ].map((stat, i) => (
                                        <GlassCard key={i} className="flex flex-col gap-2">
                                            <div className="flex justify-between items-start">
                                                <span className="text-sm font-medium text-slate-400">{stat.label}</span>
                                                <stat.icon size={16} className={stat.color} />
                                            </div>
                                            <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                                        </GlassCard>
                                    ))}
                                </div>
                            )}

                            {/* Content Mapping */}
                            {activeTab === "invites" ? (
                                <InviteList />
                            ) : activeTab === "requests" ? (
                                <TripRequests />
                            ) : (
                                <GlassCard className="min-h-[400px]">
                                    {activeTab !== "overview" && (
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold text-slate-900 capitalize">{activeTab} Details</h3>
                                        </div>
                                    )}
                                    {activeTab !== "overview" && (
                                        <div className="flex flex-col items-center justify-center h-64 text-slate-300">
                                            <Layout size={48} strokeWidth={1} className="mb-4" />
                                            <p className="text-lg font-medium tracking-tight">Data Integration in Progress</p>
                                            <p className="text-sm">Fetching live updates from your travel database.</p>
                                        </div>
                                    )}
                                    {activeTab === "overview" && (
                                        <div className="flex flex-col items-center justify-center h-64 text-slate-300">
                                            <p className="text-lg font-medium tracking-tight">Welcome to your dashboard</p>
                                        </div>
                                    )}
                                </GlassCard>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}
