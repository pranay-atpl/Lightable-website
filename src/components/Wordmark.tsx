// Lightable wordmark — a glowing point of light beside the name. The dot picks
// up the current mood colour, so the logo itself is "lit" by the keypad.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wm ${className ?? ""}`}>
      <span className="wm-dot" aria-hidden="true" />
      <span className="wm-text">Lightable</span>
      <style>{`
        .wm{display:inline-flex;align-items:center;gap:.55rem;}
        .wm-dot{width:9px;height:9px;border-radius:50%;background:var(--glow);
          box-shadow:0 0 calc(7px + var(--bloom)*16px) var(--glow),
            0 0 calc(2px) color-mix(in oklch,var(--light),white 30%);
          transition:background .6s ease,box-shadow .6s ease;}
        .wm-text{font-family:var(--font-fraunces),serif;font-weight:420;font-size:1.32rem;
          letter-spacing:-.01em;color:var(--text);}
      `}</style>
    </span>
  );
}
