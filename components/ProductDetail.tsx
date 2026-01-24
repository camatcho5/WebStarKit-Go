
import React from 'react';
import { Product } from '../types';
import { blogPosts } from '../data/blogPosts';
import { trackEvent } from '../services/analyticsService';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onViewBlog?: (id: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onViewBlog }) => {
  const relatedBlogs = product.relatedBlogIds 
    ? blogPosts.filter(bp => product.relatedBlogIds?.includes(bp.id))
    : [];

  const handleAffiliateClick = () => {
    trackEvent('tool_affiliate_click', {
      tool_id: product.id,
      tool_name: product.name,
      category: product.category
    });
  };

  const handleBlogClick = (blogId: string, blogTitle: string) => {
    trackEvent('tool_internal_click', {
      source_tool_id: product.id,
      target_blog_id: blogId,
      blog_title: blogTitle
    });
    if (onViewBlog) onViewBlog(blogId);
  };

  // Simple markdown-lite parser for description
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    let inList = false;
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-2 my-6 text-slate-600 font-medium">
            {listItems}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('# ')) {
        flushList();
        elements.push(<h2 key={index} className="text-3xl font-extrabold text-slate-900 mt-12 mb-6 tracking-tight">{trimmed.replace('# ', '')}</h2>);
      } else if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(<h3 key={index} className="text-2xl font-bold text-slate-800 mt-10 mb-4 tracking-tight">{trimmed.replace('## ', '')}</h3>);
      } else if (trimmed.startsWith('- ')) {
        inList = true;
        listItems.push(<li key={index} className="leading-relaxed">{trimmed.replace('- ', '')}</li>);
      } else if (trimmed === '') {
        flushList();
      } else {
        flushList();
        elements.push(<p key={index} className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">{trimmed}</p>);
      }
    });

    flushList();
    return elements;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Breadcrumbs / Back */}
      <nav className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-10">
        <button onClick={onBack} className="hover:text-blue-600 transition-colors">Marketplace</button>
        <span>/</span>
        <span className="text-slate-300">{product.category}</span>
        <span>/</span>
        <span className="text-slate-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-widest border border-blue-100">
                {product.category}
              </span>
              {product.isEditorPick && (
                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full uppercase tracking-widest flex items-center gap-1.5 border border-amber-100">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Editor's Pick
                </span>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-3xl bg-white p-2 border border-slate-100 shadow-xl shadow-slate-200/50 flex-shrink-0">
                <img src={product.logoUrl} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-grow">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-none mb-3">
                  {product.name}
                </h1>
                <p className="text-xl text-slate-500 font-medium italic mb-4">
                  "{product.tagline}"
                </p>
                {/* Primary CTA at the Top */}
                <a 
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleAffiliateClick}
                  className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95 text-base uppercase tracking-widest"
                >
                  Get Started with {product.name.split(' ')[0]}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </header>

          {/* Structured Review Body */}
          <article className="prose prose-slate max-w-none mb-16">
            {renderContent(product.description)}
          </article>

          {/* Educational Guides Section */}
          {relatedBlogs.length > 0 && (
            <div className="mb-16 bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Related Educational Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedBlogs.map(blog => (
                  <div 
                    key={blog.id} 
                    onClick={() => handleBlogClick(blog.id, blog.title)}
                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 block">{blog.category}</span>
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">{blog.title}</h4>
                    <p className="text-slate-500 text-xs font-medium line-clamp-2 mb-4">{blog.excerpt}</p>
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-blue-600 flex items-center gap-1 transition-colors">
                      LEARN MORE
                      <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros & Cons Comparison */}
          {(product.pros || product.cons) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  The Pros
                </h3>
                <ul className="space-y-4">
                  {product.pros?.map((pro, i) => (
                    <li key={i} className="flex items-start gap-3 text-emerald-800 text-sm font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-50/50 rounded-3xl p-8 border border-rose-100">
                <h3 className="text-xl font-bold text-rose-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  The Cons
                </h3>
                <ul className="space-y-4">
                  {product.cons?.map((con, i) => (
                    <li key={i} className="flex items-start gap-3 text-rose-800 text-sm font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></div>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Features Grid */}
          <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 blur-[100px] rounded-full"></div>
            <h2 className="text-2xl font-bold mb-8 relative z-10">Technical Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            {/* CTA Box */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Expert Score</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xl font-extrabold text-slate-900">{product.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Starting Price</span>
                  <span className="text-2xl font-extrabold text-slate-900">{product.price}</span>
                </div>
              </div>

              <a 
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAffiliateClick}
                className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white font-extrabold py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 text-lg"
              >
                Claim Official Offer
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <p className="mt-6 text-center text-[11px] text-slate-400 font-bold leading-relaxed">
                By clicking this link, we may earn a small commission at no extra cost to you. This helps us maintain our independent testing lab.
              </p>
            </div>

            {/* Verification Widget */}
            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Why we trust it
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
                  <p className="text-sm text-slate-600 font-medium">Personally tested by our team for at least 30 days.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
                  <p className="text-sm text-slate-600 font-medium">Consistently ranks high in performance benchmarks.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
                  <p className="text-sm text-slate-600 font-medium">Transparent refund policies and support responsiveness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
