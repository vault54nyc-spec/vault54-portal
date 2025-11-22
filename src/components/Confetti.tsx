import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
}

export const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const [pieces, setPieces] = useState<Array<{ id: number; x: number; color: string; delay: number; duration: number }>>([]);

  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#FFD700', '#FFA500', '#FF6347', '#4169E1', '#32CD32', '#FF1493'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2
      }));
      setPieces(newPieces);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 opacity-0"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            backgroundColor: piece.color,
            animation: `confettiFall ${piece.duration}s ease-out ${piece.delay}s forwards`,
            transform: 'rotate(0deg)'
          }}
        />
      ))}
      
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export const Fireworks: React.FC<ConfettiProps> = ({ active }) => {
  const [bursts, setBursts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (active) {
      const newBursts = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 40,
        delay: i * 0.3
      }));
      setBursts(newBursts);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute w-2 h-2"
          style={{
            left: `${burst.x}%`,
            top: `${burst.y}%`,
            animation: `fireworkBurst 1s ease-out ${burst.delay}s forwards`
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-gradient-to-b from-[#FFD700] to-transparent"
              style={{
                transformOrigin: 'bottom center',
                transform: `rotate(${i * 30}deg)`,
                opacity: 0,
                animation: `particleExpand 0.8s ease-out ${burst.delay}s forwards`
              }}
            />
          ))}
        </div>
      ))}
      
      <style>{`
        @keyframes fireworkBurst {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes particleExpand {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-60px) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
