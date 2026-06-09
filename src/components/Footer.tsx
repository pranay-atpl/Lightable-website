import Link from "next/link";
import { SITE, PARTNERS } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { ArrowUpRight } from "./icons";

const serviceLinks = [
  { label: "Lighting Design", href: "/lighting-design" },
  { label: "Fixtures & Supply", href: "/lighting-fixtures" },
  { label: "Control & Automation", href: "/lighting-control" },
  { label: "Shading", href: "/shading" },
  { label: "Smart Spaces", href: "/automation" },
];

const studioLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="ft">
      <div className="container">
        <div className="ft-cta">
          <p className="eyebrow">Design · Automate · Control</p>
          <h2 className="t-h1" style={{ maxWidth: "16ch" }}>
            Let&rsquo;s design your space around light.
          </h2>
          <Link href="/contact" className="btn btn-primary">
            Book a consultation
            <ArrowUpRight width={18} height={18} />
          </Link>
        </div>

        <hr className="hr" style={{ margin: "clamp(2.5rem,6vh,4rem) 0" }} />

        <div className="ft-grid">
          <div className="ft-brand">
            <Wordmark />
            <p>{SITE.tagline}</p>
            <p className="ft-note">
              Architectural lighting design &amp; intelligent control. We do not do decorative
              lighting — we design, automate and tune light.
            </p>
          </div>

          <nav className="ft-col" aria-label="Services">
            <h3 className="ft-h">Services</h3>
            <ul>
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="ft-col" aria-label="Studio">
            <h3 className="ft-h">Studio</h3>
            <ul>
              {studioLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ft-col">
            <h3 className="ft-h">Contact</h3>
            <ul>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              </li>
              <li className="ft-addr">
                {SITE.address.street}, {SITE.address.city} {SITE.address.postal}
              </li>
            </ul>
            <div className="ft-social">
              <a href={SITE.social.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={SITE.social.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="ft-partners" aria-label="Technology partners">
          {PARTNERS.map((p) => (
            <span key={p} className="ft-partner">
              {p}
            </span>
          ))}
        </div>

        <div className="ft-base">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <span className="ft-base-note">Placeholder studio details — swap before launch.</span>
        </div>
      </div>

      <style>{`
        .ft{position:relative;z-index:2;border-top:1px solid var(--line);
          padding-block:clamp(3.5rem,9vh,6rem) 2rem;margin-top:2rem;
          background:linear-gradient(180deg,transparent,color-mix(in oklch,var(--bg),#000 18%));}
        .ft-cta{display:flex;flex-direction:column;gap:1.4rem;align-items:flex-start;}
        .ft-grid{display:grid;grid-template-columns:1fr;gap:2.4rem;}
        .ft-brand p{color:var(--muted);margin-top:1rem;max-width:34ch;}
        .ft-brand .ft-note{font-size:.85rem;color:var(--faint);}
        .ft-h{font-family:var(--font-jetbrains),monospace;font-size:.66rem;font-weight:500;
          letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem;}
        .ft-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.6rem;}
        .ft-col a,.ft-addr{color:var(--muted);font-size:.95rem;transition:color .25s ease;}
        .ft-col a:hover{color:var(--text);}
        .ft-addr{max-width:24ch;}
        .ft-social{display:flex;gap:1rem;margin-top:1.2rem;}
        .ft-social a{font-size:.85rem;color:var(--text);text-decoration:underline;text-underline-offset:4px;
          text-decoration-color:var(--line-strong);}
        .ft-partners{display:flex;flex-wrap:wrap;gap:1.6rem;align-items:center;
          margin-top:clamp(2.5rem,6vh,4rem);padding-top:2rem;border-top:1px solid var(--line);opacity:.75;}
        .ft-partner{font-family:var(--font-jetbrains),monospace;font-size:.8rem;letter-spacing:.1em;
          color:var(--muted);}
        .ft-base{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.6rem;
          margin-top:2.5rem;font-size:.78rem;color:var(--faint);}
        .ft-base-note{font-family:var(--font-jetbrains),monospace;letter-spacing:.04em;}
        @media (min-width:680px){.ft-grid{grid-template-columns:1.5fr 1fr 1fr 1.4fr;}}
      `}</style>
    </footer>
  );
}
