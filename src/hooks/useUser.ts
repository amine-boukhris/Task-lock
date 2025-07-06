import { fetchUser, loginUser, logoutUser, registerUser } from "@/api/auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: Infinity,
    retry: false,
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
