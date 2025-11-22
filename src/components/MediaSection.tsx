import React, { useState } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface MediaItem {
  type: 'video' | 'podcast';
  title: string;
  description: string;
  thumbnail?: string;
  url: string;
  duration?: string;
}

const mediaItems: MediaItem[] = [
  {
    type: 'video',
    title: 'Welcome to VAULT54',
    description: 'Discover what makes our community unique',
    url: 'https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/Copy%20of%20Jersey.mp4',
    duration: '2:30'
  },
  {
    type: 'video',
    title: 'When in Rome - Event Preview',
    description: 'A glimpse into our inaugural launch event',
    url: 'https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/Copy%20of%20Jersey.mp4',
    duration: '1:45'
  },
  {
    type: 'podcast',
    title: 'Food 4 Thot: Building Queer Spaces',
    description: 'Conversations on community and authenticity',
    url: '#',
    duration: '45:00'
  },
  {
    type: 'podcast',
    title: 'Getting Curious: Sex-Positive Culture',
    description: 'Jonathan Van Ness explores modern intimacy',
    url: '#',
    duration: '38:22'
  }
];

export const MediaSection: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8">
      <h3 className="text-2xl md:text-3xl text-white mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Media & Content
      </h3>

      <p className="text-gray-300 mb-6 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Videos, podcasts, and curated content about our community and culture
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediaItems.map((item, idx) => (
          <div
            key={idx}
            className="group bg-black/30 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all cursor-pointer"
            onClick={() => item.type === 'video' && setSelectedMedia(item)}
          >
            {/* Thumbnail/Preview */}
            <div className="relative aspect-video bg-gradient-to-br from-[#D4AF37]/20 to-[#167D7F]/20 flex items-center justify-center">
              {item.type === 'video' ? (
                <>
                  <Play className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-xs text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {item.duration}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-4xl">🎙️</div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-xs text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {item.duration}
                  </div>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs rounded uppercase" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {item.type}
                </span>
              </div>
              <h4 className="text-white mb-2 group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {item.title}
              </h4>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedMedia && selectedMedia.type === 'video' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-12 right-0 px-4 py-2 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg hover:bg-black/80 transition-all"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Close
            </button>
            
            <div className="relative bg-black rounded-xl overflow-hidden border border-[#D4AF37]/40">
              <video
                src={selectedMedia.url}
                autoPlay
                loop
                muted={isMuted}
                className="w-full"
              />
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 p-3 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg hover:bg-black/80 transition-all"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>

            <div className="mt-4 p-4 bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl">
              <h4 className="text-white text-xl mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {selectedMedia.title}
              </h4>
              <p className="text-gray-300" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {selectedMedia.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Spotify Playlists Section */}
      <div className="mt-8 pt-8 border-t border-[#D4AF37]/20">
        <h4 className="text-xl text-[#D4AF37] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Official Playlists
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl p-4 flex items-center gap-4 hover:border-[#D4AF37]/50 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/30 to-[#167D7F]/30 rounded-lg flex items-center justify-center text-2xl">
              🎵
            </div>
            <div>
              <h5 className="text-white mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                When in Rome: Event Mix
              </h5>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Deep house & classical fusion
              </p>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl p-4 flex items-center gap-4 hover:border-[#D4AF37]/50 transition-all cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/30 to-[#167D7F]/30 rounded-lg flex items-center justify-center text-2xl">
              🎵
            </div>
            <div>
              <h5 className="text-white mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                VAULT54: Signature Sounds
              </h5>
              <p className="text-gray-400 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Our curated vibes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};