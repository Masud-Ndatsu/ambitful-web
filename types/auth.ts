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

export type UserRole = "ADMIN" | "USER" | "MODERATOR";
export type UserStatus = "active" | "inactive" | "pending" | "suspended";

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
  user: {
    id: string;
    email: string;
    name: string;
    isEmailVerified: boolean;
  };
}
