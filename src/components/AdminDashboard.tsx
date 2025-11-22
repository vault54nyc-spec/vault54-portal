import React, { useState } from 'react';
import { X, Check, Ban, Image, Mail, Settings, Users, FileText, BarChart3, Calendar, Bell } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  profession: string;
  instagram: string;
  dob: string;
  facePhoto?: string;
  bodyPhoto?: string;
  additionalPhoto?: string;
  status: 'pending' | 'approved' | 'denied';
  submittedAt: string;
  age: number;
  referralCode?: string;
}

interface Member {
  id: number;
  memberNumber: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  instagram: string;
  dob: string;
  age: number;
  facePhoto?: string;
  bodyPhoto?: string;
  additionalPhoto?: string;
  role: string;
  code: string;
  status: 'active' | 'inactive';
  referralCode: string;
  joinedDate: string;
  totalPaid: number;
  eventsPaid: {
    eventName: string;
    amount: number;
    date: string;
  }[];
  eventAttendance: {
    eventName: string;
    date: string;
    attended: boolean;
    checkedInAt?: string;
  }[];
  // Application data
  termsAccepted: boolean;
  ndaAccepted: boolean;
  applicationDate: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bulkMessageType, setBulkMessageType] = useState<'email' | 'sms'>('email');
  const [bulkMessage, setBulkMessage] = useState('');
  const [bulkRecipients, setBulkRecipients] = useState<'all' | 'members' | 'applicants'>('all');
  const [confirmationModal, setConfirmationModal] = useState<{ isOpen: boolean; message: string; title?: string; type?: 'success' | 'info' | 'warning' } | null>(null);
  
  const [applications] = useState<Application[]>([
    {
      id: 1,
      name: 'Michael Anderson',
      email: 'michael.a@example.com',
      phone: '(555) 123-4567',
      profession: 'Finance & Banking',
      instagram: '@michael_anderson',
      dob: '1990-05-15',
      age: 34,
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00',
      referralCode: 'ZEUS'
    },
    {
      id: 2,
      name: 'David Chen',
      email: 'david.chen@example.com',
      phone: '(555) 234-5678',
      profession: 'Technology',
      instagram: '@david_chen',
      dob: '1995-08-22',
      age: 29,
      status: 'pending',
      submittedAt: '2024-01-14T15:45:00',
      referralCode: 'APOLLO'
    }
  ]);

  const [members] = useState<Member[]>([
    {
      id: 1,
      memberNumber: 'V54-M001',
      name: 'Christopher DeMarkus',
      email: 'chris@vault54.com',
      phone: '(555) 001-0001',
      profession: 'Entrepreneurship',
      instagram: '@christopherdemarkus',
      dob: '1992-06-15',
      age: 32,
      role: 'Founder',
      code: 'ZEUS',
      status: 'active',
      referralCode: 'FOUNDER',
      joinedDate: '2024-01-01',
      totalPaid: 125,
      eventsPaid: [
        { eventName: 'When in Rome', amount: 125, date: '2024-01-10' }
      ],
      eventAttendance: [
        { eventName: 'When in Rome', date: '2026-03-29', attended: false }
      ],
      // Application data
      termsAccepted: true,
      ndaAccepted: true,
      applicationDate: '2024-01-01'
    },
    {
      id: 2,
      memberNumber: 'V54-M002',
      name: 'Bernard Sims',
      email: 'bernard@example.com',
      phone: '(555) 002-0002',
      profession: 'Legal',
      instagram: '@bernardsims',
      dob: '1988-03-22',
      age: 36,
      role: 'Co-Founder',
      code: 'HADES',
      status: 'active',
      referralCode: 'ZEUS',
      joinedDate: '2024-01-02',
      totalPaid: 125,
      eventsPaid: [
        { eventName: 'When in Rome', amount: 125, date: '2024-01-11' }
      ],
      eventAttendance: [
        { eventName: 'When in Rome', date: '2026-03-29', attended: false }
      ],
      // Application data
      termsAccepted: true,
      ndaAccepted: true,
      applicationDate: '2024-01-02'
    },
    {
      id: 3,
      memberNumber: 'V54-M003',
      name: 'Brian Murph',
      email: 'brian@example.com',
      phone: '(555) 003-0003',
      profession: 'Technology',
      instagram: '@brianmurph',
      dob: '1995-11-08',
      age: 29,
      role: 'Co-Founder',
      code: 'POSEIDON',
      status: 'active',
      referralCode: 'ZEUS',
      joinedDate: '2024-01-03',
      totalPaid: 0,
      eventsPaid: [],
      eventAttendance: [],
      // Application data
      termsAccepted: true,
      ndaAccepted: true,
      applicationDate: '2024-01-03'
    }
  ]);

  const totalRevenue = members.reduce((sum, m) => sum + m.totalPaid, 0);

  const handleApprove = (appId: number) => {
    console.log('Approving application:', appId);
    setConfirmationModal({
      isOpen: true,
      message: 'Application approved! Welcome email sent to applicant.',
      title: '✅ Application Approved',
      type: 'success'
    });
  };

  const handleDeny = (appId: number) => {
    console.log('Denying application:', appId);
    setConfirmationModal({
      isOpen: true,
      message: 'Application denied. Notification email sent.',
      title: '❌ Application Denied',
      type: 'warning'
    });
  };

  const sendMessage = (recipient: string) => {
    const message = prompt(`Send message to ${recipient}:`);
    if (message) {
      console.log('Sending message:', message);
      setConfirmationModal({
        isOpen: true,
        message: 'Message sent successfully!',
        title: '✉️ Message Sent',
        type: 'success'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/BorcellE%20(1).png)',
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Content wrapper */}
      <div className="relative h-full flex flex-col">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-xl border-b border-[#D4AF37]/30 px-4 md:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <img 
              src="https://pub-8bcbfcc0be054926a00ffbaa7bafb4e2.r2.dev/vault54-logo.gif" 
              alt="VAULT54 Logo" 
              className="h-8 md:h-10 w-auto"
            />
            <span className="hidden sm:inline px-3 md:px-4 py-1 rounded-full bg-black/60 border border-[#D4AF37]/30 text-white text-xs md:text-sm">
              ADMIN
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden md:inline text-white/60 text-sm">Sir Christopher DeMarkus</span>
            <button
              onClick={onLogout}
              className="px-3 md:px-4 py-2 border border-[#D4AF37]/30 text-white rounded hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:border-[#D4AF37]/50 transition-all text-sm"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar - Desktop & Mobile */}
        <aside className={`${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-40 w-64 bg-black md:bg-black/60 backdrop-blur-xl border-r border-[#D4AF37]/30 p-4 md:p-6 transition-transform duration-300 h-full`}>
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'applications', label: 'Applications', icon: FileText },
              { id: 'members', label: 'Members', icon: Users },
              { id: 'communications', label: 'Communications', icon: Mail },
              { id: 'portal-management', label: 'Portal Management', icon: Calendar },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm md:text-base ${
                    activeTab === tab.id
                      ? 'bg-black/60 text-white border border-[#D4AF37]/30 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                      : 'text-white/60 hover:bg-black/40 hover:text-white hover:border-[#D4AF37]/20 border border-transparent'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[rgba(122,102,102,0)]">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 
                  className="text-3xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Admin Dashboard
                </h1>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {[
                  { label: 'Total Members', value: members.length.toString(), icon: '👥', color: 'text-white' },
                  { label: 'Active Members', value: members.filter(m => m.status === 'active').length.toString(), icon: '✓', color: 'text-green-400' },
                  { label: 'Pending Apps', value: applications.filter(a => a.status === 'pending').length.toString(), icon: '⏳', color: 'text-yellow-400' },
                  { label: 'Total Revenue', value: `$${totalRevenue}`, icon: '💰', color: 'text-green-400' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{stat.icon}</span>
                      <div className={`text-2xl md:text-3xl ${stat.color}`}>{stat.value}</div>
                    </div>
                    <div className="text-xs md:text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Revenue Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6">
                  <h2 className="text-xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4">Revenue Breakdown</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-[#D4AF37]/20">
                      <span className="text-white">When in Rome</span>
                      <span className="text-green-400 text-lg">${members.reduce((sum, m) => sum + m.eventsPaid.filter(e => e.eventName === 'When in Rome').reduce((s, e) => s + e.amount, 0), 0)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-[#D4AF37]/20">
                      <span className="text-white">Total Revenue</span>
                      <span className="text-white text-xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">${totalRevenue}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6">
                  <h2 className="text-xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-[#D4AF37]/20">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-white text-sm">{app.name} applied</p>
                          <p className="text-white/50 text-xs">{new Date(app.submittedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Status Overview */}
              <div className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6">
                <h2 className="text-xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4">Member Payment Status</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-black/40 rounded-lg border border-[#D4AF37]/20">
                    <div className="text-2xl text-green-400 mb-2">{members.filter(m => m.totalPaid > 0).length}</div>
                    <div className="text-sm text-white/60">Paid Members</div>
                  </div>
                  <div className="text-center p-4 bg-black/40 rounded-lg border border-[#D4AF37]/20">
                    <div className="text-2xl text-yellow-400 mb-2">{members.filter(m => m.totalPaid === 0).length}</div>
                    <div className="text-sm text-white/60">Unpaid Members</div>
                  </div>
                  <div className="text-center p-4 bg-black/40 rounded-lg border border-[#D4AF37]/20">
                    <div className="text-2xl text-white mb-2">${(totalRevenue / members.length).toFixed(2)}</div>
                    <div className="text-sm text-white/60">Avg Per Member</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Application Review</h1>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-black/60 border border-[#D4AF37]/30 rounded-lg">
                    <span className="text-white/60 text-sm">Pending: </span>
                    <span className="text-white">{applications.filter(a => a.status === 'pending').length}</span>
                  </div>
                  <div className="px-4 py-2 bg-black/60 border border-[#D4AF37]/30 rounded-lg">
                    <span className="text-white/60 text-sm">Approved: </span>
                    <span className="text-green-500">{applications.filter(a => a.status === 'approved').length}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-6 hover:border-[#D4AF37]/60 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-xl text-white">{app.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            app.age < 21 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {app.age < 21 ? '❌ UNDER 21' : '✓ 21+'}
                          </span>
                          {app.status === 'pending' && (
                            <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                              PENDING REVIEW
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                          <div>
                            <span className="text-white/60">Email:</span>
                            <p className="text-white break-all">{app.email}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Phone:</span>
                            <p className="text-white">{app.phone}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Profession:</span>
                            <p className="text-white">{app.profession}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Instagram:</span>
                            <a
                              href={`https://instagram.com/${app.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:underline hover:text-white/80"
                            >
                              {app.instagram}
                            </a>
                          </div>
                          <div>
                            <span className="text-white/60">Date of Birth:</span>
                            <p className="text-white">{app.dob} (Age: {app.age})</p>
                          </div>
                          <div>
                            <span className="text-white/60">Referred By:</span>
                            <p className="text-white">{app.referralCode || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Submitted:</span>
                            <p className="text-white">{new Date(app.submittedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-4">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="px-3 md:px-4 py-2 bg-black/60 border border-[#D4AF37]/30 text-white rounded hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <Image size={16} />
                          <span className="hidden sm:inline">View Photos</span>
                          <span className="sm:hidden">Photos</span>
                        </button>
                        <button
                          onClick={() => sendMessage(app.name)}
                          className="px-3 md:px-4 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded hover:bg-blue-500/30 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <Mail size={16} />
                          <span className="hidden sm:inline">Message</span>
                        </button>
                        {app.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(app.id)}
                              disabled={app.age < 21}
                              className={`px-3 md:px-4 py-2 rounded transition-all flex items-center justify-center gap-2 text-sm ${
                                app.age < 21
                                  ? 'bg-gray-500/20 border border-gray-500/30 text-gray-500 cursor-not-allowed'
                                  : 'bg-green-500/20 border border-green-400/30 text-green-400 hover:bg-green-500/30'
                              }`}
                            >
                              <Check size={16} />
                              <span className="hidden sm:inline">Approve</span>
                            </button>
                            <button
                              onClick={() => handleDeny(app.id)}
                              className="px-3 md:px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-400 rounded hover:bg-red-500/30 transition-all flex items-center justify-center gap-2 text-sm"
                            >
                              <Ban size={16} />
                              <span className="hidden sm:inline">Deny</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h1 className="text-3xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Member Management</h1>
                <div className="flex gap-4">
                  <div className="px-4 py-2 bg-black/60 border border-[#D4AF37]/30 rounded-lg">
                    <span className="text-white/60 text-sm">Total Revenue: </span>
                    <span className="text-green-400">${totalRevenue}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Member Photo */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-black/40 border border-[#D4AF37]/30 rounded-lg flex items-center justify-center">
                          {member.facePhoto ? (
                            <img src={member.facePhoto} alt={member.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <span className="text-white/40 text-xs">No Photo</span>
                          )}
                        </div>
                      </div>

                      {/* Member Info */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div>
                            <h3 className="text-lg md:text-xl text-white mb-2">{member.name}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs md:text-sm">
                              <div>
                                <span className="text-white/60">Member #: </span>
                                <span className="text-white">{member.memberNumber}</span>
                              </div>
                              <div>
                                <span className="text-white/60">Code: </span>
                                <span className="text-white">{member.code}</span>
                              </div>
                              <div>
                                <span className="text-white/60">Referred by: </span>
                                <span className="text-white">{member.referralCode}</span>
                              </div>
                              <div>
                                <span className="text-white/60">Total Paid: </span>
                                <span className="text-green-400">${member.totalPaid}</span>
                              </div>
                              <div>
                                <span className="text-white/60">Events Attended: </span>
                                <span className="text-white">{member.eventAttendance.filter(e => e.attended).length} / {member.eventAttendance.length}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedMember(member)}
                              className="px-4 py-2 bg-black/60 border border-[#D4AF37]/30 text-white rounded hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all text-sm flex items-center gap-2"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => sendMessage(member.name)}
                              className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded hover:bg-blue-500/30 transition-all text-sm flex items-center gap-2"
                            >
                              <Mail size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'communications' && (
            <div className="space-y-6">
              <h1 className="text-3xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Bulk Communications</h1>
              
              <div className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6 space-y-6">
                <div>
                  <label className="block text-white/90 mb-2">Message Type</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setBulkMessageType('email')}
                      className={`px-6 py-3 rounded-lg transition-all border ${
                        bulkMessageType === 'email'
                          ? 'bg-black/60 border-[#D4AF37]/30 text-white shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                          : 'bg-black/40 border-[#D4AF37]/20 text-white/60 hover:bg-black/50 hover:text-white'
                      }`}
                    >
                      📧 Email
                    </button>
                    <button
                      onClick={() => setBulkMessageType('sms')}
                      className={`px-6 py-3 rounded-lg transition-all border ${
                        bulkMessageType === 'sms'
                          ? 'bg-black/60 border-[#D4AF37]/30 text-white shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                          : 'bg-black/40 border-[#D4AF37]/20 text-white/60 hover:bg-black/50 hover:text-white'
                      }`}
                    >
                      💬 SMS
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-white/90 mb-2">Recipients</label>
                  <select
                    value={bulkRecipients}
                    onChange={(e) => setBulkRecipients(e.target.value as any)}
                    className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/30 rounded-lg text-white focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                  >
                    <option value="all">All Members & Applicants ({members.length + applications.length})</option>
                    <option value="members">Members Only ({members.length})</option>
                    <option value="applicants">Applicants Only ({applications.length})</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/90 mb-2">
                    {bulkMessageType === 'email' ? 'Email Subject' : 'Message Subject'}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter subject line..."
                    className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/30 rounded-lg text-white placeholder:text-white/40 focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/90 mb-2">Message</label>
                  <textarea
                    value={bulkMessage}
                    onChange={(e) => setBulkMessage(e.target.value)}
                    placeholder={bulkMessageType === 'email' ? 'Compose your email...' : 'Compose your text message...'}
                    rows={8}
                    className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/30 rounded-lg text-white placeholder:text-white/40 focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                  />
                  <p className="text-white/50 text-sm mt-2">
                    {bulkMessageType === 'sms' && `${bulkMessage.length}/160 characters`}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const count = bulkRecipients === 'all' 
                        ? members.length + applications.length
                        : bulkRecipients === 'members' 
                        ? members.length 
                        : applications.length;
                      if (confirm(`Send ${bulkMessageType} to ${count} recipients?`)) {
                        setConfirmationModal({
                          isOpen: true,
                          message: `${bulkMessageType === 'email' ? 'Email' : 'SMS'} sent to ${count} recipients!`,
                          title: '📨 Message Sent',
                          type: 'success'
                        });
                        setBulkMessage('');
                      }
                    }}
                    disabled={!bulkMessage}
                    className={`px-6 py-3 rounded-lg transition-all border ${
                      bulkMessage
                        ? 'bg-black/60 border-[#D4AF37]/30 text-white hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                        : 'bg-black/40 border-gray-600/30 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    Send {bulkMessageType === 'email' ? 'Email' : 'SMS'}
                  </button>
                  <button
                    onClick={() => setBulkMessage('')}
                    className="px-6 py-3 bg-black/40 border border-[#D4AF37]/20 text-white/60 rounded-lg hover:bg-black/50 hover:text-white transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portal-management' && (
            <div className="space-y-6">
              <h1 className="text-3xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Member Portal Management</h1>
              
              {/* Event Management */}
              <div className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6">
                <h2 className="text-xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4">Event Management</h2>
                
                <button className="px-4 py-2 bg-black/60 border border-[#D4AF37]/30 text-white rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all mb-4">
                  + Add New Event
                </button>

                <div className="space-y-4">
                  {/* Example Event */}
                  <div className="p-4 bg-black/40 border border-[#D4AF37]/20 rounded-lg">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-white text-lg mb-2">When in Rome</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-white/60">Date: </span>
                            <span className="text-white">March 29, 2026</span>
                          </div>
                          <div>
                            <span className="text-white/60">Time: </span>
                            <span className="text-white">10 PM - 4 AM</span>
                          </div>
                          <div>
                            <span className="text-white/60">Venue: </span>
                            <span className="text-white">Hacienda Brooklyn</span>
                          </div>
                          <div>
                            <span className="text-white/60">Price: </span>
                            <span className="text-green-400">$125</span>
                          </div>
                          <div>
                            <span className="text-white/60">Tickets Sold: </span>
                            <span className="text-white">2 / 200</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded hover:bg-blue-500/30 transition-all text-sm">
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-red-500/20 border border-red-400/30 text-red-400 rounded hover:bg-red-500/30 transition-all text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6">
                <h2 className="text-xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4">Announcements</h2>
                
                <div className="space-y-4 mb-4">
                  <div>
                    <label className="block text-white/90 mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="Announcement title..."
                      className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/30 rounded-lg text-white placeholder:text-white/40 focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-2">Message</label>
                    <textarea
                      placeholder="Announcement message..."
                      rows={4}
                      className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/30 rounded-lg text-white placeholder:text-white/40 focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                    />
                  </div>
                  <button className="px-4 py-2 bg-black/60 border border-[#D4AF37]/30 text-white rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
                    Post Announcement
                  </button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-white mb-2">Recent Announcements</h3>
                  <div className="p-3 bg-black/40 border border-[#D4AF37]/20 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white">Welcome to VAULT54!</h4>
                      <button className="text-red-400 text-sm hover:text-red-300">Delete</button>
                    </div>
                    <p className="text-white/60 text-sm">Thank you for joining our exclusive community...</p>
                    <p className="text-white/40 text-xs mt-2">Posted: Jan 15, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h1 className="text-3xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Site Settings</h1>
              
              <div className="bg-black/60 backdrop-blur-xl border border-[#D4AF37]/30 rounded-xl p-4 md:p-6 space-y-6">
                <div>
                  <label className="block text-white/90 mb-2">Base Member Count (shown as 50+)</label>
                  <input
                    type="number"
                    defaultValue={50}
                    className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/30 rounded-lg text-white focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-white/90 mb-2">Base Applicant Count (shown as 65+)</label>
                  <input
                    type="number"
                    defaultValue={65}
                    className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/30 rounded-lg text-white focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/90 mb-2">Notification Email</label>
                  <input
                    type="email"
                    defaultValue="vault54nyc@gmail.com"
                    className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/30 rounded-lg text-white focus:border-[#D4AF37]/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                  />
                </div>

                <button className="px-6 py-3 bg-black/60 border border-[#D4AF37]/30 text-white rounded-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Photo Review Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/90 border border-[#D4AF37]/30 rounded-2xl p-4 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">Photos - {selectedApplication.name}</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-white/90">Face Photo</label>
                <div className="aspect-square bg-black/40 border border-[#D4AF37]/30 rounded-lg flex items-center justify-center">
                  <span className="text-white/40">Photo placeholder</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white/90">Body Photo</label>
                <div className="aspect-square bg-black/40 border border-[#D4AF37]/30 rounded-lg flex items-center justify-center">
                  <span className="text-white/40">Photo placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black/70 border border-[#D4AF37]/30 rounded-2xl p-4 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] font-bold">{selectedMember.name}</h2>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Application Photos Section */}
              <div className="border-b border-[#D4AF37]/30 pb-6">
                <h3 className="text-lg text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4 font-bold">Application Photos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-white/90 text-sm text-[16px]">Face Photo</label>
                    <div className="aspect-square bg-black/30 border border-[#D4AF37]/30 rounded-lg flex items-center justify-center overflow-hidden">
                      {selectedMember.facePhoto ? (
                        <img src={selectedMember.facePhoto} alt={`${selectedMember.name} - Face`} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white/40 text-sm">No Photo</span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/90 text-sm text-[16px]">Body Photo</label>
                    <div className="aspect-square bg-black/30 border border-[#D4AF37]/30 rounded-lg flex items-center justify-center overflow-hidden">
                      {selectedMember.bodyPhoto ? (
                        <img src={selectedMember.bodyPhoto} alt={`${selectedMember.name} - Body`} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white/40 text-sm">No Photo</span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/90 text-sm text-[16px]">Additional Photo</label>
                    <div className="aspect-square bg-black/30 border border-[#D4AF37]/30 rounded-lg flex items-center justify-center overflow-hidden">
                      {selectedMember.additionalPhoto ? (
                        <img src={selectedMember.additionalPhoto} alt={`${selectedMember.name} - Additional`} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white/40 text-sm">Optional</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="border-b border-[#D4AF37]/30 pb-6">
                <h3 className="text-lg text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4 font-bold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Full Name</span>
                    <span className="text-white">{selectedMember.name}</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Date of Birth</span>
                    <span className="text-white">{selectedMember.dob} (Age: {selectedMember.age})</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Email</span>
                    <span className="text-white break-all">{selectedMember.email}</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Phone</span>
                    <span className="text-white">{selectedMember.phone}</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Profession/Industry</span>
                    <span className="text-white">{selectedMember.profession}</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Instagram Handle</span>
                    <a href={`https://instagram.com/${selectedMember.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-white hover:underline hover:text-white/80">
                      {selectedMember.instagram}
                    </a>
                  </div>
                </div>
              </div>

              {/* Membership Details */}
              <div className="border-b border-[#D4AF37]/30 pb-6">
                <h3 className="text-lg text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4 font-bold">Membership Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Member Number</span>
                    <span className="text-white">{selectedMember.memberNumber}</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Access Code</span>
                    <span className="text-white">{selectedMember.code}</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Role</span>
                    <span className="text-white">{selectedMember.role}</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Status</span>
                    <span className={selectedMember.status === 'active' ? 'text-green-400' : 'text-red-400'}>
                      {selectedMember.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Referred By</span>
                    <span className="text-white">{selectedMember.referralCode}</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Joined Date</span>
                    <span className="text-white">{new Date(selectedMember.joinedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Application Date</span>
                    <span className="text-white">{new Date(selectedMember.applicationDate).toLocaleDateString()}</span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Events Attended</span>
                    <span className="text-white">{selectedMember.eventAttendance.filter(e => e.attended).length} / {selectedMember.eventAttendance.length}</span>
                  </div>
                </div>
              </div>

              {/* Application Agreements */}
              <div className="border-b border-[#D4AF37]/30 pb-6">
                <h3 className="text-lg text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-4 font-bold">Application Agreements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">Terms of Service</span>
                    <span className={selectedMember.termsAccepted ? 'text-green-400' : 'text-red-400'}>
                      {selectedMember.termsAccepted ? '✓ Accepted' : '✗ Not Accepted'}
                    </span>
                  </div>
                  <div className="p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg">
                    <span className="text-white/60 block mb-1">NDA Agreement</span>
                    <span className={selectedMember.ndaAccepted ? 'text-green-400' : 'text-red-400'}>
                      {selectedMember.ndaAccepted ? '✓ Accepted' : '✗ Not Accepted'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="border-t border-[#D4AF37]/30 pt-4">
                <h3 className="text-lg text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-3 font-bold">Financial Summary</h3>
                <div className="p-4 bg-black/30 border border-[#D4AF37]/20 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Total Paid</span>
                    <span className="text-green-400 text-2xl">${selectedMember.totalPaid}</span>
                  </div>
                </div>

                {selectedMember.eventsPaid.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm text-white/90 mb-2">Event Payments</h4>
                    {selectedMember.eventsPaid.map((payment, idx) => (
                      <div key={idx} className="flex justify-between p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg text-sm">
                        <span className="text-white">{payment.eventName}</span>
                        <div className="text-right">
                          <div className="text-green-400">${payment.amount}</div>
                          <div className="text-white/50 text-xs">{new Date(payment.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Event Attendance */}
              <div className="border-t border-[#D4AF37]/30 pt-4">
                <h3 className="text-lg text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-3 font-bold">Event Attendance</h3>
                {selectedMember.eventAttendance.length > 0 ? (
                  <div className="space-y-2">
                    {selectedMember.eventAttendance.map((event, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-black/30 border border-[#D4AF37]/20 rounded-lg text-sm">
                        <div>
                          <div className="text-white">{event.eventName}</div>
                          <div className="text-white/50 text-xs">{new Date(event.date).toLocaleDateString()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {event.attended ? (
                            <>
                              <span className="text-green-400">✓ Attended</span>
                              {event.checkedInAt && (
                                <span className="text-white/50 text-xs">@ {new Date(event.checkedInAt).toLocaleTimeString()}</span>
                              )}
                            </>
                          ) : (
                            <span className="text-yellow-400">⏳ Upcoming</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/50 text-sm">No event attendance recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationModal && (
        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          message={confirmationModal.message}
          title={confirmationModal.title}
          type={confirmationModal.type}
          onClose={() => setConfirmationModal(null)}
        />
      )}
      </div>
    </div>
  );
};