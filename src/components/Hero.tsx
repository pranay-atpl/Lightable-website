"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useMood, SCENES } from "@/lib/theme";
import { Placeholder } from "./Placeholder";
import { ArrowRight, ArrowUpRight } from "./icons";
import { SITE } from "@/lib/site";

export function Hero() {
  const { scene, setScene, kelvin, reducedMotion } = useMood();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !root.current) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.default;
      gsap.registerPlugin(stMod.ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from("[data-hero-rise]", {
          y: 34,
          opacity: 0,
          filter: "brightness(0.4)",
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
        });
        gsap.from("[data-hero-visual]", {
          opacity: 0,
          scale: 1.04,
          duration: 1.4,
          ease: "power3.out",
        });
        gsap.to("[data-hero-visual]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-cone]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      }, root);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reducedMotion]);

  return (
    <div className="hero" ref={root}>
      <div className="hero-cones" aria-hidden="true">
        <span className="hero-cone hero-cone-1" data-hero-cone />
        <span className="hero-cone hero-cone-2" data-hero-cone />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow" data-hero-rise>
            Architectural lighting · KNX · Lutron
          </p>
          <h1 className="t-hero" data-hero-rise>
            We design
            <br />
            with <span className="hero-em">light</span>.
          </h1>
          <p className="lede" data-hero-rise>
            Lighting design and intelligent control for high-end homes and boutique spaces —
            layered, tuned, and recalled with a single touch. Engineered light, never decorative.
          </p>

          <div className="hero-mood" data-hero-rise>
            <span className="hero-mood-label">
              Set the mood
              <em>{kelvin}K</em>
            </span>
            <div className="hero-chips" role="group" aria-label="Quick scene presets">
              {SCENES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`hero-chip ${scene === s.id ? "is-active" : ""}`}
                  aria-pressed={scene === s.id}
                  onClick={() => setScene(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="hero-mood-hint">
              ↘ This relights the whole site. The full keypad lives bottom-right.
            </p>
          </div>

          <div className="hero-actions" data-hero-rise>
            <Link href="/contact" className="btn btn-primary">
              Book a consultation
              <ArrowRight width={18} height={18} />
            </Link>
            <Link href="/lighting-design" className="btn btn-ghost">
              Our lighting design
              <ArrowUpRight width={18} height={18} />
            </Link>
          </div>
        </div>

        <div className="hero-visual" data-hero-visual>
          <div className="hero-frame lit glow-edge">
            <Placeholder
              ratio="3 / 4"
              tone="warm"
              label="Hero: a darkened architectural living space revealed by recessed warm downlights, a grazed stone wall and concealed cove light."
              alt="A darkened, contemporary living room lit by recessed warm downlights, with light grazing a stone feature wall and a soft glow from a concealed ceiling cove."
            />
            <div className="hero-spec" aria-hidden="true">
              <span className="hero-spec-row">
                <i />
                Scene · {scene === "custom" ? "Custom" : SCENES.find((s) => s.id === scene)?.label}
              </span>
              <span className="hero-spec-row">
                <i />
                {kelvin}K · tunable white
              </span>
            </div>
          </div>
          <p className="hero-credit">{SITE.name} — total light, one designed environment.</p>
        </div>
      </div>

      <style>{`
        .hero{position:relative;z-index:2;min-height:clamp(640px,92vh,1000px);
          display:flex;align-items:center;padding-block:clamp(3rem,8vh,6rem);overflow:hidden;}
        .hero-cones{position:absolute;inset:0;pointer-events:none;z-index:0;}
        .hero-cone{position:absolute;top:-12%;width:46vw;height:120vh;filter:blur(8px);
          opacity:var(--bloom);mix-blend-mode:screen;transition:opacity 1100ms ease;}
        .hero-cone-1{left:8%;clip-path:polygon(38% 0,62% 0,100% 100%,0 100%);
          background:linear-gradient(180deg,color-mix(in oklch,var(--glow),transparent 55%),transparent 62%);}
        .hero-cone-2{right:4%;width:34vw;clip-path:polygon(42% 0,58% 0,92% 100%,8% 100%);
          background:linear-gradient(180deg,color-mix(in oklch,var(--glow),transparent 68%),transparent 58%);}

        .hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr;gap:clamp(2.5rem,5vw,4rem);
          align-items:center;}
        .hero-copy{display:flex;flex-direction:column;gap:1.5rem;}
        .hero-em{font-style:italic;color:color-mix(in oklch,var(--light),white 8%);
          text-shadow:0 0 40px color-mix(in oklch,var(--glow),transparent calc(20% + (1 - var(--bloom))*55%));}
        .hero-mood{display:flex;flex-direction:column;gap:.7rem;padding:1rem 1.1rem;border-radius:14px;
          border:1px solid var(--line);background:color-mix(in oklch,var(--surface),transparent 30%);
          max-width:30rem;}
        .hero-mood-label{display:flex;align-items:center;justify-content:space-between;
          font-family:var(--font-jetbrains),monospace;font-size:.66rem;letter-spacing:.2em;
          text-transform:uppercase;color:var(--muted);}
        .hero-mood-label em{font-style:normal;color:var(--accent);}
        .hero-chips{display:flex;flex-wrap:wrap;gap:.4rem;}
        .hero-chip{cursor:pointer;font-size:.82rem;padding:.45em .9em;border-radius:999px;color:var(--muted);
          border:1px solid var(--line);background:color-mix(in oklch,var(--bg),white 2%);
          transition:color .3s,border-color .3s,background .3s,transform .2s;}
        .hero-chip:hover{transform:translateY(-1px);color:var(--text);}
        .hero-chip.is-active{color:var(--text);border-color:color-mix(in oklch,var(--accent),transparent 40%);
          background:color-mix(in oklch,var(--surface-2),var(--accent) 8%);}
        .hero-mood-hint{font-family:var(--font-jetbrains),monospace;font-size:.6rem;letter-spacing:.04em;
          color:var(--faint);}
        .hero-actions{display:flex;flex-wrap:wrap;gap:.8rem;margin-top:.3rem;}

        .hero-visual{position:relative;}
        .hero-frame{position:relative;border-radius:18px;}
        .hero-spec{position:absolute;left:1rem;bottom:1rem;display:flex;flex-direction:column;gap:.45rem;
          padding:.7rem .85rem;border-radius:11px;border:1px solid var(--line-strong);
          background:color-mix(in oklch,var(--bg),transparent 15%);backdrop-filter:blur(10px);}
        .hero-spec-row{display:flex;align-items:center;gap:.5rem;font-family:var(--font-jetbrains),monospace;
          font-size:.64rem;letter-spacing:.08em;color:var(--text);}
        .hero-spec-row i{width:6px;height:6px;border-radius:50%;background:var(--glow);
          box-shadow:0 0 10px var(--glow);}
        .hero-credit{margin-top:1rem;font-family:var(--font-jetbrains),monospace;font-size:.62rem;
          letter-spacing:.06em;color:var(--faint);text-align:center;}

        @media (min-width:980px){
          .hero-inner{grid-template-columns:1.15fr .85fr;}
        }
      `}</style>
    </div>
  );
}
