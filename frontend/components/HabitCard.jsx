import ProgressBar from "./ProgressBar";

export default function HabitCard({ habit }) {

  const markDone = async () => {
    try {
      await fetch(`http://localhost:5000/api/habits/${habit._id}/done`, {
        method: "POST"
      });

      // refresca la página para actualizar la racha
      window.location.reload();

    } catch (error) {
      console.error("Error marking habit as done:", error);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
      
      <h2 className="text-xl font-bold text-slate-800">
        {habit.name}
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        {habit.description}
      </p>

      <div className="mt-4">
        <ProgressBar streak={habit.streak} />
      </div>

      <button
        onClick={markDone}
        className="mt-5 rounded-xl bg-slate-900 px-4 py-2 text-white"
      >
        Done
      </button>

    </div>
  );
}

  