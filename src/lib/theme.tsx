"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clamp01,
  DEFAULT_SCENE,
  getScene,
  MoodState,
  SceneId,
  SCENES,
  STORAGE_KEY,
  tempToKelvin,
} from "./scenes";

interface MoodContextValue extends MoodState {
  kelvin: number;
  setScene: (id: SceneId) => void;
  setTemp: (temp: number) => void;
  setBri: (bri: number) => void;
  reducedMotion: boolean;
}

const MoodContext = createContext<MoodContextValue | null>(null);

function applyToRoot(temp: number, bri: number) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--temp", String(temp));
  root.style.setProperty("--bri", String(bri));
}

const initial = getScene(DEFAULT_SCENE);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [scene, setSceneState] = useState<MoodState["scene"]>(DEFAULT_SCENE);
  const [temp, setTempState] = useState(initial.temp);
  const [bri, setBriState] = useState(initial.bri);
  const [reducedMotion, setReducedMotion] = useState(false);

  // hydrate from storage (the no-flash script already set the CSS vars)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as MoodState;
        if (typeof parsed.temp === "number" && typeof parsed.bri === "number") {
          setSceneState(parsed.scene ?? "custom");
          setTempState(clamp01(parsed.temp));
          setBriState(clamp01(parsed.bri));
        }
      }
    } catch {
      /* ignore */
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // persist + apply on any change
  useEffect(() => {
    applyToRoot(temp, bri);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ scene, temp, bri }));
    } catch {
      /* ignore */
    }
  }, [scene, temp, bri]);

  const setScene = useCallback((id: SceneId) => {
    const s = getScene(id);
    setSceneState(id);
    setTempState(s.temp);
    setBriState(s.bri);
  }, []);

  const setTemp = useCallback((value: number) => {
    setSceneState("custom");
    setTempState(clamp01(value));
  }, []);

  const setBri = useCallback((value: number) => {
    setSceneState("custom");
    setBriState(clamp01(value));
  }, []);

  const value = useMemo<MoodContextValue>(
    () => ({
      scene,
      temp,
      bri,
      kelvin: tempToKelvin(temp),
      setScene,
      setTemp,
      setBri,
      reducedMotion,
    }),
    [scene, temp, bri, setScene, setTemp, setBri, reducedMotion]
  );

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood(): MoodContextValue {
  const ctx = useContext(MoodContext);
  if (!ctx) throw new Error("useMood must be used inside <MoodProvider>");
  return ctx;
}

export { SCENES };

/** Inline script injected in <head> to set the mood before first paint (no flash). */
export const NO_FLASH_SCRIPT = `(function(){try{var d=${JSON.stringify({
  temp: initial.temp,
  bri: initial.bri,
})};var r=localStorage.getItem(${JSON.stringify(
  STORAGE_KEY
)});if(r){var p=JSON.parse(r);if(typeof p.temp==='number')d.temp=p.temp;if(typeof p.bri==='number')d.bri=p.bri;}var e=document.documentElement;e.style.setProperty('--temp',d.temp);e.style.setProperty('--bri',d.bri);}catch(_){}})();`;
