import { useFocusTime } from "@/hooks/useFocusTimes";
import { formatDate, secondsToHHMMSS } from "@/lib/utils";

export default function TotalFocus() {
  const { data: focusTime } = useFocusTime(formatDate(new Date()));

  return (
    <div className="absolute top-6 right-6 text-right">
      <p className="text-neutral-700 dark:text-neutral-300 text-lg">{secondsToHHMMSS(focusTime?.time ?? 0)}</p>
      <p className="text-neutral-700 dark:text-neutral-300 text-xs">Total focus</p>
    </div>
  );
}
