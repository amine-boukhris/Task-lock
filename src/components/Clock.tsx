import { secondsToMMSS } from "@/lib/utils";
import ClockControl from "./ClockControl";
import ClockProgressBar from "./ClockProgressBar";

export default function Clock() {
  const title = "Implement design system";
  const timeLeft = 2669;

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-neutral-700 text-2xl">{title}</h2>
      <h1 className="text-neutral-900 text-7xl">{secondsToMMSS(timeLeft)}</h1>
      <ClockProgressBar progress={0.2} dotSize={16} className="my-3" />
      <ClockControl />
    </div>
  );
}
