import React, { useState, useRef, useEffect } from 'react';
import { FrostedGlassButton } from './FrostedGlassButton';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ConfirmationModal } from './ConfirmationModal';
import { SyndicateBridge } from './SyndicateBridge';

interface InvestorPortalProps {
  onLogout: () => void;
  onBridgeComplete: () => void;
}

export const InvestorPortal: React.FC<InvestorPortalProps> = ({ onLogout, onBridgeComplete }) => {
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [ndaSigned, setNdaSigned] = useState(false);
  const [ndaScrolled, setNdaScrolled] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState<{ isOpen: boolean; message: string; title?: string } | null>(null);
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
    setConfirmationModal({
      isOpen: true,
      message: 'NDA signed successfully! Notification sent to VAULT54 Administration.',
      title: '✅ NDA Accepted'
    });
  };

  if (showIntroVideo) {
    return (
      <div className="fixed inset-0 bg-[#1a1a1a]">
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
      <div className="fixed inset-0 bg-[#1a1a1a] text-white overflow-y-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
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

        {/* Confirmation Modal */}
        {confirmationModal && (
          <ConfirmationModal
            isOpen={confirmationModal.isOpen}
            onClose={() => setConfirmationModal(null)}
            message={confirmationModal.message}
            title={confirmationModal.title}
          />
        )}
      </div>
    );
  }

  // Show Syndicate Bridge after NDA is signed
  return (
    <SyndicateBridge 
      onComplete={onBridgeComplete}
      onDecline={onLogout}
    />
  );
};