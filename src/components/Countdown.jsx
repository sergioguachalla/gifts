import { useEffect, useMemo, useState } from "react";

// ⚠️ Ajusta la fecha/hora al cumple (zona America/La_Paz, UTC-4)
const TARGET_ISO = "2025-09-01T00:00:00-04:00";

function getDiff(targetMs, nowFn) {
  const now = nowFn();
  let delta = Math.max(0, targetMs - now);

  const days = Math.floor(delta / 86_400_000);
  delta -= days * 86_400_000;

  const hours = Math.floor(delta / 3_600_000);
  delta -= hours * 3_600_000;

  const mins = Math.floor(delta / 60_000);
  delta -= mins * 60_000;

  const secs = Math.floor(delta / 1_000);

  return { days, hours, mins, secs, finished: targetMs <= now };
}

const pad2 = (n) => String(n).padStart(2, "0");
const padDays = (n) => String(n).padStart(2, "0"); // días con al menos 2 dígitos

export default function Countdown({ nowFn = () => Date.now() }) {
  const target = useMemo(() => new Date(TARGET_ISO).getTime(), []);
  const [t, setT] = useState(() => getDiff(target, nowFn));

  useEffect(() => {
    const id = setInterval(() => setT(getDiff(target, nowFn)), 1000);
    return () => clearInterval(id);
  }, [target, nowFn]);

  if (t.finished) {
    return (
      <p className="text-xl md:text-2xl font-semibold text-azure-600">
        ¡Llegó tu día! 🎉💖
      </p>
    );
  }

  const ariaText = `${t.days} días, ${t.hours} horas, ${t.mins} minutos, ${t.secs} segundos`;

  return (
    <div aria-live="polite" role="group" className="inline-flex items-baseline">
      <span className="sr-only">{ariaText}</span>
      <div
        aria-hidden="true"
        className="font-semibold text-2xl md:text-3xl text-azure-700 font-mono tabular-nums tracking-tight"
      >
        {padDays(t.days)}:{pad2(t.hours)}:{pad2(t.mins)}:{pad2(t.secs)}
      </div>
    </div>
  );
}
