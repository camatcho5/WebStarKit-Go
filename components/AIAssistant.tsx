
import React, { useState } from 'react';
import { getProductRecommendations } from '../services/geminiService';
import { Recommendation } from '../types';

interface AIAssistantProps {
  onRecommend: (recs: Recommendation[] | null) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onRecommend }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const results = await getProductRecommendations(query);
    onRecommend(results);
    setLoading(false);
  };

  return (
    <div id="advisor" className="bg-indigo-900 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden my-12">
      <div className="relative z-10 max-w-xl">
        <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">AI Advisor.</h2>
        <p className="text-indigo-200/80 mb-6 leading-relaxed text-sm font-medium">
          Describe your goal (e.g., "I want to start a newsletter") and our AI will pick the perfect tools.
        </p>
        
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you building?"
            className="w-full bg-white/10 border border-white/20 rounded-2xl py-3.5 px-6 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all backdrop-blur-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-indigo-500 rounded-xl font-bold hover:bg-indigo-400 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span className="text-xs uppercase tracking-widest font-black">Get Advice</span>
            )}
          </button>
        </form>
      </div>

      {/* Visual Decoration */}
      <div className="absolute top-0 right-0 h-full w-1/3 opacity-20 pointer-events-none hidden lg:block">
        <div className="w-full h-full bg-gradient-to-l from-white to-transparent"></div>
      </div>
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-400 rounded-full blur-[60px] opacity-30"></div>
    </div>
  );
};

export default AIAssistant;
