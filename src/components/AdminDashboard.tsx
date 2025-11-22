import React, { useState, useEffect } from 'react';
import { X, Check, Ban, Mail, Settings, Users, FileText, BarChart3, Key } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ApprovalModal, ApprovalData } from './ApprovalModal';
import { AccessCodeManager } from './AccessCodeManager';
import { ConfirmationModal } from './ConfirmationModal';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  instagram: string;
  dob: string;
  age: number;
  face_photo_url?: string;
  body_photo_url?: string;
  additional_photos?: string[];
  status: 'pending' | 'approved' | 'denied';
  submitted_at: string;
  referral_code?: string;
  sexual_role?: string;
  terms_accepted: boolean;
  nda_accepted: boolean;
}

interface Member {
  id: string;
  member_number: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  instagram: string;
  dob: string;
  age: number;
  username: string;
  role: string;
  status: 'active' | 'inactive';
  referral_code?: string;
  joined_date: string;
  total_paid: number;
  face_photo_url?: string;
  body_photo_url?: string;
}

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

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [applications, setApplications] = useState<Application[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [currentApplicant, setCurrentApplicant] = useState<{ id: string; name: string; email: string } | null>(null);
  const [confirmationModal, setConfirmationModal] = useState<{ isOpen: boolean; message: string; title?: string; type?: 'success' | 'info' | 'warning' } | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load data from Supabase
  useEffect(() => {
    loadApplications();
    loadMembers();
    loadAccessCodes();
  }, []);

  const loadApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('joined_date', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const loadAccessCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('access_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAccessCodes(data || []);
    } catch (error) {
      console.error('Error loading access codes:', error);
    }
  };

  const handleApprove = (appId: string) => {
    const app = applications.find(a => a.id === appId);
    if (app) {
      setCurrentApplicant({ id: app.id, name: app.name, email: app.email });
      setShowApprovalModal(true);
    }
  };

  const handleApprovalSubmit = async (approvalData: ApprovalData) => {
    if (!currentApplicant) return;

    try {
      const application = applications.find(a => a.id === currentApplicant.id);
      if (!application) return;

      // Hash password (in production, use bcrypt)
      const passwordHash = btoa(approvalData.password); // Simple encoding for demo

      // Create member record
      const { data: member, error: memberError } = await supabase
        .from('members')
        .insert({
          member_number: approvalData.memberNumber,
          name: application.name,
          email: application.email,
          phone: application.phone,
          profession: application.profession,
          instagram: application.instagram,
          dob: application.dob,
          age: application.age,
          username: approvalData.username,
          password_hash: passwordHash,
          role: approvalData.role,
          status: 'active',
          referral_code: application.referral_code,
          face_photo_url: application.face_photo_url,
          body_photo_url: application.body_photo_url,
          additional_photos: application.additional_photos,
          application_date: application.submitted_at,
          approved_at: new Date().toISOString(),
          terms_accepted: application.terms_accepted,
          nda_accepted: application.nda_accepted
        })
        .select()
        .single();

      if (memberError) throw memberError;

      // Update application status
      const { error: updateError } = await supabase
        .from('applications')
        .update({ status: 'approved' })
        .eq('id', currentApplicant.id);

      if (updateError) throw updateError;

      // Reload data
      await loadApplications();
      await loadMembers();

      setConfirmationModal({
        isOpen: true,
        message: `Application approved! Member created with username: ${approvalData.username}. Welcome email will be sent with login credentials.`,
        title: '✅ Application Approved',
        type: 'success'
      });

      setShowApprovalModal(false);
      setCurrentApplicant(null);
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Error approving application. Please try again.');
    }
  };

  const handleDeny = async (appId: string) => {
    if (!confirm('Are you sure you want to deny this application?')) return;

    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: 'denied' })
        .eq('id', appId);

      if (error) throw error;

      await loadApplications();

      setConfirmationModal({
        isOpen: true,
        message: 'Application denied. Notification email sent.',
        title: '❌ Application Denied',
        type: 'warning'
      });
    } catch (error) {
      console.error('Error denying application:', error);
      alert('Error denying application. Please try again.');
    }
  };

  const handleCreateAccessCode = async (codeData: Partial<AccessCode>) => {
    try {
      const { error } = await supabase
        .from('access_codes')
        .insert(codeData);

      if (error) throw error;

      await loadAccessCodes();

      setConfirmationModal({
        isOpen: true,
        message: `Access code "${codeData.code}" created successfully!`,
        title: '✅ Code Created',
        type: 'success'
      });
    } catch (error) {
      console.error('Error creating access code:', error);
      alert('Error creating access code. Please try again.');
    }
  };

  const handleUpdateAccessCode = async (id: string, updates: Partial<AccessCode>) => {
    try {
      const { error } = await supabase
        .from('access_codes')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await loadAccessCodes();
    } catch (error) {
      console.error('Error updating access code:', error);
      alert('Error updating access code. Please try again.');
    }
  };

  const handleDeleteAccessCode = async (id: string) => {
    if (!confirm('Are you sure you want to delete this access code?')) return;

    try {
      const { error } = await supabase
        .from('access_codes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await loadAccessCodes();
    } catch (error) {
      console.error('Error deleting access code:', error);
      alert('Error deleting access code. Please try again.');
    }
  };

  const totalRevenue = members.reduce((sum, m) => sum + (m.total_paid || 0), 0);
  const pendingApplications = applications.filter(a => a.status === 'pending');

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://pub-9d626ca0cdc24f10b1eafa376be49b92.r2.dev/BorcellE%20(1).png)',
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Content */}
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
          {/* Sidebar */}
          <aside className={`${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:relative z-40 w-64 bg-black md:bg-black/60 backdrop-blur-xl border-r border-[#D4AF37]/30 p-4 md:p-6 transition-transform duration-300 h-full`}>
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'applications', label: 'Applications', icon: FileText },
                { id: 'members', label: 'Members', icon: Users },
                { id: 'access-codes', label: 'Access Codes', icon: Key },
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

          {/* Mobile overlay */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-30 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-white/60">Loading...</div>
              </div>
            ) : (
              <>
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-black/40 border border-[#D4AF37]/30 rounded-lg p-6">
                        <div className="text-white/60 text-sm mb-2">Total Members</div>
                        <div className="text-3xl font-bold text-white">{members.length}</div>
                      </div>
                      <div className="bg-black/40 border border-[#D4AF37]/30 rounded-lg p-6">
                        <div className="text-white/60 text-sm mb-2">Pending Applications</div>
                        <div className="text-3xl font-bold text-[#D4AF37]">{pendingApplications.length}</div>
                      </div>
                      <div className="bg-black/40 border border-[#D4AF37]/30 rounded-lg p-6">
                        <div className="text-white/60 text-sm mb-2">Total Applications</div>
                        <div className="text-3xl font-bold text-white">{applications.length}</div>
                      </div>
                      <div className="bg-black/40 border border-[#D4AF37]/30 rounded-lg p-6">
                        <div className="text-white/60 text-sm mb-2">Total Revenue</div>
                        <div className="text-3xl font-bold text-white">${totalRevenue}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Applications Tab */}
                {activeTab === 'applications' && (
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-white mb-6">Applications</h1>
                    
                    {applications.length === 0 ? (
                      <div className="text-center py-12 text-white/60">
                        No applications yet
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {applications.map((app) => (
                          <div
                            key={app.id}
                            className="bg-black/40 border border-[#D4AF37]/30 rounded-lg p-6"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-white">{app.name}</h3>
                                <p className="text-white/60 text-sm">{app.email}</p>
                                <p className="text-white/60 text-sm">{app.phone}</p>
                              </div>
                              <span className={`px-3 py-1 rounded text-sm ${
                                app.status === 'pending' 
                                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                  : app.status === 'approved'
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}>
                                {app.status.toUpperCase()}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                              <div>
                                <span className="text-white/60">Profession:</span>
                                <span className="text-white ml-2">{app.profession}</span>
                              </div>
                              <div>
                                <span className="text-white/60">Age:</span>
                                <span className="text-white ml-2">{app.age}</span>
                              </div>
                              <div>
                                <span className="text-white/60">Instagram:</span>
                                <span className="text-white ml-2">{app.instagram}</span>
                              </div>
                              <div>
                                <span className="text-white/60">Submitted:</span>
                                <span className="text-white ml-2">
                                  {new Date(app.submitted_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            {app.status === 'pending' && (
                              <div className="flex gap-3 pt-4 border-t border-white/10">
                                <button
                                  onClick={() => handleApprove(app.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded hover:bg-green-500/30 transition-colors"
                                >
                                  <Check size={18} />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleDeny(app.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded hover:bg-red-500/30 transition-colors"
                                >
                                  <Ban size={18} />
                                  Deny
                                </button>
                                <button
                                  onClick={() => setSelectedApplication(app)}
                                  className="flex items-center gap-2 px-4 py-2 bg-black/40 text-white border border-[#D4AF37]/30 rounded hover:bg-black/60 transition-colors"
                                >
                                  View Details
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Members Tab */}
                {activeTab === 'members' && (
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-white mb-6">Members</h1>
                    
                    {members.length === 0 ? (
                      <div className="text-center py-12 text-white/60">
                        No members yet
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {members.map((member) => (
                          <div
                            key={member.id}
                            className="bg-black/40 border border-[#D4AF37]/30 rounded-lg p-6"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <div className="text-white/60 text-xs mb-1">{member.member_number}</div>
                                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                                <p className="text-white/60 text-sm">{member.role}</p>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs ${
                                member.status === 'active'
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}>
                                {member.status}
                              </span>
                            </div>
                            
                            <div className="space-y-2 text-sm mb-4">
                              <div>
                                <span className="text-white/60">Username:</span>
                                <span className="text-white ml-2">{member.username}</span>
                              </div>
                              <div>
                                <span className="text-white/60">Email:</span>
                                <span className="text-white ml-2 text-xs">{member.email}</span>
                              </div>
                              <div>
                                <span className="text-white/60">Joined:</span>
                                <span className="text-white ml-2">
                                  {new Date(member.joined_date).toLocaleDateString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-white/60">Total Paid:</span>
                                <span className="text-white ml-2">${member.total_paid || 0}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => setSelectedMember(member)}
                              className="w-full px-4 py-2 bg-black/40 text-white border border-[#D4AF37]/30 rounded hover:bg-black/60 transition-colors text-sm"
                            >
                              View Details
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Access Codes Tab */}
                {activeTab === 'access-codes' && (
                  <AccessCodeManager
                    codes={accessCodes}
                    onCreateCode={handleCreateAccessCode}
                    onUpdateCode={handleUpdateAccessCode}
                    onDeleteCode={handleDeleteAccessCode}
                  />
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
                    <div className="bg-black/40 border border-[#D4AF37]/30 rounded-lg p-6">
                      <p className="text-white/60">Settings coming soon...</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Modals */}
      {showApprovalModal && currentApplicant && (
        <ApprovalModal
          isOpen={showApprovalModal}
          onClose={() => {
            setShowApprovalModal(false);
            setCurrentApplicant(null);
          }}
          onApprove={handleApprovalSubmit}
          applicantName={currentApplicant.name}
          applicantEmail={currentApplicant.email}
        />
      )}

      {confirmationModal?.isOpen && (
        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          onClose={() => setConfirmationModal(null)}
          message={confirmationModal.message}
          title={confirmationModal.title}
          type={confirmationModal.type}
        />
      )}
    </div>
  );
};
