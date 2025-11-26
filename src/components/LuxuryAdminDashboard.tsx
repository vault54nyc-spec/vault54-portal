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
  LogOut
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LuxuryAdminDashboardProps {
  onLogout: () => void;
}

export const LuxuryAdminDashboard: React.FC<LuxuryAdminDashboardProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [showCreateMemberModal, setShowCreateMemberModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

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

  const members = [
    { id: 1, name: 'Christopher DeMarkus', tier: 'Syndicate', joinDate: '2024-01-01', status: 'Active' },
    { id: 2, name: 'Bernard Sims', tier: 'Syndicate', joinDate: '2024-01-02', status: 'Active' },
    { id: 3, name: 'Brian Murph', tier: 'Reserve', joinDate: '2024-01-03', status: 'Active' },
  ];

  const announcements = [
    { id: 1, title: 'Welcome to VAULT54', priority: 'normal', date: '2 days ago' },
    { id: 2, title: 'Event Update: When in Rome', priority: 'urgent', date: '5 hours ago' },
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
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'members', label: 'Member Management', icon: Users },
              { id: 'feed', label: 'Feed Control', icon: Megaphone },
              { id: 'review', label: 'Review Queue', icon: ClipboardList },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
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

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-all"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <div className="space-y-8">
              {/* Header */}
              <div>
                <h1 
                  className="text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Command Center
                </h1>
                <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Real-time analytics and system overview
                </p>
              </div>

              {/* Analytics Cards */}
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

              {/* Charts Section */}
              <div className="grid grid-cols-2 gap-6">
                {/* Member Growth Chart */}
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

                {/* Event Fill Rate Chart */}
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

          {/* Member Management View */}
          {activeView === 'members' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h1 
                    className="text-4xl text-white mb-2"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    Member Management
                  </h1>
                  <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Manage member accounts and permissions
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPasswordResetModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Key size={18} />
                    <span>Reset Password</span>
                  </button>
                  <button
                    onClick={() => setShowCreateMemberModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black rounded-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Plus size={18} />
                    <span>Create New Member</span>
                  </button>
                </div>
              </div>

              {/* Members Table */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th 
                        className="text-left px-6 py-4 text-white/60 text-sm uppercase tracking-wider"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Name
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-white/60 text-sm uppercase tracking-wider"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Tier
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-white/60 text-sm uppercase tracking-wider"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Join Date
                      </th>
                      <th 
                        className="text-left px-6 py-4 text-white/60 text-sm uppercase tracking-wider"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Status
                      </th>
                      <th 
                        className="text-right px-6 py-4 text-white/60 text-sm uppercase tracking-wider"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr 
                        key={member.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td 
                          className="px-6 py-4 text-white"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {member.name}
                        </td>
                        <td className="px-6 py-4">
                          <span 
                            className={`
                              px-3 py-1 rounded-full text-xs
                              ${member.tier === 'Syndicate' 
                                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40' 
                                : 'bg-white/10 text-white/70 border border-white/20'
                              }
                            `}
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {member.tier}
                          </span>
                        </td>
                        <td 
                          className="px-6 py-4 text-white/70"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {member.joinDate}
                        </td>
                        <td className="px-6 py-4">
                          <span 
                            className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/40"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                              <Edit size={16} className="text-white/60" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                              <Trash2 size={16} className="text-red-400/60" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Feed Control View */}
          {activeView === 'feed' && (
            <div className="space-y-8">
              {/* Header */}
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

              {/* Post Announcement Widget */}
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

              {/* Active Announcements */}
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

          {/* Review Queue View */}
          {activeView === 'review' && (
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Review Queue
                </h1>
                <p className="text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Application review and approval
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
                <p className="text-white/40" style={{ fontFamily: 'Inter, sans-serif' }}>
                  No pending applications
                </p>
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
    </div>
  );
};
