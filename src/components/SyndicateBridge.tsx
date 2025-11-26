import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const SyndicateBridge = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    tier: '',
    source: '',
    about: ''
  });
  const totalScreens = 14;

  useEffect(() => {
    const container = document.getElementById('particles-container');
    if (container && container.children.length === 0) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        const startX = Math.random() * 100;
        const driftX = (Math.random() - 0.5) * 200;
        const duration = 15 + Math.random() * 25;
        const delay = Math.random() * 10;
        const size = 2 + Math.random() * 3;
        
        particle.style.left = startX + '%';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.setProperty('--drift-x', driftX + 'px');
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
      }
    }
  }, []);

  const nextScreen = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const previousScreen = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canProceed = () => {
    if (currentScreen === 3) return termsAccepted;
    if (currentScreen === 4) return ndaAccepted;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your application! Our team will review and contact you within 48-72 hours.\\n\\nWelcome to VAULT54.');
  };

  const perks = [
    {
      image: 'https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/9.png',
      title: 'Exclusive Artistic Experiences',
      description: 'Commissioned performances and private exhibitions from world-class artists pushing creative boundaries.'
    },
    {
      image: 'https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/10.png',
      title: 'Syndicate Nightlife Access',
      description: 'Curated nightlife tours through the city\\'s most exclusive venues. VIP treatment everywhere you go.'
    },
    {
      image: 'https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/11.png',
      title: 'Private Lux Events',
      description: 'Intimate gatherings at premium locations with carefully curated guest lists and experiences.'
    },
    {
      image: 'https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/12.png',
      title: 'US/International Offsite Retreats',
      description: 'Private estates. Exotic destinations. Unforgettable experiences with fellow Syndicate members.'
    },
    {
      image: 'https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/13.png',
      title: 'Bespoke Experiences',
      description: 'Your fantasies, realized. Custom-crafted experiences designed exclusively for your desires.'
    }
  ];

  return (
    <div className="syndicate-bridge">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;600&display=swap');

        .syndicate-bridge {
          min-height: 100vh;
          background: #000;
          color: #fff;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .global-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .smoke-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at 20% 30%, rgba(218, 165, 32, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(139, 69, 19, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
          animation: drift 25s ease-in-out infinite;
          filter: blur(60px);
        }

        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          33% { transform: translate(30px, -30px) scale(1.15); opacity: 0.8; }
          66% { transform: translate(-20px, 20px) scale(0.95); opacity: 0.7; }
        }

        .particles-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .floating-particle {
          position: absolute;
          background: radial-gradient(circle, rgba(218, 165, 32, 1), transparent);
          border-radius: 50%;
          animation: float linear infinite;
          opacity: 0;
        }

        @keyframes float {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(var(--drift-x)); opacity: 0; }
        }

        .screen-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          position: relative;
          z-index: 1;
        }

        .content {
          max-width: 900px;
          width: 100%;
          text-align: center;
        }

        .content-wide {
          max-width: 100%;
          width: 100%;
          text-align: center;
        }

        h1, h2 {
          font-family: 'Cinzel', serif;
          font-weight: 900;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(218, 165, 32, 0.3);
          margin-bottom: 30px;
        }

        h1 { font-size: 4rem; }
        h2 { font-size: 3rem; }
        h3 {
          font-family: 'Cinzel', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 15px;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
        }

        p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin: 20px 0;
        }

        .glass-window {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(218, 165, 32, 0.5);
          border-radius: 18px;
          padding: 40px;
          margin: 30px 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 60px rgba(218, 165, 32, 0.1);
        }

        .glass-window-highlight {
          border-color: rgba(218, 165, 32, 0.8);
          box-shadow: 0 0 60px rgba(218, 165, 32, 0.4);
        }

        .btn {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 2px;
          padding: 18px 50px;
          margin: 15px 10px;
          border: 2px solid #D4AF37;
          background: transparent;
          color: #fff;
          cursor: pointer;
          text-transform: uppercase;
          transition: all 0.3s ease;
          border-radius: 8px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 20px rgba(218, 165, 32, 0.3);
        }

        .btn:hover {
          background: rgba(218, 165, 32, 0.2);
          box-shadow: 0 0 40px rgba(218, 165, 32, 0.6);
          transform: translateY(-2px);
        }

        .btn-primary {
          background: linear-gradient(135deg, rgba(218, 165, 32, 0.3), rgba(139, 69, 19, 0.3));
        }

        .nav-controls {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.8);
          padding: 15px 30px;
          border-radius: 50px;
          border: 1px solid rgba(218, 165, 32, 0.3);
        }

        .nav-btn {
          background: transparent;
          border: 2px solid #D4AF37;
          color: #fff;
          padding: 10px 25px;
          border-radius: 25px;
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-btn:hover:not(:disabled) {
          background: rgba(218, 165, 32, 0.2);
          box-shadow: 0 0 20px rgba(218, 165, 32, 0.5);
        }

        .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .screen-counter {
          color: #D4AF37;
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          display: flex;
          align-items: center;
          letter-spacing: 2px;
        }

        .exit-btn {
          position: fixed;
          top: 30px;
          right: 30px;
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid rgba(218, 165, 32, 0.5);
          color: #fff;
          padding: 12px 30px;
          border-radius: 25px;
          cursor: pointer;
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          letter-spacing: 2px;
          z-index: 1001;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .exit-btn:hover {
          background: rgba(218, 165, 32, 0.2);
          box-shadow: 0 0 30px rgba(218, 165, 32, 0.5);
        }

        .video-container {
          width: 100%;
          max-width: 1200px;
          margin: 30px 0;
          border: 3px solid rgba(218, 165, 32, 0.5);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 0 50px rgba(218, 165, 32, 0.3);
        }

        .video-container img {
          width: 100%;
          height: auto;
          display: block;
        }

        .perk-carousel {
          display: flex;
          gap: 30px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 40px 20px;
          margin: 30px -20px;
          scrollbar-width: thin;
          scrollbar-color: #D4AF37 rgba(0, 0, 0, 0.3);
        }

        .perk-card {
          min-width: 350px;
          height: 500px;
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          border: 3px solid rgba(218, 165, 32, 0.6);
          scroll-snap-align: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .perk-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: blur(10px) brightness(0.7);
        }

        .perk-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
          padding: 40px 25px;
          color: #fff;
        }

        .perk-overlay h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          color: #D4AF37;
        }

        .tier-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin: 40px 0;
          max-width: 1200px;
        }

        .tier-card {
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid rgba(218, 165, 32, 0.4);
          border-radius: 18px;
          padding: 35px 25px;
          backdrop-filter: blur(15px);
          transition: all 0.3s ease;
        }

        .tier-card:hover {
          border-color: rgba(218, 165, 32, 0.8);
          box-shadow: 0 0 40px rgba(218, 165, 32, 0.3);
          transform: translateY(-5px);
        }

        .tier-card-highlight {
          border-width: 4px;
          border-color: #D4AF37;
          box-shadow: 0 0 50px rgba(218, 165, 32, 0.4);
        }

        .price {
          font-family: 'Cinzel', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #fff;
          margin: 20px 0;
          text-shadow: 0 0 15px rgba(218, 165, 32, 0.5);
        }

        .legal-doc {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid rgba(218, 165, 32, 0.4);
          border-radius: 18px;
          padding: 40px;
          max-height: 500px;
          overflow-y: auto;
          text-align: left;
          margin: 30px 0;
          scrollbar-width: thin;
          scrollbar-color: #D4AF37 rgba(0, 0, 0, 0.3);
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 30px 0;
          gap: 15px;
        }

        .checkbox-container input[type="checkbox"] {
          width: 24px;
          height: 24px;
          cursor: pointer;
          accent-color: #D4AF37;
        }

        .application-form {
          max-width: 700px;
          margin: 40px auto;
        }

        .form-group {
          margin: 25px 0;
          text-align: left;
        }

        .form-group label {
          display: block;
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          color: #D4AF37;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 15px;
          background: rgba(0, 0, 0, 0.6);
          border: 2px solid rgba(218, 165, 32, 0.4);
          border-radius: 10px;
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: rgba(218, 165, 32, 0.8);
          box-shadow: 0 0 20px rgba(218, 165, 32, 0.3);
        }

        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }

        @media (max-width: 768px) {
          h1 { font-size: 2.5rem; }
          h2 { font-size: 2rem; }
          .glass-window { padding: 25px; }
          .btn { padding: 15px 30px; font-size: 1rem; }
          .perk-card { min-width: 300px; height: 450px; }
          .tier-grid { grid-template-columns: 1fr; }
          .nav-controls { bottom: 20px; padding: 12px 20px; }
        }
      `}</style>

      {/* Global Background */}
      <div className="global-bg">
        <div className="smoke-layer"></div>
        <div className="particles-container" id="particles-container"></div>
      </div>

      {/* Exit Button */}
      <button className="exit-btn" onClick={() => window.history.back()}>
        <X size={20} />
        EXIT
      </button>

      {/* Screen Content */}
      <div className="screen-container">
        {/* Screen 1: Video Hero */}
        {currentScreen === 1 && (
          <div className="content">
            <div className="video-container">
              <img src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/Jersey.gif" alt="VAULT54" />
            </div>
            <h1>VAULT54</h1>
            <p style={{ fontSize: '1.5rem', margin: '30px 0' }}>Where Luxury Meets Discretion</p>
          </div>
        )}

        {/* Screen 2: Welcome */}
        {currentScreen === 2 && (
          <div className="content">
            <h2>WELCOME TO VAULT54</h2>
            <div className="glass-window">
              <p style={{ fontSize: '1.4rem', lineHeight: 2 }}>
                An exclusive membership platform designed for distinguished gentlemen who appreciate 
                the finer things in life. Where sophistication meets sensuality, and discretion is paramount.
              </p>
              <p style={{ marginTop: '30px' }}>
                Before we begin, you'll need to review and accept our terms and agreements. 
                These documents protect both you and our community.
              </p>
            </div>
          </div>
        )}

        {/* Screen 3: Terms of Service */}
        {currentScreen === 3 && (
          <div className="content">
            <h2>TERMS OF SERVICE</h2>
            <div className="legal-doc">
              <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>VAULT54 Membership Terms</h3>
              <p><strong>Last Updated: November 2025</strong></p>
              <p>By accessing VAULT54 ("the Platform"), you agree to be bound by these Terms of Service.</p>
              <p><strong>1. MEMBERSHIP ELIGIBILITY</strong></p>
              <p>All members must be at least 21 years of age. By registering, you affirm that you meet this requirement.</p>
              <p><strong>2. CODE OF CONDUCT</strong></p>
              <p>Members must treat all staff, performers, and fellow members with respect and dignity. Harassment or violation of consent will result in immediate termination.</p>
              <p><strong>3. PRIVACY & DISCRETION</strong></p>
              <p>VAULT54 values your privacy. We will never share your membership information without explicit consent.</p>
            </div>
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label>I have read and accept the Terms of Service</label>
            </div>
          </div>
        )}

        {/* Screen 4: NDA */}
        {currentScreen === 4 && (
          <div className="content">
            <h2>NON-DISCLOSURE AGREEMENT</h2>
            <div className="legal-doc">
              <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Confidentiality & Non-Disclosure Agreement</h3>
              <p><strong>PARTIES:</strong> This Agreement is between you ("Member") and VAULT54 LLC.</p>
              <p><strong>1. CONFIDENTIAL INFORMATION</strong></p>
              <p>"Confidential Information" includes: Identity of members, staff, performers; Event details; Business operations; and any information designated confidential by VAULT54.</p>
              <p><strong>2. NON-DISCLOSURE OBLIGATIONS</strong></p>
              <p>You agree to maintain strict confidentiality and not disclose any Confidential Information to third parties.</p>
            </div>
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                checked={ndaAccepted}
                onChange={(e) => setNdaAccepted(e.target.checked)}
              />
              <label>I have read and accept the Non-Disclosure Agreement</label>
            </div>
          </div>
        )}

        {/* Screen 5: Resident Membership */}
        {currentScreen === 5 && (
          <div className="content">
            <h2>RESIDENT MEMBERSHIP</h2>
            <div className="glass-window">
              <h3 style={{ color: '#D4AF37', marginBottom: '25px' }}>The Foundation Tier</h3>
              <div className="price">$150<span style={{ fontSize: '1.2rem' }}>/month</span></div>
              <p style={{ fontSize: '1.3rem', margin: '30px 0' }}>
                Your gateway into the VAULT54 experience. Resident membership grants you access to our 
                core community and select events.
              </p>
              <ul style={{ listStyle: 'none', textAlign: 'left', margin: '30px 0' }}>
                <li style={{ padding: '12px 0' }}>✦ Access to monthly community events</li>
                <li style={{ padding: '12px 0' }}>✦ Member directory and networking</li>
                <li style={{ padding: '12px 0' }}>✦ Invitation to seasonal gatherings</li>
                <li style={{ padding: '12px 0' }}>✦ Access to member-only content</li>
                <li style={{ padding: '12px 0' }}>✦ Priority booking for premium events</li>
                <li style={{ padding: '12px 0' }}>✦ Concierge support</li>
              </ul>
            </div>
          </div>
        )}

        {/* Screen 6: Reserve Membership */}
        {currentScreen === 6 && (
          <div className="content">
            <h2>RESERVE MEMBERSHIP</h2>
            <div className="glass-window">
              <h3 style={{ color: '#D4AF37', marginBottom: '25px' }}>Elevated Access</h3>
              <div className="price">$300<span style={{ fontSize: '1.2rem' }}>/month</span></div>
              <p style={{ fontSize: '1.3rem', margin: '30px 0' }}>
                Step beyond the basics. Reserve membership unlocks a heightened level of access 
                and exclusive privileges.
              </p>
              <ul style={{ listStyle: 'none', textAlign: 'left', margin: '30px 0' }}>
                <li style={{ padding: '12px 0' }}>✦ All Resident benefits PLUS:</li>
                <li style={{ padding: '12px 0' }}>✦ Bi-weekly exclusive events</li>
                <li style={{ padding: '12px 0' }}>✦ VIP lounge access at partner venues</li>
                <li style={{ padding: '12px 0' }}>✦ Complimentary guest passes (2 per month)</li>
                <li style={{ padding: '12px 0' }}>✦ Priority placement at intimate gatherings</li>
                <li style={{ padding: '12px 0' }}>✦ Quarterly premium experience</li>
                <li style={{ padding: '12px 0' }}>✦ Dedicated account manager</li>
              </ul>
            </div>
          </div>
        )}

        {/* Screen 7: Syndicate Teaser */}
        {currentScreen === 7 && (
          <div className="content">
            <h2 style={{ fontSize: '3.5rem' }}>THE SYNDICATE</h2>
            <div className="glass-window glass-window-highlight">
              <p style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'rgba(218, 165, 32, 0.95)', marginBottom: '35px' }}>
                "Where the extraordinary becomes ordinary."
              </p>
              <p style={{ fontSize: '1.3rem', lineHeight: 2, margin: '30px 0' }}>
                There exists a tier beyond Reserve. A level reserved only for those who understand 
                that true luxury knows no boundaries.
              </p>
              <p style={{ fontSize: '1.4rem', margin: '40px 0', color: '#D4AF37' }}>
                This is not for everyone.
              </p>
            </div>
          </div>
        )}

        {/* Screen 8: Syndicate Perks Carousel */}
        {currentScreen === 8 && (
          <div className="content-wide">
            <h2>SYNDICATE PRIVILEGES</h2>
            <p style={{ margin: '25px 0', fontSize: '1.3rem' }}>Experiences Beyond Imagination</p>
            <div className="perk-carousel">
              {perks.map((perk, index) => (
                <div key={index} className="perk-card">
                  <img src={perk.image} alt={perk.title} />
                  <div className="perk-overlay">
                    <h3>{perk.title}</h3>
                    <p>{perk.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screen 9: Full Syndicate Breakdown */}
        {currentScreen === 9 && (
          <div className="content">
            <h2>THE SYNDICATE</h2>
            <div className="glass-window">
              <h3 style={{ color: '#D4AF37', marginBottom: '25px' }}>The Apex of Membership</h3>
              <div className="price">$1,500<span style={{ fontSize: '1.2rem' }}>/month</span></div>
              <p style={{ fontSize: '1.3rem', margin: '30px 0' }}>
                The pinnacle of VAULT54. Where boundaries dissolve and possibilities expand infinitely.
              </p>
              <ul style={{ listStyle: 'none', textAlign: 'left', margin: '30px 0' }}>
                <li style={{ fontSize: '1.1rem', padding: '15px 0', borderBottom: '2px solid rgba(218, 165, 32, 0.3)' }}>
                  ✦ All Reserve benefits PLUS:
                </li>
                <li style={{ padding: '15px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>
                  ✦ Unlimited VIP Event Access
                </li>
                <li style={{ padding: '15px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>
                  ✦ Private Artistic Performances
                </li>
                <li style={{ padding: '15px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>
                  ✦ Curated Nightlife Experiences
                </li>
                <li style={{ padding: '15px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>
                  ✦ International Retreat Access
                </li>
                <li style={{ padding: '15px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>
                  ✦ Bespoke Experience Design
                </li>
                <li style={{ padding: '15px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>
                  ✦ 24/7 Concierge
                </li>
                <li style={{ padding: '15px 0' }}>
                  ✦ Inner Circle Access
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Screen 10: Tier Comparison */}
        {currentScreen === 10 && (
          <div className="content-wide">
            <h2>CHOOSE YOUR LEVEL</h2>
            <p style={{ margin: '25px 0 50px', fontSize: '1.3rem' }}>Three tiers. Infinite possibilities.</p>
            <div className="tier-grid">
              <div className="tier-card">
                <h3>RESIDENT</h3>
                <div className="price">$150<span style={{ fontSize: '1.2rem' }}>/mo</span></div>
                <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                  <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>✦ Monthly events</li>
                  <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>✦ Member directory</li>
                  <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>✦ Seasonal gatherings</li>
                  <li style={{ padding: '12px 0' }}>✦ Concierge support</li>
                </ul>
              </div>
              <div className="tier-card" style={{ transform: 'scale(1.05)', borderWidth: '3px' }}>
                <h3>RESERVE</h3>
                <div className="price">$300<span style={{ fontSize: '1.2rem' }}>/mo</span></div>
                <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                  <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>✦ All Resident benefits</li>
                  <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>✦ Bi-weekly events</li>
                  <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>✦ VIP lounge access</li>
                  <li style={{ padding: '12px 0' }}>✦ Account manager</li>
                </ul>
              </div>
              <div className="tier-card tier-card-highlight">
                <h3>SYNDICATE</h3>
                <div className="price">$1,500<span style={{ fontSize: '1.2rem' }}>/mo</span></div>
                <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                  <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>✦ All Reserve benefits</li>
                  <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>✦ Unlimited VIP access</li>
                  <li style={{ padding: '12px 0', borderBottom: '1px solid rgba(218, 165, 32, 0.2)' }}>✦ Private performances</li>
                  <li style={{ padding: '12px 0' }}>✦ Bespoke experiences</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Screen 11: Value Question 1 */}
        {currentScreen === 11 && (
          <div className="content">
            <h2>A MOMENT OF REFLECTION</h2>
            <div className="glass-window">
              <p style={{ fontSize: '1.4rem', lineHeight: 2, margin: '30px 0' }}>
                What is the value of an experience that transcends the ordinary?
              </p>
              <p style={{ fontSize: '1.2rem', margin: '40px 0' }}>
                Consider the moments in your life that have truly mattered. The connections that went beyond 
                surface pleasantries. The experiences that awakened something within you.
              </p>
              <p style={{ fontSize: '1.3rem', margin: '40px 0', color: 'rgba(218, 165, 32, 0.95)' }}>
                Can such experiences be quantified?
              </p>
            </div>
          </div>
        )}

        {/* Screen 12: Value Question 2 */}
        {currentScreen === 12 && (
          <div className="content">
            <h2>THE QUESTION OF WORTH</h2>
            <div className="glass-window">
              <p style={{ fontSize: '1.4rem', lineHeight: 2, margin: '30px 0' }}>
                What would you pay for absolute discretion?
              </p>
              <p style={{ fontSize: '1.2rem', margin: '40px 0' }}>
                In a world where privacy is increasingly rare, VAULT54 offers something precious: sanctuary.
              </p>
              <p style={{ fontSize: '1.3rem', margin: '40px 0', color: 'rgba(218, 165, 32, 0.95)' }}>
                This is not about the price tag.
              </p>
            </div>
          </div>
        )}

        {/* Screen 13: Final Syndicate Tease */}
        {currentScreen === 13 && (
          <div className="content">
            <h2 style={{ fontSize: '3.5rem' }}>THE DECISION</h2>
            <div className="glass-window glass-window-highlight">
              <p style={{ fontSize: '1.5rem', margin: '30px 0', lineHeight: 2 }}>
                You've been presented with three paths. Each offers its own rewards.
              </p>
              <p style={{ fontSize: '1.3rem', margin: '40px 0' }}>
                <strong style={{ color: '#D4AF37' }}>Resident</strong> - A beginning.<br />
                <strong style={{ color: '#D4AF37' }}>Reserve</strong> - An elevation.<br />
                <strong style={{ color: '#D4AF37' }}>Syndicate</strong> - A transformation.
              </p>
              <p style={{ fontSize: '1.4rem', margin: '50px 0', color: 'rgba(218, 165, 32, 0.95)' }}>
                The question is not which you can afford.
              </p>
              <p style={{ fontSize: '1.5rem', margin: '40px 0' }}>
                The question is which you deserve.
              </p>
            </div>
          </div>
        )}

        {/* Screen 14: Application */}
        {currentScreen === 14 && (
          <div className="content">
            <h2>BEGIN YOUR JOURNEY</h2>
            <div className="glass-window">
              <p style={{ fontSize: '1.3rem', marginBottom: '40px' }}>
                Complete your application to join VAULT54.
              </p>
              <form className="application-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Desired Membership Tier *</label>
                  <select 
                    required
                    value={formData.tier}
                    onChange={(e) => setFormData({...formData, tier: e.target.value})}
                  >
                    <option value="">Select a tier...</option>
                    <option value="resident">Resident - $150/month</option>
                    <option value="reserve">Reserve - $300/month</option>
                    <option value="syndicate">Syndicate - $1,500/month</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>How did you hear about VAULT54? *</label>
                  <select 
                    required
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                  >
                    <option value="">Select one...</option>
                    <option value="referral">Member referral</option>
                    <option value="social">Social media</option>
                    <option value="event">Attended an event</option>
                    <option value="press">Press/Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tell us about yourself (Optional)</label>
                  <textarea 
                    value={formData.about}
                    onChange={(e) => setFormData({...formData, about: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '30px', padding: '20px', fontSize: '1.2rem' }}>
                  SUBMIT APPLICATION
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="nav-controls">
        <button 
          className="nav-btn" 
          onClick={previousScreen}
          disabled={currentScreen === 1}
        >
          <ChevronLeft size={16} />
          BACK
        </button>
        <span className="screen-counter">
          {currentScreen} / {totalScreens}
        </span>
        <button 
          className="nav-btn" 
          onClick={nextScreen}
          disabled={currentScreen === totalScreens || !canProceed()}
        >
          NEXT
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default SyndicateBridge;
