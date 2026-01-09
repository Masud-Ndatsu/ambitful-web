import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
  updateProfile as updateProfileAction,
  googleAuth as googleAuthAction,
  UpdateProfileData,
  GoogleAuthData,
} from "@/actions/auth";
import {
  LoginFormData,
  RegisterFormData,
  User,
  UserRole,
  UserStatus,
} from "@/types";

export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  currentUser: () => [...authKeys.user(), "current"] as const,
};

function convertToUser(user: any): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as UserRole,
    status: user.status as UserStatus,
    avatar: user.avatar || "",
    createdAt: user.createdAt || new Date().toISOString(),
    updatedAt: user.updatedAt || new Date().toISOString(),
  };
}

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async () => {
      const response = await getCurrentUser();
      return response?.data || null;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchInterval: 10 * 60 * 1000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginFormData) => loginAction(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        const userData = convertToUser(response.data.user);
        queryClient.setQueryData(authKeys.currentUser(), userData);
      }
    },
    onError: () => {
      queryClient.setQueryData(authKeys.currentUser(), null);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterFormData) => registerAction(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        const userData = convertToUser(response.data.user);
        queryClient.setQueryData(authKeys.currentUser(), userData);
      }
    },
    onError: () => {
      queryClient.setQueryData(authKeys.currentUser(), null);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAction,
    onSettled: () => {
      queryClient.clear();
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfileAction(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        queryClient.setQueryData(authKeys.currentUser(), response.data);
        queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
      }
    },
  });
}

export function useGoogleAuth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoogleAuthData) => googleAuthAction(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        const userData = convertToUser(response.data.user);
        queryClient.setQueryData(authKeys.currentUser(), userData);
      }
    },
    onError: () => {
      queryClient.setQueryData(authKeys.currentUser(), null);
    },
  });
}

export function useAuth() {
  const { data: user, isLoading, error, refetch } = useCurrentUser();

  return {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    error,
    refetch,
  };
}
