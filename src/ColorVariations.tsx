import React, { useState } from 'react';

export default function ColorVariations() {
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);

  const variations = [
    // White text with gold trimmings - different fonts
    {
      name: "Cinzel",
      font: "'Cinzel', serif",
      description: "Classic Roman serif",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Montserrat",
      font: "'Montserrat', sans-serif",
      description: "Modern luxury sans",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Raleway",
      font: "'Raleway', sans-serif",
      description: "Elegant thin sans",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Playfair Display",
      font: "'Playfair Display', serif",
      description: "High fashion serif",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Outfit",
      font: "'Outfit', sans-serif",
      description: "Modern geometric",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Inter",
      font: "'Inter', sans-serif",
      description: "Clean tech sans",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Bodoni Moda",
      font: "'Bodoni Moda', serif",
      description: "Editorial luxury",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Cormorant",
      font: "'Cormorant Garamond', serif",
      description: "Elegant book serif",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Poppins",
      font: "'Poppins', sans-serif",
      description: "Friendly geometric",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Space Grotesk",
      font: "'Space Grotesk', sans-serif",
      description: "Tech aesthetic",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Libre Baskerville",
      font: "'Libre Baskerville', serif",
      description: "Classic serif",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Lato",
      font: "'Lato', sans-serif",
      description: "Professional clean",
      bg: "bg-black/60",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    // Variations with slightly lighter/darker backgrounds
    {
      name: "Montserrat Light",
      font: "'Montserrat', sans-serif",
      description: "Lighter glass",
      bg: "bg-black/50",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Raleway Light",
      font: "'Raleway', sans-serif",
      description: "Lighter glass",
      bg: "bg-black/50",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Montserrat Dark",
      font: "'Montserrat', sans-serif",
      description: "Darker glass",
      bg: "bg-black/70",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
    {
      name: "Raleway Dark",
      font: "'Raleway', sans-serif",
      description: "Darker glass",
      bg: "bg-black/70",
      text: "text-white",
      border: "border-[#D4AF37]/30",
      glow: "hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Video Background */}
      <div className="fixed inset-0 bg-black">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/Copy%20of%20Jersey.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8 bg-black/60 backdrop-blur-2xl border border-[#D4AF37]/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <h1 className="text-white text-center mb-2 tracking-wider">WHITE TEXT + GOLD TRIMMINGS</h1>
          <p className="text-white/60 text-center">Click any variation to preview fullscreen</p>
        </div>

        {/* Grid of variations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {variations.map((variation, index) => (
            <button
              key={index}
              onClick={() => setSelectedVariation(index)}
              className="group relative"
            >
              <div className={`${variation.bg} backdrop-blur-2xl border ${variation.border} rounded-2xl p-6 space-y-4 hover:scale-105 transition-all ${variation.glow}`}>
                {/* Variation Name */}
                <div className="text-center">
                  <h2 className={`${variation.text} tracking-[0.15em] uppercase text-sm mb-1`} style={{ fontFamily: variation.font }}>
                    {variation.name}
                  </h2>
                  <p className="text-white/50 text-xs">{variation.description}</p>
                </div>

                {/* Logo Preview */}
                <div className="flex justify-center">
                  <img
                    src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/vault54-logo.gif"
                    alt="VAULT54 Logo"
                    className="w-32 h-auto"
                  />
                </div>

                {/* Sample Text */}
                <div className={`${variation.text} text-center tracking-[0.2em] uppercase text-xs`} style={{ fontFamily: variation.font }}>
                  VIRTUS ET DISCRETIO
                </div>

                {/* Sample Button */}
                <div className="flex justify-center">
                  <div className={`px-4 py-2 ${variation.bg} backdrop-blur-xl border ${variation.border} rounded-lg ${variation.text} tracking-wider uppercase text-xs ${variation.glow}`} style={{ fontFamily: variation.font }}>
                    REQUEST ACCESS
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex gap-3 justify-center">
                  <div className={`px-3 py-2 ${variation.bg} backdrop-blur-xl border ${variation.border} rounded-lg ${variation.glow}`}>
                    <div className={`${variation.text} text-lg mb-1`} style={{ fontFamily: variation.font }}>62+</div>
                    <div className="text-white/60 text-xs tracking-wider" style={{ fontFamily: variation.font }}>MEMBERS</div>
                  </div>
                  <div className={`px-3 py-2 ${variation.bg} backdrop-blur-xl border ${variation.border} rounded-lg ${variation.glow}`}>
                    <div className={`${variation.text} text-lg mb-1`} style={{ fontFamily: variation.font }}>93+</div>
                    <div className="text-white/60 text-xs tracking-wider" style={{ fontFamily: variation.font }}>APPLICANTS</div>
                  </div>
                </div>

                {/* Click to preview */}
                <div className="text-white/30 text-xs text-center group-hover:text-white/60 transition-colors">
                  Click to preview
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Fullscreen Preview Modal */}
        {selectedVariation !== null && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVariation(null)}
          >
            {/* Darker overlay for fullscreen */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setSelectedVariation(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white text-sm tracking-wider bg-black/50 backdrop-blur-xl px-4 py-2 rounded-lg border border-[#D4AF37]/30"
              >
                ✕ CLOSE
              </button>

              <div className={`${variations[selectedVariation].bg} backdrop-blur-2xl border ${variations[selectedVariation].border} rounded-3xl p-12 space-y-8 ${variations[selectedVariation].glow}`}>
                {/* Large Logo */}
                <div className="flex justify-center">
                  <img
                    src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/vault54-logo.gif"
                    alt="VAULT54 Logo"
                    className="w-64 md:w-80 lg:w-96 h-auto"
                  />
                </div>

                {/* Tagline */}
                <div className={`${variations[selectedVariation].text} text-center tracking-[0.3em] uppercase text-xl md:text-2xl`} style={{ fontFamily: variations[selectedVariation].font }}>
                  VIRTUS ET DISCRETIO
                </div>

                {/* Button */}
                <div className="flex justify-center">
                  <div className={`px-8 py-4 ${variations[selectedVariation].bg} backdrop-blur-xl border ${variations[selectedVariation].border} rounded-lg ${variations[selectedVariation].text} tracking-[0.2em] uppercase text-lg hover:border-[#D4AF37]/50 transition-all cursor-pointer ${variations[selectedVariation].glow}`} style={{ fontFamily: variations[selectedVariation].font }}>
                    REQUEST ACCESS
                  </div>
                </div>

                {/* Metrics */}
                <div className="flex gap-8 justify-center">
                  <div className={`px-8 py-4 ${variations[selectedVariation].bg} backdrop-blur-xl border ${variations[selectedVariation].border} rounded-lg ${variations[selectedVariation].glow}`}>
                    <div className={`${variations[selectedVariation].text} text-3xl mb-2`} style={{ fontFamily: variations[selectedVariation].font }}>62+</div>
                    <div className="text-white/60 tracking-wider" style={{ fontFamily: variations[selectedVariation].font }}>MEMBERS</div>
                  </div>
                  <div className={`px-8 py-4 ${variations[selectedVariation].bg} backdrop-blur-xl border ${variations[selectedVariation].border} rounded-lg ${variations[selectedVariation].glow}`}>
                    <div className={`${variations[selectedVariation].text} text-3xl mb-2`} style={{ fontFamily: variations[selectedVariation].font }}>93+</div>
                    <div className="text-white/60 tracking-wider" style={{ fontFamily: variations[selectedVariation].font }}>APPLICANTS</div>
                  </div>
                </div>

                {/* Sample Form */}
                <div className="space-y-4 max-w-md mx-auto mt-8">
                  <label className={`${variations[selectedVariation].text} tracking-wider uppercase text-center block`} style={{ fontFamily: variations[selectedVariation].font }}>
                    Access Code
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Investor/Membership Code"
                    className={`w-full px-4 py-3 ${variations[selectedVariation].bg} backdrop-blur-xl border ${variations[selectedVariation].border} rounded-lg ${variations[selectedVariation].text} text-center placeholder:text-white/40 focus:border-[#D4AF37]/50 transition-all ${variations[selectedVariation].glow}`}
                    style={{ fontFamily: variations[selectedVariation].font }}
                  />
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 justify-center mt-8">
                  <div className={`w-12 h-12 rounded-full ${variations[selectedVariation].bg} backdrop-blur-xl border ${variations[selectedVariation].border} flex items-center justify-center ${variations[selectedVariation].text} hover:border-[#D4AF37]/50 transition-all cursor-pointer ${variations[selectedVariation].glow}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${variations[selectedVariation].bg} backdrop-blur-xl border ${variations[selectedVariation].border} flex items-center justify-center ${variations[selectedVariation].text} hover:border-[#D4AF37]/50 transition-all cursor-pointer ${variations[selectedVariation].glow}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    </svg>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${variations[selectedVariation].bg} backdrop-blur-xl border ${variations[selectedVariation].border} flex items-center justify-center ${variations[selectedVariation].text} hover:border-[#D4AF37]/50 transition-all cursor-pointer ${variations[selectedVariation].glow}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                </div>

                {/* Font Info */}
                <div className="text-center pt-8 border-t border-[#D4AF37]/20">
                  <div className="text-white/70 text-sm mb-1">{variations[selectedVariation].name}</div>
                  <div className="text-white/50 text-xs">{variations[selectedVariation].description}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Bodoni+Moda:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Libre+Baskerville:wght@400;700&family=Lato:wght@300;400;700&display=swap');
      `}</style>
    </div>
  );
}