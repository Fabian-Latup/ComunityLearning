import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Play, Circle, Terminal, Zap, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InteractiveModule() {
    const [activeTab] = useState('video');
    const [progress, setProgress] = useState(0);
    const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'success'>('idle');

    // Simulate video playing progress
    useEffect(() => {
        if (activeTab === 'video' && progress < 100) {
            const timer = setInterval(() => {
                setProgress(prev => Math.min(prev + 1, 100));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [activeTab, progress]);

    const runSimulation = () => {
        setSimulationState('running');
        setTimeout(() => setSimulationState('success'), 3500);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <Link to="/learning" className="hover:text-blue-600 transition-colors">Learning Hub</Link>
                <span>/</span>
                <span className="text-[#1d1d1f]">Automating Customer Service</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content Area */}
                <div className="flex-1 space-y-6">
                    <div className="bg-black/95 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-800 flex flex-col relative aspect-video group">
                        {/* Cinematic Play Overlay */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm cursor-pointer">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                                <Play className="w-8 h-8 text-white ml-2" />
                            </div>
                        </div>
                        {/* Fake Video Box */}
                        <div className="flex-1 w-full h-full relative p-10 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-purple-900/20 to-transparent"></div>
                            <img src="/assets/ai_cursor.png" className="w-32 h-32 opacity-20 filter blur-sm absolute top-10 right-10 animate-pulse" alt="Decorative" />
                            <div className="relative z-10 text-center space-y-4">
                                <h2 className="text-3xl font-bold text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">
                                    Module 3: Deploying the Agent
                                </h2>
                                <p className="text-blue-200/60 font-medium">Time Remaining: 12:45</p>
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-1.5 w-full bg-gray-800 relative z-20">
                            <motion.div
                                className="h-full bg-[#0071e3]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>
                    </div>

                    {/* Interactive "Workable" Simulator */}
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1d1d1f]">Live "Workable" Playground</h3>
                        </div>
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                            Don't just watch. Try it out. Run the simulated AI workflow to see how the customer service agent processes a live ticket from Zendesk.
                        </p>

                        <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm relative overflow-hidden group">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                <span className="ml-2 text-gray-400 text-xs tracking-wider">integrity-agent-cli</span>
                            </div>

                            <div className="space-y-3 min-h-[120px] text-gray-300">
                                <div><span className="text-blue-400">➜</span> <span className="text-green-400">agent</span> execute --workflow="support_tier_1"</div>
                                <AnimatePresence>
                                    {simulationState === 'running' && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 text-gray-400">
                                            <div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-blue-500" /> Fetching latest Zendesk ticket #49281...</div>
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-purple-500" /> Analyzing user sentiment and intent...
                                            </motion.div>
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-teal-500" /> Drafting resolution based on knowledge base...
                                            </motion.div>
                                        </motion.div>
                                    )}
                                    {simulationState === 'success' && (
                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                                            ✓ Success! Drafted reply: "Hi Sarah, I see your order #123 is delayed. I've expedited the shipping and refunded the shipping cost..."
                                            <div className="mt-2 text-xs text-green-500/60">Execution time: 1.2s • Confidence: 98%</div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {simulationState === 'idle' && (
                                <button
                                    onClick={runSimulation}
                                    className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-sans font-medium flex items-center justify-center gap-2 backdrop-blur-sm"
                                >
                                    <Play className="w-4 h-4 fill-white" />
                                    Run Simulation
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:w-80 space-y-6">
                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-[#1d1d1f] text-xl mb-6 flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-[#0071e3]" />
                            Module Progress
                        </h3>

                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-3 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                            {[
                                { title: "Introduction to Agents", completed: true },
                                { title: "Setting up Zendesk API", completed: true },
                                { title: "Deploying the Agent", completed: false, active: true },
                                { title: "Handling Edge Cases", completed: false },
                                { title: "Final Certification", completed: false },
                            ].map((step, i) => (
                                <div key={i} className={`flex items-start gap-4 p-3 rounded-xl transition-colors ${step.active ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-50'}`}>
                                    <div className="mt-0.5 relative z-10 bg-white">
                                        {step.completed ? (
                                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                                        ) : step.active ? (
                                            <div className="w-6 h-6 rounded-full border-2 border-[#0071e3] flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#0071e3] animate-pulse"></div>
                                            </div>
                                        ) : (
                                            <Circle className="w-6 h-6 text-gray-300" />
                                        )}
                                    </div>
                                    <div>
                                        <div className={`font-semibold ${step.active ? 'text-[#0071e3]' : step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {step.title}
                                        </div>
                                        {step.active && <div className="text-xs text-blue-600/80 font-medium mt-1">{progress}% Complete</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
