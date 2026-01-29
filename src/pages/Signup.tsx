import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion } from 'framer-motion';

export default function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        // Mock Registration Logic
        setTimeout(() => {
            try {
                // Get existing users or init empty array
                const existingUsersStr = localStorage.getItem('admin_users');
                const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];

                // Check if email already exists
                if (existingUsers.some((u: any) => u.email === email) || email === 'admin@triptales.com') {
                    setError("Account with this email already exists");
                    setLoading(false);
                    return;
                }

                // Add new user
                const newUser = { name, email, password };
                localStorage.setItem('admin_users', JSON.stringify([...existingUsers, newUser]));

                // Auto-login? Or redirect to login? Let's redirect to login for flow.
                navigate('/login');
            } catch (err) {
                setError("Failed to create account. Please try again.");
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-600 text-white shadow-lg mb-6 transform -rotate-3">
                        <Users size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Join the Team</h1>
                    <p className="text-slate-500 font-medium">Create an admin account to manage stories</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                    <Input
                        label="Full Name"
                        placeholder="Sarah Smith"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="sarah@triptales.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                    />

                    {error && (
                        <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-semibold flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            {error}
                        </div>
                    )}

                    <Button
                        variant="gradient"
                        className="w-full h-12 text-base gap-2 group mt-2"
                        loading={loading}
                    >
                        <span>Create Account</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </Button>
                </form>

                <div className="mt-8 text-center bg-white/40 rounded-xl p-4 border border-white/50">
                    <p className="text-sm text-slate-500 font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-emerald-600 font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
