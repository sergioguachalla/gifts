import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita acentos
    .replace(/[^a-z0-9\s]/g, "")     // deja letras/números/espacios
    .trim();

export default function GuessGift({ id, titulo, frase, pista, acceptedAnswers }) {
  const statusKey = `riddle:${id}:status`;
  const triesKey = `riddle:${id}:tries`;

  const [guess, setGuess] = useState("");
  const [tries, setTries] = useState(() => {
    const saved = Number(localStorage.getItem(triesKey));
    return Number.isFinite(saved) && saved >= 0 ? saved : 3;
  });

  useEffect(() => {
    setTries(3);
  }, [id]);
  const [status, setStatus] = useState(() => localStorage.getItem(statusKey) || "pendiente");

  const answersNorm = useMemo(() => acceptedAnswers.map(normalize), [acceptedAnswers]);
  const isLocked = status === "correcto" || status === "fallaste";

  useEffect(() => {
    localStorage.setItem(triesKey, String(tries));
  }, [tries]);

  useEffect(() => {
    localStorage.setItem(statusKey, status);
  }, [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLocked) return;

    const g = normalize(guess);
    const ok = answersNorm.some((a) => g.includes(a) || a.includes(g)); // flexible

    if (ok) {
      setStatus("correcto");
    } else {
      setTries((t) => {
        const next = t - 1;
        if (next <= 0) {
          setStatus("fallaste");
          return 0;
        }
        setStatus("intento");
        return next;
      });
    }
    setGuess("");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl bg-blush-50 border border-blush-200 p-4 md:p-5 text-left shadow-soft"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg md:text-xl text-rose-800">{titulo}</h3>
        <span className="text-xs text-rose-500">
          Intentos: <b>{tries}</b>
        </span>
      </div>

      <p className="mt-1 text-rose-700 italic">Pista: {pista}</p>

      <form onSubmit={onSubmit} className="mt-3 flex gap-2">
  <motion.input
    type="text"
    value={guess}
    onChange={(e) => setGuess(e.target.value)}
    placeholder="¿Qué crees que es?"
    disabled={isLocked}
    whileFocus={{ scale: 1.02 }}
    className="flex-1 px-4 py-2 border border-rose-300 rounded-full bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-400 text-rose-900 placeholder-rose-400"
  />
  <motion.button
    type="submit"
    disabled={isLocked}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white font-medium shadow-md hover:shadow-lg disabled:opacity-50"
  >
    Adivinar
  </motion.button>
</form>


      <AnimatePresence mode="wait">
        {status === "correcto" && (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 text-green-600 font-semibold"
          >
            🎉 ¡Correcto! {frase}
          </motion.p>
        )}

        {status === "fallaste" && (
          <motion.p
            key="fail"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 text-rose-700 font-semibold"
          >
            💔 Te quedaste sin intentos.
            
          </motion.p>
        )}

        {status === "intento" && (
          <motion.p
            key="try"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 text-rose-700"
          >
            ❌ Todavía no… te quedan <b>{tries}</b> intento(s).
          </motion.p>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
