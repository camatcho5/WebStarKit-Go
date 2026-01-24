
import React, { useState, useMemo, useEffect } from 'react';
import { Category, Product } from '../types';
import { products } from '../data/products';
import { blogPosts } from '../data/blogPosts';
import ProductCard from './ProductCard';

interface CategoryMetadata {
  id: Exclude<Category, 'All' | 'Deals'>;
  title: string;
  silo: string;
  icon: React.ReactNode;
  gradient: string;
  shortDesc: string;
  benefit: string;
  longDesc: string;
  relatedBlogIds?: string[];
}

const CATEGORY_META: CategoryMetadata[] = [
  {
    id: 'AI Tools',
    title: 'AI Tools',
    silo: 'Efficiency',
    shortDesc: 'Advanced artificial intelligence for automated content, video, and design workflows.',
    benefit: '10x Faster Production',
    longDesc: 'The AI revolution is here. We curate only the most stable and performant generative AI platforms that offer actual ROI for businesses and creators. From LLMs to automated video editing, this is your efficiency stack.',
    gradient: 'from-purple-600 to-fuchsia-500',
    relatedBlogIds: ['blog4'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'Web Hosting',
    title: 'Web Hosting',
    silo: 'Infrastructure',
    shortDesc: 'Premium server solutions for speed, reliability, and SEO performance.',
    benefit: '99.9% Uptime Guarantee',
    longDesc: 'Your digital foundation. We benchmark hosting providers for TTFB, global latency, and support responsiveness to ensure your site stays fast and visible.',
    gradient: 'from-blue-600 to-indigo-500',
    relatedBlogIds: ['blog5', 'blog10', 'blog11'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: 'VPN Services',
    title: 'VPN Services',
    silo: 'Security',
    shortDesc: 'Military-grade encryption and privacy-focused network tunnels.',
    benefit: 'Zero-Logs Privacy',
    longDesc: 'Secure your traffic in an era of surveillance. We test VPNs for leak protection, protocol speed, and jurisdiction compliance.',
    gradient: 'from-indigo-600 to-blue-700',
    relatedBlogIds: ['blog6'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 'Email Providers',
    title: 'Secure Email',
    silo: 'Privacy',
    shortDesc: 'End-to-end encrypted communication for sovereign businesses.',
    benefit: 'E2EE Communication',
    longDesc: 'Standard email is a security risk. These providers offer zero-knowledge storage and end-to-end encryption to keep your business secrets private.',
    gradient: 'from-emerald-600 to-teal-500',
    relatedBlogIds: ['blog8'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'Productivity',
    title: 'Productivity',
    silo: 'Workflow',
    shortDesc: 'Smart password management and process automation tools.',
    benefit: 'Seamless Operations',
    longDesc: 'Eliminate friction. These tools handle the "boring stuff" — like security and password management — so you can focus on building.',
    gradient: 'from-orange-500 to-amber-600',
    relatedBlogIds: ['blog7'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'Digital Services',
    title: 'Services',
    silo: 'Outsourcing',
    shortDesc: 'Connect with expert freelance talent and technical specialists.',
    benefit: 'On-Demand Talent',
    longDesc: 'Scaling requires talent. We review the best marketplaces for outsourcing your design, development, and marketing needs.',
    gradient: 'from-rose-500 to-pink-600',
    relatedBlogIds: ['blog9'],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

interface CategoriesPageProps {
  onViewProduct: (id: string) => void;
  onCompareToggle: (product: Product) => void;
  onViewBlog?: (id: string) => void;
  compareList: Product[];
  activeCategory: Category | 'All';
  onCategoryChange: (cat: Category | 'All') => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ 
  onViewProduct, 
  onCompareToggle, 
  onViewBlog,
  compareList,
  activeCategory,
  onCategoryChange
}) => {
  const displayProducts = useMemo(() => {
    const list = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);
    return [...list].sort((a, b) => b.rating - a.rating);
  }, [activeCategory]);

  const activeMeta = useMemo(() => {
    return CATEGORY_META.find(c => c.id === activeCategory);
  }, [activeCategory]);

  const relatedGuides = useMemo(() => {
    if (!activeMeta?.relatedBlogIds) return [];
    return blogPosts.filter(bp => activeMeta.relatedBlogIds?.includes(bp.id));
  }, [activeMeta]);

  useEffect(() => {
    if (activeCategory !== 'All') {
      const resultsSection = document.getElementById('category-results');
      if (resultsSection) {
        window.scrollTo({ top: resultsSection.offsetTop - 100, behavior: 'smooth' });
      }
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Dynamic Silo Hero */}
      <section className="bg-white pt-16 pb-12 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-6 h-1 rounded-full ${activeMeta ? `bg-gradient-to-r ${activeMeta.gradient}` : 'bg-blue-600'}`}></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {activeMeta ? `${activeMeta.silo} Directory` : 'Digital Resource Directory'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
              {activeCategory === 'All' ? 'Tool Explorer.' : `${activeCategory}.`}
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
              {activeCategory === 'All' 
                ? 'Expert-curated library of high-performance digital tools, verified for stability and professional ROI.'
                : activeMeta?.longDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Category Switcher */}
      <div className="sticky top-[68px] z-40 bg-white/90 backdrop-blur-xl border-b border-slate-100 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide no-scrollbar">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-5 py-2 rounded-xl text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest ${
                activeCategory === 'All' 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
              }`}
            >
              All Tools
            </button>
            {CATEGORY_META.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black transition-all whitespace-nowrap border uppercase tracking-widest ${
                  activeCategory === cat.id 
                    ? `bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-50` 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div id="category-results" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Related Guides for this Category */}
        {relatedGuides.length > 0 && (
          <div className="mb-16">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Expert Guides for {activeCategory}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedGuides.map(guide => (
                <div 
                  key={guide.id}
                  onClick={() => onViewBlog?.(guide.id)}
                  className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0">
                    <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">{guide.title}</h4>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Read Article &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* The Results Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
              {activeCategory === 'All' ? 'Curated Catalog' : `Verified ${activeCategory}`}
            </h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
              {displayProducts.length} Verified Entries
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={() => onViewProduct(product.id)}
              onCompareToggle={() => onCompareToggle(product)}
              isCompared={compareList.some(item => item.id === product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
