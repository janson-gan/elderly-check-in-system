-- =========================================
-- USERS TABLE
-- Store all account: seniors, family, admin
-- ==========================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('senior', 'family', 'admin')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SENIORS TABLE
-- Extend senior profile for senior users
-- ==========================================
CREATE TABLE IF NOT EXISTS seniors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE,
    address TEXT,
    medical_notes TEXT,
    checkin_streak INTEGER DEFAULT 0,
    last_checkin_at TIMESTAMP ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- FAMILY MEMBERS TABLE
-- Linked family account to their seniors
-- ==========================================
CREATE TABLE IF NOT EXISTS family_members (
    id SERIAL PRIMARY KEY,
    family_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    senior_id INTEGER NOT NULL REFERENCES seniors(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL,
    is_primary_contact BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(family_user_id, senior_id)
);

-- =========================================
-- EMERGENCY CONTACT TABLE
-- Emergency contact for each senior
-- ==========================================
CREATE TABLE IF NOT EXISTS emergency_contacts (
    id SERIAL PRIMARY KEY,
    senior_id INTEGER NOT NULL REFERENCES seniors(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- CHECKINS TABLE
-- Daily checkin records for each senior
-- ==========================================
CREATE TABLE IF NOT EXISTS checkins (
    id SERIAL PRIMARY KEY,
    senior_id INTEGER NOT NULL REFERENCES seniors(id) ON DELETE CASCADE,
    check_in_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mood VARCHAR(20) CHECK (mood IN ('good', 'okay', 'unwell')),
    notes TEXT,
    checkin_date DATE DEFAULT CURRENT_DATE,
    UNIQUE(senior_id, checkin_date)
);

-- =========================================
-- REMINDERS TABLE
-- Reminder schedule setting per senior
-- ==========================================
CREATE TABLE IF NOT EXISTS reminders (
    id SERIAL PRIMARY KEY,
    senior_id INTEGER NOT NULL REFERENCES seniors(id) ON DELETE CASCADE,
    reminder_time TIME NOT NULL DEFAULT '09:00:00',
    grace_period_minutes INTEGER DEFAULT '60',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- NOTIFICATIONs TABLE
-- Log of alerts send to family members
-- ==========================================
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    senior_id INTEGER NOT NULL REFERENCES seniors(id) ON DELETE CASCADE,
    recipient_email VARCHAR(255) NOT NULL,
    notification_type VARCHAR(20) CHECK (notification_type IN ('missed_checkin', 'emergency', 'reminder')),
    message TEXT NOT NULL,
    send_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT false
);