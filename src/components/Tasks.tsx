import { useTasks } from "@/hooks/useTasks";
import TaskItem from "@/components/TaskItem";
import { useTaskStore } from "@/store/taskTimerStore";
import { toast } from "sonner";
import type { Task } from "@/types";

export default function Tasks() {
  const { data: tasks } = useTasks();
  const { setSelectedTask } = useTaskStore();

  const mainTasks = tasks?.filter(
    (task) => task.status == "pending" || task.status == "in_progress"
  );
  const completedTasks = tasks?.filter((task) => task.status == "completed");
  const cancelledTasks = tasks?.filter((task) => task.status == "cancelled");

  function onClick(task: Task) {
    const isRunning = false;
    if (isRunning) {
      toast("Timer is already ");
      return;
    }
    setSelectedTask(task);
  }

  return (
    <div className="relative border-2 border-neutral-800 px-6 py-6 max-w-6xl mx-auto rounded-xl bg-neutral-50 aspect-video">
      <div className="w-1/2 mx-auto space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl text-neutral-700">Active Tasks</h2>
          {!mainTasks?.length && (
            <p className="text-neutral-600">
              you don't have any completed tasks
            </p>
          )}
          {mainTasks?.map((task) => (
            <TaskItem key={task.id} task={task} onClick={onClick} />
          ))}
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl text-neutral-700">Completed</h2>
          {!completedTasks?.length && (
            <p className="text-neutral-600">
              you don't have any completed tasks
            </p>
          )}
          {completedTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl text-neutral-700">Cancelled</h2>
          {!cancelledTasks?.length && (
            <p className="text-neutral-600">
              you don't have any cancelled tasks
            </p>
          )}
          {cancelledTasks?.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
