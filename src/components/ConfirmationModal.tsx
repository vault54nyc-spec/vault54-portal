import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  confirmText?: string;
  type?: 'success' | 'info' | 'warning';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  confirmText = 'OK',
  type = 'success'
}) => {
  if (!isOpen) return null;

  const getGradientColors = () => {
    switch (type) {
      case 'success':
        return 'from-[#D4AF37]/30 to-[#D4AF37]/10';
      case 'warning':
        return 'from-yellow-500/30 to-yellow-500/10';
      case 'info':
        return 'from-[#167D7F]/30 to-[#167D7F]/10';
      default:
        return 'from-[#D4AF37]/30 to-[#D4AF37]/10';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return 'border-[#D4AF37]/60';
      case 'warning':
        return 'border-yellow-500/60';
      case 'info':
        return 'border-[#167D7F]/60';
      default:
        return 'border-[#D4AF37]/60';
    }
  };

  const getButtonColors = () => {
    switch (type) {
      case 'success':
        return 'bg-[#D4AF37]/20 border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]';
      case 'warning':
        return 'bg-yellow-500/20 border-yellow-500/60 text-yellow-400 hover:bg-yellow-500/30 hover:shadow-[0_0_30px_rgba(234,179,8,0.6)]';
      case 'info':
        return 'bg-[#167D7F]/20 border-[#167D7F]/60 text-[#167D7F] hover:bg-[#167D7F]/30 hover:shadow-[0_0_30px_rgba(22,125,127,0.6)]';
      default:
        return 'bg-[#D4AF37]/20 border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative max-w-md w-full bg-gradient-to-br ${getGradientColors()} backdrop-blur-2xl border-2 ${getBorderColor()} rounded-2xl p-8 shadow-[0_0_80px_rgba(212,175,55,0.4)] animate-in zoom-in-95 duration-300`}
        style={{
          animation: 'modalPulse 2s ease-in-out infinite'
        }}
      >
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent rounded-2xl blur-xl" />
        
        <div className="relative z-10">
          {title && (
            <h3 
              className="text-2xl text-white mb-4 text-center font-bold"
              style={{ textShadow: '0 0 30px rgba(212,175,55,0.8), 0 0 60px rgba(212,175,55,0.4)' }}
            >
              {title}
            </h3>
          )}
          
          <p className="text-white text-center mb-6 leading-relaxed text-lg whitespace-pre-line">
            {message}
          </p>
          
          <button
            onClick={onClose}
            className={`w-full py-4 px-6 rounded-xl border-2 ${getButtonColors()} transition-all duration-300 uppercase tracking-widest font-bold text-lg`}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalPulse {
          0%, 100% {
            box-shadow: 0 0 80px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2);
          }
          50% {
            box-shadow: 0 0 120px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3);
          }
        }
      `}</style>
    </div>
  );
};