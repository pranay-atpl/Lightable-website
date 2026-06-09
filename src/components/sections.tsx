import type { ReactNode } from "react";
import clsx from "clsx";
import { Container, Section, SectionHeader, ButtonLink, Eyebrow } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Placeholder } from "./Placeholder";
import { Check } from "./icons";

/** Alternating text + image feature block. */
export function SplitFeature({
  eyebrow,
  title,
  body,
  points,
  imageLabel,
  imageAlt,
  ratio = "4 / 5",
  tone = "default",
  reverse = false,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  body: string | string[];
  points?: string[];
  imageLabel: string;
  imageAlt: string;
  ratio?: string;
  tone?: "default" | "warm" | "cool";
  reverse?: boolean;
  id?: string;
}) {
  const paras = Array.isArray(body) ? body : [body];
  return (
    <div id={id} className={clsx("split", reverse && "split-reverse")}>
      <Reveal className="split-copy">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="t-h2" style={{ maxWidth: "18ch" }}>
          {title}
        </h2>
        {paras.map((p, i) => (
          <p key={i} className="split-p">
            {p}
          </p>
        ))}
        {points ? (
          <ul className="split-points">
            {points.map((pt) => (
              <li key={pt}>
                <Check width={16} height={16} />
                {pt}
              </li>
            ))}
          </ul>
        ) : null}
      </Reveal>
      <Reveal className="split-media" delay={0.08}>
        <div className="lit glow-edge" style={{ borderRadius: 16 }}>
          <Placeholder ratio={ratio} tone={tone} label={imageLabel} alt={imageAlt} />
        </div>
      </Reveal>

      <style>{`
        .split{display:grid;grid-template-columns:1fr;gap:clamp(2rem,5vw,4rem);align-items:center;}
        .split-copy{display:flex;flex-direction:column;gap:1.1rem;}
        .split-p{color:var(--muted);max-width:46ch;}
        .split-points{list-style:none;margin:.5rem 0 0;padding:0;display:flex;flex-direction:column;gap:.7rem;}
        .split-points li{display:flex;align-items:center;gap:.7rem;color:var(--text);font-size:.95rem;}
        .split-points li svg{color:var(--accent);flex:none;}
        .split-media{position:relative;}
        @media (min-width:880px){
          .split{grid-template-columns:1fr 1fr;}
          .split-reverse .split-copy{order:2;}
          .split-reverse .split-media{order:1;}
        }
      `}</style>
    </div>
  );
}

/** Stat / outcome grid. */
export function StatGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="stats">
      {items.map((s) => (
        <div key={s.label} className="stat">
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
      <style>{`
        .stats{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line);
          border:1px solid var(--line);border-radius:14px;overflow:hidden;}
        .stat{display:flex;flex-direction:column;gap:.35rem;padding:1.4rem 1.2rem;
          background:color-mix(in oklch,var(--bg),white 2%);}
        .stat-value{font-family:var(--font-fraunces),serif;font-weight:400;font-size:clamp(1.7rem,3vw,2.4rem);
          color:color-mix(in oklch,var(--text),var(--light) 10%);}
        .stat-label{font-family:var(--font-jetbrains),monospace;font-size:.6rem;letter-spacing:.16em;
          text-transform:uppercase;color:var(--muted);}
        @media (min-width:720px){.stats{grid-template-columns:repeat(var(--cols,3),1fr);}}
      `}</style>
    </div>
  );
}

/** Card grid of features. */
export function FeatureCards({
  items,
}: {
  items: { title: string; body: string; tag?: string }[];
}) {
  return (
    <RevealGroup className="fcards">
      {items.map((f) => (
        <RevealItem key={f.title}>
          <div className="fcard panel lit">
            {f.tag ? <span className="tag">{f.tag}</span> : null}
            <h3 className="t-h3">{f.title}</h3>
            <p>{f.body}</p>
          </div>
        </RevealItem>
      ))}
      <style>{`
        .fcards{display:grid;grid-template-columns:1fr;gap:1.1rem;}
        .fcard{display:flex;flex-direction:column;gap:.8rem;padding:1.5rem;height:100%;}
        .fcard .tag{align-self:flex-start;}
        .fcard p{color:var(--muted);}
        @media (min-width:680px){.fcards{grid-template-columns:repeat(2,1fr);}}
        @media (min-width:1000px){.fcards{grid-template-columns:repeat(var(--fcols,3),1fr);}}
      `}</style>
    </RevealGroup>
  );
}

/** Reusable CTA band. */
export function CTASection({
  eyebrow = "Book a consultation",
  title,
  lede,
  href = "/contact",
  label = "Start your project",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede: ReactNode;
  href?: string;
  label?: string;
}) {
  return (
    <Section>
      <Container>
        <Reveal className="cta panel lit">
          <div className="cta-glow" aria-hidden="true" />
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="t-h1" style={{ maxWidth: "20ch" }}>
            {title}
          </h2>
          <p className="lede">{lede}</p>
          <ButtonLink href={href} variant="primary" arrow="right">
            {label}
          </ButtonLink>
        </Reveal>
        <style>{`
          .cta{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:1.3rem;
            align-items:flex-start;padding:clamp(2rem,5vw,4rem);}
          .cta-glow{position:absolute;top:-50%;right:-12%;width:55%;height:140%;
            background:radial-gradient(circle,color-mix(in oklch,var(--glow),transparent 60%),transparent 70%);
            filter:blur(44px);opacity:var(--bloom);pointer-events:none;transition:opacity 1100ms ease;}
        `}</style>
      </Container>
    </Section>
  );
}

export { Container, Section, SectionHeader, ButtonLink, Reveal };
