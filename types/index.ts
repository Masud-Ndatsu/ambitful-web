import { Opportunity } from "@/app/types";

// Auth types
export type {
  User,
  UserRole,
  UserStatus,
  LoginFormData,
  RegisterFormData,
  AuthResponse,
} from "./auth";

// Agent types
export type {
  ChatMessage,
  AgentChatRequest,
  AgentResponse,
  AgentHealth,
} from "../actions/agent";

// Opportunity types
export type {
  Opportunity,
  CreateOpportunityData,
  OpportunityFilters,
  OpportunityListResponse,
  OpportunityStatus,
  AdminOpportunity,
  AdminOpportunityListResponse,
  OpportunityStatsResponse,
} from "./opportunity";

// Re-export legacy types for backward compatibility
export interface OpportunityCardProp {
  opportunity: Opportunity;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  location: string;
  avatar?: string;
}
