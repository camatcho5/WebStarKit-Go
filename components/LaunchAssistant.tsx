
import React, { useState, useEffect } from 'react';
import { trackEvent } from '../services/analyticsService';

type ProjectType = 'blog' | 'business' | 'freelance' | 'startup' | '';
type PlanLevel = 'beginner' | 'business' | 'pro';

interface StackItem {
  name: string;
  desc: string;
  icon: React.ReactNode;
  price: number;
  productId: string;
  providerName: string;
  providerBenefit: string;
  ctaLabel: string;
  relatedBlogId?: string;
}

const TOOLS_MASTER: Record<string, StackItem> = {
  hosting_starter: {
    name: 'Web Hosting',
    desc: 'Hébergement haute performance pour votre site.',
    price: 3,
    productId: 'p2',
    providerName: 'Hostinger',
    providerBenefit: 'Best for beginners and performance',
    ctaLabel: 'View Hosting Options',
    relatedBlogId: 'blog5',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  },
  domain: {
    name: 'Nom de Domaine',
    desc: 'Votre identité unique sur le web.',
    price: 1,
    productId: 'reg1',
    providerName: 'Dynadot',
    providerBenefit: 'Reliable domain registrar',
    ctaLabel: 'Search Domains',
    relatedBlogId: 'blog11',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
  },
  email: {
    name: 'Email Sécurisé',
    desc: 'Communication professionnelle cryptée.',
    price: 4,
    productId: 'mail1',
    providerName: 'Proton Mail',
    providerBenefit: 'Encrypted business email',
    ctaLabel: 'Get Secure Email',
    relatedBlogId: 'blog8',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
  vpn: {
    name: 'Service VPN',
    desc: 'Navigation anonyme et sécurisée.',
    price: 5,
    productId: 'p7',
    providerName: 'NordVPN',
    providerBenefit: 'Best for security & privacy',
    ctaLabel: 'Protect Your Connection',
    relatedBlogId: 'blog6',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
  },
  pwd: {
    name: 'Gestionnaire de Mdp',
    desc: 'Sécurité maximale pour vos comptes clients.',
    price: 3,
    productId: 'prod1',
    providerName: 'NordPass',
    providerBenefit: 'Simple and secure password manager',
    ctaLabel: 'Secure Your Passwords',
    relatedBlogId: 'blog7',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
  },
  cloud_host: {
    name: 'Cloud Hosting',
    desc: 'Hébergement cloud scalable pour la croissance.',
    price: 12,
    productId: 'host2',
    providerName: 'IONOS',
    providerBenefit: 'Scalable cloud hosting',
    ctaLabel: 'View Cloud Plans',
    relatedBlogId: 'blog10',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
  },
  storage: {
    name: 'Cloud Storage',
    desc: 'Partage de fichiers confidentiels.',
    price: 4,
    productId: 'mail2',
    providerName: 'Proton Drive',
    providerBenefit: 'Encrypted cloud storage',
    ctaLabel: 'Secure Your Files',
    relatedBlogId: 'blog8',
    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
  }
};

const PLAN_LOGIC: Record<PlanLevel, string[]> = {
  beginner: ['hosting_starter', 'domain', 'email'],
  business: ['hosting_starter', 'vpn', 'email', 'pwd'],
  pro: ['cloud_host', 'vpn', 'email', 'pwd', 'storage']
};

const PROJECT_TYPE_STACKS: Record<Exclude<ProjectType, ''>, string[]> = {
  blog: ['hosting_starter', 'domain', 'email'],
  business: ['hosting_starter', 'vpn', 'email'],
  freelance: ['hosting_starter', 'pwd'],
  startup: ['cloud_host', 'vpn', 'email', 'storage']
};

interface LaunchAssistantProps {
  onExplore?: () => void;
  onViewProduct: (id: string) => void;
  onViewBlog?: (id: string) => void;
}

const LaunchAssistant: React.FC<LaunchAssistantProps> = ({ onExplore, onViewProduct, onViewBlog }) => {
  const [projectType, setProjectType] = useState<ProjectType>('');
  const [planLevel, setPlanLevel] = useState<PlanLevel>('beginner');
  const [showResults, setShowResults] = useState(false);

  const handleShowResults = () => {
    if (projectType) {
      setShowResults(true);
      trackEvent('launch_assistant_submit', {
        project_type: projectType,
        plan_level: planLevel
      });
    }
  };

  const handleLevelChange = (level: PlanLevel) => {
    setPlanLevel(level);
    trackEvent('launch_mode_selected', { level });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as ProjectType;
    setProjectType(type);
    setShowResults(false);
    if (type) trackEvent('launch_project_selected', { project: type });
  };

  const handleToolClick = (tool: StackItem) => {
    trackEvent('launch_tool_clicked', {
      tool_id: tool.productId,
      provider: tool.providerName,
      level: planLevel
    });
    onViewProduct(tool.productId);
  };

  const handleBlogClick = (tool: StackItem) => {
    if (tool.relatedBlogId && onViewBlog) {
      trackEvent('launch_why_recommended_click', {
        tool_id: tool.productId,
        blog_id: tool.relatedBlogId
      });
      onViewBlog(tool.relatedBlogId);
    }
  };

  const handleExploreAll = () => {
    trackEvent('launch_cta_clicked', { target: 'categories_all' });
    if (onExplore) onExplore();
  };

  const currentPlanStack = PLAN_LOGIC[planLevel].map(id => TOOLS_MASTER[id]);
  const currentTypeStack = projectType ? PROJECT_TYPE_STACKS[projectType].map(id => TOOLS_MASTER[id]) : [];

  const calculateTotalMonthly = () => {
    return currentPlanStack.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <div id="launch-assistant" className="my-12 scroll-mt-24">
      <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
        <div className="relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">From Idea to Launch — In Minutes</h2>
            <p className="text-indigo-100 mb-8 text-base md:text-lg leading-relaxed font-medium">
              Not sure which tools you actually need? The Launch Assistant builds a personalized setup based on your goals, experience level, and budget.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-xl">
            <div className="relative w-full">
              <select
                value={projectType}
                onChange={handleTypeChange}
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/30 transition-all font-bold cursor-pointer"
              >
                <option value="" disabled className="text-slate-900">What are you building?</option>
                <option value="blog" className="text-slate-900">Blog / Website</option>
                <option value="business" className="text-slate-900">Online Business</option>
                <option value="freelance" className="text-slate-900">Freelance Portfolio</option>
                <option value="startup" className="text-slate-900">Startup / SaaS</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleShowResults}
              disabled={!projectType}
              className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 whitespace-nowrap"
            >
              👉 Build My Setup
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-400/20 rounded-full blur-[60px]"></div>
      </div>

      {showResults && projectType && (
        <div className="mt-8 animate-fade-in space-y-8">
          {/* Section 1: Recommended Stack for Project Type */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Essential tools for your project</h3>
                <p className="text-slate-400 font-bold uppercase text-[11px] tracking-widest">Recommended for: {projectType}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentTypeStack.map((item, idx) => (
                <div key={idx} className="group p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-500 mb-6 shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-1">{item.name}</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4">{item.desc}</p>
                  {item.relatedBlogId && onViewBlog && (
                    <button 
                      onClick={() => handleBlogClick(item)}
                      className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline"
                    >
                      Why we recommend this &rarr;
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Plan Selector & Budget Calculator */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-[2.5rem] p-8 md:p-10 animate-fade-in relative overflow-hidden">
            <div className="text-center mb-8 relative z-10">
              <span className="text-indigo-500 font-black uppercase text-[11px] tracking-widest mb-3 block">Estimated Monthly Budget</span>
              <h3 className="text-xl md:text-3xl font-black text-slate-900 mb-6">Choose Your Level</h3>
              
              {/* Plan Switcher (Segmented Control) */}
              <div className="inline-flex p-1.5 bg-indigo-100 rounded-2xl mb-8">
                {(['beginner', 'business', 'pro'] as PlanLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelChange(level)}
                    className={`px-6 md:px-10 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                      planLevel === level 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'text-indigo-400 hover:text-indigo-600 hover:bg-white/50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <div className="text-4xl md:text-6xl font-black text-indigo-600 tracking-tighter mt-4 transition-all scale-100">
                ${calculateTotalMonthly()} <span className="text-lg md:text-xl text-indigo-400">/ month</span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="max-w-4xl mx-auto space-y-4 relative z-10">
              {currentPlanStack.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-white border border-indigo-100 rounded-2xl shadow-sm hover:shadow-md transition-all animate-fade-in">
                  <div className="flex items-center gap-4 flex-grow">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">{item.providerName}</span>
                        <span className="text-xs font-bold text-indigo-600">(${item.price}/mo)</span>
                      </div>
                      <p className="text-slate-500 text-xs font-medium mb-1">{item.providerBenefit}</p>
                      {item.relatedBlogId && onViewBlog && (
                        <button 
                          onClick={() => handleBlogClick(item)}
                          className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline block"
                        >
                          Why we recommend this &rarr;
                        </button>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleToolClick(item)}
                    className="w-full md:w-auto px-5 py-2.5 bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 whitespace-nowrap"
                  >
                    {item.ctaLabel}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 relative z-10">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                Calculated for {planLevel} profile. Market average estimates. Actual prices depend on specific providers and billing cycles.
              </p>
              <div className="mt-8">
                <button 
                  onClick={handleExploreAll}
                  className="px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-xl shadow-indigo-200/50"
                >
                  Explore All Recommended Tools
                </button>
              </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/10 blur-[100px] pointer-events-none rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaunchAssistant;
