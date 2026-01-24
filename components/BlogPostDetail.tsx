import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { blogPosts } from '../data/blogPosts';
import { products } from '../data/products';
import { trackEvent, initScrollDepthTracker } from '../services/analyticsService';
import LeadMagnet from './LeadMagnet';

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
  onNavigateToPost: (id: string) => void;
  onViewProduct?: (id: string) => void;
  onCategorySelect: (categoryName: string) => void;
  onNavigateToHomeSection?: (sectionId: string) => void;
  onNavigateToPage?: (pageId: string) => void;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ 
  post, 
  onBack, 
  onNavigateToPost, 
  onViewProduct, 
  onCategorySelect,
  onNavigateToHomeSection,
  onNavigateToPage
}) => {
  const categories = Array.from(new Set(blogPosts.map(p => p.category)));
  const recentPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);
  const recommendedProducts = post.relatedProductIds 
    ? products.filter(p => post.relatedProductIds?.includes(p.id))
    : [];

  const leadMagnetPostIds = ['blog31', 'blog30', 'blog29', 'blog32', 'blog33', 'blog34', 'blog35', 'blog36', 'blog37', 'blog38', 'blog39', 'blog40'];

  useEffect(() => {
    trackEvent('blog_view', {
      blog_id: post.id,
      title: post.title,
      category: post.category
    });
    const cleanup = initScrollDepthTracker(post.id);
    return cleanup;
  }, [post.id]);

  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const result: React.ReactNode[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.startsWith('# ')) {
        result.push(<h1 key={i} className="text-3xl md:text-4xl font-black text-slate-900 mt-12 mb-6 tracking-tight">{trimmed.slice(2)}</h1>);
        i++;
      } else if (trimmed.startsWith('## ')) {
        result.push(<h2 key={i} className="text-2xl font-bold text-slate-800 mt-10 mb-4 tracking-tight">{trimmed.slice(3)}</h2>);
        i++;
      } else if (trimmed.startsWith('### ')) {
        result.push(<h3 key={i} className="text-xl font-bold text-slate-800 mt-8 mb-3 tracking-tight">{trimmed.slice(4)}</h3>);
        i++;
      } 
      else if (trimmed.startsWith('- ')) {
        const listItems = [];
        while (i < lines.length && lines[i].trim().startsWith('- ')) {
          listItems.push(<li key={i} className="ml-6 list-disc mb-2 text-slate-600 font-medium">{processLinks(lines[i].trim().slice(2))}</li>);
          i++;
        }
        result.push(<ul key={`list-${i}`} className="mb-6">{listItems}</ul>);
      }
      else if (trimmed.startsWith('|')) {
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) {
          const rowLine = lines[i].trim();
          if (!rowLine.match(/^\|[ \-:|]+\|$/)) {
            const rawCells = rowLine.split('|').slice(1, -1).map(c => c.trim());
            rows.push(rawCells);
          }
          i++;
        }
        
        if (rows.length > 0) {
          result.push(
            <div key={`table-${i}`} className="overflow-x-auto my-8 w-full border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50">
                    {rows[0].map((cell, idx) => (
                      <th key={idx} className="p-4 border-b border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500">{processLinks(cell)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(1).map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="p-4 border-b border-slate-100 text-sm font-medium text-slate-600">{processLinks(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }
      else if (trimmed === '') {
        result.push(<div key={i} className="h-4" />);
        i++;
      }
      else {
        result.push(<p key={i} className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">{processLinks(trimmed)}</p>);
        i++;
      }
    }

    return result;
  };

  const processLinks = (text: string | React.ReactNode): React.ReactNode => {
    if (typeof text !== 'string') return text;
    
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const anchorText = match[1];
      const linkId = match[2];

      if (linkId === 'launch-assistant') {
        parts.push(<button key={match.index} onClick={() => onNavigateToHomeSection?.('launch-assistant')} className="text-indigo-600 font-black hover:underline decoration-2">{anchorText}</button>);
      } else if (linkId === 'categories') {
        parts.push(<button key={match.index} onClick={() => onNavigateToPage?.('categories')} className="text-blue-600 font-black hover:underline decoration-2">{anchorText}</button>);
      } else if (linkId.startsWith('blog')) {
        parts.push(<button key={match.index} onClick={() => { trackEvent('blog_internal_link_click', { source_blog_id: post.id, target_blog_id: linkId, anchor_text: anchorText }); onNavigateToPost(linkId); }} className="text-blue-600 font-bold hover:underline decoration-2">{anchorText}</button>);
      } else if (products.some(p => p.id === linkId)) {
        parts.push(<button key={match.index} onClick={() => { trackEvent('blog_outbound_tool_click', { source_blog_id: post.id, target_tool_id: linkId, anchor_text: anchorText, location: 'contextual' }); onViewProduct?.(linkId); }} className="text-indigo-600 font-bold hover:underline decoration-2">{anchorText}</button>);
      } else {
        parts.push(<a key={match.index} href={linkId} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('blog_external_link_click', { source_blog_id: post.id, target_url: linkId, anchor_text: anchorText })} className="text-blue-600 font-bold hover:underline decoration-2">{anchorText}</a>);
      }
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) parts.push(text.substring(lastIndex));
    return parts.length > 0 ? parts : text;
  };

  const handleRecommendedToolClick = (toolId: string) => {
    trackEvent('blog_recommendation_click', { blog_id: post.id, tool_id: toolId, location: 'bottom_section' });
    if (onViewProduct) onViewProduct(toolId);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <article className="lg:col-span-8">
          <header className="mb-10">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-black rounded-full uppercase tracking-widest mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-slate-500 font-bold">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{post.date}</span>
              </div>
            </div>
          </header>

          {/* Corrected Post Image Handling: Fixed Aspect Ratio & Contained Layout */}
          <div className="relative w-full aspect-video overflow-hidden rounded-[2.5rem] mb-12 shadow-xl shadow-slate-200/50 bg-slate-100">
            <img 
              src={post.image} 
              alt={post.title} 
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>

          <div className="prose prose-slate max-w-none prose-lg">
            {renderMarkdown(post.content)}
          </div>

          {leadMagnetPostIds.includes(post.id) && (
            <div className="my-16">
              <LeadMagnet onSuccessAction={() => onNavigateToHomeSection?.('launch-assistant')} />
            </div>
          )}

          {recommendedProducts.length > 0 && (
            <div className="mt-16 bg-indigo-50 rounded-[2.5rem] p-10 border border-indigo-100">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Recommended Tools for This Guide</h3>
              <div className="space-y-4">
                {recommendedProducts.map(p => (
                  <div key={p.id} className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-white border border-indigo-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-4 flex-grow">
                      <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 p-1.5 shrink-0">
                        <img src={p.logoUrl} alt={p.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm">{p.name}</h4>
                        <p className="text-slate-500 text-xs font-medium">{p.tagline}</p>
                      </div>
                    </div>
                    <button onClick={() => handleRecommendedToolClick(p.id)} className="w-full md:w-auto px-5 py-2.5 bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">Learn More</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-16 pt-12 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">Share this:</span>
               <div className="flex gap-2">
                 {[1, 2, 3].map(i => (
                   <button key={i} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </article>

        <aside className="lg:col-span-4 space-y-12">
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-lg shadow-slate-200/50">
            <h3 className="text-lg font-black text-slate-900 mb-6">Categories</h3>
            <div className="space-y-3">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => onCategorySelect(cat)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all group"
                >
                  <span className="font-bold text-sm">{cat}</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-lg shadow-slate-200/50">
            <h3 className="text-lg font-black text-slate-900 mb-6">Recent Posts</h3>
            <div className="space-y-6">
              {recentPosts.map(rp => (
                <div key={rp.id} className="flex gap-4 group cursor-pointer" onClick={() => onNavigateToPost(rp.id)}>
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="text-sm font-black text-slate-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">{rp.title}</h4>
                    <span className="text-[11px] text-slate-400 font-bold uppercase">{rp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default BlogPostDetail;