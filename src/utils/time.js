// utils/time.js (opcional con palanca)
export const DAY_IN_MS = 24 * 60 * 60 * 1000;

// 1 día cada 30s => factor = DAY_IN_MS / 30_000
const SIMULATE = false; // ← en prod, déjalo en false
const FACTOR = DAY_IN_MS / 30_000;

const START_REAL = Date.now();
const START_SIM = START_REAL;

export function getNowMs() {
  if (!SIMULATE) return Date.now();
  const elapsed = Date.now() - START_REAL;
  return START_SIM + elapsed * (FACTOR / 1000); // ajusta si tu sim original era distinta
}
