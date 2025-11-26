import React from 'react';
import { Instagram } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock Instagram posts - in production, these would come from Instagram API
const instagramPosts = [
  {
    id: 1,
    image: 'site-assets/phonto+40.webp',
    likes: 234,
    caption: 'Countdown to When in Rome 🏛️✨'
  },
  {
    id: 2,
    image: 'site-assets/Jocks.webp',
    likes: 189,
    caption: 'The VAULT54 aesthetic 💫'
  },
  {
    id: 3,
    image: 'site-assets/Main+Squeeze+Nate+DeRidder+Gay+Erotic+Art+Homoerotic+Paiting+Nude+Men+Muscle+Jock.webp',
    likes: 312,
    caption: 'Artistry meets authenticity'
  },
  {
    id: 4,
    image: 'site-assets/images.jpeg',
    likes: 267,
    caption: 'Community vibes ✨'
  },
  {
    id: 5,
    image: 'site-assets/Nate+DeRidder+gay+erotic+art+mucsle+jock+men+gay+porn+artwork+painting+interracial+couple.webp',
    likes: 298,
    caption: 'Celebrating connection'
  },
  {
    id: 6,
    image: 'site-assets/images (1).jpeg',
    likes: 221,
    caption: 'Where sophistication meets authenticity'
  }
];

export const InstagramFeed: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Instagram className="w-6 h-6 text-[#D4AF37]" />
          <h3 className="text-2xl md:text-3xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Follow Us on Instagram
          </h3>
        </div>
        <a
          href="https://instagram.com/vaultfiftyfour"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          @vaultfiftyfour
        </a>
      </div>

      <p className="text-gray-300 mb-6 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Get the latest updates, event previews, and community highlights
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href="https://instagram.com/vaultfiftyfour"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all"
          >
            <ImageWithFallback
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
              <Instagram className="w-8 h-8 text-white mb-2" />
              <p className="text-white text-sm text-center mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {post.caption}
              </p>
              <p className="text-gray-300 text-xs" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                ❤️ {post.likes} likes
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://instagram.com/vaultfiftyfour"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-black/30 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg hover:bg-black/40 hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          View Full Gallery →
        </a>
      </div>
    </div>
  );
};