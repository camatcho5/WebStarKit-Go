
import React from 'react';

interface TermsConditionsProps {
  onBack: () => void;
}

const TermsConditions: React.FC<TermsConditionsProps> = ({ onBack }) => {
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
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Terms & Conditions</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            Last updated: {currentDate}
          </p>
        </header>

        <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed space-y-10">
          <div className="space-y-4">
            <p className="text-lg font-bold text-slate-900">Welcome to WebStarKit Go.</p>
            <p>
              By accessing or using our website, services, tools, and digital content, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">1. Use of the Website</h2>
            <p>You agree to use WebStarKit Go only for lawful purposes and in a way that does not:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe the rights of others</li>
              <li>Disrupt or damage the website or its services</li>
              <li>Attempt unauthorized access to systems or data</li>
            </ul>
            <p className="mt-4 italic text-sm text-slate-500">
              We reserve the right to restrict or terminate access if these terms are violated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">2. Services & Content</h2>
            <p>WebStarKit Go provides digital tools, resources, information, and recommendations for educational and business purposes only.</p>
            <div className="mt-4 space-y-2">
              <p>We do not guarantee that:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>The services will be uninterrupted or error-free</li>
                <li>The content will always be accurate or up to date</li>
                <li>Results or earnings will be achieved using our tools or recommendations</li>
              </ul>
            </div>
            <p className="mt-4 font-bold text-slate-900 underline decoration-blue-500 decoration-2">Use of our content is at your own risk.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">3. Intellectual Property</h2>
            <p>All content on WebStarKit Go, including but not limited to:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-6">
              {['Text', 'Graphics', 'Logos', 'Tools', 'Design elements'].map((item) => (
                <div key={item} className="bg-slate-50 px-4 py-2 rounded-xl text-center font-bold text-slate-700 border border-slate-100">
                  {item}
                </div>
              ))}
            </div>
            <p>
              is the intellectual property of WebStarKit Go and may not be copied, reproduced, distributed, or reused without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">4. Affiliate Disclosure</h2>
            <p>
              WebStarKit Go may contain affiliate links. This means we may earn a commission if you purchase products or services through these links, at no additional cost to you.
            </p>
            <p className="mt-4">
              We only promote tools and services we believe provide value, but we are not responsible for third-party products, services, or guarantees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">5. Third-Party Websites</h2>
            <p>Our website may include links to third-party websites. These external sites are not controlled by WebStarKit Go, and we are not responsible for:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Their content</li>
              <li>Their policies</li>
              <li>Their practices or services</li>
            </ul>
            <p className="mt-4 font-medium text-blue-600">You access third-party websites at your own discretion and risk.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, WebStarKit Go shall not be liable for any:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Direct or indirect damages</li>
              <li>Loss of data, profits, or business opportunities</li>
              <li>Technical issues or service interruptions</li>
            </ul>
            <p className="mt-4">arising from the use or inability to use our website or services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">7. Disclaimer</h2>
            <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100">
              <p className="text-amber-900 font-medium">
                All information provided by WebStarKit Go is for general informational purposes only and should not be considered professional, legal, financial, or technical advice.
              </p>
              <p className="mt-4 text-amber-900 font-bold">
                You are responsible for your own decisions and actions based on the information provided.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">8. Termination</h2>
            <p>
              We reserve the right to suspend or terminate access to our website or services at any time, without prior notice, if these Terms & Conditions are breached.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">9. Changes to These Terms</h2>
            <p>
              We may update these Terms & Conditions at any time. Any changes will be effective immediately upon posting on this page. Continued use of the website constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">10. Governing Law</h2>
            <p>
              These Terms & Conditions shall be governed and interpreted in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section className="bg-blue-600 text-white p-10 rounded-[2rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 blur-[60px]"></div>
             <h2 className="text-2xl font-black mb-4 relative z-10">11. Contact Information</h2>
             <p className="text-blue-50 relative z-10">
               If you have any questions about these Terms & Conditions, please contact our legal team at legal@webstarkit.go.
             </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
