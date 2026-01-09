"use server";
import { User } from "@/app/types";
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

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    isEmailVerified: boolean;
    isOnboardingComplete: boolean;
    role?: string;
    status?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  isNewUser?: boolean;
}

export interface GoogleAuthData {
  idToken: string;
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
      const cookieStore = await cookies();

      cookieStore.set("auth-token", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1, // 1 hour
      });

      cookieStore.set("refresh-token", response.data.refreshToken, {
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
      const cookieStore = await cookies();

      cookieStore.set("auth-token", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1, // 1 hour
      });

      cookieStore.set("refresh-token", response.data.refreshToken, {
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

export async function googleAuth(
  data: GoogleAuthData
): Promise<ApiResponse<AuthResponse>> {
  try {
    const response = await makeRequest<AuthResponse>("/auth/google", {
      method: "POST",
      body: data,
    });

    if (response.success && response.data) {
      const cookieStore = await cookies();

      cookieStore.set("auth-token", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1, // 1 hour
      });

      cookieStore.set("refresh-token", response.data.refreshToken, {
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
      await makeRequest("/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    cookieStore.delete("auth-token");
    cookieStore.delete("refresh-token");
  } catch (error) {
    const cookieStore = await cookies();
    cookieStore.delete("auth-token");
    cookieStore.delete("refresh-token");
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
  try {
    const cookieStore = await cookies();
    const refreshTokenValue = cookieStore.get("refresh-token")?.value;

    if (!refreshTokenValue) {
      return null;
    }

    const response = await makeRequest<AuthResponse>("/auth/refresh", {
      method: "POST",
      body: { refreshToken: refreshTokenValue },
    });

    if (response.success && response.data) {
      cookieStore.set("auth-token", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1, // 1 hour
      });

      cookieStore.set("refresh-token", response.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("auth-token")?.value || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null && user.success;
}

// Profile update action
export interface UpdateProfileData {
  name?: string;
  phone?: string;
  jobFunction?: string;
  preferredLocations?: string[];
  workAuthorization?: string;
  remoteWork?: boolean;
}

export async function updateProfile(
  data: UpdateProfileData
): Promise<ApiResponse<User>> {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await makeRequest<User>("/auth/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    return response;
  } catch (error) {
    throw error;
  }
}
