import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  eventName: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, eventName }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 text-center">
      <h3 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        {eventName}
      </h3>
      <p className="text-gray-300 mb-6 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Countdown to Our Inaugural Event
      </p>
      
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item, idx) => (
          <div key={idx} className="bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl p-3 md:p-4">
            <div className="text-3xl md:text-5xl text-white mb-1 md:mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm text-[#D4AF37] uppercase tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-gray-400 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        🏛️ March 29, 2026 • Hacienda Brooklyn
      </div>
    </div>
  );
};