import type { Task } from "@/types";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";

interface TaskProps {
  onTaskClick: (task: Task) => void;
  task: Task;
  deleteTask: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ,task: Task) => void;
}

export default function Task({ onTaskClick, task, deleteTask }: TaskProps) {
  return (
    <div
      className="bg-secondary p-2 cursor-pointer hover:scale-[1.02] hover:bg-background hover:outline transition-all"
      onClick={() => onTaskClick(task)}
    >
      <div className="flex items-center gap-2">
        <div className="border-2 bg-background rounded-full size-10 flex justify-center items-center">
          {Math.ceil(task.time_left / 60)}
        </div>
        <div className="text-xl flex-1">{task.title}</div>
        <Button variant={'outline'} className="rounded-full size-10 cursor-pointer" onClick={(e) => deleteTask(e, task)}>
          <Trash />
        </Button>
      </div>
    </div>
  );
}
