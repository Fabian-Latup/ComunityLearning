import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../lib/useAuth';
import { ArrowRight, Lock } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const login = useAuth((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/community');
        } catch (error) {
            console.error('Failed to log in:', error);
            alert('Failed to log in. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] px-4 py-12">
            <div className="glassmorphism p-8 md:p-12 rounded-[2rem] w-full max-w-md shadow-2xl shadow-blue-900/5">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                        <Lock className="w-5 h-5" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center mb-2 text-[#1d1d1f]">Welcome back</h1>
                <p className="text-center text-gray-500 mb-8 text-sm">Sign in to your Integrity AI account</p>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm mt-2">
                        <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-[#0071e3] focus:ring-[#0071e3] transition-all" />
                            Remember me
                        </label>
                        <a href="#" className="text-[#0071e3] hover:underline font-medium">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#1d1d1f] hover:bg-black text-white rounded-xl font-medium transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                    >
                        {isLoading ? 'Signing in...' : (
                            <>Sign In <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-8 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-[#0071e3] hover:underline font-medium">Join Community</Link>
                </p>
            </div>
        </div>
    );
}
