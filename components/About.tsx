
import React from 'react';

interface AboutProps {
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm mb-12 transition-all group"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        Return to Home
      </button>

      <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
        {/* Header Section */}
        <header className="relative bg-slate-900 text-white p-12 md:p-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-20 blur-[120px] rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
              About WebStarKit <span className="text-blue-400">Go</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-3xl">
              WebStarKit Go is a digital platform built to help entrepreneurs, creators, and businesses launch, manage, and grow their online presence more efficiently.
            </p>
          </div>
        </header>

        <div className="p-8 md:p-20 space-y-20">
          {/* Mission & Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-black uppercase tracking-widest text-xs mb-4 block">Our DNA</span>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Our Mission</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed mb-6">
                In a fast-moving digital world, choosing the right tools can be overwhelming. Our mission is to simplify that process by providing carefully selected resources, practical insights, and trusted recommendations that support real online growth.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-2xl">
                <p className="text-blue-900 font-bold">
                  "To empower individuals and businesses with reliable digital tools, clear guidance, and smart solutions that save time, improve performance, and drive results."
                </p>
              </div>
              <p className="mt-6 text-slate-500 font-bold italic">We focus on clarity, usability, and value — not hype.</p>
            </div>
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 relative group">
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-[0.02] transition-opacity rounded-[2.5rem]"></div>
              <h3 className="text-xl font-black text-slate-900 mb-8">What We Do</h3>
              <ul className="space-y-6">
                {[
                  { icon: '✨', text: 'Curate and review digital tools and online services' },
                  { icon: '🚀', text: 'Share practical resources for websites, productivity, security, and growth' },
                  { icon: '🤝', text: 'Provide transparent recommendations, including affiliate tools we trust' },
                  { icon: '💡', text: 'Help users make informed decisions in the digital space' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-slate-600 font-bold leading-snug">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Transparency Section */}
          <section className="bg-slate-50 rounded-[2.5rem] p-10 md:p-16 border border-slate-100 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-6">Transparency & Trust</h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-3xl mx-auto mb-8">
              Some of the links on WebStarKit Go are affiliate links, meaning we may earn a commission at no additional cost to you. We only recommend tools and services that we believe offer genuine value and reliability.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-900 font-black text-sm uppercase tracking-widest">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              User-First Decisions
            </div>
          </section>

          {/* Who We Serve */}
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Who We Serve</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Entrepreneurs & Startups',
                'Freelancers & Professionals',
                'Creators & Builders',
                'Growing Businesses'
              ].map((group) => (
                <div key={group} className="bg-white border border-slate-100 p-8 rounded-3xl text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <h4 className="font-black text-slate-900 leading-tight">{group}</h4>
                </div>
              ))}
            </div>
            <p className="mt-12 text-center text-slate-500 font-bold">Whether you’re just starting or scaling, our goal is to support your journey.</p>
          </section>

          {/* Commitment & Contact */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">Our Commitment</h2>
              <ul className="space-y-4">
                {[
                  'Honest, unbiased information',
                  'Clear and simple communication',
                  'Continuous improvement and updates',
                  'Respect for user privacy and data'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-bold">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-600 text-white rounded-[2.5rem] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 blur-[60px]"></div>
              <h2 className="text-2xl font-black mb-6">Get in Touch</h2>
              <p className="text-blue-50 font-medium mb-8">
                Have questions, feedback, or partnership ideas? We’d love to hear from you.
              </p>
              <div className="space-y-4">
                <a href="mailto:Contact@WebStarKitGo.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-bold underline">Contact@WebStarKitGo.com</span>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="font-bold">WebStarKit Go Official</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
