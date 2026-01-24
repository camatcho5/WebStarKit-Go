import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CategoriesPage from './components/CategoriesPage';
import LaunchAssistant from './components/LaunchAssistant';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import ComparisonModal from './components/ComparisonModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import About from './components/About';
import BlogPostDetail from './components/BlogPostDetail';
import ScrollToTop from './components/ScrollToTop';
import LeadMagnet from './components/LeadMagnet';
import { products } from './data/products';
import { blogPosts } from './data/blogPosts';
import { Category, Product, BlogPost } from './types';

const categoriesList: Category[] = ['All', 'AI Tools', 'Web Hosting', 'VPN Services', 'Email Providers', 'Productivity', 'Digital Services', 'Deals'];
const filterPills = ['Today', 'New', 'Top Rated', 'Best Value', 'Free Tier', 'Editor\'s Pick'];

// Fixed error: Added React to imports to resolve namespace 'React' issue
const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('Web Hosting');
  const [selectedPill, setSelectedPill] = useState<string>('Editor\'s Pick');
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedProduct = useMemo(() => 
    products.find(p => p.id === selectedProductId) || null
  , [selectedProductId]);

  const selectedBlog = useMemo(() => 
    blogPosts.find(b => b.id === selectedBlogId) || null
  , [selectedBlogId]);

  const filteredProducts = useMemo(() => {
    let list = products;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (selectedPill === 'Editor\'s Pick') {
      list = list.filter(p => p.isEditorPick);
    } else if (selectedPill === 'Free Tier') {
      list = list.filter(p => p.isFree);
    } else if (selectedPill === 'Top Rated') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }
    
    return list;
  }, [selectedCategory, selectedPill, searchQuery]);

  const toggleCompare = (product: Product) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 4) {
        alert("You can compare up to 4 items at a time.");
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleNavigate = (page: string) => {
    setSelectedProductId(null);
    setSelectedBlogId(null);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProduct = (id: string) => {
    setSelectedProductId(id);
    setSelectedBlogId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewBlog = (id: string) => {
    setSelectedBlogId(id);
    setSelectedProductId(null);
    setActivePage('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHomeSection = (sectionId: string) => {
    setActivePage('home');
    setSelectedProductId(null);
    setSelectedBlogId(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSelectedCategory('All');
      setActivePage('home');
      setTimeout(() => {
        const toolsSection = document.getElementById('tools');
        if (toolsSection) {
          toolsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleCategorySelect = (mappedCat: Category | 'All') => {
    setSelectedCategory(mappedCat);
    setActivePage('categories');
    setSelectedProductId(null);
    setSelectedBlogId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySidebarClick = (blogCat: string) => {
    let mappedCat: Category | 'All' = 'All';
    if (blogCat === 'Web Hosting' || blogCat === 'Infrastructure' || blogCat === 'Web Development') {
      mappedCat = 'Web Hosting';
    } else if (blogCat === 'Security' || blogCat === 'Guides') {
      mappedCat = 'VPN Services';
    } else if (blogCat === 'Digital Services' || blogCat === 'Business') {
      mappedCat = 'Digital Services';
    } else if (blogCat === 'AI Tools') {
      mappedCat = 'AI Tools';
    }
    handleCategorySelect(mappedCat);
  };

  const renderContent = () => {
    if (selectedProduct) {
      return (
        <ProductDetail 
          product={selectedProduct} 
          onBack={() => setSelectedProductId(null)} 
          onViewBlog={handleViewBlog}
        />
      );
    }

    if (activePage === 'blog' && selectedBlog) {
      return (
        <BlogPostDetail 
          post={selectedBlog} 
          onBack={() => setSelectedBlogId(null)}
          onNavigateToPost={handleViewBlog}
          onViewProduct={handleViewProduct}
          onCategorySelect={handleCategorySidebarClick}
          onNavigateToHomeSection={handleNavigateToHomeSection}
          onNavigateToPage={handleNavigate}
        />
      );
    }

    switch (activePage) {
      case 'privacy':
        return <PrivacyPolicy onBack={() => setActivePage('home')} />;
      case 'terms':
        return <TermsConditions onBack={() => setActivePage('home')} />;
      case 'about':
        return <About onBack={() => setActivePage('home')} />;
      case 'categories':
        return (
          <CategoriesPage 
            onViewProduct={handleViewProduct}
            onCompareToggle={toggleCompare}
            onViewBlog={handleViewBlog}
            compareList={compareList}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        );
      case 'blog':
        return (
          <div className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Insights & News</span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">WebStarKit Blog</h1>
              <p className="text-base text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
                Stay updated with the latest in digital products, SaaS reviews, and tech guides.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black mb-2 text-slate-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">{post.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <button 
                      onClick={() => handleViewBlog(post.id)}
                      className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn"
                    >
                      Read Article
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'home':
      default:
        return (
          <>
            <Hero 
              onSearch={handleSearch} 
              onNavigateToAssistant={() => handleNavigateToHomeSection('launch-assistant')}
              onNavigateToCategories={() => handleNavigate('categories')}
            />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-center py-4 border-b border-slate-50 mb-6">
                <div className="flex items-center text-[12px] font-medium text-slate-400 gap-2">
                  <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                  </svg>
                  <span>Verified Oct 2025</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Featured in: Product Hunt • TechRadar • HackerNews</span>
                </div>
              </div>

              <LaunchAssistant 
                onExplore={() => handleNavigate('categories')} 
                onViewProduct={handleViewProduct}
                onViewBlog={handleViewBlog}
              />

              <section className="py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter">Choose Your Path</h2>
                  <p className="text-slate-500 font-medium max-w-2xl mx-auto">Four complete guides designed to help you build, secure, grow, and scale your online business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Path 1: Online Business Toolkit */}
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-20 blur-[100px] rounded-full group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-black mb-4">🛠️ Online Business Toolkit</h3>
                      <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                        Build a solid foundation with the essential tools every online business needs in 2026.
                      </p>
                      <button 
                        onClick={() => handleViewBlog('blog31')}
                        className="mt-auto inline-flex items-center gap-2 text-blue-400 font-black uppercase tracking-widest text-sm hover:text-white transition-colors"
                      >
                        👉 Explore the Toolkit
                      </button>
                    </div>
                  </div>

                  {/* Path 2: Business Growth & Monetization */}
                  <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-black mb-4">📈 Business Growth & Monetization</h3>
                      <p className="text-blue-100 font-medium mb-6 leading-relaxed">
                        Learn how to grow, monetize, and scale an online business in 2026 using proven strategies—not hype.
                      </p>
                      <ul className="space-y-2 mb-8">
                        {['Sustainable income models', 'Affiliate marketing done right', 'Outsourcing & scaling', 'Growth-focused tools'].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-blue-50 text-xs font-bold">
                            <div className="w-1 h-1 rounded-full bg-blue-300"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button 
                        onClick={() => handleViewBlog('blog39')}
                        className="mt-auto inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm hover:text-blue-100 transition-colors"
                      >
                        👉 Go to the Business Growth Guide
                      </button>
                    </div>
                  </div>

                  {/* Path 3: Freelancer & Remote Work */}
                  <div className="bg-indigo-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-black mb-4">🧑‍💻 Freelancer & Remote Work</h3>
                      <p className="text-indigo-100 font-medium mb-8 leading-relaxed">
                        Build a professional freelance and remote work setup with the right tools, security, and workflows.
                      </p>
                      <button 
                        onClick={() => handleViewBlog('blog29')}
                        className="mt-auto inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm hover:text-indigo-100 transition-colors"
                      >
                        👉 Go to the Freelancer Guide
                      </button>
                    </div>
                  </div>

                  {/* Path 4: Business Security & Privacy */}
                  <div className="bg-emerald-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 blur-[100px] rounded-full group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-black mb-4">🛡️ Business Security & Privacy</h3>
                      <p className="text-emerald-50 font-medium mb-8 leading-relaxed">
                        Protect your emails, data, and accounts with a modern business security and privacy stack.
                      </p>
                      <button 
                        onClick={() => handleViewBlog('blog30')}
                        className="mt-auto inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-sm hover:text-emerald-100 transition-colors"
                      >
                        👉 Go to the Business Security Guide
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="py-16 border-t border-slate-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tighter">Why WebStarKit Go?</h2>
                    <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed">
                      WebStarKit Go helps you avoid overpaying for tools you don’t need, insecure setups that lead to breaches, and confusing, bloated software stacks. 
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {['Expert Tested', 'Daily Curated', 'Clear Guides', 'ROI Focused'].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="font-bold text-slate-900 uppercase tracking-widest text-[11px]">{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-12 text-slate-600 font-black italic">Built for people who want results, not hype.</p>
                  </div>
                  <div className="bg-slate-50 rounded-[3rem] p-10 border border-slate-100 relative group">
                    <div className="absolute inset-0 bg-blue-600 opacity-[0.02] rounded-[3rem]"></div>
                    <h3 className="text-xl font-black text-slate-900 mb-8">What we verify</h3>
                    <ul className="space-y-6">
                      {[
                        { title: 'Stability', desc: 'No beta tools that might disappear tomorrow.' },
                        { title: 'Security', desc: 'Verified encryption and data handling policies.' },
                        { title: 'Value', desc: 'Tools that offer the best feature-to-price ratio.' }
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <span className="text-slate-900 font-black block text-sm">{item.title}</span>
                            <span className="text-slate-500 text-sm font-medium">{item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="py-16 border-t border-slate-50">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Explore Trusted Tools</h2>
                    <p className="text-slate-500 font-medium">Browse our expert-vetted directory by category.</p>
                  </div>
                  <button 
                    onClick={() => handleNavigate('categories')}
                    className="px-6 py-3 bg-white border-2 border-slate-100 text-slate-900 font-black rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all text-xs uppercase tracking-widest flex items-center gap-2"
                  >
                    Explore All Categories
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {['Web Hosting', 'Secure Email', 'VPN & Privacy', 'Password Managers', 'Cloud Storage'].map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => handleCategorySidebarClick(cat === 'VPN & Privacy' ? 'Security' : cat)}
                      className="p-6 bg-white border border-slate-100 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                      <span className="block font-black text-slate-900 text-sm group-hover:text-blue-600 transition-colors uppercase tracking-widest">{cat}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section id="tools" className="py-16 border-t border-slate-50">
                <div className="flex items-center justify-between border-b border-slate-100 mb-4">
                  <div className="flex overflow-x-auto scrollbar-hide -mb-[2px]">
                    {categoriesList.map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setSearchQuery(''); }}
                        className={`px-4 py-3 text-[13px] font-bold whitespace-nowrap transition-all border-b-2 ${selectedCategory === cat ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {filterPills.map(pill => (
                    <button
                      key={pill}
                      onClick={() => setSelectedPill(pill)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedPill === pill ? 'bg-blue-600 text-white shadow-sm shadow-blue-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onCompareToggle={() => toggleCompare(product)} isCompared={compareList.some(item => item.id === product.id)} onViewDetails={() => handleViewProduct(product.id)} />
                  ))}
                </div>
              </section>

              <div className="my-16">
                <LeadMagnet onSuccessAction={() => handleNavigateToHomeSection('launch-assistant')} />
              </div>

              <BlogSection posts={blogPosts} onViewBlog={handleViewBlog} />

              <section className="py-20 text-center">
                <div className="max-w-3xl mx-auto bg-blue-50 rounded-[3rem] p-10 md:p-16 border border-blue-100">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">Ready to Build the Right Setup?</h2>
                  <p className="text-slate-600 font-medium text-lg mb-10 leading-relaxed">
                    Whether you’re freelancing, working remotely, or running an online business, the right setup saves time, money, and stress.
                  </p>
                  <button 
                    onClick={() => handleNavigateToHomeSection('launch-assistant')}
                    className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 text-base uppercase tracking-widest"
                  >
                    👉 Build My Setup
                  </button>
                </div>
              </section>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar 
        onNavigate={handleNavigate} 
        activePage={activePage} 
        onViewBlog={handleViewBlog}
        onNavigateToAssistant={() => handleNavigateToHomeSection('launch-assistant')}
      />
      
      <main className="flex-grow">
        {renderContent()}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {compareList.length > 0 && !selectedProduct && !selectedBlog && activePage === 'home' && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white shadow-2xl border border-slate-200 rounded-2xl p-3 flex items-center gap-4 animate-bounce-in">
              <div className="flex -space-x-2">
                {compareList.map(p => (
                  <div key={p.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm bg-slate-50">
                    <img src={p.logoUrl} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <button onClick={() => setIsCompareModalOpen(true)} className="bg-blue-600 text-white px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg">Compare</button>
              <button onClick={() => setCompareList([])} className="p-1.5 text-slate-400 hover:text-red-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
          )}

          {isCompareModalOpen && <ComparisonModal items={compareList} onClose={() => setIsCompareModalOpen(false)} onRemove={toggleCompare} />}
        </div>
      </main>

      <ScrollToTop />
      <Footer 
        onNavigate={handleNavigate} 
        onViewBlog={handleViewBlog}
        onSelectCategory={(id) => handleCategorySidebarClick(id)}
      />
    </div>
  );
};

export default App;