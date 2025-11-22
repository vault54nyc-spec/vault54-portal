import React, { useEffect, useRef } from 'react';

export const GoldParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create 40 particles
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.className = 'gold-particle';
      
      // Random size between 3-8px
      const size = Math.random() * 5 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random horizontal position
      particle.style.left = `${Math.random() * 100}%`;
      
      // Random animation duration between 12-25 seconds
      const duration = Math.random() * 13 + 12;
      particle.style.animationDuration = `${duration}s`;
      
      // Random delay
      const delay = Math.random() * 10;
      particle.style.animationDelay = `${delay}s`;
      
      // Random horizontal drift
      const drift = (Math.random() - 0.5) * 250;
      particle.style.setProperty('--drift', `${drift}px`);
      
      container.appendChild(particle);
    }

    // Cleanup
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[5]"
        style={{ overflow: 'hidden' }}
      />
      <style>{`
        .gold-particle {
          position: absolute;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.9), rgba(218, 165, 32, 0.6));
          border-radius: 50%;
          pointer-events: none;
          animation: floatUp linear infinite;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(100vh) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(var(--drift)) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};
