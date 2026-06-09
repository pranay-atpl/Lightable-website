"use client";

import { useEffect, useId, useState } from "react";
import { useMood, SCENES } from "@/lib/theme";
import { Sliders, Sun, Moon, Close, Power } from "./icons";

export function Keypad() {
  const { scene, temp, bri, kelvin, setScene, setTemp, setBri } = useMood();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();

  // Mounted flag avoids an SSR/client mismatch on the Kelvin readout (the value
  // depends on localStorage, which is unavailable during server render).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const activeLabel =
    scene === "custom" ? "Custom" : SCENES.find((s) => s.id === scene)?.label ?? "—";
  const briPct = Math.round(bri * 100);
  const warmth = temp < 0.4 ? "cool" : temp > 0.7 ? "warm" : "neutral";

  return (
    <div className={`kp ${open ? "kp-open" : ""}`} suppressHydrationWarning>
      {/* The keypad face / toggle */}
      <button
        type="button"
        className="kp-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={
          open ? "Close lighting control" : `Open lighting control — current scene ${activeLabel}`
        }
        onClick={() => setOpen((v) => !v)}
      >
        <span className="kp-led" aria-hidden="true" />
        <span className="kp-toggle-text">
          <span className="kp-toggle-k">{mounted ? `${kelvin}K` : "—"}</span>
          <span className="kp-toggle-scene">{mounted ? activeLabel : "Mood"}</span>
        </span>
        <span className="kp-toggle-icon" aria-hidden="true">
          {open ? <Close width={18} height={18} /> : <Sliders width={18} height={18} />}
        </span>
      </button>

      {/* The control panel */}
      <div
        id={panelId}
        className="kp-panel"
        role="group"
        aria-label="Lighting mood control"
        aria-hidden={!open}
      >
        <div className="kp-head">
          <span className="kp-ey">Lightable · Keypad</span>
          <div className="kp-read" aria-live="polite">
            <strong>{mounted ? kelvin : 3834}</strong>
            <span>Kelvin · {warmth}</span>
          </div>
        </div>

        {/* Scene presets */}
        <div className="kp-scenes" role="group" aria-label="Scene presets">
          {SCENES.map((s) => {
            const active = scene === s.id;
            return (
              <button
                key={s.id}
                type="button"
                className={`kp-scene ${active ? "is-active" : ""}`}
                aria-pressed={active}
                onClick={() => setScene(s.id)}
                style={{ "--s-temp": s.temp, "--s-bri": s.bri } as React.CSSProperties}
              >
                <span className="kp-scene-led" aria-hidden="true" />
                <span className="kp-scene-label">{s.label}</span>
                <span className="kp-scene-note">{s.note}</span>
              </button>
            );
          })}
        </div>

        {/* Temperature: cool ↔ warm */}
        <div className="kp-slider">
          <label className="kp-slider-row" htmlFor={`${panelId}-temp`}>
            <Moon width={15} height={15} aria-hidden="true" />
            <span className="kp-slider-name">Warmth</span>
            <Sun width={15} height={15} aria-hidden="true" />
          </label>
          <input
            id={`${panelId}-temp`}
            className="kp-range kp-range-temp"
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(temp * 100)}
            aria-label="Colour temperature, cool to warm"
            aria-valuetext={`${kelvin} Kelvin, ${warmth}`}
            onChange={(e) => setTemp(Number(e.target.value) / 100)}
          />
        </div>

        {/* Brightness dimmer */}
        <div className="kp-slider">
          <label className="kp-slider-row" htmlFor={`${panelId}-bri`}>
            <Power width={15} height={15} aria-hidden="true" />
            <span className="kp-slider-name">Brightness</span>
            <span className="kp-slider-val">{briPct}%</span>
          </label>
          <input
            id={`${panelId}-bri`}
            className="kp-range kp-range-bri"
            type="range"
            min={6}
            max={100}
            step={1}
            value={briPct}
            aria-label="Brightness dimmer"
            aria-valuetext={`${briPct} percent`}
            onChange={(e) => setBri(Number(e.target.value) / 100)}
          />
        </div>

        <p className="kp-hint">The mood follows you across every page.</p>
      </div>

      <style>{`
        .kp{position:fixed;right:clamp(.9rem,2.5vw,1.6rem);bottom:clamp(.9rem,2.5vw,1.6rem);
          z-index:80;display:flex;flex-direction:column;align-items:flex-end;gap:.7rem;
          font-family:var(--font-hanken),sans-serif;}

        /* toggle / face */
        .kp-toggle{display:flex;align-items:center;gap:.7rem;cursor:pointer;
          padding:.6rem .8rem .6rem .7rem;border-radius:14px;color:var(--text);
          border:1px solid var(--line-strong);
          background:linear-gradient(180deg,var(--surface-3),var(--surface));
          box-shadow:0 1px 0 color-mix(in oklch,white,transparent 88%) inset,
            0 22px 50px -28px color-mix(in oklch,var(--glow),transparent calc(30% + (1 - var(--bloom))*45%)),
            0 10px 30px -18px #000;
          transition:transform .35s cubic-bezier(.33,0,.2,1),box-shadow .5s ease;}
        .kp-toggle:hover{transform:translateY(-2px);}
        .kp-toggle:active{transform:translateY(0) scale(.99);}
        .kp-led{width:9px;height:9px;border-radius:50%;background:var(--glow);
          box-shadow:0 0 calc(6px + var(--bloom)*14px) var(--glow);
          transition:background .6s ease,box-shadow .6s ease;}
        .kp-toggle-text{display:flex;flex-direction:column;line-height:1.05;text-align:left;}
        .kp-toggle-k{font-family:var(--font-jetbrains),monospace;font-size:.62rem;
          letter-spacing:.12em;color:var(--accent);}
        .kp-toggle-scene{font-size:.92rem;font-weight:500;}
        .kp-toggle-icon{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;
          background:var(--bg);border:1px solid var(--line);color:var(--muted);}

        /* panel */
        .kp-panel{width:min(86vw,320px);border-radius:18px;padding:1.05rem;
          border:1px solid var(--line-strong);color:var(--text);
          background:linear-gradient(180deg,
            color-mix(in oklch,var(--surface-3),transparent 0%),
            color-mix(in oklch,var(--surface),var(--bg) 30%));
          backdrop-filter:blur(14px);
          box-shadow:0 1px 0 color-mix(in oklch,white,transparent 86%) inset,
            0 40px 90px -40px #000,
            0 0 70px -30px color-mix(in oklch,var(--glow),transparent calc(20% + (1 - var(--bloom))*50%));
          transform-origin:bottom right;
          transform:translateY(10px) scale(.96);opacity:0;pointer-events:none;
          transition:transform .4s cubic-bezier(.33,0,.2,1),opacity .35s ease;}
        .kp-open .kp-panel{transform:none;opacity:1;pointer-events:auto;}

        .kp-head{display:flex;align-items:flex-end;justify-content:space-between;
          padding-bottom:.85rem;margin-bottom:.85rem;
          border-bottom:1px solid var(--line);}
        .kp-ey{font-family:var(--font-jetbrains),monospace;font-size:.6rem;
          letter-spacing:.22em;text-transform:uppercase;color:var(--muted);}
        .kp-read{text-align:right;line-height:1.05;}
        .kp-read strong{font-family:var(--font-fraunces),serif;font-weight:400;
          font-size:1.5rem;color:color-mix(in oklch,var(--text),var(--light) 12%);}
        .kp-read span{display:block;font-family:var(--font-jetbrains),monospace;
          font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);}

        .kp-scenes{display:grid;grid-template-columns:repeat(2,1fr);gap:.45rem;margin-bottom:1rem;}
        .kp-scenes .kp-scene:first-child{grid-column:1 / -1;}
        .kp-scene{position:relative;display:flex;flex-direction:column;gap:.12rem;
          align-items:flex-start;text-align:left;cursor:pointer;
          padding:.6rem .7rem;border-radius:11px;color:var(--text);
          border:1px solid var(--line);background:color-mix(in oklch,var(--bg),white 2.5%);
          transition:border-color .35s ease,background .35s ease,transform .25s ease;}
        .kp-scene:hover{transform:translateY(-1px);border-color:var(--line-strong);}
        .kp-scene.is-active{border-color:color-mix(in oklch,var(--accent),transparent 35%);
          background:color-mix(in oklch,var(--surface-2),var(--accent) 7%);}
        .kp-scene-led{position:absolute;top:.6rem;right:.6rem;width:7px;height:7px;border-radius:50%;
          background:color-mix(in oklch,
            color-mix(in oklch,var(--cool-glow),var(--warm-glow) calc(var(--s-temp,.5)*100%)),
            var(--bg) calc((1 - var(--s-bri,.5))*55%));
          opacity:.5;transition:opacity .35s ease,box-shadow .35s ease;}
        .kp-scene.is-active .kp-scene-led{opacity:1;
          box-shadow:0 0 10px color-mix(in oklch,var(--accent),transparent 20%);}
        .kp-scene-label{font-size:.9rem;font-weight:500;}
        .kp-scene-note{font-family:var(--font-jetbrains),monospace;font-size:.58rem;
          letter-spacing:.06em;color:var(--muted);}

        .kp-slider{margin-bottom:.9rem;}
        .kp-slider-row{display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem;
          color:var(--muted);}
        .kp-slider-name{font-size:.78rem;letter-spacing:.02em;margin-right:auto;color:var(--text);}
        .kp-slider-val{font-family:var(--font-jetbrains),monospace;font-size:.68rem;color:var(--accent);}

        .kp-range{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:999px;
          outline-offset:4px;cursor:pointer;}
        .kp-range-temp{background:linear-gradient(90deg,
          oklch(0.86 0.06 234),oklch(0.88 0.04 150),oklch(0.84 0.12 64));}
        .kp-range-bri{background:linear-gradient(90deg,
          color-mix(in oklch,var(--glow),var(--bg) 70%),var(--glow));}
        .kp-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
          width:18px;height:18px;border-radius:50%;
          background:radial-gradient(circle at 35% 30%, #fff, color-mix(in oklch,var(--light),#888 30%));
          border:1px solid rgba(255,255,255,.6);
          box-shadow:0 0 0 4px color-mix(in oklch,var(--bg),transparent 30%),
            0 2px 8px rgba(0,0,0,.5);}
        .kp-range::-moz-range-thumb{width:18px;height:18px;border-radius:50%;border:1px solid rgba(255,255,255,.6);
          background:radial-gradient(circle at 35% 30%, #fff, color-mix(in oklch,var(--light),#888 30%));
          box-shadow:0 2px 8px rgba(0,0,0,.5);}

        .kp-hint{font-family:var(--font-jetbrains),monospace;font-size:.58rem;
          letter-spacing:.04em;color:var(--faint);text-align:center;margin-top:.2rem;}

        @media (max-width:520px){
          .kp-toggle-text{display:none;}
          .kp-toggle{padding:.6rem;}
        }
      `}</style>
    </div>
  );
}
