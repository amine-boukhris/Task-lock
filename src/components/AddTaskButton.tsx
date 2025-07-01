import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type SetStateAction,
} from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/AuthContext";
import type { NewTask, Task } from "@/types";
import { Navigate } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";
import CircularProgress from "@/components/CircularProgress";
import type { User } from "@supabase/supabase-js";
import { useCreateTask } from "@/hooks/useTasks";

export default function AddTaskButton() {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    duration: 25,
  });

  const createTaskMutation = useCreateTask();
  function submit() {
    createTaskMutation.mutate(newTask);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-center cursor-pointer"
          size={"lg"}
        >
          <Plus className="size-6 mx-px" />
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
          <DialogDescription>
            Enter the task title and task duration in minutes
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="task-title">Task title</Label>
            <Input
              id="task-title"
              name="taskTitle"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              name="duration"
              value={newTask.duration}
              onChange={(e) =>
                setNewTask((prev) => ({
                  ...prev,
                  duration: parseInt(e.target.value),
                }))
              }
              type="number"
              min={1}
              max={1440}
            />
          </div>
          {/* {error && <div>error message</div>} */}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            {!createTaskMutation.isPending && (
              <Button variant="outline">Cancel</Button>
            )}
          </DialogClose>
          <Button onClick={submit}>
            {createTaskMutation.isPending ? "Adding task..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
