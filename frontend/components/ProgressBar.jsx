"use client";

export default function ProgressBar({ streak }) {
  const progress = Math.min((streak / 66) * 100, 100);

  const hue = Math.round((progress / 100) * 120);
  const barColor = `hsl(${hue}, 80%, 45%)`;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
        <span>Progreso al hábito</span>
        <span>{streak}/66 días</span>
      </div>

      <div className="h-4 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-4 rounded-full transition-all duration-500"
          style={{
            width: `${progress}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
}