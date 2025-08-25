import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Countdown from "./components/Countdown.jsx";
import GuessGift from "./components/GuessGift.jsx";
import { REGALOS } from "./data/gifts.js";
import { getNowMs, DAY_IN_MS } from "./utils/time.js";
import bubu from "./assets/bubu.jpeg";
import dudu from "./assets/dudu.jpeg";
import { GIFT_SCHEDULE } from "./utils/schedule.js";

// ⚠️ La misma fecha que en Countdown.jsx
const TARGET_ISO = "2025-09-01T00:00:00-04:00";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
};

function getCurrentGiftIndex(nowMs) {
  const today = new Date(nowMs).toISOString().slice(0, 10); // YYYY-MM-DD
  return GIFT_SCHEDULE[today] ?? -1; // -1 = ningún regalo
}

export default function App() {
  const targetMs = useMemo(() => new Date(TARGET_ISO).getTime(), []);
  
  // Re-render cada segundo (para que cambie solo automáticamente)

  const nowMs = getNowMs();
  const todayYMD = new Date(nowMs).toISOString().slice(0, 10);
  const birthdayYMD = TARGET_ISO.slice(0, 10);

  // Estados clave
  const isBirthday = todayYMD === birthdayYMD;
  const isAfterBirthday = nowMs >= targetMs + DAY_IN_MS;

  const currentGiftIndex = getCurrentGiftIndex(nowMs);
  const currentGift = currentGiftIndex >= 0 ? REGALOS[currentGiftIndex] : null;

  const birthdayGift = isBirthday
    ? (currentGift ?? REGALOS[REGALOS.length - 1])
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white flex items-center justify-center p-4">
      <motion.main
        {...fadeUp}
        className="relative w-full max-w-2xl rounded-3xl bg-white/80 backdrop-blur-sm shadow-soft p-7 md:p-10 text-center border border-blush-200"
      >
        {/* Stickers decorativos */}
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

        {/* Encabezado */}
        <motion.h1
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.05 }}
          className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-rose-800 leading-tight"
        >
          {isBirthday
            ? "¡Llegó tu día especial Bubu! SIIIII 💕"
            : "Empieza la cuenta regresiva hacia tu cumpleañitos Bubu 💕"}
        </motion.h1>

        {/* Separador */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.15 }}
          className="flex items-center justify-center gap-3 my-6"
        >
          <span className="heart" />
          <span className="w-24 h-px bg-rose-200" />
          <span className="heart" />
        </motion.div>

        {/* Contador (oculto el día del cumple y después) */}
        {!isBirthday && !isAfterBirthday && (
          <motion.section
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.25 }}
            className="mb-6"
          >
            <Countdown nowFn={getNowMs} />
          </motion.section>
        )}

        {/* Mensaje romántico (no se muestra después de que todo termina) */}
        {!isAfterBirthday && (
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.35 }}
            className="text-base md:text-lg text-rose-900/90 font-sans"
          >
            “Cada día traerá un detalle, porque no hay regalo que alcance
            para lo mucho que significas para mí.”
          </motion.p>
        )}

        {/* Lógica de estados */}
        {isAfterBirthday ? (
          <motion.section
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.45 }}
            className="mt-8"
          >
            <p className="text-rose-700 text-lg md:text-xl font-semibold">
              ✨ La sorpresa ha terminado. ¡Gracias por acompañarme en esta cuenta regresiva! 💖
            </p>
          </motion.section>
        ) : isBirthday ? (
          <motion.section
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.45 }}
            className="mt-8 space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-rose-800">
              🎉 ¡Feliz cumpleaños, Dudu! 🎂
            </h2>

            {birthdayGift ? (
              <GuessGift
                key={birthdayGift.id ?? "gift-birthday"}
                {...birthdayGift}
              />
            ) : (
              <p className="text-rose-700">
                (No hay un regalo asignado a hoy en <code>GIFT_SCHEDULE</code>).
              </p>
            )}
          </motion.section>
        ) : currentGift ? (
          <motion.section
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.45 }}
            className="mt-8"
          >
            <GuessGift key={currentGift.id ?? "gift"} {...currentGift} />
          </motion.section>
        ) : (
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.45 }}
            className="mt-6 text-rose-600 italic"
          >
            💌 La cuenta regresiva aún no empieza… pronto se revelará el primer regalo.
          </motion.p>
        )}

        {/* Footer */}
        <motion.footer
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.55 }}
          className="mt-8 text-xs text-rose-400"
        >
          Hecho con <span className="align-middle">💖</span> por Dudito
        </motion.footer>
      </motion.main>
    </div>
  );
}
