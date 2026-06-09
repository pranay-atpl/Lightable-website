import { PARTNERS } from "@/lib/site";

// Technology partner wall. Logos are placeholder wordmarks — swap each <span>
// for a real <Image> of the partner logo (monochrome, set to currentColor tone).
export function PartnerWall({ heading = true }: { heading?: boolean }) {
  return (
    <div className="pw">
      {heading ? (
        <p className="pw-head eyebrow">Built on industry-standard systems</p>
      ) : null}
      <ul className="pw-grid" aria-label="Technology partners (placeholder logos)">
        {PARTNERS.map((p) => (
          <li key={p} className="pw-logo">
            {p}
          </li>
        ))}
      </ul>
      <style>{`
        .pw{display:flex;flex-direction:column;gap:1.6rem;align-items:center;text-align:center;}
        .pw-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;list-style:none;margin:0;padding:0;
          width:100%;border:1px solid var(--line);border-radius:14px;overflow:hidden;
          background:var(--line);}
        .pw-logo{display:grid;place-items:center;padding:1.5rem 1rem;
          background:color-mix(in oklch,var(--bg),white 1.5%);
          font-family:var(--font-jetbrains),monospace;font-size:.9rem;letter-spacing:.14em;
          color:var(--muted);transition:color .3s ease,background .3s ease;}
        .pw-logo:hover{color:var(--text);background:color-mix(in oklch,var(--surface-2),transparent 20%);}
        @media (min-width:620px){.pw-grid{grid-template-columns:repeat(4,1fr);}}
        @media (min-width:980px){.pw-grid{grid-template-columns:repeat(8,1fr);}}
      `}</style>
    </div>
  );
}
