import { supabase } from "@/lib/supabase";
import type { FocusTime, FocusTimeUpdate, NewFocusTime } from "@/types";

export async function fetchFocusTimes(): Promise<FocusTime[]> {
  const { data: focusTimes, error } = await supabase
    .from("focus_times")
    .select("*");
  if (error) throw error;
  return focusTimes ?? [];
}

export async function fetchFocusTime(date: string): Promise<FocusTime> {
  const { data: focusTime, error } = await supabase
    .from("focus_times")
    .select("*")
    .eq("date", date)
    .single();
  if (error) throw error;
  return focusTime;
}

export async function createFocusTime(focusTime: NewFocusTime) {
  const { data: created, error } = await supabase
    .from("focus_times")
    .insert(focusTime)
    .select()
    .single();
  if (error) throw error;
  return created;
}

export async function updateFocusTime({
  id,
  data,
}: {
  id: string;
  data: FocusTimeUpdate;
}) {
  const { data: updated, error } = await supabase
    .from("focus_times")
    .update(data)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return updated;
}
