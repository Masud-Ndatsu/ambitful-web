import { z } from "zod";

// Form data schema (what the form uses)
export const createOpportunitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  organization: z.string().min(1, "Organization is required"),
  description: z.string().min(1, "Description is required"),
  deadline: z.string().min(1, "Deadline is required"),
  applicationUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || z.string().url().safeParse(val).success,
      {
        message: "Please enter a valid URL",
      }
    ),
  opportunityTypeIds: z.string().min(1, "Opportunity type is required"),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  compensation: z.string().optional(),
  locations: z.string().min(1, "Location is required"),
  experienceLevel: z.string().optional(),
  isRemote: z.boolean().optional().default(false),
});

export const apiOpportunitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  organization: z.string().min(1, "Organization is required"),
  description: z.string().min(1, "Description is required"),
  deadline: z.string().min(1, "Deadline is required"),
  applicationUrl: z
    .string()
    .optional()
    .refine(
      (val) => !val || val === "" || z.string().url().safeParse(val).success,
      {
        message: "Please enter a valid URL",
      }
    ),
  opportunityTypeIds: z
    .array(z.string())
    .min(1, "At least one category is required"),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  compensation: z.string().optional(),
  locations: z.array(z.string()).min(1, "At least one location is required"),
  experienceLevel: z.string().optional(),
  isRemote: z.boolean().optional().default(false),
});

export const opportunityFiltersSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
  type: z.string().optional(),
  remote: z.boolean().optional(),
  experienceLevel: z.string().optional(),
});

export const updateOpportunitySchema = createOpportunitySchema.partial();

export type CreateOpportunityFormData = z.infer<typeof createOpportunitySchema>;
export type CreateOpportunityApiData = z.infer<typeof apiOpportunitySchema>;
export type OpportunityFiltersFormData = z.infer<
  typeof opportunityFiltersSchema
>;
export type UpdateOpportunityFormData = z.infer<typeof updateOpportunitySchema>;
