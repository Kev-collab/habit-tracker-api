import ProgressBar from "./ProgressBar";

export default function HabitCard({ habit }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      <h2 className="text-xl font-bold text-slate-800">{habit.title}</h2>

      <p className="mt-2 text-sm text-slate-600">{habit.description}</p>

      <div className="mt-4">
        <ProgressBar progress={habit.progress} />
      </div>

      <button
        type="button"
        className="mt-5 rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
      >
        Done
      </button>
    </div>
  );
}