
import React from 'react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm mb-12 transition-all group"
      >
        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        Return to Home
      </button>

      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-slate-200/50">
        <header className="mb-12 border-b border-slate-100 pb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Privacy Policy</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            Last updated: {currentDate}
          </p>
        </header>

        <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed space-y-10">
          <p className="text-lg">
            At <strong>WebStarKit Go</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and safeguard your data when you visit or use our website, services, tools, and digital resources.
          </p>
          
          <p className="bg-blue-50 text-blue-800 p-6 rounded-2xl border border-blue-100 italic">
            By accessing or using WebStarKit Go, you agree to the terms of this Privacy Policy.
          </p>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">1. Information We Collect</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">a) Personal Information</h3>
                <p>When you voluntarily provide it, such as:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Contact details</li>
                  <li>Account information</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">b) Non-Personal Information</h3>
                <p>Collected automatically, including:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Pages visited and usage data</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">2. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Provide and improve our services and tools</li>
              <li>Respond to inquiries and support requests</li>
              <li>Send updates, newsletters, or promotional content (if opted in)</li>
              <li>Analyze website usage and performance</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">3. Cookies and Tracking Technologies</h2>
            <p>WebStarKit Go uses cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Enhance user experience</li>
              <li>Understand visitor behavior</li>
              <li>Track analytics and performance</li>
            </ul>
            <p className="mt-4">
              You can disable cookies through your browser settings. However, some features may not function properly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">4. Third-Party Services & Affiliates</h2>
            <p>
              We may use third-party tools and services (such as analytics providers, hosting services, or affiliate partners) that may collect data according to their own privacy policies.
            </p>
            <p className="mt-4">
              WebStarKit Go may include affiliate links. Clicking on these links may redirect you to third-party websites. We are not responsible for the privacy practices or content of external websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">5. Data Protection & Security</h2>
            <p>We implement reasonable technical and organizational measures to protect your data from:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Unauthorized access</li>
              <li>Disclosure</li>
              <li>Alteration</li>
              <li>Destruction</li>
            </ul>
            <p className="mt-4 bg-slate-50 p-4 rounded-xl text-sm border border-slate-100">
              However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">6. Data Retention</h2>
            <p>We retain personal information only for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Fulfill the purposes outlined in this policy</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent at any time</li>
              <li>Object to certain data processing activities</li>
            </ul>
            <p className="mt-4">To exercise your rights, please contact us using the information provided in the footer.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">8. Children’s Information</h2>
            <p>
              WebStarKit Go does not knowingly collect personal data from children under the age of 13. If you believe that a child has provided personal information, please contact us immediately and we will remove it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of our services constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="bg-slate-900 text-white p-10 rounded-[2rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-20 blur-[60px]"></div>
             <h2 className="text-2xl font-black mb-4 relative z-10">10. Contact Us</h2>
             <p className="text-slate-300 relative z-10">
               If you have any questions or concerns about this Privacy Policy, please contact our support team at support@webstarkit.go or via the contact form.
             </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
