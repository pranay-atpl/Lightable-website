import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./primitives";
import { Reveal } from "./Reveal";

export interface Crumb {
  name: string;
  href: string;
}

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  crumbs?: Crumb[];
  aside?: ReactNode;
}) {
  return (
    <header className="ph-hero">
      <div className="ph-hero-grid-bg rule-grid" aria-hidden="true" />
      <Container>
        {crumbs ? (
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} aria-current={i === crumbs.length - 1 ? "page" : undefined}>
                  <span aria-hidden="true">/</span>
                  {i === crumbs.length - 1 ? <span>{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="ph-hero-inner">
          <Reveal className="ph-hero-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="t-h1">{title}</h1>
            <p className="lede" style={{ maxWidth: "50ch" }}>
              {lede}
            </p>
          </Reveal>
          {aside ? <div className="ph-hero-aside">{aside}</div> : null}
        </div>
      </Container>

      <style>{`
        .ph-hero{position:relative;z-index:2;padding-top:clamp(3rem,9vh,6.5rem);
          padding-bottom:clamp(2.5rem,6vh,4.5rem);overflow:hidden;}
        .ph-hero-grid-bg{position:absolute;inset:0;z-index:0;height:60%;}
        .crumbs{position:relative;z-index:2;margin-bottom:2rem;}
        .crumbs ol{display:flex;flex-wrap:wrap;gap:.5rem;list-style:none;margin:0;padding:0;
          font-family:var(--font-jetbrains),monospace;font-size:.66rem;letter-spacing:.1em;
          text-transform:uppercase;color:var(--muted);}
        .crumbs li{display:flex;gap:.5rem;align-items:center;}
        .crumbs a:hover{color:var(--text);}
        .crumbs li[aria-current] span:last-child{color:var(--accent);}
        .ph-hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr;
          gap:clamp(2rem,5vw,3.5rem);align-items:end;}
        .ph-hero-copy{display:flex;flex-direction:column;gap:1.3rem;}
        @media (min-width:900px){
          .ph-hero-inner{grid-template-columns:1.2fr .8fr;}
        }
      `}</style>
    </header>
  );
}
