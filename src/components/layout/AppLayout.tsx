import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Compass, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
export function AppLayout() {
    const location = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Community', path: '/community', icon: MessageSquare },
        { name: 'Learning Hub', path: '/learning', icon: Compass },
    ];

    return (
        <div className="flex flex-col min-h-screen w-full bg-[var(--color-integrity-bg)]">
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 pt-20">
                <div className="flex-1 p-4 md:p-8">
                    <div className="max-w-5xl mx-auto mb-auto pb-12 w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={{
                                    initial: { opacity: 0, y: 15 },
                                    in: { opacity: 1, y: 0 },
                                    out: { opacity: 0, y: -15 },
                                }}
                                transition={{ type: 'tween', ease: 'anticipate', duration: 0.4 }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <Footer />
            </main>

            {/* Mobile Nav - Bottom bar (simplified for MVP) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 flex items-center justify-around px-2 z-50">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/');

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                                isActive ? "text-[#0071e3]" : "text-gray-500"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}
