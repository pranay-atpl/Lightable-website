import clsx from "clsx";

/**
 * Dark, labelled image placeholder — sized to a real aspect ratio and trivially
 * swappable for a real <Image>. `alt` is written as if the real asset existed,
 * and is exposed to assistive tech via aria-label. `label` is the on-image note
 * describing what belongs here.
 *
 * To swap in a real image later, replace <Placeholder …/> with:
 *   <Image src="…" alt={<the same alt text>} fill sizes="…" />
 */
export function Placeholder({
  label,
  alt,
  ratio = "16 / 10",
  className,
  tone = "default",
}: {
  label: string;
  alt: string;
  ratio?: string;
  className?: string;
  tone?: "default" | "warm" | "cool";
}) {
  const sheen =
    tone === "warm"
      ? "color-mix(in oklch, var(--warm-glow), transparent 80%)"
      : tone === "cool"
        ? "color-mix(in oklch, var(--cool-glow), transparent 80%)"
        : "color-mix(in oklch, var(--glow), transparent 80%)";

  return (
    <div
      role="img"
      aria-label={alt}
      className={clsx("ph", className)}
      style={{ aspectRatio: ratio.replace(/\s/g, " ") }}
    >
      <span className="ph-glow" style={{ background: sheen }} aria-hidden="true" />
      <span className="ph-grid" aria-hidden="true" />
      <span className="ph-label" aria-hidden="true">
        <span className="ph-tick">PLACEHOLDER</span>
        <span className="ph-text">{label}</span>
      </span>

      <style>{`
        .ph{position:relative;overflow:hidden;border-radius:var(--radius);
          border:1px solid var(--line);
          background:
            radial-gradient(120% 90% at 30% 0%, color-mix(in oklch,var(--surface-3),transparent 0%), transparent 60%),
            linear-gradient(180deg, var(--surface-2), var(--bg));
          width:100%;display:flex;align-items:flex-end;}
        .ph-glow{position:absolute;width:60%;height:70%;top:-10%;left:50%;
          transform:translateX(-50%);filter:blur(40px);opacity:var(--bloom);
          border-radius:50%;transition:opacity 1100ms ease;}
        .ph-grid{position:absolute;inset:0;opacity:.5;
          background-image:linear-gradient(var(--line) 1px,transparent 1px),
            linear-gradient(90deg,var(--line) 1px,transparent 1px);
          background-size:40px 40px;
          -webkit-mask:radial-gradient(circle at 50% 40%,#000,transparent 78%);
          mask:radial-gradient(circle at 50% 40%,#000,transparent 78%);}
        .ph-label{position:relative;z-index:2;display:flex;flex-direction:column;gap:.5rem;
          padding:clamp(1rem,3vw,1.6rem);max-width:32ch;}
        .ph-tick{font-family:var(--font-jetbrains),monospace;font-size:.6rem;
          letter-spacing:.24em;color:var(--accent);}
        .ph-text{font-family:var(--font-jetbrains),monospace;font-size:.74rem;
          line-height:1.45;color:var(--muted);letter-spacing:.02em;}
      `}</style>
    </div>
  );
}
