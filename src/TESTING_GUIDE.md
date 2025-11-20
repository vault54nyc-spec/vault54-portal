# VAULT54 Testing Guide

## Access Codes for Testing

### Admin Dashboard (Master Portal)
- **Code:** `zeus87`
- **Access:** Full admin control
- **Features:**
  - Dashboard overview with all stats
  - Application review and approval
  - Member management with financial tracking
  - Bulk communications (Email/SMS to all members)
  - Portal management (Add events, announcements)
  - Site settings

### Member Portal (For Testing)
- **Code:** `member123`
- **Access:** Member view
- **Features:**
  - View and purchase event tickets
  - Referral code sharing
  - Member benefits and policies
  - Event details and registration

### Investor Portal
- **Code:** Any other code (e.g., `investor1`)
- **Access:** Investor documents and information
- **Features:**
  - NDA requirement on first access
  - Intro video (skippable)
  - Investment tiers and documentation
  - Business case and financials
  - Express interest in investing

## Feature Testing Checklist

### Landing Page
- [ ] **First Visit:** Video intro plays with sound ON, has mute button
- [ ] **First Visit:** Skip button available to skip to landing
- [ ] **Subsequent Visits:** Video plays as muted background with frosted overlay
- [ ] Background animation works (first visit only)
- [ ] Member count displays (50+ base)
- [ ] Applicant count displays (65+ base)
- [ ] Social media icons (Email, Instagram, Telegram, X)
- [ ] "Work With Us" link below social icons (opens creator application)
- [ ] "Request Access" opens application modal

### Application Process
- [ ] Step 1: Basic info with profession dropdown
- [ ] Instagram verification (opens profile, confirms)
- [ ] Step 2: NDA scroll requirement
- [ ] Step 3: Vision statement scroll requirement
- [ ] Step 4: Photo uploads
- [ ] Age validation (must be 21+)
- [ ] Terms of Service must be opened
- [ ] Submit button only enabled when all requirements met

### Admin Dashboard - Dashboard Tab
- [ ] Total members count
- [ ] Active members count
- [ ] Pending applications count
- [ ] Total revenue displayed
- [ ] Revenue breakdown by event
- [ ] Recent activity feed
- [ ] Payment status overview
- [ ] "Preview Member Portal" button

### Admin Dashboard - Applications Tab
- [ ] View all applications
- [ ] See referral code used
- [ ] Under 21 marked with red badge
- [ ] Approve button disabled for under 21
- [ ] View photos button
- [ ] Send message to applicant
- [ ] Approve/Deny functionality

### Admin Dashboard - Members Tab
- [ ] View all members with photos
- [ ] Member number displayed (V54-M001)
- [ ] Referral code tracking
- [ ] Total amount paid per member
- [ ] Event payment history
- [ ] Event attendance records
- [ ] QR code check-in timestamps
- [ ] "View Details" modal with full info
- [ ] Send message to member

### Admin Dashboard - Communications Tab
- [ ] Select Email or SMS
- [ ] Choose recipients (All, Members Only, Applicants Only)
- [ ] Compose subject and message
- [ ] Character count for SMS (160 limit)
- [ ] Send confirmation dialog
- [ ] Clear message button

### Admin Dashboard - Portal Management Tab
- [ ] View current events
- [ ] Edit event details
- [ ] Add new event button
- [ ] Post announcements
- [ ] View recent announcements
- [ ] Delete announcements

### Admin Dashboard - Settings Tab
- [ ] Edit base member count
- [ ] Edit base applicant count
- [ ] Update notification email
- [ ] Save settings button

### Member Portal
- [ ] View all upcoming events
- [ ] Click event for details
- [ ] Purchase tickets (frosted glass buttons with glow effect)
- [ ] See "Coming Soon" for future events
- [ ] Copy referral code (frosted glass button)
- [ ] View member benefits
- [ ] View event policies
- [ ] View community guidelines
- [ ] All buttons use frosted glass style with hover glow

### Investor Portal
- [ ] Scrollable one-page design with all sections
- [ ] Sticky navigation tabs at top
- [ ] Auto-highlights active section while scrolling
- [ ] Click tabs to jump to sections
- [ ] Mobile-optimized with responsive text and spacing
- [ ] Frosted glass buttons throughout
- [ ] Download buttons have teal accent color
- [ ] "More Information" button at bottom

### Mobile Responsiveness
- [ ] Admin Dashboard hamburger menu works
- [ ] Navigation slides out on mobile
- [ ] All forms responsive
- [ ] Tables/grids adapt to screen size
- [ ] Touch-friendly buttons
- [ ] Modal scrolls properly on mobile

## Testing Workflow

1. **Start:** Watch intro video (or skip)
2. **Landing Page:** Click "Welcome Back" in nav
3. **Enter Code:** Try `zeus87` for admin
4. **Admin Dashboard:** 
   - Check all tabs
   - Test bulk messaging
   - Edit portal content
   - Preview member portal
5. **Test Member Portal:** Enter `member123` as access code
6. **Test Application:** Click "Request Access" from landing
7. **Test Investor Portal:** Enter any other code

## Notes

- All data is currently mock/placeholder
- Email/SMS sending shows alerts (ready for backend integration)
- Photo uploads show placeholders (ready for storage integration)
- QR code scanning will be implemented with backend
- Age validation auto-denies under 21
- Instagram verification is simulated (ready for API integration)

## Backend Integration Points

1. **Email System:** vault54nyc@gmail.com for notifications
2. **Database:** Store applications, members, events, payments
3. **Payment Processing:** Stripe/Square for event tickets
4. **File Storage:** AWS S3/Cloudinary for photos
5. **SMS Service:** Twilio for text messaging
6. **Instagram API:** For profile verification
7. **QR Codes:** For event check-in tracking
