import { useState, useEffect } from 'react';
import { MessageSquare, Heart, Clock, MoreHorizontal, Search, Settings, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../lib/useAuth';

interface Post {
    id: string;
    title: string;
    excerpt: string;
    author: {
        name: string;
        avatar: string;
        isPro: boolean;
    };
    category: string;
    likes: number;
    comments: number;
    timestamp: any;
}

const categories = ['All Topics', 'AI Workflows', 'Tech News', 'Operations', 'Introduce Yourself'];

export default function ForumList() {
    const [activeTab, setActiveTab] = useState('All Topics');
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [category, setCategory] = useState('AI Workflows');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Post[];
            setPosts(newPosts);
        });
        return () => unsubscribe();
    }, []);

    // Simulate online typing 
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.6) {
                const names = ["Sarah J.", "Mike T.", "Elena R.", "David K.", "Lisa W."];
                const active = names.sort(() => 0.5 - Math.random()).slice(0, 1 + Math.floor(Math.random() * 2));
                setTypingUsers(active);
                setTimeout(() => setTypingUsers([]), 4000 + Math.random() * 3000);
            }
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !excerpt.trim() || !user) return;

        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'posts'), {
                title,
                excerpt,
                author: {
                    name: user.name,
                    avatar: user.avatar,
                    isPro: user.plan === 'pro'
                },
                category,
                likes: 0,
                comments: 0,
                timestamp: serverTimestamp()
            });
            setTitle('');
            setExcerpt('');
            setCategory('AI Workflows');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding document: ', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const seedDatabase = async () => {
        if (!window.confirm('Are you sure you want to seed 40 dummy posts?')) return;
        setIsSubmitting(true);
        const dummyPosts = [
            // AI Workflows
            { title: "Automating Customer Onboarding with Zapier", excerpt: "I recently set up a Zapier flow that triggers when a Stripe payment succeeds, creating a new user in Firebase and sending an automated welcome email via SendGrid. It has saved us about 10 hours a week! Anyone else using similar stacks?", category: "AI Workflows", author: { name: "Sarah J.", avatar: "SJ", isPro: true } },
            { title: "Best AI models for text summarization?", excerpt: "I'm looking to integrate text summarization into our internal knowledge base. Has anyone compared Claude 3 Haiku vs GPT-4o-mini for this specific use case regarding cost and latency?", category: "AI Workflows", author: { name: "Mike T.", avatar: "MT", isPro: false } },
            { title: "Using Midjourney for Marketing Assets", excerpt: "Our engagement went up 40% after we started generating our blog headers with Midjourney rather than using stock photos. Happy to share my prompt structures if anyone is interested.", category: "AI Workflows", author: { name: "Elena R.", avatar: "ER", isPro: true } },
            { title: "AI agents for initial sales outreach", excerpt: "Has anyone successfully deployed an AI agent for cold email outreach that doesn't sound completely robotic? Looking for platforms or custom build advice.", category: "AI Workflows", author: { name: "David K.", avatar: "DK", isPro: false } },
            { title: "Integrating OpenAI with Retool", excerpt: "Struggling with the API rate limits when running batch processes in Retool. Are there better ways to queue these requests or should I just build a custom backend?", category: "AI Workflows", author: { name: "Lisa W.", avatar: "LW", isPro: true } },
            { title: "Copilot vs Cursor for daily development", excerpt: "I've been using GitHub Copilot for a year but just heard about Cursor. Is it worth the switch for a React/Node stack?", category: "AI Workflows", author: { name: "James H.", avatar: "JH", isPro: true } },
            { title: "Automated QA testing with AI", excerpt: "Can AI reliably replace manual QA for simple web interfaces yet? We are spending way too much time on regression testing.", category: "AI Workflows", author: { name: "Anna C.", avatar: "AC", isPro: false } },
            { title: "Prompt Engineering tips for structured JSON output", excerpt: "Even with the 'JSON mode', sometimes the LLM hallucinates keys. What are your best practices for enforcing strict schemas?", category: "AI Workflows", author: { name: "Tom B.", avatar: "TB", isPro: true } },
            { title: "Local LLMs vs Cloud APIs", excerpt: "With Llama 3 out, is anyone moving their production workloads to self-hosted models to save on inference costs?", category: "AI Workflows", author: { name: "Chris P.", avatar: "CP", isPro: false } },
            { title: "Automating Social Media Posts", excerpt: "What tool is best for taking a blog post URL and automatically generating 3 tweets, a LinkedIn post, and scheduling them?", category: "AI Workflows", author: { name: "Rachel M.", avatar: "RM", isPro: true } },

            // Tech News
            { title: "Apple's latest event thoughts?", excerpt: "What did everyone think about the new announcements? Personally, I think the new silicon is impressive but the software feels exactly the same.", category: "Tech News", author: { name: "Sam L.", avatar: "SL", isPro: false } },
            { title: "The rise of Rust in web development", excerpt: "Seeing a lot of new tooling being rewritten in Rust (Turbopack, swc). Should web developers be learning Rust now?", category: "Tech News", author: { name: "Olivia G.", avatar: "OG", isPro: true } },
            { title: "React 19 RC is out", excerpt: "Has anyone tried the new React 19 features in a side project yet? The new form actions look like a game changer.", category: "Tech News", author: { name: "Kevin D.", avatar: "KD", isPro: true } },
            { title: "Google I/O 2026 predictions", excerpt: "With all the AI pushes recently, what are we expecting from Google this year? More Gemini integration across Workspace?", category: "Tech News", author: { name: "Maria S.", avatar: "MS", isPro: false } },
            { title: "The end of cookies is finally here", excerpt: "How are you preparing your analytics and ad tracking for the third-party cookie deprecation?", category: "Tech News", author: { name: "Brian F.", avatar: "BF", isPro: true } },
            { title: "Vercel's new pricing model", excerpt: "Anyone else looking closely at the recent changes? We might need to migrate off if our bandwidth costs keep scaling.", category: "Tech News", author: { name: "Emma N.", avatar: "EN", isPro: false } },
            { title: "State of CSS in 2026", excerpt: "Tailwind vs Vanilla CSS vs CSS-in-JS. What's your current stack and why?", category: "Tech News", author: { name: "Alex V.", avatar: "AV", isPro: true } },
            { title: "WebAssembly gaining traction", excerpt: "Figma uses it heavily. Where else are you seeing WebAssembly being used effectively in the wild?", category: "Tech News", author: { name: "Nina K.", avatar: "NK", isPro: false } },
            { title: "The shift away from SPAs", excerpt: "Is the industry really moving back to server-rendered multi-page applications, or is the hype around HTMX and similar tech overblown?", category: "Tech News", author: { name: "Paul Y.", avatar: "PY", isPro: true } },
            { title: "Thoughts on the new EU tech regulations", excerpt: "How are the new compliance rules affecting your SaaS platforms? We had to overhaul our consent banners again.", category: "Tech News", author: { name: "Sophie U.", avatar: "SU", isPro: false } },

            // Operations
            { title: "Handling remote team timezone overlaps", excerpt: "We have developers in UTC+10, UTC+0, and UTC-8. Standups are impossible. How do you handle sync meetings?", category: "Operations", author: { name: "Marcus A.", avatar: "MA", isPro: true } },
            { title: "Best tools for internal documentation", excerpt: "Notion vs Confluence vs Slite? We need something that scales well for a team of 50 without becoming a messy graveyard of outdated docs.", category: "Operations", author: { name: "Jessica T.", avatar: "JT", isPro: false } },
            { title: "Onboarding checklist templates", excerpt: "Does anyone have a solid template for onboarding new engineers? Getting them access to all repos, AWS, Jira, etc. takes days.", category: "Operations", author: { name: "Ryan C.", avatar: "RC", isPro: true } },
            { title: "SOC2 Compliance tools", excerpt: "Looking into Vanta vs Drata for our first SOC2 audit. Any strong preferences or horror stories?", category: "Operations", author: { name: "Kelly O.", avatar: "KO", isPro: false } },
            { title: "Balancing feature work and tech debt", excerpt: "What's a good ratio? We currently dedicate 20% of every sprint to tech debt but it never feels like enough.", category: "Operations", author: { name: "Ian W.", avatar: "IW", isPro: true } },
            { title: "Transitioning to a 4-day work week", excerpt: "We are considering trialing this for the summer. For those who have done it, did productivity drop or just idle time?", category: "Operations", author: { name: "Chloe F.", avatar: "CF", isPro: true } },
            { title: "Performance review frameworks", excerpt: "Looking for alternatives to the traditional annual review. Continuous feedback sounds great in theory but hard to mandate.", category: "Operations", author: { name: "Victor H.", avatar: "VH", isPro: false } },
            { title: "Managing software subscriptions", excerpt: "We just audited our SaaS spend and found 5 abandonware subscriptions we're still paying for. How do you track these?", category: "Operations", author: { name: "Diana M.", avatar: "DM", isPro: true } },
            { title: "Vendor negotiation tactics", excerpt: "Our cloud bill is getting out of hand. Does anyone use a third-party negotiation service or just handle it internally?", category: "Operations", author: { name: "Eric B.", avatar: "EB", isPro: false } },
            { title: "Incident response protocols", excerpt: "When the site goes down at 3 AM, what is your exact escalation process?", category: "Operations", author: { name: "Valerie S.", avatar: "VS", isPro: true } },

            // Introduce Yourself
            { title: "Hello from Brisbane!", excerpt: "Hey everyone, I'm a full-stack dev from Brisbane, Australia. I usually work with React and Node, and currently building an AI-powered CRM. Excited to be here!", category: "Introduce Yourself", author: { name: "Adrian R.", avatar: "AR", isPro: true } },
            { title: "Newbie here from Toronto", excerpt: "Just joined the community. I'm a UX designer transitioning into frontend dev. Love the vibrant community here!", category: "Introduce Yourself", author: { name: "Mia L.", avatar: "ML", isPro: false } },
            { title: "Greetings from London", excerpt: "Started my first SaaS two months ago, currently at $500 MRR. Can't wait to learn from all the experienced builders here.", category: "Introduce Yourself", author: { name: "Oliver D.", avatar: "OD", isPro: true } },
            { title: "Hi from Austin, TX", excerpt: "Data scientist turned indie hacker. Mainly writing Python but slowly learning Typescript. Cheers!", category: "Introduce Yourself", author: { name: "Ethan C.", avatar: "EC", isPro: false } },
            { title: "Reporting in from Berlin!", excerpt: "Freelance mobile developer (Flutter & React Native). Looking forward to sharing tips and tricks.", category: "Introduce Yourself", author: { name: "Felix M.", avatar: "FM", isPro: true } },
            { title: "Hello from Singapore", excerpt: "Backend engineer focused on Go and Kubernetes. Exploring the AI application space in my free time.", category: "Introduce Yourself", author: { name: "Wei C.", avatar: "WC", isPro: false } },
            { title: "Excited to join from NYC", excerpt: "Product Manager looking to understand more about workflows and automation to help my team scale.", category: "Introduce Yourself", author: { name: "Zoe P.", avatar: "ZP", isPro: true } },
            { title: "Hi from Cape Town", excerpt: "Junior developer just looking for some mentorship and a place to ask dumb questions. Thanks for having me!", category: "Introduce Yourself", author: { name: "Leo N.", avatar: "LN", isPro: false } },
            { title: "Greetings from Tokyo!", excerpt: "Building developer tools in the Web3 space. The discussions here seem super high quality.", category: "Introduce Yourself", author: { name: "Kenji T.", avatar: "KT", isPro: true } },
            { title: "Hello everyone, from Amsterdam", excerpt: "Marketing automation specialist trying to bridge the gap between no-code tools and custom scripts. Nice to meet you all!", category: "Introduce Yourself", author: { name: "Eva H.", avatar: "EH", isPro: false } },
        ];

        try {
            for (let i = 0; i < dummyPosts.length; i++) {
                const post = dummyPosts[i];
                const daysAgo = Math.floor(Math.random() * 5); // 0 to 4 days ago
                const hoursAgo = Math.floor(Math.random() * 24);
                const date = new Date();
                date.setDate(date.getDate() - daysAgo);
                date.setHours(date.getHours() - hoursAgo);

                await addDoc(collection(db, 'posts'), {
                    ...post,
                    likes: Math.floor(Math.random() * 50) + 1,
                    comments: Math.floor(Math.random() * 20),
                    timestamp: date
                });
            }
            alert('Database seeded with 40 posts!');
        } catch (error) {
            console.error('Error seeding database: ', error);
            alert('Error seeding database. Check console.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTime = (ts: any) => {
        if (!ts) return 'Just now';
        const date = ts.toDate();
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    const filteredPosts = activeTab === 'All Topics' ? posts : posts.filter(p => p.category === activeTab);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">Community Board</h1>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-600 rounded-full border border-green-200 shadow-sm mt-1 shrink-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-bold tracking-wide">142 Online</span>
                        </div>
                    </div>
                    <p className="text-gray-500 mt-2">Connect, share wins, and ask questions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={seedDatabase}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full text-sm font-medium transition-colors"
                        title="Temporary tool: Seed 40 posts into Firestore"
                    >
                        Seed Posts
                    </button>
                    {user && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-5 py-2.5 bg-[#0071e3] hover:bg-[#0071e3]/90 text-white rounded-full font-medium transition-all active:scale-95 shadow-sm whitespace-nowrap flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> New Discussion
                        </button>
                    )}
                </div>
            </div>

            {/* Toolbar */}
            <div className="glassmorphism rounded-2xl p-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex overflow-x-auto w-full sm:w-auto no-scrollbar gap-1 p-1">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === cat
                                ? 'bg-white shadow-sm text-[#1d1d1f] border border-gray-200/50'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto px-2 pb-2 sm:pb-0 sm:px-0 sm:pr-2">
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search discussions..."
                            className="w-full pl-9 pr-4 py-2 bg-gray-100/50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#0071e3]/20 transition-all outline-none"
                        />
                    </div>
                    <button className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100/50 rounded-xl transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
                {posts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No posts yet. Be the first to start a discussion!
                    </div>
                )}

                <AnimatePresence>
                    {typingUsers.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-3 flex items-center gap-3 overflow-hidden text-sm font-medium text-blue-600"
                        >
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="glassmorphism p-5 sm:p-6 rounded-3xl hover:border-blue-200 transition-all cursor-pointer group hover:shadow-lg hover:shadow-blue-500/10 mb-4">
                                <div className="flex items-start gap-4">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-[#0071e3] text-white items-center justify-center font-bold shadow-md"
                                    >
                                        {post.author.avatar}
                                    </motion.div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-[11px] font-semibold tracking-wide uppercase bg-blue-50 text-[#0071e3]">
                                                {post.category}
                                            </span>
                                            <span className="text-gray-400 text-xs flex items-center gap-1 font-medium">
                                                <Clock className="w-3.5 h-3.5" /> {formatTime(post.timestamp)}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors line-clamp-1 mb-1">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed font-medium">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5 sm:hidden">
                                                <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">
                                                    {post.author.avatar}
                                                </div>
                                                <span className="font-semibold text-gray-700">{post.author.name}</span>
                                            </div>
                                            <span className="hidden sm:inline font-semibold text-gray-700">{post.author.name}</span>
                                            {post.author.isPro && (
                                                <span className="text-[10px] text-white bg-gradient-to-r from-purple-500 to-indigo-500 px-1.5 py-0.5 rounded font-bold tracking-wide uppercase shadow-sm">Pro</span>
                                            )}
                                            <div className="flex items-center gap-4 ml-auto sm:ml-0 font-medium pt-2 sm:pt-0 border-t sm:border-0 border-gray-100 w-full sm:w-auto">
                                                <motion.span whileHover={{ scale: 1.1 }} className="flex items-center gap-1.5 hover:text-rose-500 transition-colors cursor-pointer">
                                                    <Heart className="w-4 h-4" /> {post.likes}
                                                </motion.span>
                                                <motion.span whileHover={{ scale: 1.1 }} className="flex items-center gap-1.5 hover:text-[#0071e3] transition-colors cursor-pointer">
                                                    <MessageSquare className="w-4 h-4" /> {post.comments}
                                                </motion.span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors shrink-0">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Create Post Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-[2rem] p-6 sm:p-8 w-full max-w-lg shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">Start a Discussion</h2>

                            <form onSubmit={handleCreatePost} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20 transition-all outline-none"
                                        placeholder="What's on your mind?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Category</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20 transition-all outline-none bg-white"
                                    >
                                        {categories.filter(c => c !== 'All Topics').map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">Content</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20 transition-all outline-none resize-none"
                                        placeholder="Share your thoughts, ask a question, or post a win..."
                                    />
                                </div>

                                <div className="pt-2 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 py-3 px-4 bg-[#0071e3] hover:bg-[#0071e3]/90 text-white rounded-xl font-medium transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                                    >
                                        {isSubmitting ? 'Posting...' : 'Post Discussion'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
