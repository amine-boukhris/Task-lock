import { secondsToHHhMM } from "@/lib/utils";

interface BarChartProps {
  data: {
    label: string;
    time: number;
  }[];
  width?: number;
  height?: number;
}

export default function BarChart({ data, width = 600, height = 300 }: BarChartProps) {
  const maxValue = Math.max(...data.map((item) => item.time), 1000);
  const numberOfBars = 7;

  return (
    <div className="mx-auto px-3 py-5 rounded-lg bg-accent text-neutral-900 dark:text-neutral-100">
      <svg width={width} height={height}>
        {data.map((item, index) => {
          const barHeight = (item.time / maxValue) * (height - 50);
          const barWidth = width / numberOfBars - 10;
          const x = index * (width / numberOfBars);
          const y = height - barHeight - 30;
          return (
            <g key={item.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={Math.min(Math.floor(barHeight / 2), 8)}
                ry={Math.min(Math.floor(barHeight / 2), 8)}
                className="fill-primary"
              />
              <text x={x + barWidth / 2} y={height - 10} textAnchor="middle" fontSize={12} className="fill-neutral-900 dark:fill-neutral-100">
                {item.label.slice(0, 5)}
              </text>
              <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" fontSize="12" className="fill-neutral-900 dark:fill-neutral-100">
                {secondsToHHhMM(item.time)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
