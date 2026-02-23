import { Users, Video, FileText, Settings, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../components/ui/FadeIn';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Members', value: '1,248', trend: '+12%', icon: Users },
        { label: 'Active Subscriptions', value: '892', trend: '+8%', icon: Activity },
        { label: 'Video Views', value: '45.2k', trend: '+24%', icon: Video },
        { label: 'PDF Downloads', value: '3,842', trend: '+5%', icon: FileText },
    ];

    return (
        <div className="space-y-8 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold tracking-tight text-[#1d1d1f]">Dashboard Overview</h1>
                <p className="text-gray-500 mt-2 text-lg font-medium">Manage your community and learning platform.</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <FadeIn key={i} delay={i * 0.1}>
                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="glassmorphism p-6 rounded-3xl flex flex-col justify-between h-full bg-white hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-100 transition-all cursor-default"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 rounded-xl text-[#0071e3]">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex items-center text-emerald-600 text-[11px] font-bold tracking-wider uppercase bg-emerald-50 px-2 py-1 rounded-md">
                                        {stat.trend} <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-[#1d1d1f] mb-1 tracking-tight">{stat.value}</div>
                                    <div className="text-sm font-semibold text-gray-500">{stat.label}</div>
                                </div>
                            </motion.div>
                        </FadeIn>
                    )
                })}
            </div>

            {/* Quick Actions & Recent Members */}
            <div className="grid md:grid-cols-3 gap-6">
                <FadeIn delay={0.4} className="col-span-2">
                    <div className="glassmorphism p-6 md:p-8 rounded-3xl bg-white h-full">
                        <h2 className="text-xl font-bold text-[#1d1d1f] mb-6">Recent Members</h2>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 5, backgroundColor: 'rgba(249, 250, 251, 1)' }}
                                    className="flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-gray-100 hover:shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-md ${i % 2 === 0 ? 'bg-gradient-to-br from-[#0071e3] to-blue-400' : 'bg-gradient-to-br from-indigo-500 to-purple-500'
                                            }`}>
                                            {String.fromCharCode(64 + i)}M
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#1d1d1f] text-base">New Member {i}</div>
                                            <div className="text-sm font-medium text-gray-400">Joined today</div>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 rounded-lg text-xs font-bold tracking-wide uppercase shadow-sm border border-gray-200/50">Pro Plan</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.5}>
                    <div className="glassmorphism p-6 md:p-8 rounded-3xl flex flex-col gap-3 h-full bg-white">
                        <h2 className="text-xl font-bold text-[#1d1d1f] mb-3">Quick Actions</h2>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-2xl text-left transition-all group shadow-sm"
                        >
                            <div className="p-2 bg-white rounded-xl shadow-sm text-gray-400 group-hover:text-[#0071e3] transition-colors">
                                <Video className="w-5 h-5" />
                            </div>
                            <div className="font-semibold text-gray-700 group-hover:text-[#0071e3] transition-colors">Upload Video</div>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-2xl text-left transition-all group shadow-sm"
                        >
                            <div className="p-2 bg-white rounded-xl shadow-sm text-gray-400 group-hover:text-[#0071e3] transition-colors">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="font-semibold text-gray-700 group-hover:text-[#0071e3] transition-colors">Add PDF Resource</div>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-2xl text-left transition-all group shadow-sm"
                        >
                            <div className="p-2 bg-white rounded-xl shadow-sm text-gray-400 group-hover:text-[#0071e3] transition-colors">
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="font-semibold text-gray-700 group-hover:text-[#0071e3] transition-colors">Manage Members</div>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-2xl text-left transition-all group shadow-sm mt-auto"
                        >
                            <div className="p-2 bg-white rounded-xl shadow-sm text-gray-400 group-hover:text-gray-900 transition-colors">
                                <Settings className="w-5 h-5" />
                            </div>
                            <div className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">Platform Settings</div>
                        </motion.button>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
