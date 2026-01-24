import { Product } from '../types';

export const products: Product[] = [
  // --- AI TOOLS ---
  {
    id: 'ai1',
    name: 'Jasper AI',
    tagline: 'The Ultimate AI Content Sidekick',
    description: `# Why Jasper is the Leader in AI Content
Jasper is more than just a chatbot; it's a comprehensive writing suite designed for professional marketing teams and creators. It uses advanced machine learning to match your brand voice perfectly across every piece of content.

## Precision Brand Voice
Unlike generic AI tools, Jasper can be trained on your brand guidelines, past blogs, and style guides. This ensures that every output feels like it was written by your own team.

## Massive Template Library
With over 50 templates ranging from Facebook Ads to long-form SEO articles, you can kickstart any project in seconds. The "Recipes" feature allows for automated workflows that save hours of manual editing.`,
    category: 'AI Tools',
    rating: 4.9,
    price: 'From $39/mo',
    affiliateUrl: 'https://www.jasper.ai/',
    logoUrl: 'https://logos-world.net/wp-content/uploads/2022/12/Jasper-AI-Logo.png',
    features: ['50+ Writing Templates', 'Brand Voice Memory', 'Multilingual Support', 'Chrome Extension'],
    pros: ['Excellent brand voice matching', 'Powerful long-form editor', 'Reliable uptime', 'Active community'],
    cons: ['Higher price point', 'Steep learning curve for advanced features'],
    isEditorPick: true,
    relatedBlogIds: ['blog4', 'blog13', 'blog12']
  },
  {
    id: 'ai2',
    name: 'Surfer SEO',
    tagline: 'AI-Powered Search Excellence',
    description: `# Dominate the SERPs with Surfer SEO
Surfer SEO combines content strategy, creation, and optimization into a single process. It's the "secret weapon" for content marketers looking to rank on the first page of Google.

## Data-Driven Content Editing
The AI-driven Content Editor provides real-time suggestions based on top-ranking competitors. It tells you exactly which keywords to include and how often to use them.

## Automated Keyword Research
Stop guessing what to write about. Surfer's keyword tool groups topics by search intent, allowing you to build topical authority with minimal effort.`,
    category: 'AI Tools',
    rating: 4.8,
    price: 'From $89/mo',
    affiliateUrl: 'https://surferseo.com/',
    logoUrl: 'https://framerusercontent.com/images/kH5e0w7O1G8n47mI7r8oA7E7w.png',
    features: ['SERP Analyzer', 'AI Content Editor', 'Keyword Research', 'Audit Tool'],
    pros: ['Highly accurate data', 'Easy-to-use content editor', 'Integrates with Google Docs'],
    cons: ['Subscription can be expensive for solo users', 'Can be overwhelming for beginners'],
    isEditorPick: true,
    relatedBlogIds: ['blog11', 'blog18']
  },
  {
    id: 'ai3',
    name: 'Pictory',
    tagline: 'Video Creation Made Easy',
    description: `# Professional Video from Text in Minutes
Pictory uses AI to automatically extract "golden nuggets" from your long-form video and text content to create short, highly-shareable branded videos for social media.

## Script to Video
Simply paste your script and let the AI find the perfect stock footage, add music, and generate a voiceover. It's the fastest way to turn blog posts into YouTube videos.

## Automatic Captions
Increase your engagement by up to 80% with automated captions. Pictory transcribes your videos with incredible accuracy and burns the subtitles directly into the video.`,
    category: 'AI Tools',
    rating: 4.7,
    price: 'From $19/mo',
    affiliateUrl: 'https://pictory.ai/',
    logoUrl: 'https://www.g2.com/products/pictory/logo',
    features: ['Script to Video', 'Auto Captions', 'Blog to Video', 'Text Video Editing'],
    pros: ['Huge library of stock footage', 'Simple drag-and-drop interface', 'Very fast rendering'],
    cons: ['Voiceovers can sound a bit robotic', 'Limited advanced editing controls']
  },
  {
    id: 'ai4',
    name: 'Writesonic',
    tagline: 'Best AI Writing for Teams',
    description: `# The All-in-One Content Automation Platform
Writesonic helps you write SEO-optimized, long-form content 10x faster. It's a versatile tool that handles everything from landing pages to product descriptions.

## Chatsonic: The GPT Alternative
Chatsonic is like ChatGPT but with real-time data from Google Search, allowing you to write about current events with factual accuracy.

## Photosonic: AI Art Generator
Generate unique images for your blog posts directly within the writing interface. No need to hunt for stock photos ever again.`,
    category: 'AI Tools',
    rating: 4.8,
    price: 'Free / $12/mo',
    affiliateUrl: 'https://writesonic.com/',
    logoUrl: 'https://cdn.worldvectorlogo.com/logos/writesonic-1.svg',
    features: ['Chatsonic AI Chat', 'SEO Checker', 'Bulk Generation', 'AI Image Generator'],
    pros: ['Generous free tier', 'Real-time Google search integration', 'Great for short-form copy'],
    cons: ['Credit system can be confusing', 'Occasional repetitive outputs'],
    isFree: true
  },
  {
    id: 'ai5',
    name: 'AdCreative.ai',
    tagline: 'AI That Sells',
    description: `# High-Converting Ads in Seconds
Generate conversion-focused ad creatives and social media posts using artificial intelligence. AdCreative.ai is trained on millions of high-performing ads to predict what works.

## Creative Scoring
Each generated design is given a score based on how likely it is to convert. This helps you choose the best variations before spending a dime on ad spend.

## Complete Brand Integration
Upload your logo and brand colors once, and the AI will ensure every single design is perfectly on-brand across all formats.`,
    category: 'AI Tools',
    rating: 4.6,
    price: 'From $21/mo',
    affiliateUrl: 'https://www.adcreative.ai/',
    logoUrl: 'https://www.adcreative.ai/favicon.ico',
    features: ['AI Ad Generation', 'Creative Scoring', 'Social Post Design', 'Competitor Insights'],
    pros: ['Massive time saver for advertisers', 'Data-backed design decisions', 'Seamless multi-platform export'],
    cons: ['Designs can feel similar after a while', 'Best results require high-quality assets']
  },

  // --- WEB HOSTING ---
  {
    id: 'p2',
    name: 'Hostinger',
    tagline: 'Fast, Reliable & Affordable',
    description: `# The Ultimate Choice for Web Hosting
Choosing the right web hosting provider is the cornerstone of your online business. Hostinger stands out by offering a rare blend of high-end performance and budget-friendly pricing.

## ⚡ High Performance & Speed Optimization
Hostinger’s platform is built on LiteSpeed servers, ensuring your site loads faster than the competition. Speed is a critical ranking factor for Google, and Hostinger delivers it out of the box.

## 🔒 Security You Can Trust
- Free SSL certificates for all domains
- Advanced firewalls and DDoS protection
- Automated weekly (or daily) backups

## 🛠 Beginner-Friendly, Yet Powerful
The custom hPanel is cleaner than the traditional cPanel, making it perfect for those launching their first site.`,
    category: 'Web Hosting',
    rating: 4.9,
    price: '$2.99/mo',
    affiliateUrl: 'https://hostinger.com/?REFERRALCODE=1ABDELOUAHD35',
    logoUrl: 'https://www.hostinger.com/assets/images/logo-homepage-f9e71025.svg',
    features: ['Managed WordPress', 'Free Domain', 'Cloudflare Protected DNS', 'Weekly Backups'],
    pros: ['Very affordable intro pricing', 'Intuitive custom control panel', 'Great global speeds', 'Free domain included'],
    cons: ['Pricing increases upon renewal', 'No phone support'],
    isSponsored: true,
    isEditorPick: true,
    relatedBlogIds: ['blog5', 'blog10', 'blog18', 'blog17', 'blog13', 'blog12', 'blog24', 'blog26', 'blog27', 'blog29', 'blog31']
  },
  {
    id: 'host2',
    name: 'IONOS',
    tagline: 'Scalable Business Hosting',
    description: `# Professional Grade Web Hosting
IONOS focuses on providing robust, business-ready hosting solutions with dedicated support and scalable infrastructure.

## Reliable Infrastructure
With specialized platforms for WordPress, VPS, and Dedicated servers, IONOS ensures your business grows without technical bottlenecks.`,
    category: 'Web Hosting',
    rating: 4.7,
    price: '$1.00/mo',
    affiliateUrl: 'https://acn.ionos.com/aff_c?offer_id=1&aff_id=10804',
    logoUrl: 'https://www.ionos.com/favicon-192x192.png',
    features: ['Business Email Included', 'Scalable Performance', '24/7 Personal Consultant', 'Daily Backups'],
    pros: ['Extreme value starter plans', 'Solid uptime record', 'Professional support'],
    cons: ['Checkout process can be cluttered with upsells'],
    isEditorPick: true,
    relatedBlogIds: ['blog10', 'blog18', 'blog17', 'blog12', 'blog31']
  },
  {
    id: 'host3',
    name: 'A2 Hosting',
    tagline: 'Our Speed, Your Success',
    description: `# High Speed Hosting for Professionals
A2 Hosting is renowned for its "Turbo" servers that promise up to 20x faster page loads compared to standard hosting.

## Speed as a Priority
A2 is optimized for speed at the server level, making it a favorite for SEO-focused marketers and high-traffic blogs.`,
    category: 'Web Hosting',
    rating: 4.8,
    price: '$2.99/mo',
    affiliateUrl: 'https://hosting.com/?aid=68bee4ca93d53',
    logoUrl: 'https://www.a2hosting.com/favicon.ico',
    features: ['Turbo Servers (20x Faster)', 'Free Site Migration', 'Guru Crew Support', 'Anytime Money-Back Guarantee'],
    pros: ['Unbeatable server speeds', 'Developer friendly environment', 'Excellent security features'],
    cons: ['Turbo features only on higher tiers'],
    isEditorPick: true,
    relatedBlogIds: ['blog10', 'blog18', 'blog17', 'blog31']
  },
  {
    id: 'host4',
    name: 'InterServer',
    tagline: 'Standard Hosting Done Right',
    description: `# Reliable Hosting with Price Lock Guarantee
InterServer offers a refreshing approach with no renewal price hikes. What you pay today is what you pay for the life of your account.

## Honest Hosting
Unlimited storage, unlimited bandwidth, and free SSL — InterServer provides a powerful foundation for any website.`,
    category: 'Web Hosting',
    rating: 4.6,
    price: '$2.50/mo',
    affiliateUrl: 'https://www.interserver.net/r/1059153',
    logoUrl: 'https://www.interserver.net/images/logo.png',
    features: ['Price Lock Guarantee', 'Unlimited Storage', 'InterShield Security', 'Free Website Migration'],
    pros: ['No renewal price increases', 'Quality hardware', 'Excellent security stack'],
    cons: ['Control panel looks slightly dated'],
    isEditorPick: true,
    relatedBlogIds: ['blog17', 'blog31']
  },
  {
    id: 'host5',
    name: 'Bluehost',
    tagline: 'Trusted by WordPress',
    description: `# Powering Over 2 Million Websites
Bluehost is one of the most popular web hosting providers in the world and an official WordPress recommended host.

## Best for WordPress
Seamless 1-click installation and a range of themes and plugins make it the go-to choice for bloggers and small business owners.`,
    category: 'Web Hosting',
    rating: 4.7,
    price: '$2.95/mo',
    affiliateUrl: 'https://www.bluehost.com/track/bluehost_direct/',
    logoUrl: 'https://www.bluehost.com/favicon.ico',
    features: ['WordPress Integration', 'Free Domain (1 Year)', 'Custom Themes', '24/7 Phone Support'],
    pros: ['Official WordPress endorsement', 'Easy-to-use website builder', 'Solid customer support'],
    cons: ['Aggressive upselling during checkout'],
    isEditorPick: true,
    relatedBlogIds: ['blog5']
  },
  {
    id: 'host6',
    name: 'Cloudways',
    tagline: 'Managed Cloud Hosting Mastery',
    description: `# The Power of Cloud Without the Complexity
Cloudways provides managed hosting on top of the world's best cloud providers like DigitalOcean, AWS, and Google Cloud.

## Unmatched Speed
Experience the fastest performance with built-in advanced caches like Memcached, Varnish, Nginx, and Redis.`,
    category: 'Web Hosting',
    rating: 4.9,
    price: '$11.00/mo',
    affiliateUrl: 'https://www.cloudways.com/en/',
    logoUrl: 'https://www.cloudways.com/favicon.ico',
    features: ['Managed Cloud Environment', 'SSD-Based Hosting', 'Advanced Caching', 'Cloudways Bot for Optimization'],
    pros: ['Stunning server speeds', 'Flexible scaling', 'Choose your cloud provider'],
    cons: ['No traditional email hosting included'],
    isEditorPick: true,
    relatedBlogIds: ['blog18']
  },

  // --- VPN SERVICES ---
  {
    id: 'p7',
    name: 'NordVPN',
    tagline: 'Advanced Online Privacy',
    description: `# Secure Your Digital Life with NordVPN
In an era of increasing surveillance, NordVPN provides the encryption you need to stay private online.

## Military-Grade Encryption
Using the NordLynx protocol, you get lightning-fast speeds without compromising on the 256-bit encryption that keeps your data safe from prying eyes.`,
    category: 'VPN Services',
    rating: 4.9,
    price: '$3.29/mo',
    affiliateUrl: 'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=133342&url_id=902',
    logoUrl: 'https://nordvpn.com/favicon.ico',
    features: ['6400+ Servers', 'Double VPN', 'Threat Protection', 'No Logs Policy'],
    pros: ['Fastest VPN in our tests', 'Strict no-logs policy', 'Easy to use apps', 'Works with all streaming sites'],
    cons: ['Browser extension is limited', 'Renewals are pricier'],
    isEditorPick: true,
    relatedBlogIds: ['blog6', 'blog25', 'blog23', 'blog22', 'blog21', 'blog20', 'blog19', 'blog16', 'blog15', 'blog14', 'blog24', 'blog26', 'blog27', 'blog28', 'blog29', 'blog30', 'blog31']
  },
  {
    id: 'vpn2',
    name: 'Proton VPN',
    tagline: 'Swiss-Based Privacy for Everyone',
    description: `# The Gold Standard of Privacy
Created by the CERN scientists behind Proton Mail, Proton VPN is engineered for maximum security and absolute privacy.

## Secure Core Architecture
Proton VPN's Secure Core architecture gives you the unique ability to defend against network-based attacks by routing your traffic through multiple servers.`,
    category: 'VPN Services',
    rating: 4.8,
    price: 'Free / $4.99/mo',
    affiliateUrl: 'https://go.getproton.me/aff_c?offer_id=26&aff_id=14558',
    logoUrl: 'https://protonvpn.com/favicon.ico',
    features: ['Swiss Jurisdiction', 'NetShield Ad-blocker', 'Secure Core Servers', 'Open Source Apps'],
    pros: ['High transparency', 'Powerful free tier', 'Excellent for security purists'],
    cons: ['Fewer server locations than competitors'],
    isFree: true,
    relatedBlogIds: ['blog6', 'blog16', 'blog15']
  },
  {
    id: 'vpn3',
    name: 'Surfshark',
    tagline: 'Unlimited Secure Connections',
    description: `# Secure All Your Devices at Once
Surfshark is the best value VPN on the market, offering unlimited simultaneous connections under a single subscription.

## CleanWeb Technology
Blocks ads, trackers, malware, and phishing attempts before they even load on your screen.`,
    category: 'VPN Services',
    rating: 4.7,
    price: '$2.19/mo',
    affiliateUrl: 'https://get.surfshark.net/aff_c?offer_id=926&aff_id=42016',
    logoUrl: 'https://surfshark.com/favicon.ico',
    features: ['Unlimited Devices', 'No-Borders Mode', 'Kill Switch'],
    pros: ['Best value for families', 'Unlimited connections', 'Fast wireguard speeds'],
    cons: ['Support response can be slow at times'],
    relatedBlogIds: ['blog6', 'blog16', 'blog15']
  },

  // --- EMAIL PROVIDERS ---
  {
    id: 'mail1',
    name: 'Proton Mail',
    tagline: 'Private Email, By Default',
    description: `# End-to-End Encrypted Email
Proton Mail is the world's largest secure email provider. It uses end-to-end encryption and zero-access architecture to ensure that only you can read your messages.

## Privacy First
Based in Switzerland, your data is protected by some of the world's strongest privacy laws.`,
    category: 'Email Providers',
    rating: 4.9,
    price: 'Free / $3.99/mo',
    affiliateUrl: 'https://go.getproton.me/aff_c?offer_id=38&aff_id=14558',
    logoUrl: 'https://proton.me/favicon.ico',
    features: ['Zero-Access Encryption', 'Swiss Based', 'PGP Support', 'Calendar Integration'],
    pros: ['Industry leading security', 'Easy to use interface', 'Excellent mobile apps'],
    cons: ['Limited storage on free plan'],
    isFree: true,
    isEditorPick: true,
    relatedBlogIds: ['blog8', 'blog25', 'blog23', 'blog22', 'blog21', 'blog20', 'blog19', 'blog14', 'blog24', 'blog26', 'blog27', 'blog28', 'blog29', 'blog30', 'blog31']
  },
  {
    id: 'mail2',
    name: 'Proton Drive',
    tagline: 'Encrypted Cloud Storage',
    description: `# Securely Store and Share Files
Proton Drive provides a secure way to store your files in the cloud with end-to-end encryption, ensuring that no one—not even Proton—can access your data.

## Secure Sharing
Share files and folders with password-protected links that can have expiration dates.`,
    category: 'Email Providers',
    rating: 4.7,
    price: 'Free / $4.99/mo',
    affiliateUrl: 'https://go.getproton.me/aff_c?offer_id=26&aff_id=14558',
    logoUrl: 'https://proton.me/favicon.ico',
    features: ['End-to-End Encryption', 'Secure File Sharing', 'Auto Sync', 'Encrypted Metadata'],
    pros: ['Total privacy for files', 'Integrates with Proton ecosystem', 'Swiss security'],
    cons: ['Desktop app is newer and still maturing'],
    relatedBlogIds: ['blog8', 'blog25', 'blog23', 'blog22', 'blog21', 'blog20', 'blog19', 'blog14', 'blog24', 'blog26', 'blog28', 'blog29', 'blog30', 'blog31']
  },

  // --- PRODUCTIVITY ---
  {
    id: 'prod1',
    name: 'NordPass',
    tagline: 'Next-Generation Password Security',
    description: `# Master Your Password Security
NordPass simplifies your digital life by securely storing all your passwords, credit cards, and personal info in one encrypted vault.

## Zero-Knowledge Architecture
NordPass uses XChaCha20 encryption, ensuring that your sensitive data is encrypted on your device before it ever reaches their servers.`,
    category: 'Productivity',
    rating: 4.8,
    price: 'Free / $1.29/mo',
    affiliateUrl: 'https://go.nordpass.io/aff_c?offer_id=488&aff_id=133342&url_id=9356',
    logoUrl: 'https://nordpass.com/favicon.ico',
    features: ['Biometric Login', 'Secure Password Sharing', 'Data Breach Scanner', 'Automatic Autofill'],
    pros: ['Very intuitive UI', 'Extremely secure algorithm', 'Great price point'],
    cons: ['Free version only allows one active session'],
    isFree: true,
    relatedBlogIds: ['blog7', 'blog25', 'blog23', 'blog22', 'blog21', 'blog20', 'blog19', 'blog15', 'blog14', 'blog24', 'blog26', 'blog27', 'blog28', 'blog29', 'blog30', 'blog31']
  },
  {
    id: 'prod2',
    name: 'Proton Pass',
    tagline: 'Secure Passwords and Identity',
    description: `# Identity Protection Made Simple
Proton Pass goes beyond just storing passwords. It includes "Hide-my-email" aliases to keep your real identity private from trackers and spammers.

## Seamless Integration
Part of the Proton ecosystem, it syncs perfectly across all your devices with end-to-end encryption.`,
    category: 'Productivity',
    rating: 4.7,
    price: 'Free / $1.99/mo',
    affiliateUrl: 'https://go.getproton.me/aff_c?offer_id=7&aff_id=14558',
    logoUrl: 'https://proton.me/favicon.ico',
    features: ['Email Aliases', '2FA Authenticator', 'Secure Vaults', 'Import from Browsers'],
    pros: ['Excellent privacy focus', 'Email alias feature is a game changer', 'Open source'],
    cons: ['UI can be slightly more technical than NordPass'],
    relatedBlogIds: ['blog7', 'blog23', 'blog21', 'blog20', 'blog19', 'blog15']
  },

  // --- DIGITAL SERVICES ---
  {
    id: 'serv1',
    name: 'Fiverr',
    tagline: 'Find the Perfect Freelance Services',
    description: `# Scale Your Business Instantly
Fiverr is the world's largest marketplace for digital services. Whether you need a logo, a blog post, or a full website, there is a freelancer ready to help.

## Thousands of Categories
From AI development to voice-overs, Fiverr gives you access to a global talent pool with clear pricing and reviews.`,
    category: 'Digital Services',
    rating: 4.8,
    price: 'From $5.00',
    affiliateUrl: 'https://www.fiverr.com/?utm_source=816937&utm_medium=cx_affiliate&utm_campaign=_bus-y',
    logoUrl: 'https://www.fiverr.com/favicon.ico',
    features: ['Global Talent Pool', 'Clear Review System', 'Secure Payments', 'Fiverr Pro for High-End Work'],
    pros: ['Fast turnaround', 'Competitive pricing', 'Huge variety of skills'],
    cons: ['Quality can vary between sellers', 'Platform fees apply to buyers'],
    isEditorPick: true,
    relatedBlogIds: ['blog9', 'blog13', 'blog31']
  },

  // --- OTHERS ---
  {
    id: 'reg1',
    name: 'Dynadot',
    tagline: 'Reliable & Transparent Domain Registrar',
    description: `# Register Your Identity with Confidence
Dynadot is a ICANN accredited domain name registrar that prides itself on transparent pricing and advanced security tools for domain management.

## Advanced Security
With two-factor authentication and account locking, Dynadot keeps your digital assets safe from unauthorized transfers.`,
    category: 'Web Hosting', // Closest category
    rating: 4.8,
    price: '$12.00/yr',
    affiliateUrl: 'https://www.dynadot.com/?rsc=novahost&rsctrn=novahost',
    logoUrl: 'https://www.dynadot.com/favicon.ico',
    features: ['ICANN Accredited', 'Free Privacy Protection', 'Grace Period Deletions', 'Marketplace Access'],
    pros: ['Transparent pricing', 'Excellent security features', 'No hidden fees'],
    cons: ['Interface can feel slightly technical for absolute beginners'],
    relatedBlogIds: ['blog11', 'blog13', 'blog12']
  }
];
