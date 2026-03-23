export default function ProgressBar({ streak }) {

    const progress = Math.min((streak / 66) * 100, 100);
  
    return (
      <div className="w-full">
        <div className="h-3 bg-red-200 rounded-full">
          <div
            className="h-3 bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }