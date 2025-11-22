import React, { useEffect, useRef } from 'react';

interface MemberQRCodeProps {
  memberId: string;
  memberName?: string;
}

export const MemberQRCode: React.FC<MemberQRCodeProps> = ({ memberId, memberName = 'Member' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Simple QR code representation (in production, use a proper QR library)
      // For now, we'll create a stylized placeholder that represents a QR code
      const size = 200;
      canvas.width = size;
      canvas.height = size;

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      // Create a grid pattern to simulate QR code
      const gridSize = 20;
      const cellSize = size / gridSize;
      
      // Generate a deterministic pattern based on memberId
      const hash = memberId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      ctx.fillStyle = '#000000';
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          // Pseudo-random pattern based on position and hash
          const value = (i * gridSize + j + hash) % 3;
          if (value === 0) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }

      // Add corner squares (typical QR code markers)
      const cornerSize = cellSize * 3;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cornerSize, cornerSize);
      ctx.fillRect(size - cornerSize, 0, cornerSize, cornerSize);
      ctx.fillRect(0, size - cornerSize, cornerSize, cornerSize);

      // Inner white squares in corners
      ctx.fillStyle = '#ffffff';
      const innerSize = cellSize;
      ctx.fillRect(cellSize, cellSize, innerSize, innerSize);
      ctx.fillRect(size - cellSize * 2, cellSize, innerSize, innerSize);
      ctx.fillRect(cellSize, size - cellSize * 2, innerSize, innerSize);
    };

    generateQRCode();
  }, [memberId]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl">
      <h3 className="text-xl text-[#D4AF37] uppercase tracking-wider" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Entry QR Code
      </h3>
      <div className="p-4 bg-white rounded-lg">
        <canvas ref={canvasRef} className="w-48 h-48" />
      </div>
      <div className="text-center">
        <p className="text-white mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          {memberName}
        </p>
        <p className="text-gray-400 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          {memberId}
        </p>
      </div>
      <p className="text-gray-300 text-sm text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Present this QR code at event entry for scanning
      </p>
    </div>
  );
};
