import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, MessageSquare, LayoutDashboard, User, LogOut } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useAuth } from '../../lib/useAuth';

export function Navbar() {
    const location = useLocation();
    const { isAuthenticated, user, logout } = useAuth();

    // Scroll handling for dynamic navbar
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setIsScrolled(latest > 20);
    });

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Community', path: '/community', icon: MessageSquare },
        { name: 'Learning Hub', path: '/learning', icon: Compass },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
                isScrolled
                    ? "py-3 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
                    : "py-5 bg-transparent border-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0071e3] to-teal-400 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                            IAI
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden md:block text-[#1d1d1f]">Integrity AI</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-2 bg-gray-100/50 p-1.5 rounded-full border border-gray-200/50 backdrop-blur-md">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                        isActive ? "text-white" : "text-gray-600 hover:text-gray-900"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-[#1d1d1f] rounded-full z-0 shadow-md"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4 bg-white/50 p-1.5 pr-2 rounded-full border border-gray-200/80 backdrop-blur-md shadow-sm">
                            <div className="hidden sm:flex items-center gap-1 pl-2">
                                <Link to="/dashboard" className="p-2 text-gray-400 hover:text-[#0071e3] transition-colors rounded-full hover:bg-blue-50">
                                    <LayoutDashboard className="w-4 h-4" />
                                </Link>
                                <button className="p-2 text-gray-400 hover:text-[#0071e3] transition-colors rounded-full hover:bg-blue-50">
                                    <User className="w-4 h-4" />
                                </button>
                                <button onClick={logout} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50">
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="hidden sm:block w-px h-6 bg-gray-200/80"></div>
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <div className="text-xs font-bold text-[#1d1d1f] leading-tight">{user?.name}</div>
                                    <div className="text-[10px] text-[#0071e3] font-semibold uppercase tracking-wider">{user?.plan}</div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071e3] to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md cursor-pointer hover:scale-105 transition-transform">
                                    {user?.avatar}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-[#1d1d1f] transition-colors py-2 px-4 rounded-full hover:bg-gray-100">
                                Log in
                            </Link>
                            <Link to="/register" className="text-sm font-bold bg-[#1d1d1f] hover:bg-black text-white px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10 flex items-center gap-2">
                                Join Community
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.header>
    );
}
