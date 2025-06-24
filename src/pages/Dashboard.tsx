import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Play, Plus } from "lucide-react";
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
import AddTask from "@/components/AddTask";

function Dashboard() {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // For cleanup of intervals
  const startTime = useRef<number | null>(null);

  const stopStopwatch = () => {
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  };

  const resetStopwatch = async () => {
    await updateTable(table.id, {
      ...table,
      totalAmount: table.totalAmount + amountToPay,
    });
    setTotalAmount(table.totalAmount + amountToPay);
    setIsRunning(false);
    setTime(0);
    setAmountToPay(0);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    saveSession();
    startTimeRef.current = null;
  };

  const getTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("id,title,duration,status,created_at");

    if (error) {
      toast("Error fetching tasks");
      return;
    }

    if (!data) {
      return;
    }

    setTasks(data);
    if (data[0]) {
      setCurrentTask(data[0]);
      setTimeLeft(data[0].duration);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const startTimer = () => {
    if (!currentTask || !timeLeft) {
      toast("Please select a task");
      return;
    }

    startTime.current = performance.now(); // in milliseconds
    const startingTimeLeft = timeLeft; // in seconds

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor(
        (performance.now() - startTime.current!) / 1000
      ); // in seconds
      const newTimeLeft = startingTimeLeft - elapsed;

      if (newTimeLeft <= 0) {
        clearInterval(intervalRef.current!);
        toast("Task completed!");
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) return <Navigate to={"/login"} />;

  return (
    <div className="min-h-dvh">
      <div className="border-b">
        <div className="container mx-auto py-3 px-4 flex justify-between">
          <h1 className="font-bold text-2xl">FocusLock</h1>
          <ModeToggle />
        </div>
      </div>
      <div>
        <div className="container mx-auto py-3 px-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-70">{new Date().toDateString()}</p>
              <h2 className="font-semibold text-xl">Total Focus: 3h 42m</h2>
              <p>{user.email}</p>
            </div>
            <div>
              <AddTask user={user} setTasks={setTasks} />
            </div>
          </div>
        </div>
        <div className="container mx-auto grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="bg-secondary flex flex-col gap-8 items-center justify-center px-2 py-8">
            <div>{currentTask ? currentTask.title : "Select a task"}</div>
            <CircularProgress
              progress={70}
              timerLabel={`${Math.floor(timeLeft! / 60)}:${
                timeLeft! % 60 < 10 ? "0" + (timeLeft! % 60) : timeLeft! % 60
              }`}
              size={320}
            />
            <Button
              variant={"outline"}
              size={"lg"}
              className="text-lg cursor-pointer"
              onClick={startTimer}
            >
              <Play />
              Start
            </Button>
          </div>
          <div className="space-y-2">
            <div className="mx-4 mb-4 space-y-1">
              <h1 className=" text-2xl font-semibold">My tasks</h1>
              {!tasks && <p>you don't have any tasks</p>}
            </div>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-secondary p-2 cursor-pointer hover:scale-105 hover:outline transition-all"
                onClick={() => setCurrentTask(task)}
              >
                <div className="flex items-center gap-2">
                  <div className="border-2 bg-background rounded-full size-10 flex justify-center items-center">
                    {task.duration}
                  </div>
                  <div className="text-xl flex-1">{task.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
