// The mood-control scene system. Each scene maps to two animated drivers that the
// whole site reads from: `temp` (0 cool → 1 warm) and `bri` (0 dim → 1 bright).
// Kelvin is derived for the keypad readout: K = 6500 − temp·4300.

export type SceneId = "bright" | "day" | "evening" | "relax" | "cinema";

export interface Scene {
  id: SceneId;
  label: string;
  /** one-word lighting-control description */
  note: string;
  temp: number; // 0..1  cool → warm
  bri: number; // 0..1  dim → bright
}

export const SCENES: Scene[] = [
  { id: "bright", label: "Bright", note: "Crisp daylight", temp: 0.12, bri: 1.0 },
  { id: "day", label: "Day", note: "Neutral, focused", temp: 0.3, bri: 0.82 },
  { id: "evening", label: "Evening", note: "Warm, settled", temp: 0.62, bri: 0.52 },
  { id: "relax", label: "Relax", note: "Low amber wash", temp: 0.82, bri: 0.38 },
  { id: "cinema", label: "Cinema", note: "Candle-dim", temp: 0.92, bri: 0.2 },
];

export const DEFAULT_SCENE: SceneId = "evening";

export const KELVIN_COOL = 6500;
export const KELVIN_WARM = 2200;

export function tempToKelvin(temp: number): number {
  return Math.round(KELVIN_COOL - temp * (KELVIN_COOL - KELVIN_WARM));
}

export function getScene(id: SceneId): Scene {
  return SCENES.find((s) => s.id === id) ?? SCENES[2];
}

export const STORAGE_KEY = "lightable.mood.v1";

export interface MoodState {
  scene: SceneId | "custom";
  temp: number;
  bri: number;
}

export function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}
