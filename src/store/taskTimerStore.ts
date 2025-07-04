import type { Task } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TaskState {
  selectedTask: Task | null;
  isRunning: boolean;
  setSelectedTask: (taskId: Task | null) => void;
  setIsRunning: (state: boolean) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      selectedTask: null,
      isRunning: false,
      setSelectedTask: (task: Task | null) => {
        set({
          selectedTask: task,
        });
      },
      setIsRunning: (state) => {
        set({
          isRunning: state,
        });
      },
    }),
    {
      name: "task-storage",
      partialize: (state) => ({
        selectedTask: state.selectedTask,
      }),
    }
  )
);
