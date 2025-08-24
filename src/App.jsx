import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50 flex items-center justify-center p-6">
      <main className="w-full max-w-md bg-white/80 backdrop-blur rounded-2xl shadow p-6 border border-rose-100 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium">
          <span>✅ Tailwind v4 activo</span>
        </div>

        <h1 className="mt-4 text-2xl font-semibold text-rose-800">
          Vite + React + Tailwind
        </h1>

        <p className="mt-2 text-rose-900/80">
          Si ves colores rosados, bordes redondeados y esta tarjeta con sombra,
          Tailwind está funcionando correctamente.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => setCount((n) => n + 1)}
            className="w-full px-4 py-2 rounded-lg bg-rose-600 text-white font-medium shadow hover:bg-rose-700 transition
                       focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          >
            count is {count}
          </button>

          <div className="grid grid-cols-3 gap-3">
            <div className="h-10 rounded bg-rose-100 ring-1 ring-rose-200" />
            <div className="h-10 rounded bg-rose-200 ring-1 ring-rose-300" />
            <div className="h-10 rounded bg-rose-300 ring-1 ring-rose-400" />
          </div>

          <p className="text-xs text-rose-900/60">
            (La cuadrícula de 3 bloques también es un test de utilidades.)
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
