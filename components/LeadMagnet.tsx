
import React, { useState } from 'react';
import { trackEvent } from '../services/analyticsService';

interface LeadMagnetProps {
  onSuccessAction?: () => void;
}

const LeadMagnet: React.FC<LeadMagnetProps> = ({ onSuccessAction }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      trackEvent('lead_magnet_signup', {
        campaign: 'setup_checklist_2026',
        email_domain: email.split('@')[1]
      });
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-8 md:p-12 text-center animate-fade-in">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-4">Checklist Sent!</h3>
        <p className="text-slate-600 font-medium mb-8 max-w-md mx-auto">
          We've sent the **Online Business Setup Checklist (2026)** to your inbox. While you wait, build your personalized tool stack in seconds.
        </p>
        <button 
          onClick={onSuccessAction}
          className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl active:scale-95 uppercase tracking-widest text-sm"
        >
          👉 Build My Setup Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full"></div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest mb-4">
            Free Resource
          </span>
          <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">
            Online Business Setup Checklist (2026)
          </h3>
          <p className="text-slate-500 font-medium text-lg mb-6 leading-relaxed">
            Avoid overpaying for tools and secure your business from day one. Get the complete step-by-step audit used by successful founders.
          </p>
          <ul className="space-y-3 mb-0">
            {['Foundation & Hosting', 'Secure Communication', 'Network Protection'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">First Name</label>
              <input 
                type="text" 
                required
                placeholder="Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Work Email</label>
              <input 
                type="email" 
                required
                placeholder="alex@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-bold text-slate-900"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Download Checklist'}
            </button>
            <p className="text-[10px] text-slate-400 text-center font-medium px-4 leading-relaxed">
              We respect your privacy. No spam, just high-value digital guides. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnet;
