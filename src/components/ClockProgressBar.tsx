import { cn } from "@/lib/utils";

interface ClockProgressBarProps {
  progress: number;
  dotSize?: number;
  className?: string;
}

export default function ClockProgressBar({
  progress,
  dotSize = 16,
  className,
}: ClockProgressBarProps) {
  return (
    <div
      className={cn(
        "w-[500px] rounded-full h-2 bg-neutral-300 relative",
        className
      )}
    >
      <div
        className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress * 100}%` }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 bg-primary rounded-full"
        style={{
          left: `calc(${progress * 100}% - ${dotSize / 2}px)`,
          width: `${dotSize}px`,
          height: `${dotSize}px`,
        }}
      />
    </div>
  );
}
