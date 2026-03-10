export default function ProgressBar({ progress }) {
    return (
      <div className="w-full">
        <div className="mb-2 flex justify-between text-sm font-medium text-slate-600">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
  
        <div className="h-3 w-full overflow-hidden rounded-full bg-red-200">
          <div
            className="h-3 rounded-full bg-green-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  }