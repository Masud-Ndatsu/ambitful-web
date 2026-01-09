"use server";
import { ApiResponse, makeRequest } from "@/lib/api";

export interface OnboardingData {
  jobFunction: string;
  opportunityTypeIds: string[];
  preferredLocations: string[];
  country?: string;
  remoteWork: boolean;
  workAuthorization: string;
  resumeUrl?: string;
}

export interface OnboardingResponse {
  id: string;
  userId: string;
  jobFunction: string;
  jobTypes: string[];
  preferredLocations: string[];
  remoteWork: boolean;
  workAuthorization: string;
  resumeUrl?: string;
  completedAt: string;
}

export async function submitOnboarding(
  data: OnboardingData
): Promise<ApiResponse<OnboardingResponse>> {
  return await makeRequest<OnboardingResponse>("/onboarding/complete", {
    method: "POST",
    body: data,
  });
}

export async function getOnboardingStatus(): Promise<
  ApiResponse<OnboardingResponse | null>
> {
  return await makeRequest<OnboardingResponse | null>("/onboarding/status", {
    method: "GET",
  });
}
