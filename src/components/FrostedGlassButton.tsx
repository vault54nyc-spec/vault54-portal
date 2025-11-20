import React from 'react';

interface FrostedGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const FrostedGlassButton: React.FC<FrostedGlassButtonProps> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-12 py-4 
        bg-black/60 
        backdrop-blur-2xl 
        border border-[#D4AF37]/30
        rounded-lg
        text-white
        tracking-wider
        uppercase
        transition-all duration-300
        hover:border-[#D4AF37]/50
        hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]
        active:scale-95
        ${className}
      `}
      style={{ fontFamily: 'Cormorant Garamond, serif' }}
    >
      {children}
    </button>
  );
};