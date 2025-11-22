-- VAULT54 Database Schema for Members and Access Codes

-- Table: members
-- Stores approved member information with login credentials
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_number VARCHAR(20) UNIQUE NOT NULL, -- e.g., V54-M001
  
  -- Personal Information (from application)
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  profession VARCHAR(255),
  instagram VARCHAR(255),
  dob DATE,
  age INTEGER,
  
  -- Login Credentials
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL, -- Hashed password
  
  -- Member Details
  role VARCHAR(50) DEFAULT 'Member', -- Member, Co-Founder, Founder, etc.
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
  referral_code VARCHAR(50),
  
  -- Photos
  face_photo_url TEXT,
  body_photo_url TEXT,
  additional_photos JSONB, -- Array of photo URLs
  
  -- Dates
  joined_date TIMESTAMP DEFAULT NOW(),
  application_date TIMESTAMP,
  approved_at TIMESTAMP,
  approved_by UUID, -- Admin who approved
  
  -- Compliance
  terms_accepted BOOLEAN DEFAULT false,
  terms_accepted_at TIMESTAMP,
  nda_accepted BOOLEAN DEFAULT false,
  nda_accepted_at TIMESTAMP,
  nda_ip_address VARCHAR(50),
  nda_user_agent TEXT,
  
  -- Financial
  total_paid DECIMAL(10, 2) DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: access_codes
-- Stores Greek god access codes for syndicate/investor portal
CREATE TABLE IF NOT EXISTS access_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL, -- e.g., ZEUS87, APOLLO, ATHENA
  code_type VARCHAR(50) NOT NULL, -- 'admin', 'investor', 'member', 'syndicate'
  
  -- Assignment
  assigned_to_member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  assigned_to_name VARCHAR(255), -- Can be assigned to non-members too
  assigned_to_email VARCHAR(255),
  
  -- Status
  status VARCHAR(20) DEFAULT 'active', -- active, inactive, revoked
  is_active BOOLEAN DEFAULT true,
  
  -- Usage tracking
  last_used_at TIMESTAMP,
  use_count INTEGER DEFAULT 0,
  
  -- Metadata
  created_by UUID, -- Admin who created the code
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);

-- Table: event_payments
-- Tracks member payments for events
CREATE TABLE IF NOT EXISTS event_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  event_name VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_date TIMESTAMP DEFAULT NOW(),
  payment_method VARCHAR(50),
  transaction_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'completed', -- completed, pending, refunded
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: event_attendance
-- Tracks member attendance at events
CREATE TABLE IF NOT EXISTS event_attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  event_name VARCHAR(255) NOT NULL,
  event_date DATE,
  attended BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMP,
  checked_in_by UUID, -- Admin who checked them in
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_username ON members(username);
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);
CREATE INDEX IF NOT EXISTS idx_access_codes_code ON access_codes(code);
CREATE INDEX IF NOT EXISTS idx_access_codes_type ON access_codes(code_type);
CREATE INDEX IF NOT EXISTS idx_access_codes_member ON access_codes(assigned_to_member_id);
CREATE INDEX IF NOT EXISTS idx_event_payments_member ON event_payments(member_id);
CREATE INDEX IF NOT EXISTS idx_event_attendance_member ON event_attendance(member_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_access_codes_updated_at BEFORE UPDATE ON access_codes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin access codes
INSERT INTO access_codes (code, code_type, assigned_to_name, status, notes)
VALUES 
  ('ZEUS87', 'admin', 'Christopher DeMarkus', 'active', 'Founder admin access'),
  ('INVESTOR123', 'investor', 'General Investor Access', 'active', 'Default investor portal access')
ON CONFLICT (code) DO NOTHING;

-- Sample Greek god codes for syndicate portal
INSERT INTO access_codes (code, code_type, status, notes)
VALUES 
  ('APOLLO', 'syndicate', 'active', 'Greek god access code'),
  ('ATHENA', 'syndicate', 'active', 'Greek god access code'),
  ('ARTEMIS', 'syndicate', 'active', 'Greek god access code'),
  ('ARES', 'syndicate', 'active', 'Greek god access code'),
  ('HADES', 'syndicate', 'active', 'Greek god access code'),
  ('POSEIDON', 'syndicate', 'active', 'Greek god access code'),
  ('HERMES', 'syndicate', 'active', 'Greek god access code'),
  ('HEPHAESTUS', 'syndicate', 'active', 'Greek god access code'),
  ('DIONYSUS', 'syndicate', 'active', 'Greek god access code'),
  ('DEMETER', 'syndicate', 'active', 'Greek god access code'),
  ('HERA', 'syndicate', 'active', 'Greek god access code'),
  ('HESTIA', 'syndicate', 'active', 'Greek god access code')
ON CONFLICT (code) DO NOTHING;
