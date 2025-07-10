import { secondsToMMSS } from "@/lib/utils";
import ClockProgressBar from "./ClockProgressBar";
import { useTimer } from "@/hooks/useTimer";
import { Button } from "./ui/button";
import { useTaskStore } from "@/store/taskTimerStore";

export default function Clock() {
  const { startTimer, pauseTimer, timeLeft, initialTimeLeft } = useTimer();
  const { selectedTask, isRunning } = useTaskStore();
  const progress = (selectedTask && (timeLeft ?? 0) / selectedTask.duration) || 0;

  function handleControlClick() {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-neutral-700 dark:text-neutral-300 text-2xl">{selectedTask?.title ?? "No task selected"}</h2>
      <div className="text-center">
        <p className="text-neutral-600 dark:text-neutral-400">Duration: {secondsToMMSS(selectedTask?.duration ?? 0)}</p>
        <p className="text-neutral-600 dark:text-neutral-400">
          Time Left: {secondsToMMSS(initialTimeLeft.current ?? timeLeft ?? 0)}
        </p>
      </div>
      <h1 className="text-neutral-900 dark:text-neutral-100 text-7xl">
        {secondsToMMSS(selectedTask ? timeLeft ?? 0 : 0)}
      </h1>
      <ClockProgressBar progress={progress} dotSize={16} className="my-3" />
      <Button size={"lg"} className="text-base cursor-pointer" onClick={handleControlClick}>
        {isRunning ? "Pause" : "Start"}
      </Button>
    </div>
  );
}
