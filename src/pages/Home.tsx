import { ArrowRight, Video, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn } from '../components/ui/FadeIn';
import { MagneticButton } from '../components/ui/MagneticButton';
import { TiltCard } from '../components/ui/TiltCard';

export default function Home() {
    return (
        <div className="space-y-20 pb-20 relative">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-[-1] pointer-events-none opacity-[0.03] sm:opacity-[0.05]">
                <img src="/assets/bg_graphic.png" alt="" className="w-full min-h-full object-cover object-[center_top] fixed" />
            </div>
            {/* Hero Section */}
            <section className="relative pt-10 pb-16 md:py-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left space-y-8 z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-[#0071e3] text-sm font-semibold shadow-sm"
                        >
                            <Star className="w-4 h-4 fill-[#0071e3]" />
                            <span>The #1 AI Learning Platform for Founders</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#1d1d1f] leading-[1.1]"
                        >
                            Tech, <span className="text-[#0071e3] bg-clip-text text-transparent bg-gradient-to-r from-[#0071e3] to-teal-400">Translated.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
                        >
                            Master practical AI, discuss with peers, and grow your business without the jargon. The ultimate functioning LMS for non-technical leaders.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start z-20"
                        >
                            <MagneticButton strength={40}>
                                <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-[#0071e3] hover:bg-[#0071e3]/90 text-white rounded-full font-medium transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group text-lg">
                                    Start Learning
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.div>
                                </Link>
                            </MagneticButton>
                            <MagneticButton strength={20}>
                                <Link to="/learning" className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-md hover:bg-white text-[#1d1d1f] rounded-full font-medium transition-all shadow-sm border border-gray-200 text-lg">
                                    View Courses
                                </Link>
                            </MagneticButton>
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="flex-1 relative w-full max-w-2xl lg:max-w-none"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-teal-300/20 rounded-[2.5rem] blur-3xl transform rotate-3 scale-105"></div>
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border border-white/60 p-2">
                            <img
                                src="/assets/hero-bg.png"
                                alt="Abstract AI Technology"
                                className="w-full h-auto rounded-[2rem] object-cover aspect-video lg:aspect-square"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trusted By Section */}
            <FadeIn delay={0.1} direction="up">
                <section className="max-w-7xl mx-auto px-4 border-y border-gray-100/80 py-12">
                    <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by 500+ Non-Technical Leaders</p>
                    <div className="flex flex-wrap justify-center lg:justify-between items-center gap-10 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100 duration-500">
                        <div className="text-2xl font-bold font-serif text-[#1d1d1f]">Acme Corp</div>
                        <div className="text-2xl font-bold tracking-tighter text-[#0071e3]">GLOBEX</div>
                        <div className="text-2xl font-black italic text-teal-600">Soylent</div>
                        <div className="text-2xl font-medium tracking-widest text-[#1d1d1f]">INITECH</div>
                        <div className="text-2xl font-bold text-indigo-600">Umbrella</div>
                    </div>
                </section>
            </FadeIn>

            {/* Featured Courses / LMS Section */}
            <section className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <FadeIn delay={0.2} direction="right" className="flex-1 w-full relative">
                        <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl transform -rotate-3 scale-105"></div>
                        <img
                            src="/assets/courses-3d.png"
                            alt="Digital Learning Modules"
                            className="relative z-10 w-full rounded-3xl shadow-2xl border border-white/60 object-cover"
                        />
                    </FadeIn>
                    <div className="flex-1 space-y-8">
                        <FadeIn delay={0.3} direction="left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold tracking-wide uppercase mb-4">
                                Premium LMS
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] leading-tight">World-Class Learning Experience</h2>
                            <p className="text-xl text-gray-500 mt-6 leading-relaxed">
                                Dive into highly curated learning paths designed specifically for busy founders.
                                Track your progress, earn certificates, and master AI implementation in hours, not months.
                            </p>

                            <div className="mt-10 space-y-4">
                                {[
                                    { title: "AI Fundamentals for Non-Techies", lessons: 12, time: "2h 15m" },
                                    { title: "Automating Customer Service", lessons: 8, time: "1h 45m" },
                                    { title: "Advanced Data Analysis Without Code", lessons: 15, time: "3h 30m" }
                                ].map((course, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0071e3] group-hover:bg-[#0071e3] group-hover:text-white transition-colors duration-300">
                                                <Video className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-[#1d1d1f] text-lg">{course.title}</div>
                                                <div className="text-sm text-gray-400 mt-0.5">{course.lessons} Lessons • {course.time}</div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#0071e3] transition-colors group-hover:translate-x-1 duration-300" />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10">
                                <Link to="/learning" className="inline-flex flex-col group">
                                    <span className="flex items-center gap-2 text-[#0071e3] font-semibold text-lg hover:text-blue-700 transition-colors">
                                        View all Masterclasses <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="h-0.5 w-0 bg-[#0071e3] group-hover:w-full transition-all duration-300 mt-1"></div>
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 bg-gray-50/80 py-24 rounded-[3rem] border border-gray-100 mb-10 mt-10">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f]">Everything you need to succeed</h2>
                    <p className="text-xl text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed">More than just courses. A complete ecosystem to support your business transformation and daily operations.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 px-4 lg:px-10">
                    <FadeIn delay={0.1}>
                        <TiltCard maxRotation={8}>
                            <div className="bg-white overflow-hidden flex flex-col rounded-[2rem] group hover:shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-300 h-full border border-gray-100/80 hover:border-blue-100">
                                <div className="w-full h-56 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden flex items-center justify-center p-4">
                                    <img src="/assets/feature_community.png" alt="Private Community" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 drop-shadow-sm pointer-events-none" />
                                </div>
                                <div className="p-8 pt-6 flex-1 bg-white relative z-10 border-t border-gray-50/50">
                                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">Private Community</h3>
                                    <p className="text-gray-500 leading-relaxed text-lg">
                                        Connect with like-minded business leaders. Share wins, ask questions, and learn from each other in a safe, moderated space.
                                    </p>
                                </div>
                            </div>
                        </TiltCard>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <TiltCard maxRotation={8}>
                            <div className="bg-white overflow-hidden flex flex-col rounded-[2rem] group hover:shadow-2xl hover:shadow-purple-500/10 transition-shadow duration-300 h-full border border-gray-100/80 hover:border-purple-100">
                                <div className="w-full h-56 bg-gradient-to-br from-purple-50 to-white relative overflow-hidden flex items-center justify-center p-4">
                                    <img src="/assets/feature_workflows.png" alt="Vetted Workflows" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 drop-shadow-sm pointer-events-none" />
                                </div>
                                <div className="p-8 pt-6 flex-1 bg-white relative z-10 border-t border-gray-50/50">
                                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">Vetted Workflows</h3>
                                    <p className="text-gray-500 leading-relaxed text-lg">
                                        We test hundreds of tools so you don't have to. Get immediate access to secure, battle-tested AI workflows for your team.
                                    </p>
                                </div>
                            </div>
                        </TiltCard>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <TiltCard maxRotation={8}>
                            <div className="bg-white overflow-hidden flex flex-col rounded-[2rem] group hover:shadow-2xl hover:shadow-teal-500/10 transition-shadow duration-300 h-full border border-gray-100/80 hover:border-teal-100">
                                <div className="w-full h-56 bg-gradient-to-br from-teal-50 to-white relative overflow-hidden flex items-center justify-center p-4">
                                    <img src="/assets/feature_assets.png" alt="Bespoke Assets" className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 drop-shadow-sm pointer-events-none" />
                                </div>
                                <div className="p-8 pt-6 flex-1 bg-white relative z-10 border-t border-gray-50/50">
                                    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">Bespoke Assets</h3>
                                    <p className="text-gray-500 leading-relaxed text-lg">
                                        Grab our bespoke PDF cheat sheets and prompt templates. Save time and get straight to implementing AI directly.
                                    </p>
                                </div>
                            </div>
                        </TiltCard>
                    </FadeIn>
                </div>
            </section>

            {/* Monthly AMA Banner */}
            <FadeIn delay={0.4} direction="up" duration={0.6}>
                <section className="max-w-7xl mx-auto px-4 mt-20 mb-10">
                    <div className="rounded-[3rem] overflow-hidden relative shadow-2xl shadow-blue-900/20 bg-gray-900 min-h-[450px] flex items-center">
                        {/* Background Image Setup */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/assets/ama-bg.png"
                                alt="Networking Space"
                                className="w-full h-full object-cover opacity-50 mix-blend-luminosity mix-blend-color-dodge"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>
                        </div>

                        <div className="relative z-10 px-8 py-16 md:p-20 md:w-2/3 text-white">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="inline-block px-5 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm font-semibold tracking-widest text-blue-200 uppercase mb-8 backdrop-blur-md"
                            >
                                Member Exclusive
                            </motion.span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Monthly Ask Me Anything</h2>
                            <p className="text-gray-300 text-xl font-medium mb-10 leading-relaxed max-w-xl">
                                Join our live monthly sessions with leading AI and finance experts. Get your specific business challenges solved in real-time.
                            </p>
                            <Link to="/register">
                                <motion.div
                                    whileHover={{ scale: 1.02, backgroundColor: "#ffffff", color: "#1d1d1f" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex px-10 py-5 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-full font-bold transition-all shadow-xl text-lg hover:shadow-white/20"
                                >
                                    Unlock Access Now
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </section>
            </FadeIn>
        </div>
    );
}
