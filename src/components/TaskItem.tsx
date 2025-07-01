import { EllipsisVertical } from "lucide-react";
import type { Task } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { secondsToMM } from "@/lib/utils";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTasks";

export default function TaskItem({ task }: { task: Task }) {
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  function cancelTask() {
    updateTaskMutation.mutate({ id: task.id, data: { status: "cancelled" } });
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
      onClick={() => console.log(task.id, task.title, "clicked")}
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
          <DropdownMenuItem onClick={cancelTask}>Cancel</DropdownMenuItem>
          <DropdownMenuItem onClick={deleteTask}>Delete</DropdownMenuItem>
          <DropdownMenuItem onClick={resetTask}>Reset</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
