import type { Task } from "@/types/index";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface TaskState {
  selectedTask: Task | null;
  isRunning: boolean;
  setSelectedTask: (taskId: Task) => void;
  setIsRunning: (state: boolean) => void;
  removeSelectedTask: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      selectedTask: null,
      isRunning: false,
      setSelectedTask: (task: Task) => {
        set({
          selectedTask: task,
        });
      },
      setIsRunning: (state) => {
        set({
          isRunning: state,
        });
      },
      removeSelectedTask: () => {
        set({ selectedTask: null });
        sessionStorage.removeItem("task-storage");
      },
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
