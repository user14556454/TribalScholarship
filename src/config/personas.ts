import { UserProfile } from '../types/user';

export const PERSONAS: Record<string, UserProfile> = {
  APPLICANT_RAJESH: {
    id: 'user-app-001',
    fullName: 'Rajesh Kumar Soren',
    role: 'APPLICANT',
    email: 'rajesh.soren@cuj.ac.in',
    mobile: '+91 98351 44820',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    department: 'Department of Anthropology & Tribal Studies',
    instituteName: 'Central University of Jharkhand'
  },
  ADMIN_OFFICER: {
    id: 'user-adm-001',
    fullName: 'Dr. V. K. Sharma',
    role: 'ADMIN',
    email: 'vk.sharma@tribal.gov.in',
    mobile: '+91 94120 89123',
    designation: 'Director (Scholarships & Fellowships)',
    department: 'Scholarship Division, Ministry of Tribal Affairs, Shastri Bhawan'
  },
  APPLICANT_POOJA: {
    id: 'user-app-002',
    fullName: 'Pooja Kispotta',
    role: 'APPLICANT',
    email: 'pooja.k@oxford.alumni.org',
    mobile: '+91 97182 30192',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    instituteName: 'University of Oxford (United Kingdom)'
  }
};
