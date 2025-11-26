import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  ClipboardList, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Key,
  TrendingUp,
  DollarSign,
  Crown,
  Star,
  LogOut,
  Shield,
  Eye,
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Ban,
  Lock,
  Unlock,
  Activity,
  Network,
  Code,
  Clock,
  Search
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EnhancedLuxuryAdminProps {
  onLogout: () => void;
}

export const EnhancedLuxuryAdmin: React.FC<EnhancedLuxuryAdminProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('god-mode');
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showCreateMemberModal, setShowCreateMemberModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showCodeGeneratorModal, setShowCodeGeneratorModal] = useState(false);

  // Sample data for charts
  const memberGrowthData = [
    { month: 'Jan', members: 12 },
    { month: 'Feb', members: 19 },
    { month: 'Mar', members: 25 },
    { month: 'Apr', members: 32 },
    { month: 'May', members: 41 },
    { month: 'Jun', members: 50 },
  ];

  const eventFillData = [
    { event: 'When in Rome', filled: 1, capacity: 200 },
    { event: 'Midnight Soirée', filled: 0, capacity: 150 },
    { event: 'Gold Rush', filled: 0, capacity: 100 },
  ];

  const applicants = [
    { 
      id: 1, 
      name: 'Michael Anderson', 
      email: 'michael.a@example.com',
      status: 'pending',
      submittedAt: '2 hours ago',
      referredBy: 'Christopher DeMarkus',
      tier: 'Reserve'
    },
    { 
      id: 2, 
      name: 'David Chen', 
      email: 'david.chen@example.com',
      status: 'pending',
      submittedAt: '5 hours ago',
      referredBy: 'Bernard Sims',
      tier: 'Syndicate'
    },
  ];

  const members = [
    { 
      id: 1, 
      name: 'Christopher DeMarkus', 
      tier: 'Syndicate', 
      memberNumber: 'V54-M001',
      joinDate: '2024-01-01', 
      status: 'Active',
      referredBy: 'Founder',
      totalReferred: 12,
      email: 'chris@vault54.com',
      phone: '(555) 001-0001'
    },
    { 
      id: 2, 
      name: 'Bernard Sims', 
      tier: 'Syndicate',
      memberNumber: 'V54-M002', 
      joinDate: '2024-01-02', 
      status: 'Active',
      referredBy: 'Christopher DeMarkus',
      totalReferred: 8,
      email: 'bernard@example.com',
      phone: '(555) 002-0002'
    },
    { 
      id: 3, 
      name: 'Brian Murph', 
      tier: 'Reserve',
      memberNumber: 'V54-M003', 
      joinDate: '2024-01-03', 
      status: 'Active',
      referredBy: 'Christopher DeMarkus',
      totalReferred: 3,
      email: 'brian@example.com',
      phone: '(555) 003-0003'
    },
  ];

  const announcements = [
    { id: 1, title: 'Welcome to VAULT54', priority: 'normal', date: '2 days ago' },
    { id: 2, title: 'Event Update: When in Rome', priority: 'urgent', date: '5 hours ago' },
  ];

  const liveActivity = [
    { id: 1, type: 'applicant', message: 'New application from Michael Anderson', time: '2 min ago', status: 'new' },
    { id: 2, type: 'security', message: 'Access code APOLLO expired', time: '15 min ago', status: 'warning' },
    { id: 3, type: 'member', message: 'Password reset for Bernard Sims', time: '1 hour ago', status: 'info' },
    { id: 4, type: 'system', message: 'Database backup completed', time: '2 hours ago', status: 'success' },
  ];

  const auditLog = [
    { id: 1, admin: 'Christopher DeMarkus', action: 'Approved application: Michael Anderson', timestamp: '2024-01-15 10:30:00' },
    { id: 2, admin: 'Christopher DeMarkus', action: 'Generated access code: ZEUS2024', timestamp: '2024-01-15 09:15:00' },
    { id: 3, admin: 'Christopher DeMarkus', action: 'Updated site content: Home page hero', timestamp: '2024-01-14 16:45:00' },
  ];

  const accessCodes = [
    { id: 1, code: 'ZEUS123', type: 'Admin', status: 'active', expires: 'Never', uses: 'Unlimited' },
    { id: 2, code: 'MEMBER123', type: 'Member', status: 'active', expires: 'Never', uses: 'Unlimited' },
    { id: 3, code: 'APOLLO', type: 'Referral', status: 'expired', expires: '2024-01-10', uses: '5/5' },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Smoke Texture Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")
          `,
          backgroundBlendMode: 'overlay',
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 flex h-screen">
        {/* Frosted Glass Sidebar */}
        <aside className="w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col">
          {/* Logo */}
          <div className="mb-12">
            <img 
              src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/vault54-logo.gif" 
              alt="VAULT54" 
              className="h-12 w-auto mb-2"
            />
            <div className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full inline-block">
              <span className="text-[#D4AF37] text-xs tracking-widest" style={{ fontFamily: 'Cinzel, serif' }}>
                GOD MODE
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {[
              { id: 'god-mode', label: 'God Mode Overview', icon: Activity },
              { id: 'applications', label: 'Application Center', icon: ClipboardList },
              { id: 'members', label: 'Member Management', icon: Users },
              { id: 'cms', label: 'Site CMS', icon: FileText },
              { id: 'feed', label: 'Feed Control', icon: Megaphone },
              { id: 'security', label: 'Security & Access', icon: Shield },
              { id: 'dashboard', label: 'Analytics Dashboard', icon: LayoutDashboard },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left
                    ${activeView === item.id
                      ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                      : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                    }
                  `}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer with Socials */}
          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="text-white/40 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div>X: @Vault54NYC</div>
              <div>IG: @Vaultfiftyfour</div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-all w-full"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* God Mode Overview */}
          {activeView === 'god-mode' && (
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  God Mode Overview
                </h1>
                <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Real-time system monitoring and control
                </p>
              </div>

              {/* System Status Cards */}
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: 'System Status', value: 'ONLINE', icon: Activity, color: '#10B981', status: 'Operational' },
                  { label: 'Active Sessions', value: '47', icon: Users, color: '#D4AF37', status: 'Live Now' },
                  { label: 'Pending Apps', value: '2', icon: Clock, color: '#F59E0B', status: 'Awaiting Review' },
                  { label: 'Security Events', value: '0', icon: Shield, color: '#10B981', status: 'No Threats' },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon size={24} style={{ color: stat.color }} />
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: stat.color }} />
                      </div>
                      <div 
                        className="text-3xl mb-2"
                        style={{ 
                          fontFamily: 'Cinzel, serif',
                          color: stat.color
                        }}
                      >
                        {stat.value}
                      </div>
                      <div 
                        className="text-sm text-white/50 uppercase tracking-wider mb-1"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {stat.label}
                      </div>
                      <div 
                        className="text-xs text-white/40"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {stat.status}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Activity Feed */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 
                    className="text-2xl text-white mb-6 flex items-center gap-2"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    <Activity size={24} className="text-[#D4AF37]" />
                    Live Activity Feed
                  </h2>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {liveActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-4 bg-black/40 border border-white/10 rounded-lg hover:border-[#D4AF37]/30 transition-all"
                      >
                        <div className={`
                          w-2 h-2 rounded-full mt-2
                          ${activity.status === 'new' ? 'bg-green-400 animate-pulse' : ''}
                          ${activity.status === 'warning' ? 'bg-yellow-400' : ''}
                          ${activity.status === 'info' ? 'bg-blue-400' : ''}
                          ${activity.status === 'success' ? 'bg-green-400' : ''}
                        `} />
                        <div className="flex-1">
                          <p className="text-white text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {activity.message}
                          </p>
                          <p className="text-white/40 text-xs mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Security Events */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 
                    className="text-2xl text-white mb-6 flex items-center gap-2"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    <Shield size={24} className="text-[#D4AF37]" />
                    Security Events
                  </h2>
                  <div className="space-y-3">
                    <div className="p-4 bg-black/40 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={16} className="text-green-400" />
                        <span className="text-green-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                          All Systems Secure
                        </span>
                      </div>
                      <p className="text-white/60 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                        No suspicious activity detected in the last 24 hours
                      </p>
                    </div>
                    <div className="p-4 bg-black/40 border border-white/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock size={16} className="text-white/60" />
                        <span className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Last Security Scan
                        </span>
                      </div>
                      <p className="text-white/40 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Completed 15 minutes ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Application Command Center */}
          {activeView === 'applications' && (
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Application Command Center
                </h1>
                <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Review and process membership applications
                </p>
              </div>

              {/* Split View */}
              <div className="grid grid-cols-3 gap-6">
                {/* Applicant List */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 
                    className="text-xl text-white mb-4"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Pending Applications ({applicants.length})
                  </h2>
                  <div className="space-y-3">
                    {applicants.map((applicant) => (
                      <button
                        key={applicant.id}
                        onClick={() => setSelectedApplicant(applicant)}
                        className={`
                          w-full text-left p-4 rounded-lg transition-all
                          ${selectedApplicant?.id === applicant.id
                            ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/40'
                            : 'bg-black/40 border border-white/10 hover:border-[#D4AF37]/30'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {applicant.name}
                          </h3>
                          <Clock size={14} className="text-yellow-400" />
                        </div>
                        <p className="text-white/50 text-xs mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {applicant.email}
                        </p>
                        <p className="text-white/40 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {applicant.submittedAt}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detailed Review Pane */}
                <div className="col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  {selectedApplicant ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 
                            className="text-3xl text-white mb-2"
                            style={{ fontFamily: 'Cinzel, serif' }}
                          >
                            {selectedApplicant.name}
                          </h2>
                          <p className="text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Applying for {selectedApplicant.tier} Membership
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/40">
                          PENDING REVIEW
                        </span>
                      </div>

                      {/* Applicant Details */}
                      <div className="grid grid-cols-2 gap-4 p-4 bg-black/40 border border-white/10 rounded-lg">
                        <div>
                          <div className="text-white/50 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Email</div>
                          <div className="text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{selectedApplicant.email}</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Referred By</div>
                          <div className="text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{selectedApplicant.referredBy}</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Submitted</div>
                          <div className="text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{selectedApplicant.submittedAt}</div>
                        </div>
                        <div>
                          <div className="text-white/50 text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Requested Tier</div>
                          <div className="text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>{selectedApplicant.tier}</div>
                        </div>
                      </div>

                      {/* Action Controls */}
                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500/20 border border-green-400/40 text-green-400 rounded-lg hover:bg-green-500/30 transition-all">
                          <CheckCircle size={20} />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>Approve</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500/20 border border-red-400/40 text-red-400 rounded-lg hover:bg-red-500/30 transition-all">
                          <XCircle size={20} />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>Deny</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500/20 border border-blue-400/40 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all">
                          <AlertCircle size={20} />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>Request More Info</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all">
                          <Shield size={20} />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>View Background Check</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Select an applicant to review
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Member Management View */}
          {activeView === 'members' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 
                    className="text-4xl text-white mb-2"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Member Management & Lineage
                  </h1>
                  <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Manage member profiles and referral ancestry
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateMemberModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Plus size={18} />
                  <span>Create New Member</span>
                </button>
              </div>

              {/* Member Cards Grid */}
              <div className="grid grid-cols-2 gap-6">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all cursor-pointer"
                    onClick={() => setSelectedMember(member)}
                  >
                    {/* Digital Member Card */}
                    <div className="bg-gradient-to-br from-black via-black to-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-xl p-6 mb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="text-[#D4AF37] text-xs mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                            VAULT54 MEMBER
                          </div>
                          <div className="text-white text-2xl" style={{ fontFamily: 'Cinzel, serif' }}>
                            {member.name}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[#D4AF37] text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {member.memberNumber}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>Tier</div>
                          <div className="text-[#D4AF37]" style={{ fontFamily: 'Inter, sans-serif' }}>{member.tier}</div>
                        </div>
                        <div>
                          <div className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>Since</div>
                          <div className="text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{member.joinDate}</div>
                        </div>
                      </div>
                    </div>

                    {/* Lineage Info */}
                    <div className="flex items-center gap-2 mb-4">
                      <Network size={16} className="text-[#D4AF37]" />
                      <div className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <span className="text-white/60">Referred by: </span>
                        <span className="text-white">{member.referredBy}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users size={16} className="text-[#D4AF37]" />
                      <div className="text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <span className="text-white/60">Total Referred: </span>
                        <span className="text-[#D4AF37]">{member.totalReferred} members</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPasswordResetModal(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <Key size={16} />
                        Reset Password
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <Ban size={16} />
                        Revoke Access
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Site CMS View */}
          {activeView === 'cms' && (
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Site Content Management
                </h1>
                <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Edit public-facing site content and assets
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* File Uploader */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 
                    className="text-2xl text-white mb-6"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Asset Management
                  </h2>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#D4AF37]/50 transition-all cursor-pointer">
                      <Upload size={48} className="text-white/40 mx-auto mb-4" />
                      <p className="text-white/60 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Drag & drop files here
                      </p>
                      <p className="text-white/40 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        or click to browse
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-black/40 border border-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-[#D4AF37]" />
                          <span className="text-white text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>hero-background.jpg</span>
                        </div>
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Editor */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 
                    className="text-2xl text-white mb-6"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Site Copy Editor
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/70 mb-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Hero Title
                      </label>
                      <input
                        type="text"
                        defaultValue="VAULT54"
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]/50"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Hero Subtitle
                      </label>
                      <textarea
                        defaultValue="An exclusive members-only experience"
                        rows={3}
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]/50 resize-none"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>
                    <button className="w-full py-3 bg-[#D4AF37] text-black rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              {/* View As Button */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 
                      className="text-2xl text-white mb-2"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      Member Portal Preview
                    </h2>
                    <p className="text-white/50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Preview the member portal as users see it
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all">
                    <Eye size={20} />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>View As Member</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feed Control View */}
          {activeView === 'feed' && (
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Feed Control
                </h1>
                <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Manage member portal announcements
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h2 
                  className="text-2xl text-white mb-6"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Post Announcement
                </h2>
                <div className="space-y-4">
                  <div>
                    <label 
                      className="block text-white/70 mb-2 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Announcement title..."
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label 
                      className="block text-white/70 mb-2 text-sm"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Content
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your announcement..."
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-all resize-none"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label 
                        className="block text-white/70 mb-2 text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Priority
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <option value="normal">Normal</option>
                        <option value="urgent">🔴 Urgent</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <label 
                        className="block text-white/70 mb-2 text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Visibility
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <option value="all">All Members</option>
                        <option value="reserve">Reserve Only</option>
                        <option value="syndicate">Syndicate Only</option>
                      </select>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 bg-[#D4AF37] text-black rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Publish Announcement
                  </button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h2 
                  className="text-2xl text-white mb-6"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Active Portal Announcements
                </h2>
                <div className="space-y-3">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg hover:border-[#D4AF37]/30 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 
                            className="text-white"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {announcement.title}
                          </h3>
                          {announcement.priority === 'urgent' && (
                            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/40">
                              URGENT
                            </span>
                          )}
                        </div>
                        <p 
                          className="text-white/50 text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Posted {announcement.date}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Edit size={18} className="text-[#D4AF37]" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Trash2 size={18} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security & Access Control View */}
          {activeView === 'security' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 
                    className="text-4xl text-white mb-2"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Security & Access Control
                  </h1>
                  <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Manage access codes and security audit logs
                  </p>
                </div>
                <button
                  onClick={() => setShowCodeGeneratorModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Code size={18} />
                  <span>Generate New Code</span>
                </button>
              </div>

              {/* Access Code Manager */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h2 
                  className="text-2xl text-white mb-6"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Access Code Manager
                </h2>
                <div className="space-y-3">
                  {accessCodes.map((code) => (
                    <div
                      key={code.id}
                      className="flex items-center justify-between p-4 bg-black/40 border border-white/10 rounded-lg"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="px-4 py-2 bg-black/60 border border-[#D4AF37]/30 rounded font-mono text-[#D4AF37]">
                          {code.code}
                        </div>
                        <div>
                          <div className="text-white mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {code.type}
                          </div>
                          <div className="text-white/50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Uses: {code.uses} • Expires: {code.expires}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`
                          px-3 py-1 rounded-full text-xs
                          ${code.status === 'active' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/40'
                          }
                        `}>
                          {code.status.toUpperCase()}
                        </span>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <RefreshCw size={18} className="text-white/60" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Ban size={18} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audit Log */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h2 
                  className="text-2xl text-white mb-6"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Audit Log
                </h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {auditLog.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-3 bg-black/40 border border-white/10 rounded-lg hover:border-[#D4AF37]/20 transition-all"
                    >
                      <div className="flex-1">
                        <div className="text-white text-sm mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {log.action}
                        </div>
                        <div className="text-white/50 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                          By {log.admin}
                        </div>
                      </div>
                      <div className="text-white/40 text-xs font-mono" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {log.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Dashboard View */}
          {activeView === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Analytics Dashboard
                </h1>
                <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Performance metrics and trends
                </p>
              </div>

              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: 'Total Members', value: '50', icon: Users, color: '#D4AF37' },
                  { label: 'Reserve Count', value: '35', icon: Star, color: '#D4AF37' },
                  { label: 'Syndicate Count', value: '15', icon: Crown, color: '#D4AF37' },
                  { label: 'Monthly Revenue', value: '$62.5K', icon: DollarSign, color: '#10B981' },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Icon size={24} className="text-white/40" />
                        <TrendingUp size={16} className="text-green-400" />
                      </div>
                      <div 
                        className="text-4xl mb-2"
                        style={{ 
                          fontFamily: 'Cinzel, serif',
                          color: stat.color
                        }}
                      >
                        {stat.value}
                      </div>
                      <div 
                        className="text-sm text-white/50 uppercase tracking-wider"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 
                    className="text-2xl text-white mb-6"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Member Growth
                  </h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={memberGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="rgba(255,255,255,0.5)"
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.5)"
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.9)', 
                          border: '1px solid rgba(212,175,55,0.3)',
                          borderRadius: '8px',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="members" 
                        stroke="#D4AF37" 
                        strokeWidth={3}
                        dot={{ fill: '#D4AF37', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                  <h2 
                    className="text-2xl text-white mb-6"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Event Fill Rate
                  </h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={eventFillData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="event" 
                        stroke="rgba(255,255,255,0.5)"
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.5)"
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(0,0,0,0.9)', 
                          border: '1px solid rgba(212,175,55,0.3)',
                          borderRadius: '8px',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      />
                      <Bar dataKey="filled" fill="#D4AF37" />
                      <Bar dataKey="capacity" fill="rgba(255,255,255,0.1)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Settings View */}
          {activeView === 'settings' && (
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Settings
                </h1>
                <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                  System configuration and preferences
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
                <p className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Settings panel
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Create Member Modal */}
      {showCreateMemberModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-white/10 rounded-2xl p-8 max-w-2xl w-full backdrop-blur-xl">
            <h2 
              className="text-3xl text-white mb-6"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Create New Member
            </h2>
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 mb-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]/50"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]/50"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]/50"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Membership Tier
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]/50"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <option value="">Select Tier</option>
                    <option value="reserve">⭐ Reserve ($1,000/year)</option>
                    <option value="syndicate">💎 Syndicate ($5,000/year)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateMemberModal(false)}
                className="flex-1 py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 bg-[#D4AF37] text-black rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Create Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {showPasswordResetModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-white/10 rounded-2xl p-8 max-w-md w-full backdrop-blur-xl">
            <h2 
              className="text-3xl text-white mb-6"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Reset Password
            </h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white/70 mb-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Member Email or Username
                </label>
                <input
                  type="text"
                  placeholder="Search member..."
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPasswordResetModal(false)}
                className="flex-1 py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 bg-[#D4AF37] text-black rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Reset & Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Code Generator Modal */}
      {showCodeGeneratorModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-white/10 rounded-2xl p-8 max-w-md w-full backdrop-blur-xl">
            <h2 
              className="text-3xl text-white mb-6"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Generate Access Code
            </h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-white/70 mb-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Code Type
                </label>
                <select
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]/50"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <option value="member">Member Access</option>
                  <option value="referral">Referral Code</option>
                  <option value="admin">Admin Access</option>
                </select>
              </div>
              <div>
                <label className="block text-white/70 mb-2 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Custom Code (leave blank to auto-generate)
                </label>
                <input
                  type="text"
                  placeholder="AUTO-GENERATE"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCodeGeneratorModal(false)}
                className="flex-1 py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 bg-[#D4AF37] text-black rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Generate Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
