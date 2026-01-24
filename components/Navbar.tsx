
import React, { useState, useRef, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  activePage: string;
  onViewBlog: (id: string) => void;
  onNavigateToAssistant: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage, onViewBlog, onNavigateToAssistant }) => {
  const [guidesOpen, setGuidesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Categories', id: 'categories' },
    { name: 'Blog', id: 'blog' },
    { name: 'About', id: 'about' },
  ];

  const guideLinks = [
    { name: 'Freelancer & Remote Work Guide (2026)', id: 'blog29' },
    { name: 'Business Security & Privacy Guide (2026)', id: 'blog30' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setGuidesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-3">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
              </svg>
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-900 font-sans">WebStarKit <span className="text-blue-600">Go</span></span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-[13px] font-bold tracking-tight transition-all relative py-2 ${
                activePage === 'home' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Home
              {activePage === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
              )}
            </button>

            {/* Start Here Link */}
            <button
              onClick={() => onViewBlog('blog33')}
              className="text-[13px] font-bold tracking-tight text-blue-600 transition-all hover:text-blue-700 py-2"
            >
              Start Here
            </button>

            {/* Guides Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setGuidesOpen(!guidesOpen)}
                className={`flex items-center gap-1 text-[13px] font-bold tracking-tight transition-all py-2 ${
                  guidesOpen ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Guides
                <svg className={`w-4 h-4 transition-transform ${guidesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {guidesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/50 p-2 animate-fade-in">
                  {guideLinks.map((guide) => (
                    <button
                      key={guide.id}
                      onClick={() => {
                        onViewBlog(guide.id);
                        setGuidesOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl text-[12px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all"
                    >
                      {guide.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-[13px] font-bold tracking-tight transition-all relative py-2 ${
                  activePage === link.id 
                    ? 'text-blue-600' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.name}
                {activePage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onNavigateToAssistant}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[12px] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 uppercase tracking-widest"
            >
              Build My Setup
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
