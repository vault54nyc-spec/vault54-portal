import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CostumeCategory {
  name: string;
  suggestions: string[];
  tips: string[];
}

interface EventTheme {
  name: string;
  icon: string;
  description: string;
  categories: CostumeCategory[];
}

const costumeGuides: EventTheme[] = [
  {
    name: "When in Rome",
    icon: "🏛️",
    description: "Channel ancient Roman opulence and sensuality",
    categories: [
      {
        name: "Classic Roman",
        suggestions: [
          "Toga with gold accents",
          "Gladiator-inspired harness",
          "Laurel crown headpiece",
          "Roman sandals or boots"
        ],
        tips: [
          "White fabrics with gold trim work best",
          "Don't forget the accessories - they make the look",
          "Comfort is key for a 6-hour event"
        ]
      },
      {
        name: "Imperial Luxury",
        suggestions: [
          "Purple and gold robes",
          "Statement jewelry and arm cuffs",
          "Decorative chest pieces",
          "Jeweled sandals"
        ],
        tips: [
          "Purple was the color of Roman royalty",
          "Layer accessories for maximum impact",
          "Metallic body paint adds drama"
        ]
      },
      {
        name: "Warrior Aesthetic",
        suggestions: [
          "Leather harness and straps",
          "Gladiator helmet or arm guards",
          "Military-style sandals",
          "Minimal but impactful pieces"
        ],
        tips: [
          "Less is more with this look",
          "Focus on one statement piece",
          "Make sure everything is secure for dancing"
        ]
      }
    ]
  },
  {
    name: "Venetian Masquerade",
    icon: "🎭",
    description: "Mystery and elegance behind ornate masks",
    categories: [
      {
        name: "Classic Venetian",
        suggestions: [
          "Ornate masquerade mask",
          "Velvet or brocade jacket",
          "Period-appropriate accessories",
          "Elegant dress shoes"
        ],
        tips: [
          "Your mask is the centerpiece",
          "Rich fabrics elevate the look",
          "Don't forget gloves for authenticity"
        ]
      }
    ]
  }
];

export const CostumeRecommendations: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const theme = costumeGuides[selectedTheme];

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-[#D4AF37]" />
        <h3 className="text-2xl md:text-3xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Costume Inspiration
        </h3>
      </div>

      {/* Theme Selector */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {costumeGuides.map((guide, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTheme(idx)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedTheme === idx
                ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#D4AF37]'
                : 'bg-black/30 border border-white/20 text-white hover:border-[#D4AF37]/40'
            }`}
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            <span className="mr-2">{guide.icon}</span>
            {guide.name}
          </button>
        ))}
      </div>

      {/* Theme Description */}
      <div className="mb-6 p-4 bg-gradient-to-r from-[#D4AF37]/10 to-[#167D7F]/10 border-l-4 border-[#D4AF37] rounded">
        <p className="text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          {theme.description}
        </p>
      </div>

      {/* Costume Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {theme.categories.map((category, idx) => (
          <div key={idx} className="bg-black/30 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl p-5">
            <h4 className="text-xl text-[#D4AF37] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {category.name}
            </h4>
            
            <div className="mb-4">
              <p className="text-white text-sm mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Suggestions:
              </p>
              <ul className="space-y-1">
                {category.suggestions.map((suggestion, sidx) => (
                  <li key={sidx} className="text-gray-300 text-sm flex gap-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    <span className="text-[#D4AF37]">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-white text-sm mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Pro Tips:
              </p>
              <ul className="space-y-1">
                {category.tips.map((tip, tidx) => (
                  <li key={tidx} className="text-gray-400 text-xs flex gap-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    <span className="text-[#167D7F]">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Shopping Resources */}
      <div className="mt-6 p-4 bg-black/30 rounded-lg border border-[#D4AF37]/20">
        <p className="text-sm text-gray-300 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          💡 <strong className="text-[#D4AF37]">Need Help?</strong> Check our Instagram (@vaultfiftyfour) for costume inspiration posts and vendor recommendations
        </p>
      </div>
    </div>
  );
};