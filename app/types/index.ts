export interface Opportunity {
  id: string;
  title: string;
  category: string;
  description: string;
  deadline: string;
  locations: string[];
  company?: string;
  salary?: string;
  type?: 'full-time' | 'part-time' | 'contract' | 'internship';
  remote?: boolean;
}

export interface OpportunityCardProp {
  opportunity: Opportunity;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile?: UserProfile;
}

export interface UserProfile {
  skills: string[];
  experience: number;
  location: string;
  preferences: {
    jobType: string[];
    remote: boolean;
    salaryRange: {
      min: number;
      max: number;
    };
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  location: string;
  avatar?: string;
}