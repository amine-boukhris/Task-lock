import { supabase } from "@/lib/supabase";
import type { NewTask, Task, TaskUpdate } from "@/types/index";

export async function fetchTasks(): Promise<Task[]> {
  const { data: tasks, error } = await supabase.from("tasks").select("*");
  if (error) throw error;
  return tasks ?? [];
}

export async function createTask(task: NewTask) {
  const { data: created, error } = await supabase
    .from("tasks")
    .insert({ ...task, time_left: task.duration })
    .select()
    .single();
  if (error) throw error;
  return created;
}

export async function updateTask({ id, data }: { id: number; data: TaskUpdate }) {
  const { data: updated, error } = await supabase
    .from("tasks")
    .update(data)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return updated;
}

export async function deleteTask(id: number) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}
