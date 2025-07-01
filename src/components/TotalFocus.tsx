import { secondsToHHMMSS } from "@/lib/utils";

export default function TotalFocus() {
  const totalFocus = 23454;

  return (
    <div className="absolute top-6 right-6 text-right">
      <p className="text-neutral-700 text-lg">{secondsToHHMMSS(totalFocus)}</p>
      <p className="text-neutral-700 text-xs">Total focus</p>
    </div>
  );
}


