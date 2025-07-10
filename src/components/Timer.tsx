import Clock from "./Clock";
import ClockDetails from "./ClockDetails";
import TotalFocus from "./TotalFocus";

export default function Timer() {
  return (
    <div className="relative border-2 border-neutral-800 dark:border dark:border-neutral-700 px-6 py-6 flex items-center justify-center max-w-6xl mx-auto rounded-xl bg-neutral-50 dark:bg-neutral-900 aspect-video">
      <Clock />
      <ClockDetails />
      <TotalFocus />
    </div>
  );
}
