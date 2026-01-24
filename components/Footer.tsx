
import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onViewBlog: (id: string) => void;
  onSelectCategory: (cat: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onViewBlog, onSelectCategory }) => {
  const guideLinks = [
    { name: 'Freelancer Guide (2026)', id: 'blog29' },
    { name: 'Business Security Guide (2026)', id: 'blog30' },
  ];

  const categoryLinks = [
    { name: 'Web Hosting', id: 'Web Hosting' },
    { name: 'AI Tools', id: 'AI Tools' },
    { name: 'VPN Services', id: 'VPN Services' },
    { name: 'Email Providers', id: 'Email Providers' },
    { name: 'Productivity', id: 'Productivity' },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      label: 'Follow us on X',
      href: 'https://twitter.com/webstarkitgo',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      label: 'Connect on LinkedIn',
      href: 'https://linkedin.com/company/webstarkitgo',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.476 7 2.476v6.759z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-slate-900 text-white pt-20 pb-12 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand/About */}
          <div className="col-span-1 md:col-span-1">
            <div 
              className="flex items-center gap-2 cursor-pointer group mb-6"
              onClick={() => onNavigate('home')}
            >
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tighter">WebStarKit <span className="text-blue-500">Go</span></span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
              Expert-tested reviews and smart setups for the modern digital entrepreneur. Verified results, no noise.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition-all hover:bg-blue-600 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Guides Section */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Expert Guides</h4>
            <ul className="space-y-4">
              {guideLinks.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => onViewBlog(link.id)}
                    className="text-slate-400 hover:text-blue-400 text-sm font-bold transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Categories</h4>
            <ul className="space-y-4">
              {categoryLinks.map(link => (
                <li key={link.id}>
                  <button 
                    onClick={() => onSelectCategory(link.id)}
                    className="text-slate-400 hover:text-blue-400 text-sm font-bold transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onNavigate('about')} className="text-slate-400 hover:text-white text-sm font-bold transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('blog')} className="text-slate-400 hover:text-white text-sm font-bold transition-colors">Our Blog</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="text-slate-400 hover:text-white text-sm font-bold transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="text-slate-400 hover:text-white text-sm font-bold transition-colors">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-[11px] font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} WebStarKit Go. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              Verified for 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
