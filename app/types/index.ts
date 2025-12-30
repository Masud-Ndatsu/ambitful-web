export interface Opportunity {
  id: string;
  title: string;
  category: string;
  description: string;
  deadline: string;
  locations: string[];
  company?: string;
  salary?: string;
  type?: "full-time" | "part-time" | "contract" | "internship";
  remote?: boolean;
}

export interface OpportunityCardProp {
  opportunity: Opportunity;
}

export type UserRole = "ADMIN" | "USER" | "MODERATOR";
export type UserStatus = "active" | "inactive" | "pending" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
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

export type OpportunityStatus = "draft" | "published" | "archived";

export type AdminOpportunity = {
  id: string;
  title: string;
  category: string;
  author: string;
  clicks: number;
  dateAdded: string;
  status: OpportunityStatus;
};

// export type
