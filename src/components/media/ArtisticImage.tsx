import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ArtisticImageProps {
  src: string;
  alt: string;
  defaultBlurred?: boolean;
  requiresMembership?: boolean;
  className?: string;
  onUnblur?: () => void;
}

export function ArtisticImage({
  src,
  alt,
  defaultBlurred = true,
  requiresMembership = false,
  className = '',
  onUnblur,
}: ArtisticImageProps) {
  const [isBlurred, setIsBlurred] = useState(defaultBlurred);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggleBlur = () => {
    if (isBlurred && onUnblur) {
      onUnblur();
    }
    setIsBlurred(!isBlurred);
  };

  // Determine image source (prefer WebP, fallback to PNG)
  const imageSrc = src.endsWith('.png') ? src : src;
  const webpSrc = imageSrc.replace('.png', '.webp');
  
  return (
    <div className={`relative group overflow-hidden ${className}`}>
      {/* Image with optional blur */}
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isBlurred ? 'blur-[20px] scale-110' : 'blur-0 scale-100'
          } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      </picture>

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xl flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Blur toggle button */}
      {!isLoading && (
        <button
          onClick={handleToggleBlur}
          className="absolute bottom-4 right-4 px-4 py-2 bg-black/70 backdrop-blur-xl border border-[#D4AF37]/30 text-white rounded-lg hover:bg-black/80 hover:border-[#D4AF37]/60 transition-all flex items-center gap-2 opacity-0 group-hover:opacity-100"
        >
          {isBlurred ? (
            <>
              <Eye className="w-4 h-4" />
              <span className="text-sm">View</span>
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4" />
              <span className="text-sm">Hide</span>
            </>
          )}
        </button>
      )}

      {/* Membership overlay for restricted content */}
      {requiresMembership && isBlurred && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-center space-y-3 p-6">
            <div className="w-16 h-16 mx-auto border-2 border-[#D4AF37] rounded-full flex items-center justify-center">
              <Eye className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="text-white font-['Cinzel'] tracking-wider">MEMBERS ONLY</h3>
            <p className="text-white/60 text-sm max-w-xs">
              Exclusive content for VAULT54 members
            </p>
          </div>
        </div>
      )}

      {/* Hover preview (reduce blur slightly) */}
      {isBlurred && !requiresMembership && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-full object-cover blur-[5px]"
              loading="lazy"
            />
          </picture>
        </div>
      )}
    </div>
  );
}
