import { Facebook, Twitter, Linkedin, Github, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200/50 pt-12 pb-8 px-4 md:px-8 mt-auto z-10 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 flex-wrap">

                {/* Brand and Description */}
                <div className="flex flex-col items-center md:items-start max-w-sm text-center md:text-left gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#0071e3] flex items-center justify-center text-white font-bold text-sm shadow-md">
                            IAI
                        </div>
                        <span className="font-semibold text-xl tracking-tight text-gray-900">Integrity AI</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Empowering innovation through intelligent, secure, and reliable AI solutions tailored for modern businesses.
                    </p>
                </div>

                {/* Address Section */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Our Office</h3>
                    <div className="flex items-start text-gray-500 gap-2">
                        <MapPin className="w-4 h-4 text-[#0071e3] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                            Level 4, 123 Ann Street<br />
                            Brisbane City, QLD 4000<br />
                            Australia
                        </span>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Connect With Us</h3>
                    <div className="flex items-center gap-4">
                        <a href="#" className="p-2 rounded-full border border-gray-200 text-gray-500 hover:text-[#0071e3] hover:border-[#0071e3] transition-colors" aria-label="Facebook">
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 rounded-full border border-gray-200 text-gray-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors" aria-label="Twitter">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 rounded-full border border-gray-200 text-gray-500 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors" aria-label="LinkedIn">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-colors" aria-label="GitHub">
                            <Github className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Integrity AI. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm">
                    <Link to="#" className="text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</Link>
                    <Link to="#" className="text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
