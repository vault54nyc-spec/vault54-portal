import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DramaticTransitionProps {
  isActive: boolean;
  onComplete: () => void;
  logoSrc: string;
}

export const DramaticTransition: React.FC<DramaticTransitionProps> = ({
  isActive,
  onComplete,
  logoSrc
}) => {
  const [stage, setStage] = useState<'initial' | 'zoom' | 'explode' | 'fade' | 'complete'>('initial');

  useEffect(() => {
    if (isActive) {
      setStage('zoom');
      
      // Zoom phase - 800ms
      setTimeout(() => setStage('explode'), 800);
      
      // Explosion phase - 600ms
      setTimeout(() => setStage('fade'), 1400);
      
      // Fade to black - 400ms
      setTimeout(() => {
        setStage('complete');
        onComplete();
      }, 1800);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background fade to black */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: stage === 'fade' || stage === 'complete' ? 1 : 0.5 
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Logo zoom and glow */}
        {(stage === 'zoom' || stage === 'explode') && (
          <motion.div
            className="relative z-10"
            initial={{ scale: 1, opacity: 1 }}
            animate={{
              scale: stage === 'explode' ? 20 : 1.5,
              opacity: stage === 'explode' ? 0 : 1
            }}
            transition={{
              scale: { 
                duration: stage === 'explode' ? 0.6 : 0.8,
                ease: stage === 'explode' ? "easeIn" : "easeOut"
              },
              opacity: { 
                duration: stage === 'explode' ? 0.6 : 0.8,
                ease: "easeOut"
              }
            }}
            style={{
              filter: `
                drop-shadow(0 0 ${stage === 'zoom' ? '60px' : '120px'} rgba(255,255,255,1))
                drop-shadow(0 0 ${stage === 'zoom' ? '40px' : '80px'} rgba(255,255,255,0.8))
                brightness(${stage === 'zoom' ? 1.3 : 1.8})
              `
            }}
          >
            <img
              src={logoSrc}
              alt="VAULT54"
              className="w-64 h-auto md:w-80 lg:w-96"
            />
          </motion.div>
        )}

        {/* Radial glow burst */}
        {stage === 'zoom' && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 30%, transparent 60%)',
              filter: 'blur(40px)'
            }}
          />
        )}

        {/* Explosion particles */}
        {stage === 'explode' && (
          <>
            {Array.from({ length: 30 }).map((_, i) => {
              const angle = (i / 30) * Math.PI * 2;
              const distance = 150 + Math.random() * 100;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              const size = 4 + Math.random() * 8;
              
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: size,
                    height: size,
                    background: `radial-gradient(circle, rgba(255,255,255,${0.8 + Math.random() * 0.2}), rgba(255,255,255,0))`,
                    left: '50%',
                    top: '50%',
                    boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.8)`
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: x,
                    y: y,
                    opacity: 0,
                    scale: 1
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                />
              );
            })}
          </>
        )}

        {/* Light rays */}
        {(stage === 'zoom' || stage === 'explode') && (
          <>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute origin-center"
                style={{
                  width: '4px',
                  height: '50%',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${angle}deg) translateY(-50%)`,
                  filter: 'blur(2px)'
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{
                  scaleY: stage === 'explode' ? 2 : 1,
                  opacity: stage === 'explode' ? 0 : 0.6
                }}
                transition={{
                  duration: stage === 'explode' ? 0.6 : 0.8,
                  ease: "easeOut",
                  delay: i * 0.05
                }}
              />
            ))}
          </>
        )}

        {/* Ring expansion */}
        {stage === 'zoom' && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2"
                style={{
                  borderColor: 'rgba(255,255,255,0.6)',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={{
                  width: '200vw',
                  height: '200vw',
                  opacity: 0
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: i * 0.2
                }}
              />
            ))}
          </>
        )}

        {/* Final flash */}
        {stage === 'explode' && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 0.3, times: [0, 0.5, 1] }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
