import React, { useState, useRef, useEffect } from 'react';
import { FrostedGlassButton } from './FrostedGlassButton';

interface InvestorPortalProps {
  onLogout: () => void;
}

export const InvestorPortal: React.FC<InvestorPortalProps> = ({ onLogout }) => {
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [ndaSigned, setNdaSigned] = useState(false);
  const [ndaScrolled, setNdaScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const ndaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const hasSignedNDA = localStorage.getItem('investorNDASigned') === 'true';
    const hasSeenIntro = localStorage.getItem('investorIntroSeen') === 'true';
    
    setNdaSigned(hasSignedNDA);
    setShowIntroVideo(!hasSeenIntro);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && showIntroVideo) {
      const handleVideoEnd = () => {
        setShowIntroVideo(false);
        localStorage.setItem('investorIntroSeen', 'true');
      };
      video.addEventListener('ended', handleVideoEnd);
      return () => video.removeEventListener('ended', handleVideoEnd);
    }
  }, [showIntroVideo]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'investment', 'business', 'financials', 'launch', 'documents'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(`section-${section}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNdaScroll = () => {
    if (ndaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = ndaRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setNdaScrolled(true);
      }
    }
  };

  const handleSignNDA = () => {
    localStorage.setItem('investorNDASigned', 'true');
    setNdaSigned(true);
    alert('NDA signed successfully! Notification sent to Christopher DeMarkus.');
  };

  const handleInvestmentInterest = () => {
    alert('Your interest has been noted! You will be contacted within 24-48 hours for a 1:1 discussion with Sir Christopher DeMarkus.');
  };

  if (showIntroVideo) {
    return (
      <div className="fixed inset-0 bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
          loop
          src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/Copy%20of%20Jersey.mp4"
        />
        <button
          onClick={() => {
            setShowIntroVideo(false);
            localStorage.setItem('investorIntroSeen', 'true');
          }}
          className="absolute bottom-8 right-8 px-4 md:px-6 py-2 md:py-3 bg-black/30 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg transition-all duration-300 hover:bg-black/40 hover:border-[#D4AF37]/80 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
        >
          Skip Intro
        </button>
      </div>
    );
  }

  if (!ndaSigned) {
    return (
      <div className="fixed inset-0 bg-black text-white overflow-y-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
          <div className="max-w-4xl w-full">
            <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl p-4 md:p-8">
              <h1 className="text-2xl md:text-3xl text-[#D4AF37] text-center mb-4 md:mb-6">Non-Disclosure Agreement</h1>
              <p className="text-gray-400 text-center mb-6 md:mb-8 text-sm md:text-base">
                Please read and accept the NDA to access the investor portal
              </p>

              <div
                ref={ndaRef}
                onScroll={handleNdaScroll}
                className="h-64 md:h-96 overflow-y-auto p-4 md:p-6 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-gray-300 space-y-4 mb-6 text-sm md:text-base"
              >
                <h3 className="text-[#D4AF37] text-lg md:text-xl">CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT</h3>
                
                <p>This Confidentiality and Non-Disclosure Agreement ("Agreement") is entered into by and between VAULT54 ("Disclosing Party") and the undersigned investor ("Receiving Party").</p>
                
                <p><strong>1. DEFINITION OF CONFIDENTIAL INFORMATION</strong></p>
                <p>"Confidential Information" refers to any and all information related to VAULT54, including but not limited to: business plans, financial projections, member information, operational strategies, marketing plans, investor information, and any other proprietary information disclosed through the investor portal.</p>
                
                <p><strong>2. OBLIGATIONS OF RECEIVING PARTY</strong></p>
                <p>The Receiving Party agrees to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hold all Confidential Information in strict confidence</li>
                  <li>Not disclose any Confidential Information to third parties</li>
                  <li>Not use Confidential Information for any purpose other than investment evaluation</li>
                  <li>Protect all business strategies, financial data, and member privacy</li>
                  <li>Not discuss VAULT54 investment details on social media or public forums</li>
                </ul>
                
                <p><strong>3. PROHIBITED DISCLOSURES</strong></p>
                <p>The Receiving Party specifically agrees never to disclose:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Financial projections and revenue models</li>
                  <li>Member data and demographics</li>
                  <li>Business strategies and expansion plans</li>
                  <li>Partnership agreements and vendor relationships</li>
                  <li>Any proprietary technology or processes</li>
                </ul>
                
                <p><strong>4. DURATION</strong></p>
                <p>This Agreement remains in effect for a period of 5 years from the date of signing and continues to protect information indefinitely.</p>
                
                <p><strong>5. CONSEQUENCES OF BREACH</strong></p>
                <p>The Receiving Party understands that breach of this Agreement may result in immediate termination of investment discussions, legal action, and liability for all damages.</p>
                
                <p><strong>6. GOVERNING LAW</strong></p>
                <p>This Agreement shall be governed by the laws of the State of New York.</p>
                
                <p className="text-[#D4AF37]">By accepting below, you acknowledge that you have read, understand, and agree to be bound by this Non-Disclosure Agreement.</p>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ndaScrolled}
                    disabled={!ndaScrolled}
                    className="mt-1 w-5 h-5 rounded"
                    readOnly
                  />
                  <span className="text-gray-300 text-sm md:text-base">
                    I have scrolled through and read the entire agreement.
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={onLogout}
                    className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-400 transition-all"
                  >
                    Decline & Exit
                  </button>
                  <button
                    onClick={handleSignNDA}
                    disabled={!ndaScrolled}
                    className={`px-6 py-3 rounded-lg transition-all ${
                      ndaScrolled
                        ? 'bg-black/30 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-black/40 hover:border-[#D4AF37]/80 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Accept & Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-y-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/30 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl md:text-2xl tracking-[0.2em] md:tracking-[0.3em] text-[#D4AF37]">VAULT54</div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="px-3 md:px-4 py-1 md:py-2 rounded-full bg-gradient-to-r from-[#167D7F] to-[#145e60] backdrop-blur-md text-white text-xs md:text-sm border border-[#167D7F]/30">
              💎 <span className="hidden sm:inline">INVESTOR</span>
            </span>
            <button
              onClick={onLogout}
              className="px-3 md:px-4 py-2 bg-black/30 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] rounded text-sm transition-all duration-300 hover:bg-black/40 hover:border-[#D4AF37]/80 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative text-center py-12 md:py-16 border-b border-[#D4AF37]/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl text-[#D4AF37] mb-4">Investor Portal</h1>
          <p className="text-gray-400 tracking-widest text-sm md:text-base">VIRTUS ET DISCRETIO</p>
        </div>
      </div>

      {/* Sticky Navigation Tabs */}
      <div className="sticky top-[73px] z-40 bg-black/95 backdrop-blur-xl border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'investment', label: 'Investment' },
              { id: 'business', label: 'Business' },
              { id: 'financials', label: 'Financials' },
              { id: 'launch', label: 'Launch' },
              { id: 'documents', label: 'Documents' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  document.getElementById(`section-${tab.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`pb-4 px-3 md:px-4 uppercase tracking-wider transition-all whitespace-nowrap text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                    : 'text-gray-400 hover:text-[#D4AF37]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Content - All Sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-white pb-12">
        {/* OVERVIEW SECTION */}
        <section id="section-overview" className="py-8 md:py-12 space-y-6 md:space-y-8">
          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl text-[#D4AF37] mb-4 md:mb-6">About VAULT54</h2>
            <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              VAULT54 is redefining the landscape of exclusive social experiences for accomplished LGBTQ+ professionals. Operating under the motto "Virtus et Discretio" (Virtue and Discretion), we provide a sophisticated, sex-positive environment where members can connect authentically while maintaining the highest standards of privacy and discretion.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Unlike traditional clubs or social venues, VAULT54 combines the elegance of a private society with the authenticity of a welcoming, judgment-free community. Our referral-only membership model ensures quality over quantity, creating an environment where every attendee is vetted, verified, and aligned with our values.
            </p>
            
            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] rounded">
              <h3 className="text-[#D4AF37] text-lg md:text-xl mb-2">Our Mission</h3>
              <p className="text-gray-300 text-sm md:text-base">
                To create the premier sex-positive community for accomplished LGBTQ+ professionals who value both achievement and authenticity, providing exclusive experiences that prioritize quality, discretion, and genuine connection.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Target Market Size', value: '$2.4B' },
              { label: 'NYC LGBTQ+ Pop.', value: '850K+' },
              { label: 'Avg. Event Ticket', value: '$125' },
              { label: 'Member Capacity', value: '300-500' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6 text-center">
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider mb-2">{stat.label}</div>
                <div className="text-2xl md:text-3xl text-[#D4AF37]">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* INVESTMENT SECTION */}
        <section id="section-investment" className="py-8 md:py-12 space-y-6 md:space-y-8 border-t border-[#D4AF37]/10">
          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl text-[#D4AF37] mb-4 md:mb-6">Investment Opportunities</h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              Join VAULT54's founding investors and be part of building the premier sex-positive community for accomplished LGBTQ+ professionals. Each tier offers unique benefits and opportunities to shape the future of the society.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                name: 'Founding Member',
                price: '$500',
                benefits: [
                  'Priority event access',
                  'Member profile listing',
                  '1 golden ticket for guest approval',
                  'Quarterly investor updates',
                  'Recognition as founding supporter'
                ]
              },
              {
                name: 'Circle Insider',
                price: '$1,000',
                benefits: [
                  'All Founding Member benefits',
                  'VIP event access & seating',
                  '3 golden tickets for guest approval',
                  'Invitation to quarterly investors dinner',
                  'Early access to expansion cities',
                  'Input on event themes & programming'
                ]
              },
              {
                name: 'Founding Partner',
                price: '$2,500',
                benefits: [
                  'All Circle Insider benefits',
                  'Unlimited guest approvals',
                  'Private investor-only events',
                  'Direct input on society direction',
                  'Priority partnership opportunities',
                  'Complimentary launch event tickets',
                  'Lifetime membership privileges'
                ]
              }
            ].map((tier, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6 hover:border-[#D4AF37]/60 transition-all">
                <h3 className="text-xl md:text-2xl text-[#D4AF37] mb-2">{tier.name}</h3>
                <div className="text-3xl md:text-4xl text-white mb-4 md:mb-6">{tier.price}</div>
                <ul className="space-y-2 md:space-y-3">
                  {tier.benefits.map((benefit, bidx) => (
                    <li key={bidx} className="text-gray-300 flex gap-2 text-sm md:text-base">
                      <span className="text-[#167D7F]">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* BUSINESS SECTION */}
        <section id="section-business" className="py-8 md:py-12 space-y-6 md:space-y-8 border-t border-[#D4AF37]/10">
          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl text-[#D4AF37] mb-4 md:mb-6">The VAULT54 Difference</h2>
            <p className="text-gray-300 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
              VAULT54 addresses a critical gap in the market: accomplished LGBTQ+ professionals seeking high-quality, sex-positive experiences in an environment that prioritizes both authenticity and discretion. While traditional venues offer either mainstream nightlife or underground experiences lacking sophistication, VAULT54 provides a refined third option.
            </p>

            <div className="bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] rounded p-4 md:p-6">
              <h3 className="text-[#D4AF37] text-lg md:text-xl mb-3 md:mb-4">Key Differentiators</h3>
              <ul className="space-y-2 md:space-y-3">
                {[
                  'Referral-only membership ensuring quality and safety',
                  'Professional vetting process with Instagram/Facebook verification',
                  'Event-first payment model ($50-150 per event, 50% non-refundable)',
                  'Sophisticated venues with premium production value',
                  'Anonymous testimonials protecting member privacy',
                  'Progressive disclosure application reducing friction'
                ].map((item, idx) => (
                  <li key={idx} className="text-gray-300 flex gap-2 text-sm md:text-base">
                    <span className="text-[#167D7F]">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl text-[#D4AF37] mb-4 md:mb-6">Revenue Model</h2>
            <p className="text-gray-300 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
              VAULT54 operates on a sustainable, scalable revenue model centered around premium event ticketing and exclusive membership experiences.
            </p>
            
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="text-center p-4 md:p-6 bg-black/30 rounded-lg">
                <div className="text-xs md:text-sm text-gray-400 uppercase mb-2">Event Tickets</div>
                <div className="text-3xl md:text-4xl text-[#D4AF37]">70%</div>
              </div>
              <div className="text-center p-4 md:p-6 bg-black/30 rounded-lg">
                <div className="text-xs md:text-sm text-gray-400 uppercase mb-2">Memberships</div>
                <div className="text-3xl md:text-4xl text-[#D4AF37]">20%</div>
              </div>
              <div className="text-center p-4 md:p-6 bg-black/30 rounded-lg">
                <div className="text-xs md:text-sm text-gray-400 uppercase mb-2">Partnerships</div>
                <div className="text-3xl md:text-4xl text-[#D4AF37]">10%</div>
              </div>
            </div>
          </div>
        </section>

        {/* FINANCIALS SECTION */}
        <section id="section-financials" className="py-8 md:py-12 space-y-6 md:space-y-8 border-t border-[#D4AF37]/10">
          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl text-[#D4AF37] mb-4 md:mb-6">Financial Projections</h2>
            <p className="text-gray-300 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
              Conservative projections based on NYC market research and realistic event capacity assumptions. All figures are for Year 1 operations in NYC market.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {[
                { label: 'Year 1 Revenue', value: '$180K' },
                { label: 'Year 1 Net Profit', value: '$85K' },
                { label: 'ROI Timeline', value: '18mo' },
                { label: 'Profit Margin', value: '47%' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-4 md:p-6 bg-black/30 rounded-lg">
                  <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider mb-2">{stat.label}</div>
                  <div className="text-2xl md:text-3xl text-[#D4AF37]">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] rounded p-4 md:p-6">
              <h3 className="text-[#D4AF37] text-lg md:text-xl mb-3 md:mb-4">Use of Funds</h3>
              <ul className="space-y-2 md:space-y-3">
                {[
                  'Launch event production & marketing: $35K',
                  'Technology platform development: $25K',
                  'Venue deposits & initial inventory: $20K',
                  'Brand development & collateral: $15K',
                  'Legal, insurance, and compliance: $10K',
                  'Operating reserve: $10K'
                ].map((item, idx) => (
                  <li key={idx} className="text-gray-300 flex gap-2 text-sm md:text-base">
                    <span className="text-[#167D7F]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* LAUNCH SECTION */}
        <section id="section-launch" className="py-8 md:py-12 space-y-6 md:space-y-8 border-t border-[#D4AF37]/10">
          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl text-[#D4AF37] mb-4 md:mb-6">"When in Rome" - Inaugural Launch</h2>
            <p className="text-gray-300 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
              Our inaugural event sets the tone for everything VAULT54 represents: sophisticated, immersive, unforgettable. "When in Rome" transforms Hacienda Brooklyn into an opulent Roman Bacchanal, complete with theatrical performances, live entertainment, and meticulously designed experiences.
            </p>

            <div className="space-y-4 md:space-y-6">
              <div className="border-l-4 border-[#D4AF37] pl-4 md:pl-6">
                <div className="text-[#D4AF37] mb-2 text-sm md:text-base">March 29, 2026 | 10 PM - 4 AM</div>
                <div className="text-gray-300 text-sm md:text-base">
                  <strong>Hacienda Brooklyn</strong><br/>
                  Capacity: 200 guests<br/>
                  Ticket Price: $125 per person<br/>
                  Expected Revenue: $25,000
                </div>
              </div>

              <div className="border-l-4 border-[#D4AF37] pl-4 md:pl-6">
                <div className="text-[#D4AF37] mb-2 text-sm md:text-base">Event Features</div>
                <ul className="text-gray-300 space-y-2 text-sm md:text-base">
                  <li>• Professional dancers & performers in Roman costume</li>
                  <li>• Multiple themed play spaces</li>
                  <li>• Premium bar & light catering</li>
                  <li>• Professional photographer (discretion guaranteed)</li>
                  <li>• Live DJ & ambient entertainment</li>
                  <li>• Coat check & secure bag storage</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#D4AF37] pl-4 md:pl-6">
                <div className="text-[#D4AF37] mb-2 text-sm md:text-base">Production Value</div>
                <div className="text-gray-300 text-sm md:text-base">
                  Drawing from industry connections and strategic partnerships, we're delivering $50K+ production value on a $15K budget through influencer collaborations, content creator partnerships, and professional network leverage.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOCUMENTS SECTION */}
        <section id="section-documents" className="py-8 md:py-12 space-y-6 md:space-y-8 border-t border-[#D4AF37]/10">
          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl text-[#D4AF37] mb-4 md:mb-6">Investment Documents</h2>
            <p className="text-gray-300 leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
              Access comprehensive documentation including business plans, financial models, and legal agreements. All documents are confidential and subject to the NDA you signed upon access.
            </p>

            <div className="space-y-3 md:space-y-4">
              {[
                { name: 'Complete Business Plan', icon: '📄', size: 'PDF • 42 pages • Updated Nov 2025' },
                { name: 'Financial Projections', icon: '📊', size: 'XLSX • 5 years • Updated Nov 2025' },
                { name: 'Market Research Analysis', icon: '📋', size: 'PDF • 28 pages • Oct 2025' },
                { name: 'Launch Event Deck', icon: '🏛️', size: 'PDF • 15 slides • Updated Nov 2025' },
                { name: 'Investment Agreement', icon: '⚖️', size: 'PDF • Legal document • Template' }
              ].map((doc, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 md:p-6 bg-white/5 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg hover:bg-white/10 transition-all">
                  <div>
                    <div className="text-white mb-1 text-sm md:text-base">{doc.icon} {doc.name}</div>
                    <div className="text-xs md:text-sm text-gray-400">{doc.size}</div>
                  </div>
                  <button className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-black/30 backdrop-blur-xl border border-[#167D7F]/40 text-[#167D7F] rounded-lg transition-all duration-300 hover:bg-black/40 hover:border-[#167D7F]/80 hover:shadow-[0_0_30px_rgba(22,125,127,0.3)] text-sm uppercase tracking-wider">
                    DOWNLOAD
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl text-[#D4AF37] mb-4">Ready to Invest?</h2>
            <p className="text-gray-300 mb-6 text-sm md:text-base">
              Join our founding investors and help build the premier sex-positive community for accomplished LGBTQ+ professionals.
            </p>
            <div className="flex justify-center">
              <FrostedGlassButton onClick={handleInvestmentInterest}>
                I'D LIKE TO KNOW MORE INFORMATION
              </FrostedGlassButton>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
