// Static list of professional job functions/fields
export const JOB_FUNCTIONS = [
  "Software Engineering",
  "Data Science & Analytics",
  "Product Management",
  "Design & UX",
  "Marketing",
  "Sales & Business Development",
  "Operations",
  "Finance & Accounting",
  "Human Resources",
  "Consulting",
  "Research & Academia",
  "Healthcare & Medicine",
  "Legal",
  "Education & Training",
  "Engineering (Non-Software)",
  "Project Management",
  "Customer Success",
  "Content & Communications",
  "Administrative",
  "Other",
] as const;

export type JobFunction = (typeof JOB_FUNCTIONS)[number];

// Employment types (how the job is structured)
export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Other",
] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

// Work authorization options
export const WORK_AUTHORIZATION_OPTIONS = [
  {
    value: "AUTHORIZED_NO_SPONSORSHIP",
    label: "Authorized to work — no sponsorship required",
  },
  {
    value: "AUTHORIZED_WITH_SPONSORSHIP",
    label: "Authorized to work — sponsorship required",
  },
  {
    value: "REMOTE_CONTRACTOR",
    label: "Authorized to work remotely as an independent contractor",
  },
  {
    value: "NOT_AUTHORIZED",
    label: "Not authorized to work at this time",
  },
] as const;

export type WorkAuthorization =
  (typeof WORK_AUTHORIZATION_OPTIONS)[number]["value"];

// Note: Countries and preferred locations are now fetched from public APIs
// See web/hooks/useGeoData.ts for the hooks:
// - useCountries() - fetches from REST Countries API
// - usePreferredLocations() - fetches cities from GeoDB Cities API
