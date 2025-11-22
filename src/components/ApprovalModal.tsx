import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (data: ApprovalData) => void;
  applicantName: string;
  applicantEmail: string;
}

export interface ApprovalData {
  username: string;
  password: string;
  role: string;
  memberNumber: string;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  onApprove,
  applicantName,
  applicantEmail
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    // Generate member number (will be done server-side in real implementation)
    const memberNumber = `V54-M${String(Date.now()).slice(-3)}`;

    onApprove({
      username,
      password,
      role,
      memberNumber
    });

    // Reset form
    setUsername('');
    setPassword('');
    setRole('Member');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#1a1a1a] border border-[#D4AF37]/30 rounded-lg shadow-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Approve Application
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Applicant Info */}
        <div className="mb-6 p-4 bg-black/40 border border-[#D4AF37]/20 rounded">
          <p className="text-white/80 text-sm mb-1">Applicant</p>
          <p className="text-white font-semibold">{applicantName}</p>
          <p className="text-white/60 text-sm">{applicantEmail}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-white/80 text-sm mb-2">
              Username <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., michael.anderson"
              className="w-full px-4 py-2 bg-black/40 border border-[#D4AF37]/30 rounded text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/60"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/80 text-sm mb-2">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="flex-1 px-4 py-2 bg-black/40 border border-[#D4AF37]/30 rounded text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/60"
                required
              />
              <button
                type="button"
                onClick={generatePassword}
                className="px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded text-white hover:bg-[#D4AF37]/30 transition-colors text-sm"
              >
                Generate
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="showPassword" className="text-white/60 text-sm">
                Show password
              </label>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-white/80 text-sm mb-2">
              Member Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-black/40 border border-[#D4AF37]/30 rounded text-white focus:outline-none focus:border-[#D4AF37]/60"
            >
              <option value="Member">Member</option>
              <option value="VIP Member">VIP Member</option>
              <option value="Founding Member">Founding Member</option>
              <option value="Co-Founder">Co-Founder</option>
            </select>
          </div>

          {/* Info Note */}
          <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded">
            <p className="text-white/70 text-xs">
              ℹ️ Member number will be auto-generated. Welcome email with login credentials will be sent to the applicant.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-white/30 text-white rounded hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded hover:bg-[#D4AF37]/90 transition-colors"
            >
              Approve & Create Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
