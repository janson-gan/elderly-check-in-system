// Create Typescript Interface Here
export interface User {
    id: number;
    email: string;
    role: 'senior' | 'family' | 'admin';
    first_name: string;
    last_name: string;
    phone?: string;
    is_active: boolean;
    created_at?: string
}

export interface Senior {
    id: number;
    user_id: number;
    date_of_birth?: string;
    address?: string;
    medical_notes?: string;
    checkin_streak: number;
    last_checkin_at?: string;
    created_at?: string;
}

export interface FamilyMembers {
    id: number;
    family_user_id: number;
    senior_id: number;
    relationship: string;
    is_primary_contact: boolean;
    created_at?: string;
}

export interface Checkin {
    id: number;
    senior_id: number;
    checked_in_at: string;
    mood: 'good' | 'okay' | 'unwell';
    notes?: string;
    checkin_date: string;
}

export interface EmergencyContact {
    id: number;
    senior_id: number;
    name: string;
    relationship: string;
    phone: string;
    email?: string;
    priority: number;
    created_at?: string;
}

export interface Reminder {
    id: number;
    senior_id: number;
    reminder_time: string;
    grace_period_minutes: number;
    is_active: boolean;
    created_at?: string;
}

export interface Notification {
    id: number;
    senior_id: number;
    recipient_email: string;
    notification_type: 'missed_checkin' | 'emergency' | 'reminder';
    message: string;
    send_at: string;
    is_read: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginRequest {
    id: string;
    password: string;
}