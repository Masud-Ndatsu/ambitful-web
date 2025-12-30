export interface OpportunityType {
  id: string;
  name: string;
}

export interface OpportunityCategory {
  id: string;
  opportunityId: string;
  opportunityTypeId: string;
  opportunityType: OpportunityType;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  requirements: string[];
  benefits: string[];
  compensation?: string;
  compensationType?: string;
  locations: string[];
  isRemote: boolean;
  deadline: string;
  isActive: boolean;
  applicationUrl?: string;
  contactEmail?: string;
  experienceLevel?: string;
  duration?: string;
  eligibility: string[];
  createdAt: string;
  updatedAt: string;

  // Relations
  opportunityCategories: OpportunityCategory[];
  _count: {
    applications: number;
    savedJobs: number;
  };

  // Backend fields
  author?: string;
  views: number;
  
  // Computed fields for frontend
  status?: OpportunityStatus;
  clicks?: number;
  category?: string;
}

export interface CreateOpportunityData {
  title: string;
  organization: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  compensation?: string;
  compensationType?: string;
  locations: string[];
  isRemote: boolean;
  deadline: string;
  applicationUrl?: string;
  contactEmail?: string;
  experienceLevel?: string;
  duration?: string;
  eligibility?: string[];
  opportunityTypeIds: string[];
}

export interface OpportunityFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  type?: string;
  remote?: boolean;
  experienceLevel?: string;
  status?: OpportunityStatus;
  author?: string;
  dateRange?: {
    from?: string;
    to?: string;
  };
}

export interface OpportunityListResponse {
  opportunities: Opportunity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type OpportunityStatus = "draft" | "published" | "archived";

export interface AdminOpportunity {
  id: string;
  title: string;
  category: string;
  author: string;
  clicks: number;
  dateAdded: string;
  status: OpportunityStatus;
}

export interface AdminOpportunityListResponse {
  opportunities: AdminOpportunity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface OpportunityStatsResponse {
  total: number;
  published: number;
  draft: number;
  archived: number;
  totalApplications: number;
  recentApplications: number;
}
