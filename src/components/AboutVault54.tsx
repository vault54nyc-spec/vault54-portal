import React from 'react';

export const AboutVault54: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Video Header */}
      <div className="relative h-96 overflow-hidden border-b border-[#D4AF37]/30">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/Vault%20Logo%20and%20Artwork.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <h1 
          className="text-4xl md:text-5xl text-[#D4AF37] text-center mb-8"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          About VAULT54
        </h1>

        <div 
          className="space-y-6 text-lg text-gray-300 leading-relaxed"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          <p>
            VAULT54 is an exclusive members-only society dedicated to creating extraordinary experiences 
            for accomplished professionals who value discretion, connection, and indulgence.
          </p>

          <p>
            Founded on the principles of <span className="text-[#D4AF37] italic">Virtus et Discretio</span> 
            {' '}(Valor and Discretion), we curate immersive themed events that transport members to different 
            eras and cultures—from Roman Bacchanals to Parisian Belle Époque soirées.
          </p>

          <p className="text-[#D4AF37] text-xl italic text-center py-6">
            At VAULT54, we believe no one should be omitted from having access to discretion. 
            We welcome individuals and couples who share our values of respect, consent, and sophistication.
          </p>

          <p>
            Our community is built on mutual respect and shared appreciation for life's finer pleasures. 
            Whether attending solo or as a couple, every member is embraced as part of our extended family—a 
            network of like-minded individuals seeking meaningful connections in an environment of absolute trust.
          </p>

          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 my-8">
            <h2 
              className="text-2xl text-[#D4AF37] mb-4"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Our Values
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">✦</span>
                <span><strong>Discretion:</strong> What happens at VAULT54 stays at VAULT54</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">✦</span>
                <span><strong>Inclusivity:</strong> Welcoming individuals and couples of all backgrounds</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">✦</span>
                <span><strong>Consent:</strong> Respect and boundaries are paramount</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">✦</span>
                <span><strong>Excellence:</strong> Curated experiences that exceed expectations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">✦</span>
                <span><strong>Community:</strong> A network of accomplished, like-minded professionals</span>
              </li>
            </ul>
          </div>

          <p>
            Membership is by application only, with each candidate carefully reviewed to ensure 
            alignment with our community's values. We seek individuals who bring authenticity, 
            respect, and genuine interest in building meaningful connections.
          </p>

          <div className="text-center pt-8">
            <p className="text-[#D4AF37] text-2xl" style={{ fontFamily: 'Cinzel, serif' }}>
              VIRTUS ET DISCRETIO
            </p>
            <p className="text-gray-400 mt-2">Valor and Discretion</p>
          </div>
        </div>
      </div>
    </div>
  );
};
