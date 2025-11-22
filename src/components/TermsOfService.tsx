import React, { useState, useRef, useEffect } from 'react';
import { Checkbox } from './ui/checkbox';

interface TermsOfServiceProps {
  onAccept: () => void;
  onBack: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onAccept, onBack }) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      // Consider "bottom" when within 10px of the actual bottom
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      if (isAtBottom && !hasScrolledToBottom) {
        setHasScrolledToBottom(true);
      }
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [hasScrolledToBottom]);

  return (
    <div className="fixed inset-0 text-white overflow-hidden" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/BorcellE%20(1).png)',
        }}
      />
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/30 px-4 md:px-8 py-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <img 
              src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/vault54-logo.gif" 
              alt="VAULT54 Logo" 
              className="h-8 md:h-10 w-auto"
            />
            <button
              onClick={onBack}
              className="px-3 md:px-4 py-2 bg-black/60 backdrop-blur-2xl border border-[#D4AF37]/30 text-white rounded text-sm transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            >
              BACK
            </button>
          </div>
        </header>

        {/* Title Section */}
        <div className="flex-shrink-0 text-center py-8 md:py-12 border-b border-[#D4AF37]/20">
          <h1 
            className="text-3xl md:text-4xl text-[rgb(255,250,250)] tracking-widest"
            style={{ textShadow: '0 0 20px rgba(255,250,250,0.5), 0 0 40px rgba(212,175,55,0.3)' }}
          >
            TERMS OF SERVICE
          </h1>
          <p className="text-gray-400 mt-2 text-sm tracking-wider">Please read carefully and scroll to the bottom</p>
        </div>

        {/* Scrollable Terms Content */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8"
        >
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl p-6 md:p-8 space-y-6">
            
            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using VAULT54's services, events, or platforms, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, you may not access or use our services. VAULT54 reserves the right to modify 
                these terms at any time, and continued use of our services constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">2. Membership Eligibility</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Membership in VAULT54 is by invitation or application only. To be eligible, you must:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside ml-4">
                <li>Be at least 21 years of age</li>
                <li>Provide accurate and complete information during the application process</li>
                <li>Agree to maintain the confidentiality and discretion expected of all members</li>
                <li>Pass our vetting and approval process</li>
                <li>Comply with all community guidelines and code of conduct</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">3. Code of Conduct</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                As a member of VAULT54, you agree to:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside ml-4">
                <li>Treat all members, guests, and staff with respect and dignity</li>
                <li>Maintain absolute discretion regarding other members' identities and activities</li>
                <li>Obtain explicit consent before any physical interaction</li>
                <li>Refrain from photography, video recording, or audio recording without express permission</li>
                <li>Comply with all venue rules and staff instructions</li>
                <li>Report any violations or concerns to VAULT54 management immediately</li>
                <li>Uphold the values of "Virtus et Discretio" (Courage and Discretion)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">4. Privacy and Confidentiality</h2>
              <p className="text-gray-300 leading-relaxed">
                VAULT54 takes privacy seriously. You agree not to disclose, share, or publicize any information about other 
                members, including but not limited to names, photographs, attendance, or activities. What happens at VAULT54 
                stays at VAULT54. Violation of this confidentiality agreement may result in immediate termination of membership 
                and potential legal action.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">5. Event Attendance and Ticketing</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                When purchasing tickets to VAULT54 events:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside ml-4">
                <li>All ticket sales require a 50% non-refundable deposit</li>
                <li>Full payment is due 7 days prior to the event</li>
                <li>Tickets are non-transferable without prior approval</li>
                <li>VAULT54 reserves the right to refuse entry to any individual</li>
                <li>Dress code and theme requirements must be adhered to</li>
                <li>Late arrivals may not be accommodated depending on venue restrictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">6. Guest Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                Members may bring guests to select events, subject to approval. All guests must be pre-approved by VAULT54 
                management at least 48 hours prior to the event. Members are fully responsible for their guests' behavior and 
                compliance with all VAULT54 policies. Guest privileges may be revoked at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">7. Prohibited Conduct</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                The following behaviors are strictly prohibited and may result in immediate expulsion and membership termination:
              </p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside ml-4">
                <li>Any form of harassment, discrimination, or unwanted advances</li>
                <li>Unauthorized photography, recording, or live streaming</li>
                <li>Disclosure of member information or event details to non-members</li>
                <li>Intoxication or disruptive behavior</li>
                <li>Violation of consent or boundary violations</li>
                <li>Illegal activities of any kind</li>
                <li>Damage to venue property or theft</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">8. Membership Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                VAULT54 reserves the right to suspend or terminate any membership at any time, for any reason, with or without 
                notice. Reasons for termination may include, but are not limited to, violation of these Terms of Service, code 
                of conduct violations, or behavior deemed detrimental to the VAULT54 community. No refunds will be issued for 
                terminated memberships.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">9. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed">
                All VAULT54 branding, logos, content, and materials are the intellectual property of VAULT54 and are protected 
                by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without express 
                written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">10. Liability and Assumption of Risk</h2>
              <p className="text-gray-300 leading-relaxed">
                By attending VAULT54 events, you acknowledge and assume all risks associated with your participation. VAULT54, 
                its organizers, partners, and venues are not liable for any injury, loss, or damage to person or property. You 
                agree to indemnify and hold harmless VAULT54 from any claims arising from your attendance or participation.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">11. Health and Safety</h2>
              <p className="text-gray-300 leading-relaxed">
                You represent that you are in good health and able to participate in VAULT54 events. You are responsible for 
                disclosing any medical conditions that may affect your participation. VAULT54 is not responsible for providing 
                medical care, though emergency services may be contacted if necessary.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">12. Photography and Media</h2>
              <p className="text-gray-300 leading-relaxed">
                VAULT54 may hire professional photographers for events. By attending, you consent to being photographed for 
                VAULT54's promotional purposes, with faces obscured or blurred as necessary. You will never be identified by 
                name in public materials without your explicit consent. You may opt out of photography by notifying staff upon 
                arrival.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">13. Payment Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                All payments to VAULT54 are processed securely through approved payment processors. You are responsible for 
                ensuring payment information is accurate and up to date. Chargebacks or payment disputes may result in 
                membership suspension pending resolution.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">14. Communication</h2>
              <p className="text-gray-300 leading-relaxed">
                By becoming a member, you consent to receive communications from VAULT54 via email, SMS, or other electronic 
                means regarding events, announcements, and membership matters. You may opt out of marketing communications but 
                will still receive essential membership and event-related messages.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">15. Dispute Resolution</h2>
              <p className="text-gray-300 leading-relaxed">
                Any disputes arising from these Terms of Service or your membership shall be resolved through binding arbitration 
                in accordance with the laws of the State of New York. You waive your right to participate in class action lawsuits 
                or class-wide arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">16. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">17. Severability</h2>
              <p className="text-gray-300 leading-relaxed">
                If any provision of these Terms of Service is found to be invalid or unenforceable, the remaining provisions 
                shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">18. Entire Agreement</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms of Service, along with the VAULT54 NDA and Privacy Policy, constitute the entire agreement between 
                you and VAULT54 and supersede all prior agreements and understandings.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl text-[#D4AF37] mb-4">19. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                For questions or concerns regarding these Terms of Service, please contact VAULT54 management at:<br />
                Email: legal@vault54.com<br />
                Instagram: @vaultfiftyfour
              </p>
            </section>

            <section className="pt-4 border-t border-[#D4AF37]/30">
              <p className="text-gray-400 text-sm italic">
                Last Updated: November 20, 2025<br />
                Version 1.0
              </p>
            </section>

            {/* Scroll indicator at bottom */}
            <div className="text-center py-8">
              <div className="inline-block px-6 py-3 bg-[#167D7F]/20 border border-[#167D7F]/40 rounded-lg">
                <span className="text-[#167D7F]">
                  {hasScrolledToBottom ? '✓ You have reached the end' : '↓ Please scroll to continue'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Agreement Section - Fixed at bottom */}
        <div className="flex-shrink-0 bg-black/90 backdrop-blur-xl border-t border-[#D4AF37]/30 px-4 md:px-8 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-xl border border-[#D4AF37]/20 rounded-lg">
              <Checkbox
                id="terms-agree"
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(checked === true)}
                disabled={!hasScrolledToBottom}
                className={`mt-1 ${
                  !hasScrolledToBottom 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:border-[#D4AF37]'
                }`}
              />
              <label
                htmlFor="terms-agree"
                className={`text-sm md:text-base leading-relaxed cursor-pointer ${
                  !hasScrolledToBottom ? 'text-gray-500' : 'text-white'
                }`}
              >
                I have read and agree to the VAULT54 Terms of Service, and I understand that violation of these terms 
                may result in immediate membership termination.
              </label>
            </div>

            {/* Status message */}
            {!hasScrolledToBottom && (
              <p className="text-center text-gray-400 text-sm">
                Please scroll through the entire document to enable the agreement checkbox
              </p>
            )}

            {/* Continue Button */}
            <button
              onClick={onAccept}
              disabled={!isChecked}
              className={`w-full py-4 rounded-lg uppercase tracking-widest text-lg transition-all duration-300 ${
                isChecked
                  ? 'bg-black/60 backdrop-blur-2xl border border-[#D4AF37]/30 text-white hover:border-[#D4AF37]/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] cursor-pointer'
                  : 'bg-black/20 border border-gray-600/30 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isChecked ? 'CONTINUE TO APPLICATION' : 'ACCEPT TERMS TO CONTINUE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
