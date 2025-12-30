import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  UserFilters,
  CreateUserData,
  UpdateUserData,
} from "@/actions/users";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: UserFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export function useUsers(filters: UserFilters = {}) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: async () => {
      const response = await getUsers(filters);
      return response?.data || null;
    },
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await getUserById(id);
      return response?.data || null;
    },
    enabled: !!id,
    staleTime: 30 * 1000,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserData) => createUser(data),
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate users list to refetch
        queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      }
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserData }) =>
      updateUser(id, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        // Invalidate specific user and users list
        queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
        queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      }
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate users list to refetch
        queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      }
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });
}

export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleUserStatus(id),
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate users list to refetch
        queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      }
    },
    onError: (error) => {
      console.error("Error toggling user status:", error);
    },
  });
}