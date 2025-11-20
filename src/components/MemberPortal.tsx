import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FrostedGlassButton } from './FrostedGlassButton';

interface MemberPortalProps {
  onLogout: () => void;
}

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  price: number;
  status: 'available' | 'soldout' | 'upcoming';
  image: string;
}

export const MemberPortal: React.FC<MemberPortalProps> = ({ onLogout }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const memberNumber = 'V54-M001';
  const referralCode = 'VLT-R' + Math.floor(Math.random() * 9000 + 1000);

  const events: Event[] = [
    {
      id: 1,
      name: 'When in Rome',
      date: 'MARCH 29, 2026',
      time: '10 PM - 4 AM',
      venue: 'Hacienda Brooklyn',
      description: 'Inaugural Roman Bacchanal launch event. An immersive experience of opulence, indulgence, and connection.',
      price: 125,
      status: 'available',
      image: '🏛️'
    },
    {
      id: 2,
      name: 'Midnight in Paris',
      date: 'SPRING 2026',
      time: 'DATE TBA',
      venue: 'Location TBA',
      description: 'A celebration of Belle Époque elegance, art, and sensuality in the City of Light.',
      price: 0,
      status: 'upcoming',
      image: '🌙'
    },
    {
      id: 3,
      name: 'Venetian Masquerade',
      date: 'SUMMER 2026',
      time: 'DATE TBA',
      venue: 'Location TBA',
      description: 'Mystery, intrigue, and elegance behind the mask. A night of sophisticated indulgence.',
      price: 0,
      status: 'upcoming',
      image: '🎭'
    }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert(`✓ Referral code copied to clipboard!\n\n${referralCode}`);
  };

  return (
    <div className="fixed inset-0 bg-black text-white overflow-y-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/30 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl md:text-2xl tracking-[0.3em] text-[#D4AF37]">VAULT54</div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="px-3 md:px-4 py-1 md:py-2 rounded bg-[#167D7F]/20 backdrop-blur-md text-[#167D7F] text-xs md:text-sm border border-[#167D7F]/30">
              {memberNumber}
            </span>
            <button
              onClick={onLogout}
              className="px-3 md:px-4 py-2 bg-black/30 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] rounded text-sm transition-all duration-300 hover:bg-black/40 hover:border-[#D4AF37]/80 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative text-center py-12 md:py-16 border-b border-[#D4AF37]/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl text-[#D4AF37] mb-4">Welcome to Your Portal</h1>
          <p className="text-gray-400 tracking-widest">VIRTUS ET DISCRETIO</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Upcoming Events */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl text-[#D4AF37] mb-6 md:mb-8 pb-4 border-b border-[#D4AF37]/20">
            Upcoming Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 hover:shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all cursor-pointer"
              >
                {/* Event Image */}
                <div className="h-48 bg-gradient-to-br from-[#D4AF37]/30 to-[#167D7F]/30 flex items-center justify-center text-6xl">
                  {event.image}
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <div className="text-[#D4AF37] text-sm mb-2 tracking-wider">{event.date} • {event.time}</div>
                  <h3 className="text-xl md:text-2xl text-white mb-2">{event.name}</h3>
                  <div className="text-gray-400 text-sm mb-4">{event.venue}</div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{event.description}</p>
                  
                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="text-[#D4AF37] text-xl">
                      {event.price > 0 ? `$${event.price}` : 'TBA'}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${
                      event.status === 'available' 
                        ? 'bg-[#167D7F]/20 text-[#167D7F]'
                        : event.status === 'soldout'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                    }`}>
                      {event.status === 'available' ? 'TICKETS AVAILABLE' : 
                       event.status === 'soldout' ? 'SOLD OUT' : 'COMING SOON'}
                    </div>
                  </div>

                  {event.status === 'available' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('Proceeding to secure checkout...');
                      }}
                      className="w-full mt-4 bg-black/30 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] py-3 rounded-lg transition-all duration-300 hover:bg-black/40 hover:border-[#D4AF37]/80 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] uppercase tracking-wider"
                    >
                      PURCHASE TICKET
                    </button>
                  )}
                  
                  {event.status === 'upcoming' && (
                    <button
                      disabled
                      className="w-full mt-4 bg-black/20 backdrop-blur-md border border-gray-600/30 text-gray-500 py-3 rounded-lg cursor-not-allowed uppercase tracking-wider"
                    >
                      TICKETS NOT YET AVAILABLE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Referral Code Section */}
        <section className="mb-12 bg-gradient-to-br from-[#D4AF37]/10 to-[#167D7F]/10 border border-[#D4AF37]/30 rounded-xl p-6 md:p-8 text-center">
          <h3 className="text-2xl md:text-3xl text-[#D4AF37] mb-4">Share VAULT54</h3>
          <p className="text-gray-300 mb-6">
            Help grow our community by referring accomplished professionals who align with our values.
          </p>
          <div className="bg-black/50 border-2 border-dashed border-[#D4AF37] rounded-xl p-6 inline-block">
            <div className="text-gray-400 text-sm mb-2">YOUR REFERRAL CODE</div>
            <div className="text-3xl text-[#D4AF37] tracking-widest mb-4">{referralCode}</div>
            <button
              onClick={copyReferralCode}
              className="px-6 py-3 bg-black/30 backdrop-blur-xl border border-[#167D7F]/40 text-[#167D7F] rounded-lg transition-all duration-300 hover:bg-black/40 hover:border-[#167D7F]/80 hover:shadow-[0_0_30px_rgba(22,125,127,0.4)] uppercase tracking-wider"
            >
              📋 COPY CODE
            </button>
          </div>
          <p className="text-gray-400 mt-6 text-sm">
            Share this code with potential members. They'll need it to complete their application.
          </p>
        </section>

        {/* Information Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl p-6">
            <h3 className="text-xl text-[#D4AF37] mb-4">Member Benefits</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Priority access to all VAULT54 events</li>
              <li>• Exclusive member-only gatherings</li>
              <li>• Referral rewards program</li>
              <li>• Guest approval privileges</li>
              <li>• Early bird ticket pricing</li>
              <li>• Access to private member forum</li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl p-6">
            <h3 className="text-xl text-[#D4AF37] mb-4">Event Policies</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• All tickets are 50% non-refundable</li>
              <li>• Photography strictly by professional only</li>
              <li>• Absolute discretion is required</li>
              <li>• Dress code: Theme appropriate</li>
              <li>• Zero tolerance for harassment</li>
              <li>• What happens at VAULT54 stays at VAULT54</li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl p-6">
            <h3 className="text-xl text-[#D4AF37] mb-4">Community Guidelines</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Respect all members' privacy and discretion</li>
              <li>• Consent is paramount in all interactions</li>
              <li>• No recording or photography without permission</li>
              <li>• Professional conduct at all times</li>
              <li>• Report any concerns to staff immediately</li>
              <li>• Maintain the quality and integrity of our society</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-[#D4AF37]/40 rounded-2xl p-6 md:p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl text-[#D4AF37]">{selectedEvent.name}</h2>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 block mb-1">Date</span>
                  <span className="text-white">{selectedEvent.date}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 block mb-1">Time</span>
                  <span className="text-white">{selectedEvent.time}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 block mb-1">Venue</span>
                  <span className="text-white">{selectedEvent.venue}</span>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400 block mb-1">Price</span>
                  <span className="text-[#D4AF37] text-xl">
                    {selectedEvent.price > 0 ? `$${selectedEvent.price}` : 'TBA'}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg">
                <h4 className="text-[#D4AF37] mb-2">Payment Terms</h4>
                <p className="text-gray-300 text-sm">
                  50% non-refundable deposit required to secure your ticket. Balance due 7 days before event.
                </p>
              </div>

              {selectedEvent.status === 'available' && (
                <button
                  onClick={() => {
                    alert('🎟️ Proceeding to secure checkout...');
                    setSelectedEvent(null);
                  }}
                  className="w-full bg-black/30 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] py-4 rounded-lg transition-all duration-300 hover:bg-black/40 hover:border-[#D4AF37]/80 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] uppercase tracking-wider text-lg"
                >
                  PROCEED TO CHECKOUT
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
