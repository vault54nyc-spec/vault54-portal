import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  role: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "VAULT54 is unlike anything I've experienced. The level of sophistication combined with genuine authenticity creates an atmosphere where you can truly be yourself.",
    role: "Finance Executive, Manhattan",
    rating: 5
  },
  {
    quote: "Finally, a space that understands discretion without compromising on experience. Every detail is thoughtfully curated.",
    role: "Tech Entrepreneur, Brooklyn",
    rating: 5
  },
  {
    quote: "The vetting process ensures you're surrounded by accomplished, like-minded individuals. It's a game-changer for meaningful connections.",
    role: "Creative Director, Chelsea",
    rating: 5
  },
  {
    quote: "VAULT54 strikes the perfect balance between elegance and openness. This is what luxury nightlife should be.",
    role: "Physician, Upper East Side",
    rating: 5
  },
  {
    quote: "The production value and attention to detail at every event is phenomenal. You can tell this is made by our community, for our community.",
    role: "Attorney, Tribeca",
    rating: 5
  }
];

export const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl text-white mb-6 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        What Members Are Saying
      </h3>
      
      <div className="relative min-h-[200px] flex items-center">
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-full hover:border-[#D4AF37]/60 transition-all z-10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-[#D4AF37]" />
        </button>

        <div className={`flex-1 px-8 md:px-12 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex justify-center mb-4">
            {[...Array(current.rating)].map((_, i) => (
              <span key={i} className="text-[#D4AF37] text-2xl">★</span>
            ))}
          </div>
          
          <blockquote className="text-white text-center text-lg md:text-xl mb-4 leading-relaxed italic" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            "{current.quote}"
          </blockquote>
          
          <p className="text-gray-400 text-center text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            — {current.role}
          </p>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-full hover:border-[#D4AF37]/60 transition-all z-10"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex 
                ? 'bg-[#D4AF37] w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};