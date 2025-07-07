import type { Database } from "@/types/database.types";

export type Mood = "positive" | "neutral" | "negative";

export type Task = Database["public"]["Tables"]["tasks"]["Row"];
export type NewTask = Database["public"]["Tables"]["tasks"]["Insert"];
export type TaskUpdate = Database["public"]["Tables"]["tasks"]["Update"];

export type FocusTime = Database["public"]["Tables"]["focus_times"]["Row"];
export type NewFocusTime = Database["public"]["Tables"]["focus_times"]["Insert"];
export type FocusTimeUpdate = Database["public"]["Tables"]["focus_times"]["Update"];