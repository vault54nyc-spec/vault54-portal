import React from 'react';
import { X } from 'lucide-react';

interface FrostedGlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const FrostedGlassModal: React.FC<FrostedGlassModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md animate-in zoom-in-95 duration-300">
        {/* Holographic glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 via-purple-500/10 to-blue-500/10 blur-xl" />
        
        <div className="
          relative
          bg-black/60
          backdrop-blur-2xl 
          border border-[#D4AF37]/30
          rounded-2xl
          shadow-[0_0_40px_rgba(212,175,55,0.3)]
          p-8
        " style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4 
              text-white/60 
              hover:text-white 
              transition-colors
            "
          >
            <X size={24} />
          </button>

          {/* Title - Made larger */}
          <h2 className="text-white text-center mb-8 text-3xl drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {title}
          </h2>

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};