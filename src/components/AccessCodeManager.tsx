import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Key, User } from 'lucide-react';

interface AccessCode {
  id: string;
  code: string;
  code_type: 'admin' | 'investor' | 'member' | 'syndicate';
  assigned_to_name?: string;
  assigned_to_email?: string;
  status: 'active' | 'inactive' | 'revoked';
  last_used_at?: string;
  use_count: number;
  notes?: string;
}

interface AccessCodeManagerProps {
  codes: AccessCode[];
  onCreateCode: (code: Partial<AccessCode>) => void;
  onUpdateCode: (id: string, updates: Partial<AccessCode>) => void;
  onDeleteCode: (id: string) => void;
}

export const AccessCodeManager: React.FC<AccessCodeManagerProps> = ({
  codes,
  onCreateCode,
  onUpdateCode,
  onDeleteCode
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredCodes = filterType === 'all' 
    ? codes 
    : codes.filter(c => c.code_type === filterType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Access Code Management
          </h2>
          <p className="text-white/60 text-sm">
            Manage Greek god access codes for syndicate and investor portals
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded hover:bg-[#D4AF37]/90 transition-colors"
        >
          <Plus size={20} />
          Create Code
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'admin', 'investor', 'syndicate', 'member'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded text-sm transition-colors ${
              filterType === type
                ? 'bg-[#D4AF37] text-black font-semibold'
                : 'bg-black/40 text-white/60 border border-[#D4AF37]/30 hover:bg-black/60'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Codes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCodes.map((code) => (
          <div
            key={code.id}
            className="bg-black/40 border border-[#D4AF37]/30 rounded-lg p-4 hover:border-[#D4AF37]/50 transition-colors"
          >
            {/* Code Header */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Key size={20} className="text-[#D4AF37]" />
                <span className="text-xl font-bold text-white">{code.code}</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                code.status === 'active' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {code.status}
              </span>
            </div>

            {/* Type Badge */}
            <div className="mb-3">
              <span className="px-2 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded text-xs text-white">
                {code.code_type.toUpperCase()}
              </span>
            </div>

            {/* Assignment */}
            {code.assigned_to_name && (
              <div className="mb-3 p-2 bg-black/40 rounded">
                <div className="flex items-center gap-2 mb-1">
                  <User size={14} className="text-white/60" />
                  <span className="text-sm text-white/80">Assigned to:</span>
                </div>
                <p className="text-sm text-white font-semibold">{code.assigned_to_name}</p>
                {code.assigned_to_email && (
                  <p className="text-xs text-white/60">{code.assigned_to_email}</p>
                )}
              </div>
            )}

            {/* Usage Stats */}
            <div className="mb-3 text-xs text-white/60">
              <p>Used: {code.use_count} times</p>
              {code.last_used_at && (
                <p>Last used: {new Date(code.last_used_at).toLocaleDateString()}</p>
              )}
            </div>

            {/* Notes */}
            {code.notes && (
              <p className="text-xs text-white/50 mb-3 italic">{code.notes}</p>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  const newName = prompt('Assign to (name):', code.assigned_to_name || '');
                  const newEmail = prompt('Assign to (email):', code.assigned_to_email || '');
                  if (newName !== null) {
                    onUpdateCode(code.id, {
                      assigned_to_name: newName || undefined,
                      assigned_to_email: newEmail || undefined
                    });
                  }
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-black/40 border border-[#D4AF37]/30 text-white rounded hover:bg-black/60 transition-colors text-xs"
              >
                <Edit2 size={14} />
                Assign
              </button>
              <button
                onClick={() => {
                  onUpdateCode(code.id, {
                    status: code.status === 'active' ? 'inactive' : 'active'
                  });
                }}
                className={`flex-1 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  code.status === 'active'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                }`}
              >
                {code.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <Key size={48} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/60">No access codes found</p>
          <p className="text-white/40 text-sm">Create a new code to get started</p>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCodeModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(data) => {
            onCreateCode(data);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};

// Create Code Modal Component
interface CreateCodeModalProps {
  onClose: () => void;
  onCreate: (data: Partial<AccessCode>) => void;
}

const CreateCodeModal: React.FC<CreateCodeModalProps> = ({ onClose, onCreate }) => {
  const [code, setCode] = useState('');
  const [codeType, setCodeType] = useState<AccessCode['code_type']>('syndicate');
  const [notes, setNotes] = useState('');

  const greekGods = [
    'ZEUS', 'APOLLO', 'ATHENA', 'ARTEMIS', 'ARES', 'HADES', 'POSEIDON',
    'HERMES', 'HEPHAESTUS', 'DIONYSUS', 'DEMETER', 'HERA', 'HESTIA',
    'APHRODITE', 'PERSEPHONE', 'HEBE', 'NIKE', 'TYCHE', 'NEMESIS'
  ];

  const generateGreekGodCode = () => {
    const randomGod = greekGods[Math.floor(Math.random() * greekGods.length)];
    const randomNum = Math.floor(Math.random() * 100);
    setCode(`${randomGod}${randomNum}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      alert('Please enter a code');
      return;
    }
    onCreate({
      code: code.toUpperCase(),
      code_type: codeType,
      status: 'active',
      use_count: 0,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1a1a1a] border border-[#D4AF37]/30 rounded-lg shadow-2xl max-w-md w-full p-6">
        <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Create Access Code
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">
              Code <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g., APOLLO87"
                className="flex-1 px-4 py-2 bg-black/40 border border-[#D4AF37]/30 rounded text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/60"
                required
              />
              <button
                type="button"
                onClick={generateGreekGodCode}
                className="px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded text-white hover:bg-[#D4AF37]/30 transition-colors text-sm"
              >
                Generate
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Type</label>
            <select
              value={codeType}
              onChange={(e) => setCodeType(e.target.value as AccessCode['code_type'])}
              className="w-full px-4 py-2 bg-black/40 border border-[#D4AF37]/30 rounded text-white focus:outline-none focus:border-[#D4AF37]/60"
            >
              <option value="syndicate">Syndicate</option>
              <option value="investor">Investor</option>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
              className="w-full px-4 py-2 bg-black/40 border border-[#D4AF37]/30 rounded text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/60"
              rows={3}
            />
          </div>

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
              Create Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
