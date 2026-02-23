import { Play, Download, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FadeIn } from '../../components/ui/FadeIn';

const mockModules = [
    {
        id: 'm1',
        title: 'AI Fundamentals for Non-Techies',
        description: 'Learn exactly what AI is, how it works, and what it can do for your small business. No jargon allowed.',
        progress: 100,
        lessons: [
            { id: '1', title: 'What is Generative AI?', duration: '12 min', type: 'video', isCompleted: true },
            { id: '2', title: 'Prompting 101 Cheat Sheet', type: 'pdf', isCompleted: true },
        ]
    },
    {
        id: 'm2',
        title: 'Automating Customer Service',
        description: 'A step-by-step guide to setting up a custom GPT to handle your level 1 customer queries.',
        progress: 40,
        lessons: [
            { id: '3', title: 'Building your Knowledge Base', duration: '15 min', type: 'video', isCompleted: true },
            { id: '4', title: 'Connecting to your CRM', duration: '22 min', type: 'video', isCompleted: false },
            { id: '5', title: 'Quality Assurance Process', type: 'pdf', isCompleted: false },
        ]
    },
    {
        id: 'm3',
        title: 'Advanced Data Analysis',
        description: 'Using AI to finally make sense of your spreadsheets and analytics without learning Python.',
        progress: 0,
        isLocked: true,
        lessons: [
            { id: '6', title: 'Excel vs ChatGPT', duration: '18 min', type: 'video', isCompleted: false },
            { id: '7', title: 'Financial Modeling Templates', type: 'pdf', isCompleted: false },
        ]
    },
    {
        id: 'm4',
        title: 'Social Media Content Creation at Scale',
        description: 'Generate a month\'s worth of compelling social media posts and visuals in under an hour.',
        progress: 0,
        isLocked: false,
        lessons: [
            { id: '8', title: 'Brand Voice Emulation', duration: '14 min', type: 'video', isCompleted: false },
            { id: '9', title: 'Image Generation Mastery', duration: '20 min', type: 'video', isCompleted: false },
            { id: '10', title: 'Content Calendar System', type: 'pdf', isCompleted: false },
        ]
    },
    {
        id: 'm5',
        title: 'Sales Copywriting with AI',
        description: 'Write high-converting landing pages, emails, and ad copy using advanced prompting techniques.',
        progress: 0,
        isLocked: true,
        lessons: [
            { id: '11', title: 'The PAS Framework Prompt', duration: '16 min', type: 'video', isCompleted: false },
            { id: '12', title: 'A/B Testing Variations', duration: '11 min', type: 'video', isCompleted: false },
        ]
    },
    {
        id: 'm6',
        title: 'Automated Lead Qualification',
        description: 'Use AI chatbots to pre-qualify inbound leads 24/7 so you only talk to ready buyers.',
        progress: 0,
        isLocked: true,
        lessons: [
            { id: '13', title: 'Defining Your ICP', type: 'pdf', isCompleted: false },
            { id: '14', title: 'Setting up the Qualification Flow', duration: '28 min', type: 'video', isCompleted: false },
            { id: '15', title: 'Handoff to Sales', duration: '10 min', type: 'video', isCompleted: false }
        ]
    }
];

export default function LearningHub() {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold tracking-tight text-[#1d1d1f]">Learning Hub</h1>
                <p className="text-gray-500 mt-2 text-lg font-medium">Your library of jargon-free tech guides and resources.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockModules.map((module, index) => (
                    <FadeIn key={module.id} delay={index * 0.1}>
                        <div
                            className={`glassmorphism rounded-3xl flex flex-col overflow-hidden transition-all duration-300 h-full ${module.isLocked
                                ? 'opacity-75 grayscale-[0.5] hover:opacity-100 hover:grayscale-0 border-gray-100'
                                : 'hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 group bg-white'
                                }`}
                        >
                            {/* Header Area */}
                            <div className="p-6 pb-4 border-b border-gray-100/50 relative bg-gradient-to-br from-white to-gray-50">
                                {module.isLocked && (
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-gray-900/10 rounded-full flex items-center justify-center backdrop-blur-sm z-10">
                                        <Lock className="w-4 h-4 text-gray-700" />
                                    </div>
                                )}
                                <h2 className={`text-xl font-bold mb-2 leading-tight ${module.isLocked ? 'text-gray-600' : 'text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors'}`}>
                                    {module.title}
                                </h2>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed h-10 font-medium">{module.description}</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="bg-gray-100/50 h-1.5 w-full overflow-hidden shrink-0">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${module.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                                    className={`h-full shadow-[0_0_10px_rgba(0,113,227,0.5)] ${module.progress === 100 ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-[#0071e3]'}`}
                                />
                            </div>

                            {/* Lessons List */}
                            <div className="p-5 flex-1 flex flex-col bg-white/50 backdrop-blur-md">
                                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 px-1">
                                    <span>{module.lessons.length} Lessons</span>
                                    <span className={module.progress === 100 ? 'text-emerald-500' : 'text-[#0071e3]'}>{module.progress}%</span>
                                </div>
                                <ul className="space-y-1.5 mb-6 flex-1">
                                    {module.lessons.map((lesson) => (
                                        <li
                                            key={lesson.id}
                                            className={`flex items-center justify-between p-2.5 rounded-xl transition-all text-sm ${module.isLocked ? 'pointer-events-none' : 'hover:bg-blue-50/50 cursor-pointer group/lesson'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 truncate">
                                                <div className="shrink-0 transition-transform group-hover/lesson:scale-110">
                                                    {lesson.isCompleted ? (
                                                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                                                    ) : lesson.type === 'video' ? (
                                                        <Play className="w-4.5 h-4.5 text-gray-400 fill-gray-100 group-hover/lesson:text-blue-500 group-hover/lesson:fill-blue-100 transition-colors" />
                                                    ) : (
                                                        <Download className="w-4.5 h-4.5 text-gray-400 group-hover/lesson:text-blue-500 transition-colors" />
                                                    )}
                                                </div>
                                                <span className={`truncate font-semibold transition-colors ${lesson.isCompleted
                                                    ? 'text-gray-400 line-through decoration-gray-300'
                                                    : 'text-gray-700 group-hover/lesson:text-[#0071e3]'
                                                    }`}>
                                                    {lesson.title}
                                                </span>
                                            </div>
                                            {lesson.duration && (
                                                <span className="text-[11px] text-gray-400 ml-3 shrink-0 font-bold bg-gray-100/80 px-2 py-0.5 rounded-md">
                                                    {lesson.duration}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>

                                <motion.button
                                    whileHover={!module.isLocked ? { scale: 1.02 } : {}}
                                    whileTap={!module.isLocked ? { scale: 0.98 } : {}}
                                    disabled={module.isLocked}
                                    onClick={() => {
                                        if (module.id === 'm2') {
                                            navigate('/learning/automating-customer-service');
                                        }
                                    }}
                                    className={`w-full py-3 rounded-2xl text-sm font-semibold transition-all mt-auto ${module.isLocked
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200/50'
                                        : module.progress === 100
                                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                                            : 'bg-[#1d1d1f] text-white hover:bg-black shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    {module.progress === 100 ? 'Review Module' : module.isLocked ? 'Upgrade to Unlock' : 'Continue Learning'}
                                </motion.button>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    );
}
