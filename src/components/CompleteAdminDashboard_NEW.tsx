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
  Search,
  UserPlus,
  Mail,
  MessageSquare,
  CheckCheck,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AboutVault54 } from './AboutVault54';

interface CompleteAdminDashboardProps {
  onLogout: () => void;
}

export const CompleteAdminDashboard: React.FC<CompleteAdminDashboardProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('god-mode');
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showCreateMemberModal, setShowCreateMemberModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [showCodeGeneratorModal, setShowCodeGeneratorModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState<any>(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('welcome');
  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // Greek God Usernames (Pre-created and ready to assign)
  const greekGodUsernames = [
    { id: 1, name: 'Zeus', assigned: false, assignedTo: null },
    { id: 2, name: 'Poseidon', assigned: false, assignedTo: null },
    { id: 3, name: 'Hades', assigned: false, assignedTo: null },
    { id: 4, name: 'Apollo', assigned: true, assignedTo: 'Christopher DeMarkus' },
    { id: 5, name: 'Ares', assigned: false, assignedTo: null },
    { id: 6, name: 'Hermes', assigned: false, assignedTo: null },
    { id: 7, name: 'Hephaestus', assigned: false, assignedTo: null },
    { id: 8, name: 'Dionysus', assigned: true, assignedTo: 'Bernard Sims' },
    { id: 9, name: 'Athena', assigned: false, assignedTo: null },
    { id: 10, name: 'Artemis', assigned: false, assignedTo: null },
    { id: 11, name: 'Aphrodite', assigned: false, assignedTo: null },
    { id: 12, name: 'Hera', assigned: false, assignedTo: null },
    { id: 13, name: 'Demeter', assigned: false, assignedTo: null },
    { id: 14, name: 'Hestia', assigned: false, assignedTo: null },
    { id: 15, name: 'Persephone', assigned: false, assignedTo: null },
    { id: 16, name: 'Eros', assigned: false, assignedTo: null },
    { id: 17, name: 'Hercules', assigned: false, assignedTo: null },
    { id: 18, name: 'Achilles', assigned: false, assignedTo: null },
    { id: 19, name: 'Odysseus', assigned: false, assignedTo: null },
    { id: 20, name: 'Perseus', assigned: false, assignedTo: null },
    { id: 21, name: 'Theseus', assigned: false, assignedTo: null },
    { id: 22, name: 'Atlas', assigned: false, assignedTo: null },
    { id: 23, name: 'Prometheus', assigned: false, assignedTo: null },
    { id: 24, name: 'Orpheus', assigned: false, assignedTo: null },
    { id: 25, name: 'Pan', assigned: false, assignedTo: null },
  ];

  // Live Member Activity Monitoring
  const memberActivity = [
    { id: 1, member: 'Christopher DeMarkus', username: 'Apollo', action: 'Viewed When in Rome event', timestamp: '2 min ago', location: 'New York, NY' },
    { id: 2, member: 'Bernard Sims', username: 'Dionysus', action: 'Updated profile', timestamp: '15 min ago', location: 'Brooklyn, NY' },
    { id: 3, member: 'Brian Murph', username: 'Ares', action: 'Logged in', timestamp: '1 hour ago', location: 'Manhattan, NY' },
    { id: 4, member: 'Christopher DeMarkus', username: 'Apollo', action: 'Purchased ticket', timestamp: '3 hours ago', location: 'New York, NY' },
  ];

  // Member Complaints/Feedback
  const complaints = [
    { 
      id: 1, 
      member: 'Christopher DeMarkus', 
      username: 'Apollo',
      type: 'Feedback', 
      subject: 'Event spacing suggestion', 
      message: 'Would love to see events spaced 2 weeks apart instead of monthly.', 
      timestamp: '1 day ago',
      status: 'new',
      priority: 'low'
    },
    { 
      id: 2, 
      member: 'Bernard Sims', 
      username: 'Dionysus',
      type: 'Complaint', 
      subject: 'Ticket refund inquiry', 
      message: 'Had a family emergency, need clarification on refund policy.', 
      timestamp: '3 hours ago',
      status: 'new',
      priority: 'high'
    },
  ];

  // Email/Message Templates
  const templates = {
    welcome: {
      name: 'Welcome Email',
      subject: 'Welcome to VAULT54',
      body: 'Dear {{member_name}},\\n\\nWelcome to VAULT54! Your membership has been activated.\\n\\nMember Number: {{member_number}}\\nUsername: {{username}}\\nTier: {{tier}}\\n\\nAccess your portal at vault54.com/portal\\n\\nVirtus et Discretio,\\nThe VAULT54 Team'
    },
    eventReminder: {
      name: 'Event Reminder',
      subject: 'Upcoming Event: {{event_name}}',
      body: 'Dear {{member_name}},\\n\\nThis is a reminder about {{event_name}} happening on {{event_date}}.\\n\\nVenue: {{venue}}\\nTime: {{time}}\\n\\nSee you there!\\n\\nVirtus et Discretio,\\nThe VAULT54 Team'
    },
    passwordReset: {
      name: 'Password Reset',
      subject: 'VAULT54 Password Reset',
      body: 'Dear {{member_name}},\\n\\nYour password has been reset. Your temporary password is: {{temp_password}}\\n\\nPlease login and change your password immediately.\\n\\nVirtus et Discretio,\\nThe VAULT54 Team'
    },
    applicationApproved: {
      name: 'Application Approved',
      subject: '🎉 Welcome to VAULT54 - Application Approved',
      body: 'Congratulations {{applicant_name}},\\n\\nYour application to VAULT54 has been approved!\\n\\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\nAPPLICATION SUMMARY\\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\nName: {{applicant_name}}\\nEmail: {{applicant_email}}\\nTier: {{tier}}\\nReferred By: {{referred_by}}\\nUsername: {{username}}\\nMember Number: {{member_number}}\\n\\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n\\nIMPORTANT: Please confirm your details and accept your membership by clicking the button below:\\n\\n[CONFIRM DETAILS & ACTIVATE MEMBERSHIP]\\n\\nOnce confirmed, you will receive your member portal access credentials in a separate email.\\n\\nWelcome to the society.\\n\\nVirtus et Discretio,\\nThe VAULT54 Team'
    },
  };

  const currentTemplate = templates[selectedTemplate as keyof typeof templates];

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
      tier: 'Reserve',
      applicationMaterials: {
        age: 32,
        occupation: 'Investment Banker',
        location: 'Manhattan, NY',
        netWorth: '$2.5M+',
        instagram: '@michaelanderson',
        referralCode: 'APOLLO2024',
        whyJoin: 'Looking to connect with like-minded professionals and enjoy exclusive experiences in a discrete environment.',
        expectations: 'Access to high-caliber events and a trusted network.',
        experience: 'Member of similar private clubs in NYC',
        photos: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
        ]
      }
    },
    { 
      id: 2, 
      name: 'David Chen', 
      email: 'david.chen@example.com',
      status: 'pending',
      submittedAt: '5 hours ago',
      referredBy: 'Bernard Sims',
      tier: 'Syndicate',
      applicationMaterials: {
        age: 38,
        occupation: 'Tech Entrepreneur',
        location: 'Tribeca, NY',
        netWorth: '$10M+',
        instagram: '@davidchen',
        referralCode: 'DIONYSUS2024',
        whyJoin: 'Seeking a community of ambitious individuals who value privacy and unique experiences.',
        expectations: 'Exclusive networking and world-class events.',
        experience: 'Previous member of exclusive Silicon Valley groups',
        photos: [
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'
        ]
      }
    },
  ];

  const members = [
    { 
      id: 1, 
      name: 'Christopher DeMarkus', 
      tier: 'Syndicate', 
      memberNumber: 'V54-M001',
      username: 'Apollo',
      joinDate: '2024-01-01', 
      status: 'Active',
      referredBy: 'Founder',
      totalReferred: 12,
      email: 'chris@vault54.com',
      phone: '(555) 001-0001',
      applicationMaterials: {
        age: 35,
        occupation: 'Founder',
        location: 'Manhattan, NY',
        netWorth: '$50M+',
        instagram: '@christopherdemarkus',
        referralCode: 'FOUNDER',
        whyJoin: 'Building the premier private society in NYC',
        expectations: 'Create unforgettable experiences',
        experience: 'Founded multiple successful ventures',
        photos: [
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'
        ]
      }
    },
    { 
      id: 2, 
      name: 'Bernard Sims', 
      tier: 'Syndicate',
      memberNumber: 'V54-M002',
      username: 'Dionysus', 
      joinDate: '2024-01-02', 
      status: 'Active',
      referredBy: 'Christopher DeMarkus',
      totalReferred: 8,
      email: 'bernard@example.com',
      phone: '(555) 002-0002',
      applicationMaterials: {
        age: 40,
        occupation: 'Private Equity',
        location: 'Brooklyn, NY',
        netWorth: '$15M+',
        instagram: '@bernardsims',
        referralCode: 'APOLLO2024',
        whyJoin: 'Connect with ambitious professionals',
        expectations: 'High-level networking',
        experience: 'Previous member of exclusive clubs',
        photos: [
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        ]
      }
    },
    { 
      id: 3, 
      name: 'Brian Murph', 
      tier: 'Reserve',
      memberNumber: 'V54-M003',
      username: 'Ares',
      joinDate: '2024-01-03', 
      status: 'Active',
      referredBy: 'Christopher DeMarkus',
      totalReferred: 3,
      email: 'brian@example.com',
      phone: '(555) 003-0003',
      applicationMaterials: {
        age: 29,
        occupation: 'Real Estate Developer',
        location: 'Manhattan, NY',
        netWorth: '$5M+',
        instagram: '@brianmurph',
        referralCode: 'APOLLO2024',
        whyJoin: 'Exclusive experiences and networking',
        expectations: 'Access to unique events',
        experience: 'Active in NYC social scene',
        photos: [
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'
        ]
      }
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

  // Show About Vault54 Component
  if (activeView === 'about') {
    return (
      <div className="min-h-screen bg-black">
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/20 px-8 py-4">
          <button
            onClick={() => setActiveView('god-mode')}
            className="flex items-center gap-2 text-white/70 hover:text-[#D4AF37] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif' }}>Back to Dashboard</span>
          </button>
        </div>
        <div className="pt-20">
          <AboutVault54 />
        </div>
      </div>
    );
  }

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
        <aside className="w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col overflow-y-auto">
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
              { id: 'usernames', label: 'Greek God Usernames', icon: UserPlus },
              { id: 'activity', label: 'Live Member Activity', icon: Eye },
              { id: 'complaints', label: 'Member Feedback', icon: MessageSquare },
              { id: 'templates', label: 'Template Editor', icon: Mail },
              { id: 'about', label: 'About VAULT54 Page', icon: FileText },
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
            })}</nav>

          {/* Footer with Socials */}
          <div className="border-t border-white/10 pt-4 space-y-3 mt-4">
            <div className="text-white/40 text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div>X: @Vault54NYC</div>
              <div>IG: @VaultFiftyFour</div>
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
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* APPLICATION CENTER with Photo Viewing */}
          {activeView === 'applications' && (
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-3xl md:text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Application Center
                </h1>
                <p className="text-white/50 text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Review and manage membership applications
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {applicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-[#D4AF37]/40 transition-all"
                  >
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>
                          {applicant.name}
                        </h3>
                        <div className="space-y-1 text-xs md:text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <div>Email: {applicant.email}</div>
                          <div>Tier: <span className="text-[#D4AF37]">{applicant.tier}</span></div>
                          <div>Referred by: {applicant.referredBy}</div>
                          <div>Submitted: {applicant.submittedAt}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedApplicant(applicant)}
                          className="px-4 py-2 bg-blue-500/20 border border-blue-400/40 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-xs md:text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPhotos(applicant.applicationMaterials.photos);
                            setShowPhotosModal(true);
                          }}
                          className="px-4 py-2 bg-purple-500/20 border border-purple-400/40 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all text-xs md:text-sm flex items-center gap-2"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <ImageIcon size={16} />
                          View Photos
                        </button>
                        <button
                          onClick={() => alert('Application approved!')}
                          className="px-4 py-2 bg-green-500/20 border border-green-400/40 text-green-400 rounded-lg hover:bg-green-500/30 transition-all text-xs md:text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => alert('Application declined')}
                          className="px-4 py-2 bg-red-500/20 border border-red-400/40 text-red-400 rounded-lg hover:bg-red-500/30 transition-all text-xs md:text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MEMBER MANAGEMENT with Application Materials */}
          {activeView === 'members' && (
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-3xl md:text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Member Management
                </h1>
                <p className="text-white/50 text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Manage all active members
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-[#D4AF37]/40 transition-all"
                  >
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg md:text-xl text-white" style={{ fontFamily: 'Cinzel, serif' }}>
                            {member.name}
                          </h3>
                          <span className="px-2 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded text-[#D4AF37] text-xs">
                            @{member.username}
                          </span>
                        </div>
                        <div className="space-y-1 text-xs md:text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <div>Member #: {member.memberNumber}</div>
                          <div>Tier: <span className="text-[#D4AF37]">{member.tier}</span></div>
                          <div>Joined: {member.joinDate}</div>
                          <div>Email: {member.email}</div>
                          <div>Referred: {member.totalReferred} members</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedMember(member)}
                          className="px-4 py-2 bg-blue-500/20 border border-blue-400/40 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-xs md:text-sm"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          View Profile
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPhotos(member.applicationMaterials.photos);
                            setShowPhotosModal(true);
                          }}
                          className="px-4 py-2 bg-purple-500/20 border border-purple-400/40 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all text-xs md:text-sm flex items-center gap-2"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <ImageIcon size={16} />
                          View Photos
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* God Mode Overview */}
          {activeView === 'god-mode' && (
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-3xl md:text-4xl text-white mb-2"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  God Mode Overview
                </h1>
                <p className="text-white/50 text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Complete administrative control center
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Members', value: members.length, icon: Users },
                  { label: 'Pending Applications', value: applicants.length, icon: ClipboardList },
                  { label: 'Active Events', value: 3, icon: Star },
                  { label: 'Total Revenue', value: '$247K', icon: DollarSign },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="p-4 md:p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <Icon size={24} className="text-[#D4AF37]" />
                      </div>
                      <div className="text-2xl md:text-3xl text-white mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Activity Feed */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6">
                <h2 className="text-xl md:text-2xl text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                  Live Activity Feed
                </h2>
                <div className="space-y-3">
                  {liveActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 md:p-4 bg-black/40 border border-white/10 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`
                          w-2 h-2 rounded-full flex-shrink-0
                          ${activity.status === 'new' && 'bg-green-400'}
                          ${activity.status === 'warning' && 'bg-yellow-400'}
                          ${activity.status === 'info' && 'bg-blue-400'}
                          ${activity.status === 'success' && 'bg-green-400'}
                        `} />
                        <span className="text-white text-xs md:text-sm truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {activity.message}
                        </span>
                      </div>
                      <span className="text-white/40 text-xs flex-shrink-0 ml-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other views - using placeholder for brevity */}
          {!['applications', 'members', 'god-mode', 'about'].includes(activeView) && (
            <div className="flex items-center justify-center h-full">
              <p className="text-white/40 text-base md:text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                View: {activeView}
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Photo Gallery Modal */}
      {showPhotosModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPhotosModal(false)}>
          <div className="bg-black/90 border border-white/10 rounded-2xl p-4 md:p-8 max-w-4xl w-full backdrop-blur-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-2xl md:text-3xl text-white"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Photo Gallery
              </h2>
              <button
                onClick={() => setShowPhotosModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedPhotos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-64 md:h-80 object-cover rounded-xl border border-white/10"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Applicant Details Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedApplicant(null)}>
          <div className="bg-black/90 border border-white/10 rounded-2xl p-4 md:p-8 max-w-3xl w-full backdrop-blur-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-2xl md:text-3xl text-white"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                {selectedApplicant.name}
              </h2>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            <div className="space-y-4 text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-white/50 mb-1">Age</div>
                  <div className="text-white">{selectedApplicant.applicationMaterials.age}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">Occupation</div>
                  <div className="text-white">{selectedApplicant.applicationMaterials.occupation}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">Location</div>
                  <div className="text-white">{selectedApplicant.applicationMaterials.location}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">Net Worth</div>
                  <div className="text-white">{selectedApplicant.applicationMaterials.netWorth}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">Instagram</div>
                  <div className="text-white">{selectedApplicant.applicationMaterials.instagram}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">Referral Code</div>
                  <div className="text-white">{selectedApplicant.applicationMaterials.referralCode}</div>
                </div>
              </div>
              <div>
                <div className="text-white/50 mb-1">Why Join VAULT54?</div>
                <div className="text-white">{selectedApplicant.applicationMaterials.whyJoin}</div>
              </div>
              <div>
                <div className="text-white/50 mb-1">Expectations</div>
                <div className="text-white">{selectedApplicant.applicationMaterials.expectations}</div>
              </div>
              <div>
                <div className="text-white/50 mb-1">Experience</div>
                <div className="text-white">{selectedApplicant.applicationMaterials.experience}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
          <div className="bg-black/90 border border-white/10 rounded-2xl p-4 md:p-8 max-w-3xl w-full backdrop-blur-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 
                  className="text-2xl md:text-3xl text-white mb-1"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {selectedMember.name}
                </h2>
                <div className="text-[#D4AF37] text-sm md:text-base">@{selectedMember.username}</div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Member Info */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-lg md:text-xl text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                  Member Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <div>
                    <div className="text-white/50 mb-1">Member Number</div>
                    <div className="text-white">{selectedMember.memberNumber}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Tier</div>
                    <div className="text-[#D4AF37]">{selectedMember.tier}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Join Date</div>
                    <div className="text-white">{selectedMember.joinDate}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Status</div>
                    <div className="text-green-400">{selectedMember.status}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Email</div>
                    <div className="text-white">{selectedMember.email}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Phone</div>
                    <div className="text-white">{selectedMember.phone}</div>
                  </div>
                </div>
              </div>

              {/* Original Application Materials */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-lg md:text-xl text-white mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
                  Original Application Materials
                </h3>
                <div className="space-y-4 text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-white/50 mb-1">Age</div>
                      <div className="text-white">{selectedMember.applicationMaterials.age}</div>
                    </div>
                    <div>
                      <div className="text-white/50 mb-1">Occupation</div>
                      <div className="text-white">{selectedMember.applicationMaterials.occupation}</div>
                    </div>
                    <div>
                      <div className="text-white/50 mb-1">Location</div>
                      <div className="text-white">{selectedMember.applicationMaterials.location}</div>
                    </div>
                    <div>
                      <div className="text-white/50 mb-1">Net Worth</div>
                      <div className="text-white">{selectedMember.applicationMaterials.netWorth}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Why Join VAULT54?</div>
                    <div className="text-white">{selectedMember.applicationMaterials.whyJoin}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1">Expectations</div>
                    <div className="text-white">{selectedMember.applicationMaterials.expectations}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};
