import React, { useState, useRef, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { FrostedGlassButton } from './FrostedGlassButton';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  skipNDA?: boolean;
  syndicateData?: { weekendSpending: string; membershipValuePerception: string } | null;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  skipNDA = false,
  syndicateData = null,
}) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  // Step 1 fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [instagram, setInstagram] = useState('');
  const [referralCode, setReferralCode] = useState('');
  
  // Validation errors
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    profession?: string;
    instagram?: string;
    dob?: string;
  }>({});
  
  // Step 2 - NDA
  const [ndaScrolled, setNdaScrolled] = useState(false);
  const [ndaRead, setNdaRead] = useState(false);
  const [ndaAccepted, setNdaAccepted] = useState(false);
  const ndaRef = useRef<HTMLDivElement>(null);

  // Effect to skip NDA step if coming from Syndicate Bridge
  useEffect(() => {
    if (skipNDA && isOpen) {
      // Mark NDA as already accepted
      setNdaScrolled(true);
      setNdaRead(true);
      setNdaAccepted(true);
    }
  }, [skipNDA, isOpen]);
  
  // Step 3 - Vision
  const [visionScrolled, setVisionScrolled] = useState(false);
  const [visionRead, setVisionRead] = useState(false);
  const [visionAccepted, setVisionAccepted] = useState(false);
  const visionRef = useRef<HTMLDivElement>(null);
  
  // Step 4 - Photos
  const [facePhoto, setFacePhoto] = useState<File | null>(null);
  const [bodyPhoto, setBodyPhoto] = useState<File | null>(null);
  const [additionalPhoto, setAdditionalPhoto] = useState<File | null>(null);
  const [dob, setDob] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsOpened, setTermsOpened] = useState(false);
  const [instagramVerified, setInstagramVerified] = useState(false);

  const handleNdaScroll = () => {
    if (ndaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = ndaRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setNdaScrolled(true);
      }
    }
  };

  const handleVisionScroll = () => {
    if (visionRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = visionRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setVisionScrolled(true);
      }
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const isOfAge = dob ? calculateAge(dob) >= 21 : false;

  // VALIDATION FUNCTIONS
  const validateEmail = (email: string): string | null => {
    if (!email) return 'Email is required';
    if (!email.includes('@')) return 'Email must contain @';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address (e.g., name@domain.com)';
    if (email.length < 5) return 'Email is too short';
    if (email.length > 100) return 'Email is too long';
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    if (!phone) return 'Phone number is required';
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) return 'Phone number must be at least 10 digits';
    if (digitsOnly.length > 15) return 'Phone number is too long';
    // Check if it's a valid format (allows various formats)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) return 'Phone number contains invalid characters';
    return null;
  };

  const validateFullName = (name: string): string | null => {
    if (!name) return 'Full name is required';
    if (name.trim().length < 2) return 'Name is too short';
    if (name.trim().length > 100) return 'Name is too long';
    // Check for at least first and last name (two words)
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length < 2) return 'Please enter both first and last name';
    // Check for numbers in name
    if (/\d/.test(name)) return 'Name cannot contain numbers';
    // Check for special characters (allow hyphens, apostrophes, and spaces)
    if (!/^[a-zA-Z\s\-']+$/.test(name)) return 'Name contains invalid characters';
    return null;
  };

  const validateInstagram = (handle: string): string | null => {
    if (!handle) return 'Instagram handle is required';
    // Remove @ if present
    const cleanHandle = handle.replace('@', '');
    if (cleanHandle.length < 1) return 'Instagram handle is required';
    if (cleanHandle.length > 30) return 'Instagram handle is too long';
    // Instagram usernames can only contain letters, numbers, periods, and underscores
    const instagramRegex = /^[a-zA-Z0-9._]+$/;
    if (!instagramRegex.test(cleanHandle)) return 'Instagram handle can only contain letters, numbers, periods, and underscores';
    if (cleanHandle.startsWith('.') || cleanHandle.endsWith('.')) return 'Instagram handle cannot start or end with a period';
    if (cleanHandle.includes('..')) return 'Instagram handle cannot have consecutive periods';
    return null;
  };

  const validateProfession = (profession: string): string | null => {
    if (!profession || profession === '') return 'Please select your profession';
    return null;
  };

  const validateDOB = (dob: string): string | null => {
    if (!dob) return 'Date of birth is required';
    const birthDate = new Date(dob);
    const today = new Date();
    // Check if date is valid
    if (isNaN(birthDate.getTime())) return 'Please enter a valid date';
    // Check if date is not in the future
    if (birthDate > today) return 'Date of birth cannot be in the future';
    // Check if person is at least 21
    const age = calculateAge(dob);
    if (age < 21) return `You must be at least 21 years old (currently ${age} years old)`;
    // Check if age is reasonable (not over 100)
    if (age > 100) return 'Please enter a valid date of birth';
    return null;
  };

  // Validate Step 1 before continuing
  const validateStep1 = (): boolean => {
    const newErrors: typeof errors = {};
    
    const nameError = validateFullName(fullName);
    if (nameError) newErrors.fullName = nameError;
    
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(phone);
    if (phoneError) newErrors.phone = phoneError;
    
    const professionError = validateProfession(profession);
    if (professionError) newErrors.profession = professionError;
    
    const instagramError = validateInstagram(instagram);
    if (instagramError) newErrors.instagram = instagramError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Step 4 (DOB) before submitting
  const validateStep4 = (): boolean => {
    const newErrors: typeof errors = {};
    
    const dobError = validateDOB(dob);
    if (dobError) newErrors.dob = dobError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canContinueStep1 = fullName && email && phone && profession && instagram && instagramVerified;
  const canContinueStep2 = ndaRead && ndaAccepted;
  const canContinueStep3 = visionRead && visionAccepted;
  const canSubmitStep4 = facePhoto && bodyPhoto && dob && isOfAge && ageConfirmed && termsAccepted && termsOpened;

  const handleSubmit = () => {
    if (!isOfAge) {
      alert('You must be at least 21 years old to submit this application.');
      return;
    }
    
    // TODO: Send application data to backend API
    // const applicationData = {
    //   fullName,
    //   email,
    //   phone,
    //   profession,
    //   instagram,
    //   dob,
    //   age: calculateAge(dob),
    //   ...(syndicateData && {
    //     weekendSpending: syndicateData.weekendSpending,
    //     membershipValuePerception: syndicateData.membershipValuePerception,
    //     source: 'Syndicate Bridge'
    //   })
    // };
    // await fetch('/api/applications', {
    //   method: 'POST',
    //   body: JSON.stringify(applicationData)
    // });
    
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Holographic glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 via-purple-500/10 to-blue-500/10 blur-xl" />
        
        <div 
          className="
            relative
            bg-black/60
            backdrop-blur-2xl 
            border border-[#D4AF37]/30
            rounded-2xl
            shadow-[0_0_40px_rgba(212,175,55,0.3)]
            p-8
          "
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4 
              text-white/60 
              hover:text-white 
              transition-colors
              z-10
            "
          >
            <X size={24} />
          </button>

          {!submitted ? (
            <>
              {/* STEP 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-white text-center text-3xl drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Step 1 of 4: Basic Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/90 mb-2">Full Name (Required)</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          // Clear error when user starts typing
                          if (errors.fullName) {
                            setErrors({ ...errors, fullName: undefined });
                          }
                        }}
                        className={`w-full px-4 py-3 bg-black/40 backdrop-blur-md border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all ${
                          errors.fullName
                            ? 'border-red-500/70 focus:border-red-500/90'
                            : 'border-[#D4AF37]/30 focus:border-[#D4AF37]/50'
                        }`}
                        placeholder="John Doe"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      />
                      {errors.fullName && <p className="text-red-400 text-sm mt-2">❌ {errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Email Address (Required)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors({ ...errors, email: undefined });
                          }
                        }}
                        className={`w-full px-4 py-3 bg-black/40 backdrop-blur-md border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all ${
                          errors.email
                            ? 'border-red-500/70 focus:border-red-500/90'
                            : 'border-[#D4AF37]/30 focus:border-[#D4AF37]/50'
                        }`}
                        placeholder="name@domain.com"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-2">❌ {errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Phone Number (Required)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) {
                            setErrors({ ...errors, phone: undefined });
                          }
                        }}
                        className={`w-full px-4 py-3 bg-black/40 backdrop-blur-md border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all ${
                          errors.phone
                            ? 'border-red-500/70 focus:border-red-500/90'
                            : 'border-[#D4AF37]/30 focus:border-[#D4AF37]/50'
                        }`}
                        placeholder="+1 (555) 123-4567"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      />
                      {errors.phone && <p className="text-red-400 text-sm mt-2">❌ {errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Profession / Industry (Required)</label>
                      <select
                        value={profession}
                        onChange={(e) => {
                          setProfession(e.target.value);
                          if (errors.profession) {
                            setErrors({ ...errors, profession: undefined });
                          }
                        }}
                        className={`w-full px-4 py-3 bg-black/40 backdrop-blur-md border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all ${
                          errors.profession
                            ? 'border-red-500/70 focus:border-red-500/90'
                            : 'border-[#D4AF37]/30 focus:border-[#D4AF37]/50'
                        }`}
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        <option value="">Select your profession</option>
                        <option value="Finance & Banking">Finance & Banking</option>
                        <option value="Technology">Technology</option>
                        <option value="Legal">Legal</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Entertainment & Media">Entertainment & Media</option>
                        <option value="Fashion & Design">Fashion & Design</option>
                        <option value="Consulting">Consulting</option>
                        <option value="Entrepreneurship">Entrepreneurship</option>
                        <option value="Arts & Culture">Arts & Culture</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.profession && <p className="text-red-400 text-sm mt-2">❌ {errors.profession}</p>}
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Instagram Handle (Required)</label>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={instagram}
                            onChange={(e) => {
                              setInstagram(e.target.value);
                              setInstagramVerified(false);
                              if (errors.instagram) {
                                setErrors({ ...errors, instagram: undefined });
                              }
                            }}
                            placeholder="@username"
                            className={`flex-1 px-4 py-3 bg-black/40 backdrop-blur-md border rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all ${
                              errors.instagram
                                ? 'border-red-500/70 focus:border-red-500/90'
                                : 'border-[#D4AF37]/30 focus:border-[#D4AF37]/50'
                            }`}
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const validationError = validateInstagram(instagram);
                              if (validationError) {
                                setErrors({ ...errors, instagram: validationError });
                                return;
                              }
                              if (instagram) {
                                window.open(`https://instagram.com/${instagram.replace('@', '')}`, '_blank');
                                setTimeout(() => {
                                  const confirmed = window.confirm('Have you confirmed this is your Instagram profile?');
                                  if (confirmed) {
                                    setInstagramVerified(true);
                                    alert('Instagram verified! ✓');
                                  }
                                }, 2000);
                              }
                            }}
                            className={`px-4 py-3 backdrop-blur-md border rounded-lg transition-all whitespace-nowrap ${
                              instagramVerified
                                ? 'bg-green-500/20 border-green-500/40 text-green-400'
                                : 'bg-black/60 border-[#D4AF37]/30 text-white hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]'
                            }`}
                          >
                            {instagramVerified ? '✓ Verified' : 'Verify'}
                          </button>
                        </div>
                        {errors.instagram && <p className="text-red-400 text-sm">❌ {errors.instagram}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Referral Code (Optional)</label>
                      <input
                        type="text"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <FrostedGlassButton
                      onClick={() => {
                        if (validateStep1()) {
                          setStep(2);
                        }
                      }}
                      className={`${!canContinueStep1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Continue to NDA →
                    </FrostedGlassButton>
                  </div>
                </div>
              )}

              {/* STEP 2: NDA */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-white text-center text-3xl drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Step 2 of 4: Non-Disclosure Agreement
                  </h2>

                  <div
                    ref={ndaRef}
                    onScroll={handleNdaScroll}
                    className="h-64 overflow-y-auto p-4 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg text-white/80 space-y-4"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    <h3 className="text-white">CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT</h3>
                    
                    <p>This Confidentiality and Non-Disclosure Agreement ("Agreement") is entered into by and between VAULT54 ("Disclosing Party") and the undersigned applicant ("Receiving Party").</p>
                    
                    <p><strong>1. DEFINITION OF CONFIDENTIAL INFORMATION</strong></p>
                    <p>"Confidential Information" refers to any and all information related to VAULT54, including but not limited to: member identities, event locations, activities, communications, images, videos, member lists, operational details, and any other proprietary information disclosed through membership or application.</p>
                    
                    <p><strong>2. OBLIGATIONS OF RECEIVING PARTY</strong></p>
                    <p>The Receiving Party agrees to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Hold all Confidential Information in strict confidence</li>
                      <li>Not disclose any Confidential Information to third parties</li>
                      <li>Not use Confidential Information for any purpose other than participation in VAULT54</li>
                      <li>Not photograph, record, or document any events, members, or activities</li>
                      <li>Not discuss VAULT54, its members, or activities on social media or any public forum</li>
                    </ul>
                    
                    <p><strong>3. PROHIBITED DISCLOSURES</strong></p>
                    <p>The Receiving Party specifically agrees never to disclose:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The identity of any VAULT54 member</li>
                      <li>Event locations, dates, or attendance</li>
                      <li>Any activities, conversations, or interactions that occur at events</li>
                      <li>Any images, likenesses, or identifying information about members</li>
                    </ul>
                    
                    <p><strong>4. NO PHOTOGRAPHY OR RECORDING</strong></p>
                    <p>The Receiving Party acknowledges that all electronic devices capable of photography, video recording, or audio recording are strictly prohibited at all VAULT54 events and agrees never to create, possess, or distribute any such recordings.</p>
                    
                    <p><strong>5. DURATION</strong></p>
                    <p>This Agreement remains in effect indefinitely, surviving termination of membership and continuing in perpetuity.</p>
                    
                    <p><strong>6. CONSEQUENCES OF BREACH</strong></p>
                    <p>The Receiving Party understands that breach of this Agreement may result in immediate termination of membership, legal action, and liability for all damages, including but not limited to reputational harm to VAULT54 or its members.</p>
                    
                    <p><strong>7. GOVERNING LAW</strong></p>
                    <p>This Agreement shall be governed by the laws of the State of New York.</p>
                    
                    <p className="text-white">By checking the boxes below, you acknowledge that you have read, understand, and agree to be bound by this Non-Disclosure Agreement.</p>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ndaRead}
                        onChange={(e) => setNdaRead(e.target.checked)}
                        disabled={!ndaScrolled}
                        className="mt-1 w-5 h-5 bg-black/40 border-[#D4AF37]/30 rounded checked:bg-[#D4AF37] disabled:opacity-30"
                      />
                      <span className="text-white/80">
                        I have scrolled through and read the entire agreement.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ndaAccepted}
                        onChange={(e) => setNdaAccepted(e.target.checked)}
                        className="mt-1 w-5 h-5 bg-black/40 border-[#D4AF37]/30 rounded checked:bg-[#D4AF37]"
                      />
                      <span className="text-white/80">
                        I accept the terms of this NDA.
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-center gap-4">
                    <FrostedGlassButton onClick={() => setStep(1)}>
                      ← Back
                    </FrostedGlassButton>
                    <FrostedGlassButton
                      onClick={() => setStep(3)}
                      className={`${!canContinueStep2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Continue to About Us →
                    </FrostedGlassButton>
                  </div>
                </div>
              )}

              {/* STEP 3: Vision & Expectations */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-white text-center text-3xl drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Step 3 of 4: About VAULT54
                  </h2>

                  <div
                    ref={visionRef}
                    onScroll={handleVisionScroll}
                    className="h-64 overflow-y-auto p-4 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg text-white/80 space-y-4"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    <h3 className="text-white">OUR VISION</h3>
                    
                    <p>VAULT54 is not just a club—it's a discreet, no-holds-barred, heavily vetted group of like-minded individuals who value connection, chemistry, and absolute discretion.</p>
                    
                    <p><strong className="text-white">What We Are:</strong></p>
                    <p>We are a private community that celebrates freedom, sensuality, and authentic human connection. Our members are successful professionals, entrepreneurs, creatives, and tastemakers who seek experiences beyond the ordinary.</p>
                    
                    <p><strong className="text-white">Event Nature:</strong></p>
                    <p>Most events are nude or clothing-optional. We believe in shedding societal masks along with our clothes—creating an environment of vulnerability, authenticity, and raw connection.</p>
                    
                    <p><strong className="text-white">Chemistry & Consent:</strong></p>
                    <p>CHEMISTRY is everything. We curate our membership to ensure compatibility and attraction across the community. Consent is mandatory, enthusiastic, and ongoing. "No" is always respected, and boundaries are sacred.</p>
                    
                    <p><strong className="text-white">Absolute Discretion:</strong></p>
                    <p>What happens in VAULT54 stays in VAULT54. No phones are allowed at events. No photography. No recordings. No sharing of member information. Ever.</p>
                    
                    <p><strong className="text-white">Community Culture:</strong></p>
                    <p>We're all each other's friends with benefits. This is about building genuine connections, exploring desires in a safe space, and enjoying extraordinary experiences with extraordinary people.</p>
                    
                    <p><strong className="text-white">Vetting Process:</strong></p>
                    <p>Membership is highly selective. We review every application carefully, considering not just your background but your energy, intentions, and fit within our community. Not everyone is accepted, and that's by design.</p>
                    
                    <p><strong className="text-white">Expectations:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Respect all members and their boundaries</li>
                      <li>Maintain absolute confidentiality</li>
                      <li>Embrace the spirit of openness and authenticity</li>
                      <li>Leave all judgment at the door</li>
                      <li>Participate in events with positive, enthusiastic energy</li>
                      <li>Follow all community guidelines and house rules</li>
                    </ul>
                    
                    <p className="text-white">If this resonates with you, we look forward to welcoming you to our community.</p>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={visionRead}
                        onChange={(e) => setVisionRead(e.target.checked)}
                        disabled={!visionScrolled}
                        className="mt-1 w-5 h-5 bg-black/40 border-[#D4AF37]/30 rounded checked:bg-[#D4AF37] disabled:opacity-30"
                      />
                      <span className="text-white/80">
                        I have read the About Us section.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={visionAccepted}
                        onChange={(e) => setVisionAccepted(e.target.checked)}
                        className="mt-1 w-5 h-5 bg-black/40 border-[#D4AF37]/30 rounded checked:bg-[#D4AF37]"
                      />
                      <span className="text-white/80">
                        I understand the nature and expectations of VAULT54.
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-center gap-4">
                    <FrostedGlassButton onClick={() => setStep(2)}>
                      ← Back
                    </FrostedGlassButton>
                    <FrostedGlassButton
                      onClick={() => setStep(4)}
                      className={`${!canContinueStep3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Continue to Photos →
                    </FrostedGlassButton>
                  </div>
                </div>
              )}

              {/* STEP 4: Photos & Confirmation */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-white text-center text-3xl drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Step 4 of 4: Photos & Confirmation
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/90 mb-2">Face Photo (Required)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFacePhoto(e.target.files?.[0] || null)}
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#D4AF37]/20 file:text-white hover:file:bg-[#D4AF37]/30"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Full Body Photo (Required)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBodyPhoto(e.target.files?.[0] || null)}
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#D4AF37]/20 file:text-white hover:file:bg-[#D4AF37]/30"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Additional Photo (Optional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAdditionalPhoto(e.target.files?.[0] || null)}
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#D4AF37]/20 file:text-white hover:file:bg-[#D4AF37]/30"
                      />
                    </div>

                    <div>
                      <label className="block text-white/90 mb-2">Date of Birth (Required)</label>
                      <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 21)).toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-black/40 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/20 focus:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      />
                      {errors.dob && <p className="text-red-400 text-sm mt-2">{errors.dob}</p>}
                      {dob && !isOfAge && (
                        <p className="text-red-400 text-sm mt-2">You must be at least 21 years old to apply.</p>
                      )}
                      {dob && isOfAge && (
                        <p className="text-green-400 text-sm mt-2">✓ Age verified: {calculateAge(dob)} years old</p>
                      )}
                    </div>

                    <div className="pt-4 space-y-3">
                      <h3 className="text-white">Legal Confirmation</h3>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ageConfirmed}
                          onChange={(e) => setAgeConfirmed(e.target.checked)}
                          className="mt-1 w-5 h-5 bg-black/40 border-[#D4AF37]/30 rounded checked:bg-[#D4AF37]"
                        />
                        <span className="text-white/80">
                          I affirm I am 21 years of age or older.
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          disabled={!termsOpened}
                          className="mt-1 w-5 h-5 bg-black/40 border-[#D4AF37]/30 rounded checked:bg-[#D4AF37] disabled:opacity-30"
                        />
                        <span className="text-white/80">
                          I accept the{' '}
                          <button
                            type="button"
                            onClick={() => {
                              alert('Terms of Service & Release of Liability will open here');
                              setTermsOpened(true);
                            }}
                            className="text-white hover:underline"
                          >
                            Terms of Service & Release of Liability
                          </button>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <FrostedGlassButton onClick={() => setStep(3)}>
                      ← Back
                    </FrostedGlassButton>
                    <FrostedGlassButton
                      onClick={() => {
                        if (validateStep4()) {
                          handleSubmit();
                        }
                      }}
                      className={`${!canSubmitStep4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Submit Application
                    </FrostedGlassButton>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* SUCCESS MESSAGE */
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <Check size={32} className="text-[#D4AF37]" />
                </div>
              </div>
              
              <h2 className="text-white">
                Application Submitted Successfully!
              </h2>
              
              <p className="text-white/80">
                Thank you for your interest in VAULT54. We'll review your application and get back to you within 3-5 business days.
              </p>
              
              <FrostedGlassButton onClick={onClose}>
                Close
              </FrostedGlassButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};