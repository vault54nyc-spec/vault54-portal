import React, { useState, useRef, useEffect } from 'react';
import { FrostedGlassButton } from './components/FrostedGlassButton';
import { FrostedGlassModal } from './components/FrostedGlassModal';
import { ApplicationModal } from './components/ApplicationModal';
import { InvestorPortal } from './components/InvestorPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { MemberPortal } from './components/MemberPortal';
import { ContentCreatorApplication } from './components/ContentCreatorApplication';
import { GoldParticles } from './components/GoldParticles';
import ColorVariations from './ColorVariations';

export default function App() {
  const [showColorDemo, setShowColorDemo] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(() => {
    return localStorage.getItem('vault54IntroSeen') === 'true';
  });
  const [currentScreen, setCurrentScreen] = useState<'video' | 'landing' | 'investor-portal' | 'admin-dashboard' | 'member-portal'>(
    hasSeenIntro ? 'landing' : 'video'
  );
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isCreatorApplicationOpen, setIsCreatorApplicationOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Start muted for better autoplay compatibility
  const [accessCode, setAccessCode] = useState('');
  const [totalMembers] = useState(12); // Mock data - will come from backend
  const [totalApplicants] = useState(28); // Mock data - will come from backend
  const [skipApplicationNDA, setSkipApplicationNDA] = useState(false); // Track if coming from Syndicate
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // When video ends, transition to landing page
    const video = videoRef.current;
    if (video) {
      const handleVideoEnd = () => {
        localStorage.setItem('vault54IntroSeen', 'true');
        setHasSeenIntro(true);
        setCurrentScreen('landing');
      };
      video.addEventListener('ended', handleVideoEnd);
      
      // Ensure video plays on mount
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log('Autoplay prevented, user interaction required');
        }
      };
      playVideo();
      
      return () => video.removeEventListener('ended', handleVideoEnd);
    }
  }, []);

  useEffect(() => {
    // Ensure background video plays when landing page loads
    const bgVideo = backgroundVideoRef.current;
    if (bgVideo && currentScreen === 'landing') {
      const playBgVideo = async () => {
        try {
          await bgVideo.play();
        } catch (error) {
          console.log('Background video autoplay prevented');
        }
      };
      playBgVideo();
    }
  }, [currentScreen]);
  
  // Show color variations demo if requested
  if (showColorDemo) {
    return (
      <div className="relative">
        <ColorVariations />
        <button
          onClick={() => setShowColorDemo(false)}
          className="fixed top-4 left-4 z-[100] px-6 py-3 bg-black/70 backdrop-blur-xl border border-white/40 text-white rounded-lg hover:bg-black/80 hover:border-white/60 transition-all"
        >
          ← BACK TO VAULT54
        </button>
      </div>
    );
  }

  // SCREEN 1: Video Intro with Mute Control
  if (currentScreen === 'video') {
    return (
      <div className="fixed inset-0 bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          playsInline
          src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/Copy%20of%20Jersey.mp4"
        />
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-8 left-8 px-4 md:px-6 py-2 md:py-3 bg-black/50 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg hover:bg-black/60 hover:border-[#D4AF37]/80 transition-all text-sm md:text-base"
        >
          {isMuted ? '🔇 UNMUTE' : '🔊 MUTE'}
        </button>
        <button
          onClick={() => {
            localStorage.setItem('vault54IntroSeen', 'true');
            setHasSeenIntro(true);
            setCurrentScreen('landing');
          }}
          className="absolute bottom-8 right-8 px-4 md:px-6 py-2 md:py-3 bg-black/50 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg hover:bg-black/60 hover:border-[#D4AF37]/80 transition-all text-sm md:text-base"
        >
          SKIP
        </button>
      </div>
    );
  }

  // Admin Dashboard Screen
  if (currentScreen === 'admin-dashboard') {
    return <AdminDashboard onLogout={() => setCurrentScreen('landing')} />;
  }

  // Investor Portal Screen
  if (currentScreen === 'investor-portal') {
    return (
      <InvestorPortal 
        onLogout={() => setCurrentScreen('landing')} 
        onBridgeComplete={() => {
          // User completed Syndicate Bridge, open Application Modal and skip NDA
          setSkipApplicationNDA(true);
          setCurrentScreen('landing');
          setIsApplicationModalOpen(true);
        }}
      />
    );
  }

  // Member Portal Screen
  if (currentScreen === 'member-portal') {
    return <MemberPortal onLogout={() => setCurrentScreen('landing')} />;
  }

  // SCREEN 2: Main Landing Page
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Gold Particles */}
      <GoldParticles />

      {/* Video Background (after first view) or Animated Image Background (fallback) */}
      {hasSeenIntro ? (
        <>
          <video
            ref={backgroundVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/Copy%20of%20Jersey.mp4"
          />
          {/* Frosted overlay over video */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]" />
        </>
      ) : (
        <>
          {/* Animated background with rotating crop */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 animate-[pan_30s_ease-in-out_infinite] bg-cover bg-center bg-no-repeat scale-110"
              style={{
                backgroundImage: 'url(https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/1A601EAD-CE0B-48D6-B1E2-A57DAC93D06B.png)',
                animation: 'pan 30s ease-in-out infinite, fadeBlur 20s ease-in-out infinite'
              }}
            />
          </div>
          {/* Frosted overlay - Darkened */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </>
      )}

      {/* Centered content */}
      <div className="relative h-full flex flex-col items-center justify-center gap-8 px-4">
        {/* Logo with golden glow on hover */}
        <button
          onClick={() => setIsAccessModalOpen(true)}
          className="
            transition-all duration-500 ease-out
            hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]
            focus:outline-none
            cursor-pointer
          "
        >
          <img
            src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/vault54-logo.gif"
            alt="VAULT54 Logo"
            className="w-64 h-auto md:w-80 lg:w-96"
          />
        </button>

        {/* Tagline */}
        <h1 
          className="text-white tracking-[0.3em] uppercase text-center"
          style={{ fontFamily: 'Cormorant Garamond, Cinzel, serif' }}
        >
          VIRTUS ET DISCRETIO
        </h1>

        {/* Request Access Button */}
        <FrostedGlassButton onClick={() => setIsApplicationModalOpen(true)}>
          REQUEST ACCESS
        </FrostedGlassButton>

        {/* Metrics */}
        <div className="flex gap-8 items-center justify-center mt-8 text-center">
          <div className="px-6 py-3 bg-black/60 backdrop-blur-2xl border border-[#D4AF37]/30 rounded-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all">
            <div className="text-4xl text-white mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{50 + totalMembers}+</div>
            <div className="text-white/60 text-sm tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>MEMBERS</div>
          </div>
          <div className="px-6 py-3 bg-black/60 backdrop-blur-2xl border border-[#D4AF37]/30 rounded-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all">
            <div className="text-4xl text-white mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{65 + totalApplicants}+</div>
            <div className="text-white/60 text-sm tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>APPLICANTS</div>
          </div>
        </div>

        {/* Social Media Icons & Work With Us */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex gap-6 items-center justify-center">
            <a
              href="mailto:vault54nyc@gmail.com"
              className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-2xl border border-[#D4AF37]/30 flex items-center justify-center text-white hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:border-[#D4AF37]/50 transition-all hover:scale-110"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/vault54nyc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-2xl border border-[#D4AF37]/30 flex items-center justify-center text-white hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:border-[#D4AF37]/50 transition-all hover:scale-110"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://t.me/vault54"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-2xl border border-[#D4AF37]/30 flex items-center justify-center text-white hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:border-[#D4AF37]/50 transition-all hover:scale-110"
              aria-label="Telegram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
              </svg>
            </a>
            <a
              href="https://x.com/Vaultfiftyfour"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-2xl border border-[#D4AF37]/30 flex items-center justify-center text-white hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:border-[#D4AF37]/50 transition-all hover:scale-110"
              aria-label="X (Twitter)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Work With Us Link */}
          <button
            onClick={() => setIsCreatorApplicationOpen(true)}
            className="text-white text-sm tracking-widest uppercase hover:text-white/80 transition-all underline decoration-dotted underline-offset-4 mt-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Work With Us
          </button>
        </div>
      </div>

      {/* SCREEN 3: Welcome Back Modal */}
      <FrostedGlassModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
        title="Welcome Back"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="access-code" 
              className="block text-white/90 tracking-wider uppercase text-center"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Access Code
            </label>
            <input
              id="access-code"
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Enter your Investor/Membership Code"
              className="
                w-full px-4 py-3
                bg-black/40
                backdrop-blur-md
                border border-[#D4AF37]/30
                rounded-lg
                text-white text-center
                placeholder:text-white/40
                focus:outline-none
                focus:border-[#D4AF37]/50
                focus:ring-2
                focus:ring-[#D4AF37]/20
                focus:shadow-[0_0_20px_rgba(212,175,55,0.3)]
                transition-all
              "
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            />
          </div>

          <div className="flex justify-center">
            <FrostedGlassButton
              onClick={() => {
                const code = accessCode.toLowerCase().trim();
                if (code === 'zeus123') {
                  setCurrentScreen('admin-dashboard');
                  setIsAccessModalOpen(false);
                } else if (code === 'member123') {
                  // Test member portal access code
                  setCurrentScreen('member-portal');
                  setIsAccessModalOpen(false);
                } else if (code === 'investor123') {
                  // Investor code - opens Syndicate Bridge flow
                  setCurrentScreen('investor-portal');
                  setIsAccessModalOpen(false);
                } else {
                  alert('Invalid access code');
                }
              }}
            >
              <span className="mx-auto">SUBMIT</span>
            </FrostedGlassButton>
          </div>
        </div>
      </FrostedGlassModal>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        skipNDA={skipApplicationNDA}
      />

      {/* Content Creator Application Modal */}
      {isCreatorApplicationOpen && (
        <ContentCreatorApplication onClose={() => setIsCreatorApplicationOpen(false)} />
      )}

      {/* Import fonts and animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        
        @keyframes pan {
          0%, 100% {
            transform: scale(1.1) translate(0, 0);
          }
          25% {
            transform: scale(1.15) translate(-2%, -2%);
          }
          50% {
            transform: scale(1.1) translate(2%, 2%);
          }
          75% {
            transform: scale(1.15) translate(-1%, 1%);
          }
        }
        
        @keyframes fadeBlur {
          0%, 100% {
            filter: blur(0px);
            opacity: 1;
          }
          50% {
            filter: blur(3px);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}