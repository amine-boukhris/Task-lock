type Props = {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0 to 100
  timerLabel?: string;
};

export default function CircularProgress({
  size = 160,
  strokeWidth = 10,
  progress,
  timerLabel,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-block">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b" // background ring color
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6" // active progress color
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl">{timerLabel}</span>
      </div>
    </div>
  );
}
