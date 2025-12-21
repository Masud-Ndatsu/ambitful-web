"use server";
import { makeRequest, ApiResponse } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    isEmailVerified: boolean;
  };
}

// Auth actions
export async function login(
  formData: LoginFormData
): Promise<ApiResponse<AuthResponse>> {
  try {
    const response = await makeRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: formData,
    });

    if (response.success && response.data) {
      // Set auth token in cookies
      const cookieStore = await cookies();
      cookieStore.set("auth-token", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    throw error;
  }
}

export async function register(
  formData: RegisterFormData
): Promise<ApiResponse<AuthResponse>> {
  try {
    const response = await makeRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: formData,
    });

    if (response.success && response.data) {
      // Set auth token in cookies
      const cookieStore = await cookies();
      cookieStore.set("auth-token", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (token) {
      // Call logout endpoint to invalidate token on server
      await makeRequest("/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Clear auth cookies
    cookieStore.delete("auth-token");
  } catch (error) {
    // Still clear cookies even if server call fails
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");
  }

  redirect("/auth/login");
}

export async function getCurrentUser(): Promise<ApiResponse<User> | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    const response = await makeRequest<User>("/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return null;
  }
}

export async function refreshToken(): Promise<ApiResponse<AuthResponse> | null> {
  // Since the backend doesn't support refresh tokens,
  // we'll just return null to indicate no refresh capability
  return null;
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("auth-token")?.value || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null && user.success;
}
