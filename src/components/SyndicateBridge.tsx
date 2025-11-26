import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoldParticles } from './GoldParticles';
import videoPlaceholder from 'figma:asset/8b4bac8d532ebd3336b3b101699f4397c2c87c41.png';

interface SyndicateBridgeProps {
  onComplete: (data: { weekendSpending: string; membershipValuePerception: string }) => void;
  onDecline: () => void;
}

export const SyndicateBridge: React.FC<SyndicateBridgeProps> = ({ onComplete, onDecline }) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [weekendSpending, setWeekendSpending] = useState('');
  const [valuePerception, setValuePerception] = useState('');
  const [showValuePopup, setShowValuePopup] = useState(false);
  const [excitementAnswer, setExcitementAnswer] = useState('');
  const [experiencesAnswer, setExperiencesAnswer] = useState('');
  const [showHonestPrompt, setShowHonestPrompt] = useState(false);
  const [hasScrolledNDA, setHasScrolledNDA] = useState(false);
  const [hasScrolledTOS, setHasScrolledTOS] = useState(false);
  const [agreedToNDA, setAgreedToNDA] = useState(false);
  const [agreedToTOS, setAgreedToTOS] = useState(false);
  const ndaRef = useRef<HTMLDivElement>(null);
  const tosRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const aboutVideoRef = useRef<HTMLVideoElement>(null);

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const totalScreens = 14;

  const SmokeBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 600px 400px at 10% 20%, rgba(60, 60, 60, 0.9) 0%, transparent 50%),
            radial-gradient(ellipse 500px 350px at 90% 80%, rgba(50, 50, 50, 0.85) 0%, transparent 50%),
            radial-gradient(ellipse 450px 300px at 50% 60%, rgba(70, 70, 70, 0.8) 0%, transparent 50%)
          `,
          filter: 'blur(60px)',
          animation: 'smokeFlow 25s ease-in-out infinite'
        }}
      />
    </div>
  );

  const handleNDAScroll = () => {
    if (ndaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = ndaRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setHasScrolledNDA(true);
      }
    }
  };

  const handleTOSScroll = () => {
    if (tosRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tosRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setHasScrolledTOS(true);
      }
    }
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Control video playback speed
  useEffect(() => {
    if (aboutVideoRef.current && currentScreen === 4) {
      aboutVideoRef.current.playbackRate = 1.35;
    }
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      // SCREEN 1: Welcome/Intro
      case 1:
        return (
          <motion.div
            key="screen1"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4"
          >
            <SmokeBackground />
            <div className="absolute inset-0 z-10 opacity-20">
              <img
                src="https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/11.png"
                alt=""
                className="h-full w-auto object-cover mx-auto"
                style={{ filter: 'brightness(0.3) contrast(2)' }}
              />
            </div>

            <div className="relative z-20 text-center px-4 sm:px-6 py-12 max-w-5xl w-full space-y-6 sm:space-y-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <img 
                  src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/vault54-logo.gif" 
                  alt="VAULT54" 
                  className="w-48 sm:w-64 h-auto mx-auto mb-8 drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-4xl sm:text-6xl md:text-7xl text-white tracking-wide"
                style={{ 
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 50px rgba(255, 255, 255, 0.9), 0 0 25px rgba(255, 255, 255, 0.6)'
                }}
              >
                WELCOME TO VAULT54
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl text-white/90 italic max-w-3xl mx-auto"
              >
                A Private Network for Accomplished Men Who Value Discretion, Pleasure, and Prestige.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)' }}
                onClick={() => setCurrentScreen(2)}
                className="mt-8 sm:mt-12 px-12 sm:px-16 py-3 sm:py-4 bg-black/40 backdrop-blur-xl border-2 border-white/30 text-white rounded-lg tracking-widest transition-all duration-300 hover:bg-black/60 text-sm sm:text-base"
              >
                CONTINUE
              </motion.button>
            </div>
          </motion.div>
        );

      // SCREEN 2: Video Overlay - "Your Access Code Grants You a Private Preview"
      case 2:
        return (
          <motion.div
            key="screen2"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-4"
          >
            <SmokeBackground />

            <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl w-full space-y-6 sm:space-y-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-4xl mx-auto"
              >
                <img 
                  src="https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/Copy%20of%20Jersey.gif"
                  alt="VAULT54 Preview"
                  className="w-full h-auto rounded-3xl border-2 border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.3)]"
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl text-white"
                style={{ 
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)'
                }}
              >
                Your Access Code Grants You a Private Preview
              </motion.h2>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)' }}
                onClick={() => setCurrentScreen(3)}
                className="mt-6 sm:mt-8 px-12 sm:px-16 py-3 sm:py-4 bg-black/40 backdrop-blur-xl border-2 border-white/30 text-white rounded-lg tracking-widest transition-all duration-300 text-sm sm:text-base"
              >
                CONTINUE
              </motion.button>
            </div>
          </motion.div>
        );

      // SCREEN 3: NDA
      case 3:
        return (
          <motion.div
            key="screen3"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative py-8 sm:py-12 px-4"
          >
            <SmokeBackground />
            
            <div className="relative z-20 px-4 sm:px-6 max-w-4xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-10"
              >
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl text-white text-center mb-6 sm:mb-8"
                  style={{ 
                    fontFamily: 'Cinzel, serif',
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.9), 0 0 15px rgba(255, 255, 255, 0.6)'
                  }}
                >
                  CONFIDENTIALITY & NON-DISCLOSURE AGREEMENT
                </h2>

                <div 
                  ref={ndaRef}
                  onScroll={handleNDAScroll}
                  className="max-h-64 sm:max-h-96 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 text-white/80 text-sm sm:text-base"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(212, 175, 55, 0.5) rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <h3 className="text-white text-base sm:text-lg">CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT</h3>
                  
                  <p>This Confidentiality and Non-Disclosure Agreement ("Agreement") is entered into by and between VAULT54 ("Disclosing Party") and the undersigned applicant ("Receiving Party").</p>
                  
                  <p><strong>1. DEFINITION OF CONFIDENTIAL INFORMATION</strong></p>
                  <p>"Confidential Information" refers to any and all information related to VAULT54, including but not limited to: member identities, event locations, activities, communications, images, videos, member lists, operational details, and any other proprietary information disclosed through membership or application.</p>
                  
                  <p><strong>2. OBLIGATIONS OF RECEIVING PARTY</strong></p>
                  <p>The Receiving Party agrees to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Hold all Confidential Information in strict confidence</li>
                    <li>Not disclose any Confidential Information to third parties</li>
                    <li>Not use Confidential Information for any purpose other than participation in VAULT54</li>
                    <li>Not photograph, record, or document any events, members, or activities</li>
                    <li>Not discuss VAULT54, its members, or activities on social media or any public forum</li>
                  </ul>
                  
                  <p><strong>3. PROHIBITED DISCLOSURES</strong></p>
                  <p>The Receiving Party specifically agrees never to disclose:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>The identity of any VAULT54 member</li>
                    <li>Event locations, dates, or attendance</li>
                    <li>Any activities, conversations, or interactions that occur at events</li>
                    <li>Any images, likenesses, or identifying information about members</li>
                  </ul>
                  
                  <p><strong>4. NO PHOTOGRAPHY OR RECORDING</strong></p>
                  <p>The Receiving Party acknowledges that all electronic devices capable of photography, video recording, or audio recording are strictly prohibited at all VAULT54 events and agrees never to create, possess, or distribute any such recordings.</p>
                  
                  <p><strong>5. DURATION</strong></p>
                  <p>This Agreement remains in effect indefinitely, surviving termination of membership and continuing in perpetuity.</p>
                  
                  <p><strong>6. CONSEQUENCES OF BREACH</strong></p>
                  <p>The Receiving Party understands that breach of this Agreement may result in immediate termination of membership, legal action, and liability for all damages, including but not limited to reputational harm to VAULT54 or its members.</p>
                  
                  <p><strong>7. GOVERNING LAW</strong></p>
                  <p>This Agreement shall be governed by the laws of the State of New York.</p>
                  
                  <p className="text-white">By checking the box below, you acknowledge that you have read, understand, and agree to be bound by this Non-Disclosure Agreement.</p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <input
                    type="checkbox"
                    id="nda-checkbox"
                    checked={agreedToNDA}
                    onChange={(e) => setAgreedToNDA(e.target.checked)}
                    disabled={!hasScrolledNDA}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <label htmlFor="nda-checkbox" className="text-white/90 cursor-pointer text-sm sm:text-base">
                    I have read and agree to the terms of this Non-Disclosure Agreement
                  </label>
                </div>

                <button
                  onClick={() => setCurrentScreen(4)}
                  disabled={!agreedToNDA}
                  className={`px-12 sm:px-16 py-3 sm:py-4 rounded-lg tracking-widest transition-all duration-300 border-2 mt-8 mx-auto block text-sm sm:text-base ${
                    agreedToNDA
                      ? 'bg-black/40 backdrop-blur-xl border-white/30 text-white hover:bg-black/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                      : 'bg-black/20 border-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  ACCEPT & CONTINUE
                </button>
              </motion.div>
            </div>
          </motion.div>
        );

      // SCREEN 4: About Us with Video
      case 4:
        return (
          <motion.div
            key="screen4"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full relative"
          >
            {/* Video Header - Sticky at top */}
            <div className="sticky top-0 z-10 h-96 overflow-hidden border-b border-[#D4AF37]/30">
              <video
                ref={aboutVideoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                src="https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/Vault%20Logo%20and%20Artwork.mp4"
              />
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl text-[#D4AF37] text-center mb-8"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                About VAULT54
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6 text-lg text-white leading-relaxed"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                <p>
                  VAULT54 is an exclusive members-only society dedicated to creating extraordinary experiences 
                  for accomplished professionals who value discretion, connection, and indulgence.
                </p>

                <p>
                  Founded on the principles of <span className="text-[#D4AF37] italic">Virtus et Discretio</span>
                  {' '}(Valor and Discretion), we curate immersive themed events that transport members to different 
                  eras and cultures—from Roman Bacchanals to Parisian Belle Époque soirées.
                </p>

                <p className="text-[#D4AF37] text-xl italic text-center py-6">
                  At VAULT54, we believe no one should be omitted from having access to discretion. 
                  We welcome individuals and couples who share our values of respect, consent, and sophistication.
                </p>

                <p>
                  Our community is built on mutual respect and shared appreciation for life's finer pleasures. 
                  Whether attending solo or as a couple, every member is embraced as part of our extended family—a 
                  network of like-minded individuals seeking meaningful connections in an environment of absolute trust.
                </p>

                <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 my-8">
                  <h3 
                    className="text-2xl text-[#D4AF37] mb-4"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Our Values
                  </h3>
                  <ul className="space-y-3 text-white">
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4AF37] mt-1">✦</span>
                      <span><strong>Discretion:</strong> What happens at VAULT54 stays at VAULT54</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4AF37] mt-1">✦</span>
                      <span><strong>Inclusivity:</strong> Welcoming individuals and couples of all backgrounds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4AF37] mt-1">✦</span>
                      <span><strong>Consent:</strong> Respect and boundaries are paramount</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4AF37] mt-1">✦</span>
                      <span><strong>Excellence:</strong> Curated experiences that exceed expectations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#D4AF37] mt-1">✦</span>
                      <span><strong>Community:</strong> A network of accomplished, like-minded professionals</span>
                    </li>
                  </ul>
                </div>

                <p>
                  Membership is by application only, with each candidate carefully reviewed to ensure 
                  alignment with our community's values. We seek individuals who bring authenticity, 
                  respect, and genuine interest in building meaningful connections.
                </p>

                <div className="text-center pt-8">
                  <p className="text-[#D4AF37] text-2xl" style={{ fontFamily: 'Cinzel, serif' }}>
                    VIRTUS ET DISCRETIO
                  </p>
                  <p className="text-white/60 mt-2">Valor and Discretion</p>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)' }}
                onClick={() => setCurrentScreen(5)}
                className="mt-8 px-12 sm:px-16 py-3 sm:py-4 bg-[#D4AF37]/20 backdrop-blur-xl border-2 border-[#D4AF37]/40 text-[#D4AF37] rounded-lg tracking-widest transition-all duration-300 text-sm sm:text-base mx-auto block hover:bg-[#D4AF37]/30"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                CONTINUE
              </motion.button>
            </div>
          </motion.div>
        );

      // SCREEN 5: Terms of Service
      case 5:
        return (
          <motion.div
            key="screen5"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative py-8 sm:py-12 px-4"
          >
            <SmokeBackground />
            
            <div className="relative z-20 px-4 sm:px-6 max-w-4xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-10"
              >
                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl text-white text-center mb-6 sm:mb-8"
                  style={{ 
                    fontFamily: 'Cinzel, serif',
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.9), 0 0 15px rgba(255, 255, 255, 0.6)'
                  }}
                >
                  TERMS OF SERVICE
                </h2>

                <div 
                  ref={tosRef}
                  onScroll={handleTOSScroll}
                  className="max-h-64 sm:max-h-96 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 text-white/80 text-sm sm:text-base"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(212, 175, 55, 0.5) rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <p><strong>1. ACCEPTANCE OF TERMS</strong></p>
                  <p>By accessing VAULT54's network and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                  
                  <p><strong>2. MEMBERSHIP ELIGIBILITY</strong></p>
                  <p>Membership is restricted to individuals who:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Are at least 21 years of age</li>
                    <li>Agree to maintain the highest standards of discretion and professionalism</li>
                    <li>Pass VAULT54's verification and vetting process</li>
                    <li>Maintain good standing through adherence to community guidelines</li>
                  </ul>
                  
                  <p><strong>3. MEMBER CONDUCT</strong></p>
                  <p>Members agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Respect the privacy and confidentiality of all members and experiences</li>
                    <li>Conduct themselves with dignity and respect at all events and interactions</li>
                    <li>Refrain from any illegal, harmful, or disruptive behavior</li>
                    <li>Not photograph, record, or document events without explicit permission</li>
                  </ul>
                  
                  <p><strong>4. FEES AND PAYMENT</strong></p>
                  <p>Membership fees are non-refundable. VAULT54 reserves the right to modify pricing with 30 days' notice to existing members.</p>
                  
                  <p><strong>5. PRIVACY AND DATA PROTECTION</strong></p>
                  <p>VAULT54 collects and processes member information in accordance with applicable privacy laws. Member data is never sold or shared with third parties except as required by law.</p>
                  
                  <p><strong>6. TERMINATION</strong></p>
                  <p>VAULT54 reserves the right to terminate or suspend membership at any time for violation of these Terms.</p>
                  
                  <p><strong>7. LIMITATION OF LIABILITY</strong></p>
                  <p>VAULT54 is not liable for any indirect, incidental, or consequential damages arising from membership or participation in events.</p>
                  
                  <p><strong>8. MODIFICATIONS</strong></p>
                  <p>These Terms may be updated periodically. Continued use of services constitutes acceptance of modified terms.</p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <input
                    type="checkbox"
                    id="tos-checkbox"
                    checked={agreedToTOS}
                    onChange={(e) => setAgreedToTOS(e.target.checked)}
                    disabled={!hasScrolledTOS}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <label htmlFor="tos-checkbox" className="text-white/90 cursor-pointer text-sm sm:text-base">
                    I have read and agree to the Terms of Service
                  </label>
                </div>

                <button
                  onClick={() => setCurrentScreen(6)}
                  disabled={!agreedToTOS}
                  className={`px-12 sm:px-16 py-3 sm:py-4 rounded-lg tracking-widest transition-all duration-300 border-2 mt-8 mx-auto block text-sm sm:text-base ${
                    agreedToTOS
                      ? 'bg-black/40 backdrop-blur-xl border-white/30 text-white hover:bg-black/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'
                      : 'bg-black/20 border-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  ACCEPT & CONTINUE
                </button>
              </motion.div>
            </div>
          </motion.div>
        );

      // Continue with remaining screens in next message...
      // SCREEN 6: RESIDENT MEMBERSHIP
      case 6:
        return (
          <motion.div
            key="screen6"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative py-20 sm:py-24 px-4"
          >
            <SmokeBackground />
            
            {/* Large background image for "The Foundation of VAULT54" */}
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-15">
              <img
                src="https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/11.png"
                alt=""
                className="h-full w-auto object-cover"
                style={{ filter: 'grayscale(100%)' }}
              />
            </div>

            <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl space-y-6 sm:space-y-10">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl text-white"
                style={{ 
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)'
                }}
              >
                RESIDENT MEMBERSHIP
              </motion.h2>

              {/* "The Foundation of VAULT54" section with small background image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <img
                    src="https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/11.png"
                    alt=""
                    className="h-24 w-auto object-contain"
                    style={{ filter: 'grayscale(100%)' }}
                  />
                </div>
                <h3 className="relative text-xl sm:text-2xl text-[#D4AF37]" style={{ fontFamily: 'Cinzel, serif' }}>
                  The Foundation of VAULT54
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl text-white/90 leading-relaxed"
              >
                This is the Standard Membership, granting access to all curated events and the network.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-1 text-left max-w-2xl mx-auto bg-black/40 backdrop-blur-xl border border-white/20 rounded-lg p-6 sm:p-8"
              >
                <h3 className="text-lg sm:text-xl text-[#D4AF37] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                  Resident Benefits Include:
                </h3>
                {[
                  'Access to monthly curated events and gatherings',
                  'Private member directory and networking platform',
                  'Invitations to exclusive social experiences',
                  'Member-only communication channels',
                  'Priority notifications for special events',
                  'Concierge service for event coordination'
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                    className="flex items-start gap-3 sm:gap-4 py-1"
                  >
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0 mt-2" />
                    <span className="text-white text-sm sm:text-base">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-base sm:text-lg text-[#D4AF37] italic mt-6"
              >
                But this is just the beginning...
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)' }}
                onClick={() => setCurrentScreen(7)}
                className="mt-6 sm:mt-8 px-12 sm:px-16 py-3 sm:py-4 bg-black/40 backdrop-blur-xl border-2 border-white/30 text-white rounded-lg tracking-widest transition-all duration-300 text-sm sm:text-base"
              >
                SHOW ME MORE
              </motion.button>
            </div>
          </motion.div>
        );

      // SCREEN 7: THE RESERVE
      case 7:
        return (
          <motion.div
            key="screen7"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative py-20 sm:py-24 px-4"
          >
            <SmokeBackground />
            
            {/* Large background image for Reserve */}
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-15">
              <img
                src="https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/11.png"
                alt=""
                className="h-full w-auto object-cover"
                style={{ filter: 'grayscale(100%)' }}
              />
            </div>

            <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl space-y-6 sm:space-y-10">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl text-white"
                style={{ 
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)'
                }}
              >
                THE RESERVE MEMBERSHIP
              </motion.h2>

              {/* "Elevated Access. Preferred Treatment." section with small background image */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <img
                    src="https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/11.png"
                    alt=""
                    className="h-24 w-auto object-contain"
                    style={{ filter: 'grayscale(100%)' }}
                  />
                </div>
                <h3 className="relative text-xl sm:text-2xl text-[#D4AF37]" style={{ fontFamily: 'Cinzel, serif' }}>
                  Elevated Access. Preferred Treatment.
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl text-white/90 leading-relaxed"
              >
                The Reserve represents a higher tier of membership for those who demand more.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-1 text-left max-w-2xl mx-auto bg-black/40 backdrop-blur-xl border border-white/20 rounded-lg p-6 sm:p-8"
              >
                <h3 className="text-lg sm:text-xl text-[#D4AF37] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                  Reserve Privileges:
                </h3>
                {[
                  { title: 'Preferred Entry', desc: 'Skip lines and receive priority access at all VAULT54 events' },
                  { title: 'Quarterly Offsites', desc: 'Exclusive retreats to luxury destinations, included in membership' },
                  { title: 'Reserve-Only Chat', desc: 'Private communication channel with fellow Reserve members' },
                  { title: 'Early Access', desc: 'First notification and booking for all special events' },
                  { title: 'Guest Privileges', desc: 'Bring vetted guests to select events' }
                ].map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                    className="flex items-start gap-3 sm:gap-4 py-1"
                  >
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full flex-shrink-0 mt-2" />
                    <span className="text-white text-sm sm:text-base">
                      <strong>{benefit.title}:</strong> {benefit.desc}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-base sm:text-lg text-[#D4AF37] italic mt-6"
              >
                For those who expect excellence as standard.
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 255, 255, 0.4)' }}
                onClick={() => setCurrentScreen(8)}
                className="mt-6 sm:mt-8 px-12 sm:px-16 py-3 sm:py-4 bg-black/40 backdrop-blur-xl border-2 border-white/30 text-white rounded-lg tracking-widest transition-all duration-300 text-sm sm:text-base"
              >
                CONTINUE
              </motion.button>
            </div>
          </motion.div>
        );

      // SCREEN 8: THE SYNDICATE - Full Description
      case 8:
        return (
          <motion.div
            key="screen8"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative py-20 sm:py-24 px-4 overflow-y-auto"
          >
            <SmokeBackground />
            
            <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl w-full space-y-10 my-12">
              {/* The Syndicate Title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h2 
                  className="text-5xl sm:text-6xl md:text-7xl text-white"
                  style={{ 
                    fontFamily: 'Cinzel, serif',
                    textShadow: '0 0 50px rgba(255, 255, 255, 0.9), 0 0 25px rgba(255, 255, 255, 0.6)'
                  }}
                >
                  THE SYNDICATE
                </h2>
                <p className="text-xl sm:text-2xl text-[#D4AF37]" style={{ fontFamily: 'Cinzel, serif' }}>
                  The Apex of Membership
                </p>
              </motion.div>

              {/* Quote */}
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl sm:text-3xl text-white/90 italic"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                "Where the extraordinary becomes ordinary."
              </motion.p>

              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg sm:text-xl text-white/80 leading-relaxed space-y-4 max-w-3xl mx-auto"
              >
                <p>
                  There exists a tier beyond Reserve. A level reserved only for those who understand that true luxury knows no boundaries.
                </p>
                <p>
                  Where privacy is absolute. Where experiences transcend imagination. Where your deepest desires find expression.
                </p>
              </motion.div>

              {/* Benefits Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-10 text-left max-w-3xl mx-auto"
              >
                <div className="space-y-3 text-white/90">
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] flex-shrink-0">✦</span>
                    <span><strong>Unlimited VIP Event Access</strong> - Never miss an experience</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] flex-shrink-0">✦</span>
                    <span><strong>Private Artistic Performances</strong> - Commissioned exclusively for Syndicate</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] flex-shrink-0">✦</span>
                    <span><strong>Curated Nightlife Experiences</strong> - Behind every velvet rope</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] flex-shrink-0">✦</span>
                    <span><strong>International Retreat Access</strong> - Private estates worldwide</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] flex-shrink-0">✦</span>
                    <span><strong>Bespoke Experience Design</strong> - Your fantasies, perfectly realized</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] flex-shrink-0">✦</span>
                    <span><strong>Unlimited Guest Privileges</strong> - Share the experience</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] flex-shrink-0">✦</span>
                    <span><strong>Private Member Lounges</strong> - Exclusive sanctuaries in major cities</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-[#D4AF37] flex-shrink-0">✦</span>
                    <span><strong>Inner Circle Access</strong> - The most distinguished community</span>
                  </p>
                </div>
              </motion.div>

              {/* Closing Quote */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-lg sm:text-xl text-white/70 italic"
              >
                "The Syndicate isn't just a membership. It's a way of life."
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)' }}
                onClick={() => setCurrentScreen(9)}
                className="mt-8 px-12 sm:px-16 py-3 sm:py-4 bg-black/40 backdrop-blur-xl border-2 border-white/30 text-white rounded-lg tracking-widest transition-all duration-300 text-sm sm:text-base hover:bg-black/60"
              >
                CONTINUE
              </motion.button>
            </div>
          </motion.div>
        );

      // SCREEN 9: THE SYNDICATE EXPERIENCE (Perks Grid) - formerly screen 8
      case 9:
        const perks = [
          { title: 'Rendezvous Nights', desc: 'Exclusive curated nightlife experiences' },
          { title: 'Private Parties', desc: 'Invitation-only small-group gatherings' },
          { title: 'Annual Retreat', desc: 'Luxury cabin weekend or villa trip' },
          { title: 'After Dark Art', desc: '"Sip & Paint After Dark" erotic art sessions' },
          { title: 'Masseur Services', desc: 'Professional massage at select events' },
          { title: 'Night Run', desc: 'Charter-driver luxury city cruise' },
          { title: 'Priority Access', desc: 'Guest list + zero-wait entry' },
          { title: 'VIP Recognition', desc: 'Badges and status icons' },
          { title: 'Private Forums', desc: 'Tier-restricted digital communities' },
          { title: 'Syndicate Channels', desc: 'Exclusive member communication' }
        ];

        return (
          <motion.div
            key="screen9"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative py-20 sm:py-24 px-4"
          >
            <SmokeBackground />
            
            <div className="relative z-20 text-center px-4 sm:px-6 max-w-6xl w-full space-y-8 sm:space-y-12">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl text-white"
                style={{ 
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)'
                }}
              >
                THE SYNDICATE EXPERIENCE
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto"
              >
                {perks.map((perk, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:border-[#D4AF37]/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-300"
                  >
                    <h3 className="text-xl text-[#D4AF37] mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                      {perk.title}
                    </h3>
                    <p className="text-white/80 text-sm sm:text-base">{perk.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)' }}
                onClick={() => setCurrentScreen(10)}
                className="mt-8 px-12 sm:px-16 py-3 sm:py-4 bg-black/40 backdrop-blur-xl border-2 border-white/30 text-white rounded-lg tracking-widest transition-all duration-300 text-sm sm:text-base hover:bg-black/60"
              >
                CONTINUE
              </motion.button>
            </div>
          </motion.div>
        );

      // SCREEN 10: Value Perception - Weekend Spending (formerly screen 9)
      case 10:
        return (
          <motion.div
            key="screen10"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative py-12 px-4"
          >
            <SmokeBackground />
            
            <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl w-full space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl text-white"
                style={{ 
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)'
                }}
              >
                LET'S TALK REAL NUMBERS
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl sm:text-2xl text-white"
              >
                What do you typically spend on a weekend night out?
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-left max-w-2xl mx-auto bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-white/70 text-sm sm:text-base mb-6"
              >
                <p className="mb-3 text-white/90">Think about everything:</p>
                <div className="grid grid-cols-2 gap-2">
                  <span>• Haircut/Grooming</span>
                  <span>• Outfit</span>
                  <span>• Parking/Uber</span>
                  <span>• Club Entry</span>
                  <span>• Drinks</span>
                  <span>• After Hours</span>
                  <span>• Party Favors</span>
                  <span>• Smokes</span>
                  <span>• Late Night Eats</span>
                  <span>• Tips</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-4 pt-4"
              >
                {['$50 - $100', '$100 - $150', '$150 - $200', '$200 - $250', '$250+'].map((option, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + idx * 0.1 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}
                    onClick={() => {
                      setWeekendSpending(option);
                      setCurrentScreen(11);
                    }}
                    className="w-full max-w-md mx-auto block px-8 py-4 bg-black/40 backdrop-blur-xl border border-white/30 text-white rounded-lg hover:border-[#D4AF37]/50 transition-all duration-300 text-lg"
                  >
                    {option}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        );

      // SCREEN 11: Interest in Exclusive Membership (formerly screen 10)
      case 11:
        return (
          <motion.div
            key="screen11"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative py-12 px-4"
          >
            <SmokeBackground />
            
            <div className="relative z-20 text-center px-4 sm:px-6 max-w-3xl w-full space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl text-white"
                style={{ 
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)'
                }}
              >
                NOW, THE REAL QUESTION
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl sm:text-2xl text-white"
              >
                How much would you pay monthly for exclusive access to curated events, a vetted network, and experiences that make your typical weekend look ordinary?
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-4 pt-4"
              >
                {['Under $50/month', '$50 - $100/month', '$100 - $150/month', '$150 - $200/month', '$200+/month'].map((option, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + idx * 0.1 }}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}
                    onClick={() => {
                      setValuePerception(option);
                      setCurrentScreen(12);
                    }}
                    className="w-full max-w-md mx-auto block px-8 py-4 bg-black/40 backdrop-blur-xl border border-white/30 text-white rounded-lg hover:border-[#D4AF37]/50 transition-all duration-300 text-lg"
                  >
                    {option}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        );

      // SCREEN 11: Removed - Skip directly to screen 12

      // SCREEN 12: Removed - Skip directly to screen 13

      // SCREEN 13: Final Tease - "The Door Is Open" (formerly screen 12)
      case 13:
        return (
          <motion.div
            key="screen13"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative py-12 px-4"
          >
            <SmokeBackground />
            
            <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl w-full space-y-8 sm:space-y-10">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl text-white"
                style={{ 
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)'
                }}
              >
                THE DOOR IS OPEN
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl sm:text-2xl text-[#D4AF37] italic"
              >
                But only for those who understand what lies beyond.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto space-y-4"
              >
                <p>
                  The Syndicate is not for everyone. It's for men who value discretion, who seek pleasure without apology, and who understand that true luxury is measured in experiences—not possessions.
                </p>
                <p className="text-white/70">
                  If you're ready to step through, the application awaits.
                </p>
              </motion.div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(212, 175, 55, 0.5)' }}
                  onClick={() => setCurrentScreen(14)}
                  className="px-12 sm:px-16 py-4 sm:py-5 bg-gradient-to-r from-[#D4AF37]/30 to-[#8B4513]/30 backdrop-blur-xl border-2 border-[#D4AF37] text-white rounded-lg tracking-widest transition-all duration-300 text-base sm:text-lg hover:from-[#D4AF37]/40 hover:to-[#8B4513]/40"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  APPLY NOW
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={onDecline}
                  className="px-12 sm:px-16 py-4 sm:py-5 bg-black/40 backdrop-blur-xl border-2 border-white/30 text-white/70 rounded-lg tracking-widest transition-all duration-300 text-base sm:text-lg hover:bg-black/60 hover:text-white hover:border-white/40"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  NOT FOR ME
                </motion.button>
              </div>
            </div>
          </motion.div>
        );

      // SCREEN 14: Application Handoff (formerly screen 13)
      case 14:
        return (
          <motion.div
            key="screen14"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex items-center justify-center relative py-12 px-4"
          >
            <SmokeBackground />
            
            <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl w-full space-y-8 sm:space-y-10">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl text-white"
                style={{ 
                  fontFamily: 'Cinzel, serif',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)'
                }}
              >
                YOUR JOURNEY BEGINS HERE
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto space-y-4"
              >
                <p>
                  You've seen what VAULT54 offers. Now it's time to tell us about yourself.
                </p>
                <p className="text-white/70">
                  Click below to complete your membership application. Our team will review your submission and be in touch within 48 hours.
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(212, 175, 55, 0.5)' }}
                onClick={() => onComplete({ 
                  weekendSpending, 
                  membershipValuePerception: valuePerception 
                })}
                className="mt-8 px-16 sm:px-20 py-4 sm:py-5 bg-gradient-to-r from-[#D4AF37]/30 to-[#8B4513]/30 backdrop-blur-xl border-2 border-[#D4AF37] text-white rounded-lg tracking-widest transition-all duration-300 text-lg sm:text-xl hover:from-[#D4AF37]/40 hover:to-[#8B4513]/40"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                START APPLICATION
              </motion.button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-black overflow-y-auto relative">
      <GoldParticles />

      {/* Top Navigation with Back Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/20 px-4 md:px-8 py-4">
        <button
          onClick={() => {
            if (currentScreen > 1) {
              setCurrentScreen(currentScreen - 1);
            } else {
              onDecline();
            }
          }}
          className="flex items-center gap-2 text-white/70 hover:text-[#D4AF37] transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span className="text-sm tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
            {currentScreen > 1 ? 'BACK' : 'EXIT'}
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>

      {/* Value Perception Popup */}
      <AnimatePresence>
        {showValuePopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-[100] px-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowValuePopup(false)} />
            <div className="relative bg-gradient-to-br from-[#D4AF37]/30 to-[#8B4513]/30 backdrop-blur-xl border-2 border-[#D4AF37] rounded-2xl p-8 sm:p-12 max-w-md shadow-[0_0_60px_rgba(212,175,55,0.6)]">
              <p className="text-2xl sm:text-3xl text-[#FFD700] text-center" style={{ fontFamily: 'Cinzel, serif', textShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }}>
                Yeah, that's what I thought.
              </p>
              <button
                onClick={() => setShowValuePopup(false)}
                className="mt-6 mx-auto block px-8 py-3 bg-black/40 border-2 border-white/30 text-white rounded-lg hover:bg-black/60 transition-all"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        
        @keyframes smokeFlow {
          0% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          33% { 
            transform: translate(-50px, 30px) scale(1.1);
            opacity: 0.8;
          }
          66% { 
            transform: translate(50px, -30px) scale(0.95);
            opacity: 0.7;
          }
          100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
        }

        @keyframes smokeGoldFlow {
          0% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.5;
          }
          50% { 
            transform: translate(30px, -40px) rotate(5deg);
            opacity: 0.7;
          }
          100% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};