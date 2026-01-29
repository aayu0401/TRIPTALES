import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plane, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Mock Authentication Logic
        setTimeout(() => {
            let isAuthenticated = false;

            // Check Hardcoded
            if (email === 'admin@triptales.com' && password === 'admin123') {
                isAuthenticated = true;
            }

            // Check Local Storage
            const existingUsersStr = localStorage.getItem('admin_users');
            if (existingUsersStr) {
                const users = JSON.parse(existingUsersStr);
                if (users.some((u: any) => u.email === email && u.password === password)) {
                    isAuthenticated = true;
                }
            }

            if (isAuthenticated) {
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/dashboard');
            } else {
                setError('Invalid credentials. Please try again.');
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg mb-6 transform rotate-3">
                        <Plane size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
                    <p className="text-slate-500 font-medium">Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="admin@triptales.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                    />

                    <div className="relative">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-semibold flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            {error}
                        </div>
                    )}

                    <Button
                        variant="gradient"
                        className="w-full h-12 text-base gap-2 group"
                        loading={loading}
                    >
                        <span>Sign In</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                </form>

                <div className="mt-8 text-center space-y-4">
                    <p className="text-sm text-slate-500 font-medium">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-emerald-600 font-bold hover:underline">
                            Request Access
                        </Link>
                    </p>
                    <p className="text-xs text-slate-400 font-medium pt-2 border-t border-slate-100">Protected Area • Authorized Personnel Only</p>
                </div>
            </motion.div>
        </div>
    );
}
