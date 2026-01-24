
import React, { useState } from 'react';

interface HeroProps {
  onSearch: (query: string) => void;
  onNavigateToAssistant: () => void;
  onNavigateToCategories: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, onNavigateToAssistant, onNavigateToCategories }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-16 border-b border-slate-50">
      {/* Professional Grid Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px'
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Main Gradient Title */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[1.1] text-slate-900">
          Build, Secure, and Grow Your <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
            Online Business in 2026
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-slate-500 font-medium text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Practical guides, trusted tools, and smart setups for freelancers, remote workers, and online businesses—without the noise.
        </p>
        
        {/* Main CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button 
            onClick={onNavigateToAssistant}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 text-sm uppercase tracking-widest flex items-center gap-3"
          >
            👉 Start with the Launch Assistant
          </button>
          <button 
            onClick={onNavigateToCategories}
            className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-100 text-slate-600 font-black rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all active:scale-95 text-sm uppercase tracking-widest"
          >
            Explore Categories
          </button>
        </div>

        {/* Modern Nested Search Bar */}
        <div className="relative max-w-xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <form 
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-lg shadow-slate-200/30"
          >
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search tools or categories..."
              className="w-full pl-5 pr-3 py-2.5 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm md:text-base font-medium"
            />
            <button 
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-md active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline text-xs uppercase tracking-widest">Search</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
