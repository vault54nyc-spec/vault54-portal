import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface ContentCreatorApplicationProps {
  onClose: () => void;
}

export const ContentCreatorApplication: React.FC<ContentCreatorApplicationProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    city: '',
    
    // Step 2: Social Media & Portfolio
    instagram: '',
    twitter: '',
    tiktok: '',
    onlyfans: '',
    portfolioUrl: '',
    
    // Step 3: Experience & Category
    category: '',
    experience: '',
    previousVenues: '',
    specialties: '',
    
    // Step 4: Media & Photos
    recentEventPhotos: null as File[] | null,
    previousEventPhotos: null as File[] | null,
    portfolioPhotos: null as File[] | null,
    
    // Additional
    availability: '',
    rateExpectation: '',
    heardAboutUs: '',
    additionalInfo: ''
  });

  const [age, setAge] = useState(0);
  const [ageError, setAgeError] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'dob' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);
      setAgeError(calculatedAge < 21);
    }
  };

  const handleFileUpload = (field: string, files: FileList | null) => {
    if (files) {
      setFormData(prev => ({ ...prev, [field]: Array.from(files) }));
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.dob && formData.email && formData.phone && !ageError;
      case 2:
        return formData.instagram || formData.twitter || formData.tiktok;
      case 3:
        return formData.category && formData.experience;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    console.log('Content Creator Application Submitted:', formData);
    alert('✅ Application submitted successfully! Our team will review your profile and contact you within 3-5 business days.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-black/90 border border-[#D4AF37]/40 rounded-2xl p-4 md:p-8 max-w-3xl w-full my-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl text-[#D4AF37]">Work With VAULT54</h2>
            <p className="text-gray-400 text-sm md:text-base mt-1">
              Content Creator • Influencer • Entertainer Application
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full transition-all ${
                step === currentStep
                  ? 'bg-[#D4AF37]'
                  : step < currentStep
                  ? 'bg-[#167D7F]'
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl text-[#D4AF37] mb-4">Basic Information</h3>
            
            <div>
              <label className="block text-gray-400 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Date of Birth * (Must be 21+)</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white focus:border-[#D4AF37] outline-none"
              />
              {formData.dob && (
                <div className={`mt-2 text-sm ${ageError ? 'text-red-400' : 'text-green-400'}`}>
                  {ageError ? (
                    <>❌ You must be 21 or older to apply</>
                  ) : (
                    <>✓ Age verified: {age} years old</>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Best Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">City/Location</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="New York, NY"
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 2: Social Media & Portfolio */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl text-[#D4AF37] mb-4">Social Media & Portfolio</h3>
            <p className="text-gray-400 text-sm mb-4">At least one social media handle is required</p>

            <div>
              <label className="block text-gray-400 mb-2">Instagram Handle</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                placeholder="@yourhandle"
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Twitter/X Handle</label>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
                placeholder="@yourhandle"
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">TikTok Handle</label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => handleInputChange('tiktok', e.target.value)}
                placeholder="@yourhandle"
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">OnlyFans (if applicable)</label>
              <input
                type="text"
                value={formData.onlyfans}
                onChange={(e) => handleInputChange('onlyfans', e.target.value)}
                placeholder="@yourhandle"
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Portfolio/Website URL</label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                placeholder="https://yourportfolio.com"
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Experience & Category */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl text-[#D4AF37] mb-4">Experience & Expertise</h3>

            <div>
              <label className="block text-gray-400 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white focus:border-[#D4AF37] outline-none"
              >
                <option value="">Select category...</option>
                <option value="content-creator">Content Creator</option>
                <option value="influencer">Influencer</option>
                <option value="dancer">Dancer/Performer</option>
                <option value="entertainer">Male Entertainer</option>
                <option value="model">Model</option>
                <option value="photographer">Photographer/Videographer</option>
                <option value="dj">DJ/Music</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Years of Experience *</label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white focus:border-[#D4AF37] outline-none"
              >
                <option value="">Select experience...</option>
                <option value="beginner">Less than 1 year</option>
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
                <option value="professional">Professional (10+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Previous Venues/Events</label>
              <textarea
                value={formData.previousVenues}
                onChange={(e) => handleInputChange('previousVenues', e.target.value)}
                placeholder="List notable venues or events you've worked at..."
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Specialties/Skills</label>
              <textarea
                value={formData.specialties}
                onChange={(e) => handleInputChange('specialties', e.target.value)}
                placeholder="What makes you unique? Special skills, talents, or expertise..."
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 4: Media Upload & Additional Info */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl text-[#D4AF37] mb-4">Portfolio & Additional Information</h3>

            <div>
              <label className="block text-gray-400 mb-2">Recent Event Photos (if available)</label>
              <div className="border-2 border-dashed border-[#D4AF37]/40 rounded-lg p-6 text-center hover:border-[#D4AF37]/60 transition-all cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('recentEventPhotos', e.target.files)}
                  className="hidden"
                  id="recent-photos"
                />
                <label htmlFor="recent-photos" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-[#D4AF37]" size={32} />
                  <p className="text-gray-400 text-sm">Click to upload photos from your most recent work</p>
                  <p className="text-gray-500 text-xs mt-1">JPG, PNG up to 10MB each</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Previous Event Photos</label>
              <div className="border-2 border-dashed border-[#D4AF37]/40 rounded-lg p-6 text-center hover:border-[#D4AF37]/60 transition-all cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('previousEventPhotos', e.target.files)}
                  className="hidden"
                  id="previous-photos"
                />
                <label htmlFor="previous-photos" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-[#D4AF37]" size={32} />
                  <p className="text-gray-400 text-sm">Click to upload photos from previous events</p>
                  <p className="text-gray-500 text-xs mt-1">JPG, PNG up to 10MB each</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Portfolio/Professional Photos</label>
              <div className="border-2 border-dashed border-[#D4AF37]/40 rounded-lg p-6 text-center hover:border-[#D4AF37]/60 transition-all cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload('portfolioPhotos', e.target.files)}
                  className="hidden"
                  id="portfolio-photos"
                />
                <label htmlFor="portfolio-photos" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-[#D4AF37]" size={32} />
                  <p className="text-gray-400 text-sm">Click to upload your portfolio photos</p>
                  <p className="text-gray-500 text-xs mt-1">JPG, PNG up to 10MB each</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Availability</label>
              <textarea
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                placeholder="When are you typically available? Any blackout dates?"
                rows={3}
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Rate Expectations (Optional)</label>
              <input
                type="text"
                value={formData.rateExpectation}
                onChange={(e) => handleInputChange('rateExpectation', e.target.value)}
                placeholder="Your typical rate or rate range"
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">How did you hear about VAULT54?</label>
              <input
                type="text"
                value={formData.heardAboutUs}
                onChange={(e) => handleInputChange('heardAboutUs', e.target.value)}
                placeholder="Instagram, referral, etc."
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Additional Information</label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                placeholder="Anything else you'd like us to know?"
                rows={4}
                className="w-full px-4 py-3 bg-black/40 border border-[#D4AF37]/40 rounded-lg text-white placeholder:text-gray-500 focus:border-[#D4AF37] outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:border-gray-400 transition-all"
            >
              BACK
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className={`flex-1 px-6 py-3 rounded-lg transition-all ${
                canProceed()
                  ? 'bg-black/30 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-black/40 hover:border-[#D4AF37]/80 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              NEXT
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-black/30 backdrop-blur-xl border border-[#D4AF37]/40 text-[#D4AF37] rounded-lg hover:bg-black/40 hover:border-[#D4AF37]/80 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
            >
              SUBMIT APPLICATION
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
