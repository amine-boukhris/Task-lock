import { EllipsisVertical } from "lucide-react";
import type { Task, TaskUpdate } from "@/types/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { secondsToMM } from "@/lib/utils";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import { useTaskStore } from "@/store/taskTimerStore";
import { toast } from "sonner";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();
  const { selectedTask, isRunning, setSelectedTask, removeSelectedTask } = useTaskStore();

  function handleCancelStatusChange() {
    const data: TaskUpdate = {};
    if (task.status != "cancelled") {
      if (selectedTask?.id == task.id && isRunning) {
        return toast.info("Can't cancel running task");
      }
      if (selectedTask?.id == task.id) {
        removeSelectedTask();
      }
      data.status = "cancelled";
    } else {
      if (task.time_left == task.duration) data.status = "pending";
      else if (task.time_left == 0) data.status = "completed";
      else data.status = "in_progress";
    }
    updateTaskMutation.mutate({ id: task.id, data });
  }

  function handleDelete() {
    if (isRunning && selectedTask?.id == task.id) {
      toast("Can't delete task. Task is running");
      return;
    }

    if (selectedTask?.id == task.id) {
      removeSelectedTask();
    }

    deleteTaskMutation.mutate(task.id);
  }

  function handleReset() {
    if (selectedTask?.id == task.id && isRunning) {
      return toast.info("Task is running");
    }

    if (selectedTask?.id == task.id) {
      setSelectedTask({ ...task, time_left: task.duration });
    }

    updateTaskMutation.mutate({
      id: task.id,
      data: { time_left: task.duration, status: "pending" },
    });
  }

  function handleClick() {
    if (task.status == "completed" || task.status == "cancelled") {
      return toast.info("Can't select this task");
    }

    if (isRunning) {
      return toast.info("Timer is already running");
    }

    if (selectedTask?.id == task.id) {
      return toast.info("Task is already selected");
    }

    setSelectedTask(task);
  }

  function handleEdit() {
    return;
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 px-2 py-3 border-2 dark:border border-neutral-600 text-neutral-800 dark:text-neutral-200 dark:border-neutral-700 rounded-xl shadow-md"
    >
      <div className="border-2 dark:border border-neutral-600 dark:border-neutral-700  rounded-xl px-2 py-1 aspect-square flex justify-center items-center">
        {secondsToMM(task.time_left)}
      </div>
      <div className="flex-1 space-x-1">
        <p className=" inline text-base">{task.title}</p>
        <span className="text-neutral-500 text-xs">{secondsToMM(task.duration)}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none" onClick={(e) => e.stopPropagation()}>
          <EllipsisVertical className="p-0.5 cursor-pointer size-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleCancelStatusChange();
            }}
          >
            {task.status == "cancelled" ? "Uncancel" : "Cancel"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={(selectedTask?.id == task.id && isRunning) || task.duration == task.time_left}
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
          >
            Reset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
