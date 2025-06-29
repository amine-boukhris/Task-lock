export default function TotalFocus() {
  const totalFocus = 23454;

  return (
    <div className="absolute top-6 right-6 text-right">
      <p className="text-neutral-700 text-base">{secondsToHHMMSS(totalFocus)}</p>
      <p className="text-neutral-700 text-xs">Total focus</p>
    </div>
  );
}

function secondsToHHMMSS(time: number) {
  return `${
    Math.floor(time / 3600) < 10
      ? "0" + Math.floor(time / 3600)
      : Math.floor(time / 3600)
  }:${
    Math.floor(time % 3600 / 60) < 10
      ? "0" + Math.floor(time % 3600 / 60)
      : Math.floor(time % 3600 / 60)
  }:${time % 3600 % 60 < 10 ? "0" + (time % 3600 % 60) : time % 3600 % 60}`;
}
