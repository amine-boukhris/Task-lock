import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/AuthContext";
import type { FocusTotal, Task, TaskStatus } from "@/types";
import { Navigate } from "react-router";
import CircularProgress from "@/components/CircularProgress";
import AddTask from "@/components/AddTask";
import Header from "@/layout/Header";
import TaskItem from "@/components/TaskItem";

function Dashboard() {
  const { user, loading } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]); // All user tasks
  const [currentTask, setCurrentTask] = useState<Task | null>(null); // task being timed
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // time left for time progress, isn't always in sync with currentTask.timeLeft or db
  const [isRunning, setIsRunning] = useState<boolean>(false); // whether timer is running or not
  const [focusTotal, setFocusTotal] = useState<FocusTotal | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // For cleanup of intervals
  const startTime = useRef<number | null>(null); // store when start button was clicked, uses performance.now(), updates every start

  const mainTasks = tasks.filter(
    (task) => task.status == "pending" || task.status == "in_progress"
  );
  const completedTasks = tasks.filter((task) => task.status == "completed");
  const cancelledTasks = tasks.filter((task) => task.status == "cancelled");

  const getTotalFocus = async () => {
    const { data, error } = await supabase.from("focus_totals").select("*");

    if (error) {
      console.log(error);
    }

    console.log(data);
    if (!data) {
      return;
    }

    if (!data[0]) {
      const { data: data2, error } = await supabase
        .from("focus_totals")
        .insert([{ user_id: user.id, last_updated: new Date() }])
        .select();

      if (error) {
        console.log(error);
      }

      if (!data2) {
        return;
      }

      delete data2[0].user_id;
      setFocusTotal(data2[0]);

      console.log(data2);
    } else {
      delete data[0].user_id;
      setFocusTotal(data[0]);
    }
  };

  // Fetch tasks from database and set state
  const getTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("id,title,duration,status,created_at,time_left");

    if (error) {
      console.log(error);
      toast("Error fetching tasks");
      return;
    }

    if (!data) {
      return;
    }

    // set tasks and current task to the first task if it exists
    // TODO: add order to tasks and set the task with the highest order
    setTasks(data);
    const availableTasks = data.filter(
      (t) => t.status == "pending" || t.status == "in_progress"
    );
    if (availableTasks[0]) {
      setCurrentTask(availableTasks[0]);
      setTimeLeft(availableTasks[0].time_left);
    }
  };

  // populate state on mount
  useEffect(() => {
    getTasks();
    getTotalFocus();
  }, [user]);

  const startTimer = async () => {
    if (!currentTask || !timeLeft) {
      toast("Please select a task");
      return;
    }

    const { error } = await supabase
      .from("tasks")
      .update({ status: "in_progress" as TaskStatus })
      .eq("id", currentTask.id);

    if (error) {
      console.log(error);
    }

    startTime.current = performance.now(); // in milliseconds
    const startingTimeLeft = timeLeft; // in seconds
    setIsRunning(true);
    intervalRef.current = setInterval(async () => {
      const elapsed = Math.floor(
        (performance.now() - startTime.current!) / 1000
      ); // in seconds
      const newTimeLeft = startingTimeLeft - elapsed;
      console.log(newTimeLeft);

      if (newTimeLeft <= 0) {
        clearInterval(intervalRef.current!);
        setIsRunning(false);
        setTimeLeft(0);
        setTasks((prev) =>
          prev.map((t) =>
            t.id == currentTask.id
              ? { ...t, status: "completed", time_left: 0 }
              : t
          )
        );
        setCurrentTask(null);
        const { error } = await supabase
          .from("tasks")
          .update({ status: "completed" as TaskStatus, time_left: 0 })
          .eq("id", currentTask.id);

        if (error) {
          console.log(error);
        }

        toast("Task completed!");
      } else {
        setTimeLeft(newTimeLeft);
        setCurrentTask((prev) => ({ ...prev!, time_left: newTimeLeft }));
        console.log(currentTask, timeLeft);
      }
    }, 1000);
  };

  // clear interval, sync with state and database,
  const pauseTimer = async () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      setIsRunning(false);

      const { data, error } = await supabase
        .from("tasks")
        .update({ time_left: timeLeft })
        .eq("id", currentTask.id)
        .select();

      if (error) {
        console.log(error);
      }

      setTasks((prev) => {
        return prev.map((task) =>
          task.id == currentTask.id
            ? { ...task, time_left: currentTask?.time_left }
            : task
        );
      });

      console.log(data);

      const elapsed = Math.floor(
        (performance.now() - startTime.current!) / 1000
      ); // in seconds
      const lastUpdated = new Date(focusTotal.last_updated);
      const today = new Date();

      const isToday =
        lastUpdated.getFullYear() === today.getFullYear() &&
        lastUpdated.getMonth() === today.getMonth() &&
        lastUpdated.getDate() === today.getDate();
      if (isToday) {
        const { data: data2, error } = await supabase
          .from("focus_totals")
          .update({ focus_time: focusTotal?.focus_time + elapsed })
          .eq("id", focusTotal.id)
          .select();

        if (error) console.log(error);
        if (!data2) return;

        console.log(data2);
        setFocusTotal((prev) => ({
          ...prev,
          focus_time: prev?.focus_time + elapsed,
        }));
      } else {
        const newDate = new Date();
        const { data: data2, error } = await supabase
          .from("focus_totals")
          .update({ focus_time: elapsed, last_updated: newDate })
          .eq("id", focusTotal.id)
          .select();

        if (error) console.log(error);
        if (!data2) return;

        console.log(data2);
        setFocusTotal((prev) => ({
          ...prev,
          focus_time: elapsed,
          last_updated: newDate,
        }));
      }
    }
  };

  // Select a task unless one is already running
  const onTaskClick = (task: Task) => {
    if (
      task.time_left == 0 ||
      task.status == "completed" ||
      task.status == "cancelled"
    ) {
      return;
    }
    if (!isRunning) {
      setCurrentTask(task);
      setTimeLeft(task.time_left);
    } else {
      toast("You are already working on a task");
    }
  };

  // remove task entirely from the tasks list, both in state and db
  // if task is selected it updates the relevant state
  // clear interval if task is running
  // TODO: pass only task id as argument
  const deleteTask = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    task: Task
  ) => {
    e.stopPropagation();
    const { error } = await supabase.from("tasks").delete().eq("id", task.id);

    if (error) {
      console.log(error);
    }

    setTasks((prev) => prev.filter((t) => t.id != task.id));
    if (currentTask.id == task.id) {
      setCurrentTask(null);
      setTimeLeft(null);
      if (intervalRef.current !== null) {
        setIsRunning(false);
        clearInterval(intervalRef.current);
      }
    }
  };

  if (loading) return <div>loading...</div>;
  if (!user) return <Navigate to={"/login"} />;

  return (
    <div className="min-h-dvh">
      <Header />

      <div>
        {/* User info and add task button */}
        <div className="container mx-auto py-3 px-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-70">{new Date().toDateString()}</p>
              <h2 className="font-semibold text-xl">
                Total Focus:{" "}
                {`${
                  Math.floor(focusTotal?.focus_time! / 3600) < 10
                    ? "0" + Math.floor(focusTotal?.focus_time! / 3600)
                    : Math.floor(focusTotal?.focus_time! / 3600)
                }:${
                  Math.floor(focusTotal?.focus_time! / 60) < 10
                    ? "0" + Math.floor(focusTotal?.focus_time! / 60)
                    : Math.floor(focusTotal?.focus_time! / 60)
                }:${
                  focusTotal?.focus_time! % 60 < 10
                    ? "0" + (focusTotal?.focus_time! % 60)
                    : focusTotal?.focus_time! % 60
                }`}
              </h2>
              <p>{user.email}</p>
            </div>
            <div>
              <AddTask user={user} setTasks={setTasks} />
            </div>
          </div>
        </div>
        {/* Core features */}
        <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Timer section */}
          <div className="bg-secondary flex flex-col gap-8 items-center justify-center px-2 py-8">
            <div>{currentTask ? currentTask.title : "Select a task"}</div>
            <CircularProgress
              progress={Math.ceil(
                ((timeLeft || 0) / (currentTask?.duration || 1)) * 100
              )}
              timerLabel={`${Math.floor(timeLeft! / 60)}:${
                timeLeft! % 60 < 10 ? "0" + (timeLeft! % 60) : timeLeft! % 60
              }`}
              size={320}
            />
            {isRunning ? (
              <Button
                variant={"default"}
                size={"lg"}
                className="text-lg cursor-pointer"
                onClick={pauseTimer}
              >
                <Pause />
                Pause
              </Button>
            ) : (
              <Button
                variant={"outline"}
                size={"lg"}
                className="text-lg cursor-pointer"
                onClick={startTimer}
              >
                <Play />
                Start
              </Button>
            )}
          </div>
          {/* Tasks view section */}
          <div className="space-y-8">
            {/* pending and in progress tasks */}
            <div className="space-y-2">
              <div className="mx-4 mb-4 space-y-1">
                <h1 className=" text-2xl font-semibold">My tasks</h1>
                {!mainTasks.length && (
                  <p>you don't have any pending or in progress tasks</p>
                )}
              </div>
              {mainTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onTaskClick={onTaskClick}
                  deleteTask={deleteTask}
                />
              ))}
            </div>
            <hr className="w-full" />
            {/* completed tasks */}
            <div className="space-y-2">
              <div className="mx-4 mb-4 space-y-1">
                <h1 className=" text-2xl font-semibold">Completed</h1>
                {!completedTasks.length && <p>you don't have any tasks</p>}
              </div>
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onTaskClick={onTaskClick}
                  deleteTask={deleteTask}
                />
              ))}
            </div>
            <hr />
            {/* Cancelled tasks */}
            <div className="space-y-2">
              <div className="mx-4 mb-4 space-y-1">
                <h1 className=" text-2xl font-semibold">Cancelled</h1>
                {!cancelledTasks.length && (
                  <p>you don't have any cancelled tasks</p>
                )}
              </div>
              {cancelledTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onTaskClick={onTaskClick}
                  deleteTask={deleteTask}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
