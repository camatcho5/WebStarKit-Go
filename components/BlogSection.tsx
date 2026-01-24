
import React from 'react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  onViewBlog: (id: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts, onViewBlog }) => {
  // Take only the 3 most recent posts
  const featuredPosts = posts.slice(0, 3);

  return (
    <section className="py-16 border-t border-slate-100">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">From Our Blog</h2>
        <p className="text-slate-500 font-medium text-base max-w-xl mx-auto leading-relaxed">
          Expert insights and deep dives into the software that powers modern businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredPosts.map((post) => (
          <div 
            key={post.id} 
            className="group cursor-pointer flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            onClick={() => onViewBlog(post.id)}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                {post.title}
              </h3>
              <p className="text-slate-500 text-[14px] font-medium leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-auto">
                <button className="flex items-center gap-2 text-blue-600 font-black text-[11px] uppercase tracking-widest group/btn">
                  Read more
                  <svg 
                    className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
