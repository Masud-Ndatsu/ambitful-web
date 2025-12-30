"use server";
import { ApiResponse, makeRequest } from "@/lib/api";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: "ADMIN" | "MODERATOR" | "USER";
  isEmailVerified: boolean;
  jobFunction?: string;
  preferredLocations?: string[];
  workAuthorization?: string;
  remoteWork?: boolean;
  resumeUrl?: string;
  isOnboardingComplete: boolean;
  onboardingCompletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: "ADMIN" | "MODERATOR" | "USER";
  isEmailVerified?: boolean;
  isOnboardingComplete?: boolean;
}

export interface UserListResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  phone?: string;
  role: "ADMIN" | "MODERATOR" | "USER";
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
  role?: "ADMIN" | "MODERATOR" | "USER";
  isEmailVerified?: boolean;
}

export async function getUsers(
  filters: UserFilters = {}
): Promise<ApiResponse<UserListResponse>> {
  const params = new URLSearchParams();

  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  if (filters.search) params.append("search", filters.search);
  if (filters.role) params.append("role", filters.role);
  if (filters.isEmailVerified !== undefined)
    params.append("isEmailVerified", filters.isEmailVerified.toString());
  if (filters.isOnboardingComplete !== undefined)
    params.append(
      "isOnboardingComplete",
      filters.isOnboardingComplete.toString()
    );

  return await makeRequest<UserListResponse>(
    `/user-management?${params.toString()}`,
    {
      method: "GET",
    }
  );
}

export async function getUserById(id: string): Promise<ApiResponse<User>> {
  return await makeRequest<User>(`/user-management/${id}`, {
    method: "GET",
  });
}

export async function createUser(
  data: CreateUserData
): Promise<ApiResponse<User>> {
  return await makeRequest<User>("/user-management", {
    method: "POST",
    body: data,
  });
}

export async function updateUser(
  id: string,
  data: UpdateUserData
): Promise<ApiResponse<User>> {
  return await makeRequest<User>(`/user-management/${id}`, {
    method: "PUT",
    body: data,
  });
}

export async function deleteUser(id: string): Promise<ApiResponse<void>> {
  return await makeRequest<void>(`/user-management/${id}`, {
    method: "DELETE",
  });
}

export async function toggleUserStatus(id: string): Promise<ApiResponse<User>> {
  return await makeRequest<User>(`/user-management/${id}/toggle-status`, {
    method: "PATCH",
  });
}
