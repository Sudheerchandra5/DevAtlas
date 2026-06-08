interface ProgressBarProps {
  percentage: number;
  colorClass: string;
}

export default function ProgressBar({ percentage, colorClass }: ProgressBarProps) {
  return (
    <div className="h-2 w-full rounded-full bg-surface-overlay overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
