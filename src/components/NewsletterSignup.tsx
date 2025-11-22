import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter signup:', email);
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#167D7F]/20 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <Mail className="w-6 h-6 text-[#D4AF37]" />
        <h3 className="text-2xl md:text-3xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Stay in the Loop
        </h3>
      </div>

      <p className="text-white mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Get early access to event announcements, exclusive updates, and member-only content.
      </p>

      {isSubmitted ? (
        <div className="bg-[#167D7F]/20 border border-[#167D7F]/40 rounded-lg p-4 text-center">
          <p className="text-[#167D7F]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            ✓ Thank you! You're on the list.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#D4AF37]/20 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Subscribe
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}

      <p className="text-gray-400 text-xs mt-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        We respect your privacy. Unsubscribe at any time. No spam, ever.
      </p>
    </div>
  );
};