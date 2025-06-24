import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
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

type User = {
  id?: string;
  email?: string;
};

type NewTask = {
  title: string;
  duration: number;
};

type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

type Task = {
  id: string;
  title: string;
  duration: number;
  status: TaskStatus;
  created_at: Date;
};

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    duration: 25,
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("id,title,duration,status,created_at");

    if (error) {
      toast("Error fetching tasks")
      return
    }

    if (!data) {
      return;
    }

    setTasks((prev) => prev.concat(data));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user?.email) {
        navigate("/login");
      }

      setUser({ id: data.user?.id, email: data.user?.email });
    };

    fetchUser();
    getTasks();
  }, []);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDurationChannge = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask((prev) => ({ ...prev, duration: parseInt(e.target.value) }));
  };

  const addTask = async (newTask: NewTask) => {
    if (!newTask.title || !newTask.duration) {
      toast("Both task title and duration are required!");
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        { title: newTask.title, duration: newTask.duration, user_id: user?.id },
      ])
      .select();

    console.log(data, error);
  };

  if (!user?.email) {
    return <div>wait</div>;
  }

  return (
    <div className="min-h-dvh">
      <div className="border-b">
        <div className="container mx-auto py-3 px-4">
          <h1 className="font-bold text-2xl">FocusLock</h1>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-3 px-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-70">{new Date().toDateString()}</p>
              <h2 className="font-semibold text-xl">Total Focus: 3h 42m</h2>
            </div>
            <div>
              <Dialog>
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
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => addTask(newTask)}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="container mx-auto border border-blue-500">
          {tasks.map(task => (
            <div key={task.id}>{task.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
