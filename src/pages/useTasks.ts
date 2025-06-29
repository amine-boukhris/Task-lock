import { useEffect, useState } from "react";
import * as taskService from "@/services/taskService";
import type { Task } from "@/types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: Partial<Task>) => {
    const newTask = await taskService.addTask(task);
    setTasks((prev) => [...prev, newTask]);
  };

  const modifyTask = async (id: string, updates: Partial<Task>) => {
    await taskService.updateTask(id, updates);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const removeTask = async (id: string) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    createTask,
    modifyTask,
    removeTask,
    refresh: loadTasks,
  };
}
