"use server";

import { makeRequest } from "@/lib/api";

export interface OpportunityType {
  id: string;
  name: string;
}

export async function getOpportunityTypes() {
  try {
    const response = await makeRequest<OpportunityType[]>("/opportunity-types");
    return response;
  } catch (error) {
    throw error;
  }
}
