import { EllipsisVertical } from "lucide-react";
import { Button } from "./ui/button";

export default function TaskItem() {
  const title = "Imlement design system";
  const timeLeft = 2669;
  const duration = 2700;

  return (
    <div className="flex items-center gap-3 px-2 py-3 border-2 border-neutral-600 rounded-xl shadow-md">
      <div className="border-2 border-neutral-600 rounded-xl px-2 py-1 aspect-square flex justify-center items-center">
        {secondsToMM(timeLeft)}
      </div>
      <div className="flex-1 space-x-1">
        <p className="text-neutral-800 inline text-base">{title}</p>
        <span className="text-neutral-500 text-xs">
          {secondsToMM(duration)}
        </span>
      </div>

      <EllipsisVertical className="p-0.5 cursor-pointer size-6" />
    </div>
  );
}

function secondsToMM(time: number) {
  return Math.ceil(time / 60);
}
