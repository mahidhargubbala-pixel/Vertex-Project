
export enum AppView {
  DASHBOARD = 'Dashboard',
  PROFILE = 'My Profile',
  DISCOVERY = 'Career Discovery',
  ROADMAPS = 'Roadmaps',
  RESOURCES = 'Resources',
  RESUME_AI = 'Resume AI',
  COMM_LAB = 'Communication Lab',
  MOCK_INTERVIEW = 'AI Mock Interview'
}

export interface Skill {
  name: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface UserProfile {
  fullName: string;
  targetDomain: string;
  email: string;
  phone: string;
  education: string;
  skills: Skill[];
  certifications: Certification[];
}

export interface Course {
  platform: string;
  title: string;
  duration: string;
  level: string;
  students: string;
  type: 'PAID' | 'SUBSCRIPTION' | 'FREE';
  url: string;
}
