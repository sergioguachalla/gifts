import { motion } from "framer-motion";
import Countdown from "./components/Countdown.jsx";
import bubu from "./assets/bubu.jpeg";
import dudu from "./assets/dudu.jpeg";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function App() {
  return (
    <div className="min-h-screen bg-blush-50 flex items-center justify-center p-4">
      {/* Tarjeta principal */}
      <motion.main
        {...fadeUp}
        className="relative w-full max-w-2xl rounded-3xl bg-white/80 backdrop-blur-sm shadow-soft p-7 md:p-10 text-center border border-blush-200"
      >
        {/* Sticker esquinas */}
        <img
          src={bubu}
          alt="Bubu"
          className="hidden md:block absolute -left-4 -bottom-4 w-24 h-24 object-contain opacity-80 rotate-[-8deg] select-none pointer-events-none"
        />
        <img
          src={dudu}
          alt="Dudu"
          className="hidden md:block absolute -right-4 -top-4 w-24 h-24 object-contain opacity-80 rotate-[10deg] select-none pointer-events-none"
        />

        {/* Encabezado romántico */}
        <motion.h1
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-serif text-3xl md:text-4xl font-bold text-rose-800 leading-tight"
        >
          Empieza la cuenta regresiva hacia tu día especial, Dudu 💕
        </motion.h1>

        {/* Separador con corazones */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="flex items-center justify-center gap-3 my-6"
        >
          <span className="heart" />
          <span className="w-24 h-px bg-rose-200" />
          <span className="heart" />
        </motion.div>

        {/* Contador */}
        <motion.section
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.25 }}
          className="mb-6"
        >
          <Countdown />
        </motion.section>

        {/* Mensaje romántico */}
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.35 }}
          className="text-base md:text-lg text-rose-900/90 font-sans"
        >
          “Cada día traerá un detalle, porque no hay regalo que alcance
          para lo mucho que significas para mí.”
        </motion.p>

        {/* Pista del Día 2 */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.45 }}
          className="mt-6 rounded-2xl bg-blush-100/70 p-4 md:p-5 border border-blush-200"
        >
          <p className="text-sm uppercase tracking-wide text-rose-500 font-semibold">
            Pista del Día 2
          </p>
          <p className="mt-1 text-rose-700 font-sans">
            “Mañana el regalo no será digital… será algo pequeñito, dulce
            y crujiente, como tu sonrisa.”
          </p>
        </motion.div>

        {/* Footer suave */}
        <motion.footer
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.55 }}
          className="mt-8 text-xs text-rose-400"
        >
          Hecho con <span className="align-middle">💖</span> por Bubu
        </motion.footer>
      </motion.main>
    </div>
  );
}
