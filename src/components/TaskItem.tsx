import { EllipsisVertical } from "lucide-react";
import type { Task, TaskUpdate } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { secondsToMM } from "@/lib/utils";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTasks";

interface TaskItemProps {
  task: Task;
  onClick?: (task: Task) => void;
}

export default function TaskItem({ task, onClick }: TaskItemProps) {
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  function handleCancelStatusChange() {
    let data: TaskUpdate = {};
    if (task.status != "cancelled") {
      data.status = "cancelled";
    } else {
      if (task.time_left == task.duration) data.status = "pending";
      else if (task.time_left == 0) data.status = "completed";
      else data.status = "in_progress";
    }
    updateTaskMutation.mutate({ id: task.id, data });
  }

  function deleteTask() {
    deleteTaskMutation.mutate(task.id);
  }

  function resetTask() {
    updateTaskMutation.mutate({
      id: task.id,
      data: { time_left: task.duration, status: "pending" },
    });
  }

  return (
    <div
      onClick={() => onClick && onClick(task)}
      className="flex items-center gap-3 px-2 py-3 border-2 border-neutral-600 text-neutral-800 rounded-xl shadow-md"
    >
      <div className="border-2 border-neutral-600  rounded-xl px-2 py-1 aspect-square flex justify-center items-center">
        {secondsToMM(task.time_left)}
      </div>
      <div className="flex-1 space-x-1">
        <p className=" inline text-base">{task.title}</p>
        <span className="text-neutral-500 text-xs">
          {secondsToMM(task.duration)}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <EllipsisVertical className="p-0.5 cursor-pointer size-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={handleCancelStatusChange}>
            {task.status == "cancelled" ? "Uncancel" : "Cancel"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteTask}>Delete</DropdownMenuItem>
          <DropdownMenuItem onClick={resetTask}>Reset</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
