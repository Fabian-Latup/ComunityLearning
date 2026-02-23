import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../lib/useAuth';
import { ArrowRight, UserPlus, ShieldCheck } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const register = useAuth((state) => state.register);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register(name, email, password);
            navigate('/community');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] px-4 py-8">
            <div className="glassmorphism p-8 md:p-12 rounded-[2rem] w-full max-w-md shadow-2xl shadow-blue-900/5">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#0071e3]">
                        <UserPlus className="w-5 h-5" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center mb-2 text-[#1d1d1f]">Become a Member</h1>
                <p className="text-center text-gray-500 mb-8 text-sm">Join the Integrity AI learning community</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Full Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20 transition-all outline-none bg-white/50"
                            placeholder="Jane Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20 transition-all outline-none bg-white/50"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20 transition-all outline-none bg-white/50"
                            placeholder="Create a strong password"
                        />
                    </div>

                    <div className="flex items-start gap-3 text-sm mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-gray-600 text-xs leading-relaxed">
                            By registering, you agree to our <a href="#" className="text-[#0071e3] hover:underline">Community Rules</a> and <a href="#" className="text-[#0071e3] hover:underline">Privacy Policy</a>. We never share your data.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#0071e3] hover:bg-[#0071e3]/90 text-white rounded-xl font-medium transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-md shadow-blue-500/20"
                    >
                        {isLoading ? 'Creating account...' : (
                            <>Join Community <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-8 text-sm">
                    Already a member?{' '}
                    <Link to="/login" className="text-[#1d1d1f] hover:underline font-medium">Sign in here</Link>
                </p>
            </div>
        </div>
    );
}
