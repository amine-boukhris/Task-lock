import {
  createFocusTime,
  fetchFocusTime,
  fetchFocusTimes,
  updateFocusTime,
} from "@/api/focusTimes";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFocusTimes() {
  return useQuery({
    queryKey: ["focusTimes"],
    queryFn: fetchFocusTimes,
  });
}

export function useFocusTime(date: string) {
  return useQuery({
    queryKey: ["focusTime"],
    queryFn: () => fetchFocusTime(date),
  });
}

export function useCreateFocusTime() {
  return useMutation({
    mutationFn: createFocusTime,
  });
}

export function useUpdateFocusTime() {
  return useMutation({
    mutationFn: updateFocusTime,
  });
}
