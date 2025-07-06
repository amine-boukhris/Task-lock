import { useTaskStore } from "@/store/taskTimerStore";
import { toast } from "sonner";
import { useUpdateTask } from "./useTasks";
import { useEffect, useRef, useState } from "react";
import { useCreateFocusTime, useFocusTime, useUpdateFocusTime } from "./useFocusTimes";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/AuthContext";

export function useTimer() {
  const { user } = useAuth();

  const { selectedTask, setSelectedTask, isRunning, setIsRunning } = useTaskStore();
  const { data: focusTime } = useFocusTime(formatDate(new Date()));
  const createFocusTimeMutation = useCreateFocusTime();
  const updateFocusTimeMutation = useUpdateFocusTime();
  const updateTaskMutation = useUpdateTask();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const initialTimeLeft = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // For cleanup of intervals
  const startTime = useRef<number | null>(null); // store when start button was clicked, uses performance.now(), updates every start

  useEffect(() => {
    if (selectedTask) setTimeLeft(selectedTask.time_left);
  }, [selectedTask]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = async () => {
    if (isRunning) {
      toast("Timer already running");
    }

    if (!selectedTask || !timeLeft) {
      toast("Please select a task");
      return;
    }

    if (selectedTask.status != "in_progress") {
      updateTaskMutation.mutate({
        id: selectedTask.id,
        data: { status: "in_progress" },
      });
    }

    initialTimeLeft.current = selectedTask.time_left;
    startTime.current = performance.now();
    const startingTimeLeft = timeLeft; // in seconds
    setIsRunning(true);

    intervalRef.current = setInterval(async () => {
      const elapsed = Math.floor((performance.now() - startTime.current!) / 1000); // in seconds
      const newTimeLeft = startingTimeLeft - elapsed;

      if (newTimeLeft <= 0) {
        clearInterval(intervalRef.current!);
        setIsRunning(false);
        setTimeLeft(0);
        updateTaskMutation.mutate({
          id: selectedTask.id,
          data: { status: "completed", time_left: 0 },
        });

        toast("Task completed!");
      } else {
        setTimeLeft(newTimeLeft);
        const current = useTaskStore.getState().selectedTask;
        if (current) {
          useTaskStore.getState().setSelectedTask({
            ...current,
            time_left: newTimeLeft,
          });
        }
      }
    }, 1000);
  };

  const pauseTimer = async () => {
    setIsRunning(false);

    if (intervalRef.current == null || !selectedTask) {
      startTime.current = null;
      return;
    }

    clearInterval(intervalRef.current);
    setIsRunning(false);

    updateTaskMutation.mutate({
      id: selectedTask.id,
      data: { time_left: timeLeft ?? 0 },
    });

    const elapsed = Math.floor((performance.now() - startTime.current!) / 1000); // in seconds
    const safeElapsed = Math.min(elapsed, initialTimeLeft.current ?? 0);
    const today = formatDate(new Date());

    if (!focusTime) {
      createFocusTimeMutation.mutate({
        date: today,
        user_id: user!.id,
        time: safeElapsed,
      });
    } else {
      updateFocusTimeMutation.mutate({
        id: focusTime.id,
        data: {
          time: focusTime.time + safeElapsed,
        },
      });
    }
  };

  return { startTimer, pauseTimer, timeLeft, selectedTask, isRunning, initialTimeLeft };
}
