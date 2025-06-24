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

export default function AddTask({
  user,
  setTasks,
}: {
  user: User;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    duration: 25,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDurationChannge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prev) => ({ ...prev, duration: parseInt(e.target.value) }));
  };

  const addTask = async (newTask: NewTask) => {
    if (!newTask.title || !newTask.duration) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        { title: newTask.title, duration: newTask.duration, user_id: user?.id },
      ])
      .select();

    if (error) {
      console.log(error.message);
      setError("An error occurred. Please try again");
      return;
    }

    const task = data[0];
    delete task.user_id;

    setTasks((prev) => [...prev, task]);
    setOpen(false);
    setError("");
    setLoading(false);
    setNewTask({
      title: "",
      duration: 25,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"lg"}
          className="text-lg cursor-pointer"
        >
          <Plus />
          New Task
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
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              name="duration"
              value={newTask.duration}
              onChange={handleDurationChannge}
              type="number"
              min={1}
              max={1440}
            />
          </div>
          {error && <div>error message</div>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => addTask(newTask)} disabled={loading}>
            {loading ? "Adding task..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
