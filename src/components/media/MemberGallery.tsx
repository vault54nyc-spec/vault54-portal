import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ArtisticImage } from './ArtisticImage';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  description?: string;
}

// Cloudflare R2 bucket URL
// const R2_BASE_URL = 'https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev';

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 9,
    src: `/gallery-9.webp`,
    alt: 'Intimate artistic photography',
    description: 'Exclusive member content showcasing intimate moments'
  },
  {
    id: 10,
    src: `/gallery-10.webp`,
    alt: 'Artistic nude embrace',
    description: 'Fine art photography celebrating the male form'
  },
  {
    id: 11,
    src: `/gallery-11.webp`,
    alt: 'Locker room lifestyle',
    description: 'Behind the scenes of VAULT54 member spaces'
  },
  {
    id: 12,
    src: `/gallery-12.webp`,
    alt: 'Lifestyle photography',
    description: 'Authentic moments from our exclusive community'
  },
  {
    id: 13,
    src: `/gallery-13.webp`,
    alt: 'Artistic portraiture collection',
    description: 'Curated fine art photography'
  },
];

export function MemberGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(GALLERY_IMAGES[index].id);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Gallery Header */}
      <div className="text-center space-y-2">
        <h2 className="text-white font-['Cinzel'] text-2xl md:text-3xl tracking-[0.15em]">
          MEMBERS GALLERY
        </h2>
        <p className="text-white/60 text-sm">
          Exclusive artistic photography for VAULT54 members
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
      </div>

      {/* Main Carousel */}
      <div className="relative">
        {/* Current Image */}
        <div className="aspect-video md:aspect-[16/10] relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
          <ArtisticImage
            src={GALLERY_IMAGES[currentIndex].src}
            alt={GALLERY_IMAGES[currentIndex].alt}
            defaultBlurred={true}
            className="w-full h-full"
          />
          
          {/* Description Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
            <p className="text-white font-['Cinzel'] tracking-wider">
              {GALLERY_IMAGES[currentIndex].description}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-xl border border-[#D4AF37]/30 text-white rounded-full hover:bg-black/80 hover:border-[#D4AF37]/60 transition-all flex items-center justify-center"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-xl border border-[#D4AF37]/30 text-white rounded-full hover:bg-black/80 hover:border-[#D4AF37]/60 transition-all flex items-center justify-center"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {GALLERY_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-[#D4AF37] w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {GALLERY_IMAGES.map((image, index) => (
          <button
            key={image.id}
            onClick={() => handleImageClick(index)}
            className={`aspect-square relative rounded-lg overflow-hidden border transition-all ${
              index === currentIndex
                ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105'
                : 'border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:scale-105'
            }`}
          >
            <ArtisticImage
              src={image.src}
              alt={image.alt}
              defaultBlurred={true}
              className="w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-12 h-12 bg-black/70 backdrop-blur-xl border border-[#D4AF37]/30 text-white rounded-full hover:bg-black/80 hover:border-[#D4AF37]/60 transition-all flex items-center justify-center z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="max-w-7xl max-h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <ArtisticImage
              src={GALLERY_IMAGES[currentIndex].src}
              alt={GALLERY_IMAGES[currentIndex].alt}
              defaultBlurred={false}
              className="rounded-2xl max-h-[90vh]"
            />

            {/* Lightbox Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-xl border border-[#D4AF37]/30 text-white rounded-full hover:bg-black/80 hover:border-[#D4AF37]/60 transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 backdrop-blur-xl border border-[#D4AF37]/30 text-white rounded-full hover:bg-black/80 hover:border-[#D4AF37]/60 transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
