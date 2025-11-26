import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { CompleteAdminDashboard } from './components/CompleteAdminDashboard';
import { SyndicateBridge } from './components/SyndicateBridge';
import { MemberPortal } from './components/MemberPortal';
import { DramaticTransition } from './components/DramaticTransition';
import { GoldParticles } from './components/GoldParticles';
import { InvestorPortal } from './components/InvestorPortal';
import { FrostedGlassButton } from './components/FrostedGlassButton';
import { FrostedGlassModal } from './components/FrostedGlassModal';
import { ApplicationModal } from './components/ApplicationModal';
import { ContentCreatorApplication } from './components/ContentCreatorApplication';
import ColorVariations from './ColorVariations';
import './styles/globals.css';

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
  const [syndicateData, setSyndicateData] = useState<{ weekendSpending: string; membershipValuePerception: string } | null>(null);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<'investor-portal' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  
  // Test mode - set to FALSE for production (passwords/authentication active)
  const TEST_MODE = false;

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
        try => {
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
          muted={isMuted}
          playsInline
          src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/Copy%20of%20Jersey.mp4"
        />
        
        {/* Mute/Unmute Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="fixed bottom-8 left-8 px-6 py-3 bg-black/70 backdrop-blur-xl border border-white/40 text-white rounded-lg hover:bg-black/80 hover:border-white/60 transition-all z-50"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {isMuted ? '🔇 UNMUTE' : '🔊 MUTE'}
        </button>

        {/* Skip Button */}
        <button
          onClick={() => {
            localStorage.setItem('vault54IntroSeen', 'true');
            setHasSeenIntro(true);
            setCurrentScreen('landing');
          }}
          className="fixed bottom-8 right-8 px-6 py-3 bg-black/70 backdrop-blur-xl border border-white/40 text-white rounded-lg hover:bg-black/80 hover:border-white/60 transition-all z-50"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          SKIP
        </button>
      </div>
    );
  }

  // Admin Dashboard Screen
  if (currentScreen === 'admin-dashboard') {
    return <CompleteAdminDashboard onLogout={() => setCurrentScreen('landing')} />;
  }

  // Investor Portal Screen
  if (currentScreen === 'investor-portal') {
    return (
      <InvestorPortal 
        onLogout={() => setCurrentScreen('landing')} 
        onBridgeComplete={(data) => {
          // User completed Syndicate Bridge, save data and open Application Modal, skip NDA
          setSyndicateData(data);
          setSkipApplicationNDA(true);
          setCurrentScreen('landing');
          setIsApplicationModalOpen(true);
        }}
        testMode={TEST_MODE}
      />
    );
  }

  // Member Portal Screen
  if (currentScreen === 'member-portal') {
    return <MemberPortal onLogout={() => setCurrentScreen('landing')} testMode={TEST_MODE} />;
  }

  // SCREEN 2: Landing Page
  return (
    <div className="fixed inset-0">
      {/* Background Video or Fallback */}
      {hasSeenIntro ? (
        <>
          <video
            ref={backgroundVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/Copy%20of%20Jersey.mp4"
          />
          {/* Frosted overlay over video - Darkened */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[3px]" />
        </>
      ) : (
        <>
          {/* Fallback background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS0yIDJ2Mmgy di0yaC0yem0wLTJ2Mmgydi0yaC0yem0tMiAydjJoMnYtMmgtMnptMC0ydjJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
          </div>
          {/* Frosted overlay - Darkened */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </>
      )}

      {/* Centered content */}
      <div className="relative h-full flex flex-col items-center justify-center gap-8 px-4">
        {/* Logo with white glow on hover */}
        <button
          onClick={() => setIsAccessModalOpen(true)}
          className="
            transition-all duration-500 ease-out
            hover:drop-shadow-[0_0_50px_rgba(255,255,255,0.9)]
            hover:brightness-110
            focus:outline-none
            cursor-pointer
            relative
            group
          "
          style={{
            filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.4))'
          }}
        >
          <img
            src="https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/Vault%20Logo%20and%20Artwork.gif"
            alt="VAULT54 Logo"
            className="w-64 h-auto md:w-80 lg:w-96"
          />
        </button>

        {/* Motto */}
        <div 
          className="text-white/90 text-sm md:text-base tracking-[0.3em] uppercase"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Virtus Et Discretio
        </div>

        {/* CTA Button */}
        <FrostedGlassButton
          onClick={() => setIsApplicationModalOpen(true)}
          className="
            px-8 py-4 
            text-white 
            border-2 border-[#D4AF37]/40
            hover:border-[#D4AF37]/60
            hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]
            transition-all duration-500
            tracking-widest
            uppercase
            text-sm md:text-base
          "
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Request Access
        </FrostedGlassButton>

        {/* Stats */}
        <div className="flex gap-6 md:gap-8">
          <div className="text-center px-6 py-4 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
            <div 
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {totalMembers}+
            </div>
            <div 
              className="text-xs md:text-sm text-white/70 tracking-wider uppercase mt-1"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Members
            </div>
          </div>
          <div className="text-center px-6 py-4 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
            <div 
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              {totalApplicants}+
            </div>
            <div 
              className="text-xs md:text-sm text-white/70 tracking-wider uppercase mt-1"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Applicants
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-4">
          <a 
            href="mailto:contact@vault54.com" 
            aria-label="Email"
            className="w-12 h-12 flex items-center justify-center bg-[#8B5CF6]/80 backdrop-blur-md rounded-lg border border-white/20 hover:bg-[#8B5CF6] hover:scale-110 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </a>
          <a 
            href="https://instagram.com/vault54nyc" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-12 h-12 flex items-center justify-center bg-[#0EA5E9]/80 backdrop-blur-md rounded-lg border border-white/20 hover:bg-[#0EA5E9] hover:scale-110 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a 
            href="https://t.me/vault54nyc" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="w-12 h-12 flex items-center justify-center bg-[#EC4899]/80 backdrop-blur-md rounded-lg border border-white/20 hover:bg-[#EC4899] hover:scale-110 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
          <a 
            href="https://x.com/vault54nyc" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="w-12 h-12 flex items-center justify-center bg-[#9333EA]/80 backdrop-blur-md rounded-lg border border-white/20 hover:bg-[#9333EA] hover:scale-110 transition-all duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
        </div>

        {/* NO TEST MODE PORTAL TOGGLE BUTTONS - REMOVED FOR PRODUCTION */}

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
            placeholder="Enter your Syndicate/Membership Code"
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

        <div className="flex gap-3">
          <FrostedGlassButton
            onClick={() => {
              // Check for admin code
              if (accessCode.toLowerCase() === 'admin') {
                setCurrentScreen('admin-dashboard');
                setIsAccessModalOpen(false);
                setAccessCode('');
              }
              // Check for investor code
              else if (accessCode.toLowerCase() === 'investor' || accessCode.toLowerCase() === 'syndicate') {
                setShowTransition(true);
                setTransitionTarget('investor-portal');
                setIsAccessModalOpen(false);
                setAccessCode('');
              }
              // Check for member code
              else if (accessCode.toLowerCase() === 'member') {
                setCurrentScreen('member-portal');
                setIsAccessModalOpen(false);
                setAccessCode('');
              }
              else {
                alert('Invalid access code');
              }
            }}
            className="
              flex-1
              px-6 py-3
              text-white
              border-2 border-[#D4AF37]/40
              hover:border-[#D4AF37]/60
              hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]
              transition-all duration-500
              tracking-widest
              uppercase
              text-sm
            "
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Enter
          </FrostedGlassButton>
          <FrostedGlassButton
            onClick={() => {
              setIsAccessModalOpen(false);
              setAccessCode('');
            }}
            className="
              flex-1
              px-6 py-3
              text-white/70
              border-2 border-white/20
              hover:border-white/40
              hover:text-white
              transition-all duration-500
              tracking-widest
              uppercase
              text-sm
            "
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Cancel
          </FrostedGlassButton>
        </div>
      </div>
    </FrostedGlassModal>

    {/* Application Modal */}
    <ApplicationModal
      isOpen={isApplicationModalOpen}
      onClose={() => {
        setIsApplicationModalOpen(false);
        setSkipApplicationNDA(false);
        setSyndicateData(null);
      }}
      skipNDA={skipApplicationNDA}
      syndicateData={syndicateData}
    />

    {/* Content Creator Application */}
    <ContentCreatorApplication
      isOpen={isCreatorApplicationOpen}
      onClose={() => setIsCreatorApplicationOpen(false)}
    />

    {/* Dramatic Transition Effect */}
    {showTransition && transitionTarget && (
      <DramaticTransition
        onComplete={() => {
          setShowTransition(false);
          if (transitionTarget) {
            setCurrentScreen(transitionTarget);
            setTransitionTarget(null);
          }
        }}
      />
    )}

    {/* Gold Particles */}
    <GoldParticles />
  </div>
  );
}
