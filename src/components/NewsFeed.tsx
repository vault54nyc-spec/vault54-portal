import React from 'react';
import { ExternalLink, TrendingUp } from 'lucide-react';

interface NewsItem {
  title: string;
  source: string;
  category: string;
  url: string;
  excerpt: string;
}

const newsItems: NewsItem[] = [
  {
    title: "The Evolution of Queer Nightlife in NYC",
    source: "Into Magazine",
    category: "Culture",
    url: "#",
    excerpt: "How a new generation is reshaping inclusive spaces for LGBTQ+ professionals"
  },
  {
    title: "Pride Beyond June: Building Year-Round Community",
    source: "Gay Times",
    category: "Community",
    url: "#",
    excerpt: "The importance of sustained engagement and authentic connection"
  },
  {
    title: "The Rise of Sex-Positive Spaces",
    source: "Queerty",
    category: "Lifestyle",
    url: "#",
    excerpt: "Understanding the movement toward judgment-free, inclusive experiences"
  },
  {
    title: "Luxury Events Meet Authentic Expression",
    source: "Out Magazine",
    category: "Events",
    url: "#",
    excerpt: "How high-end experiences are embracing authenticity and diversity"
  },
  {
    title: "Brooklyn's New Wave of Exclusive Venues",
    source: "Time Out",
    category: "Nightlife",
    url: "#",
    excerpt: "Exploring the borough's sophisticated approach to after-dark culture"
  },
  {
    title: "The Importance of Discretion in Modern Dating",
    source: "The Advocate",
    category: "Relationships",
    url: "#",
    excerpt: "Balancing privacy with authentic connection in the digital age"
  }
];

export const NewsFeed: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
        <h3 className="text-2xl md:text-3xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Community News & Culture
        </h3>
      </div>

      <p className="text-gray-300 mb-6 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Curated stories from leading LGBTQ+ lifestyle and culture publications
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {newsItems.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-black/30 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl p-5 hover:border-[#D4AF37]/50 hover:bg-black/40 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className="px-2 py-1 bg-[#167D7F]/20 text-[#167D7F] text-xs rounded border border-[#167D7F]/30" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {item.category}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#D4AF37] transition-colors flex-shrink-0" />
            </div>

            <h4 className="text-white mb-2 group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {item.title}
            </h4>

            <p className="text-gray-400 text-sm mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {item.excerpt}
            </p>

            <div className="text-xs text-gray-500" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {item.source}
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Articles are curated from trusted LGBTQ+ media sources and updated regularly
        </p>
      </div>
    </div>
  );
};