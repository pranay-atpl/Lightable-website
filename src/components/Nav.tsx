"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { ChevronDown, ArrowRight, Plus, Close } from "./icons";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMobileOpen(false), [pathname]);

  // lock scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("#")[0]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner container">
        <Link href="/" className="nav-brand" aria-label={`${SITE.name} — home`}>
          <Wordmark />
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item.href} className={item.children ? "has-sub" : ""}>
                <Link
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? "is-active" : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                  {item.children ? <ChevronDown width={14} height={14} /> : null}
                </Link>
                {item.children ? (
                  <div className="nav-sub" role="menu" aria-label={item.label}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="nav-sub-link" role="menuitem">
                        <span>{child.label}</span>
                        {child.note ? <em>{child.note}</em> : null}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <Link href="/contact" className="btn btn-primary nav-cta">
            Book a consultation
            <ArrowRight width={17} height={17} />
          </Link>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <Close width={22} height={22} /> : <Plus width={22} height={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`nav-mobile ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="nav-mobile-link">
                {item.label}
                <ArrowRight width={18} height={18} />
              </Link>
              {item.children ? (
                <div className="nav-mobile-sub">
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
          <li>
            <Link href="/contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: ".6rem" }}>
              Book a consultation
            </Link>
          </li>
        </ul>
      </div>

      <style>{`
        .nav{position:sticky;top:0;z-index:70;transition:background .4s ease,border-color .4s ease,backdrop-filter .4s;
          border-bottom:1px solid transparent;}
        .nav.is-scrolled{background:color-mix(in oklch,var(--bg),transparent 25%);
          backdrop-filter:blur(16px) saturate(1.2);border-bottom-color:var(--line);}
        .nav-inner{display:flex;align-items:center;justify-content:space-between;gap:1rem;
          height:clamp(64px,8vh,82px);}
        .nav-brand{display:inline-flex;align-items:center;}

        .nav-links{display:none;}
        .nav-links ul{display:flex;align-items:center;gap:.3rem;list-style:none;margin:0;padding:0;}
        .nav-links li{position:relative;}
        .nav-link{display:inline-flex;align-items:center;gap:.3rem;padding:.55rem .8rem;border-radius:9px;
          font-size:.93rem;color:var(--muted);transition:color .3s ease,background .3s ease;}
        .nav-link:hover,.has-sub:hover .nav-link,.nav-link.is-active{color:var(--text);}
        .nav-link.is-active{background:color-mix(in oklch,var(--surface-2),transparent 40%);}

        .nav-sub{position:absolute;top:calc(100% + .4rem);left:0;min-width:250px;padding:.5rem;
          border-radius:14px;border:1px solid var(--line-strong);
          background:color-mix(in oklch,var(--surface),var(--bg) 10%);backdrop-filter:blur(16px);
          box-shadow:0 30px 70px -40px #000,0 0 60px -34px color-mix(in oklch,var(--glow),transparent 30%);
          opacity:0;visibility:hidden;transform:translateY(6px);
          transition:opacity .28s ease,transform .28s ease,visibility .28s;}
        .has-sub:hover .nav-sub,.has-sub:focus-within .nav-sub{opacity:1;visibility:visible;transform:none;}
        .nav-sub-link{display:flex;flex-direction:column;gap:.05rem;padding:.6rem .7rem;border-radius:10px;
          transition:background .25s ease;}
        .nav-sub-link:hover{background:color-mix(in oklch,var(--surface-2),transparent 20%);}
        .nav-sub-link span{font-size:.92rem;color:var(--text);}
        .nav-sub-link em{font-style:normal;font-family:var(--font-jetbrains),monospace;
          font-size:.6rem;letter-spacing:.08em;color:var(--muted);}

        .nav-actions{display:flex;align-items:center;gap:.6rem;}
        .nav-cta{display:none;padding:.7em 1.2em;font-size:.9rem;}
        .nav-burger{display:grid;place-items:center;width:44px;height:44px;border-radius:11px;
          color:var(--text);border:1px solid var(--line-strong);
          background:color-mix(in oklch,var(--surface-2),transparent 20%);cursor:pointer;}

        .nav-mobile{position:fixed;inset:0;top:0;z-index:65;padding:6rem var(--gutter) 2rem;
          background:color-mix(in oklch,var(--bg),transparent 2%);backdrop-filter:blur(10px);
          opacity:0;visibility:hidden;transform:translateY(-8px);overflow-y:auto;
          transition:opacity .35s ease,transform .35s ease,visibility .35s;}
        .nav-mobile.is-open{opacity:1;visibility:visible;transform:none;}
        .nav-mobile ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.2rem;}
        .nav-mobile-link{display:flex;align-items:center;justify-content:space-between;
          padding:.9rem .2rem;font-family:var(--font-fraunces),serif;font-size:1.6rem;
          border-bottom:1px solid var(--line);color:var(--text);}
        .nav-mobile-sub{display:flex;flex-wrap:wrap;gap:.4rem .9rem;padding:.5rem .2rem 1rem;}
        .nav-mobile-sub a{font-size:.85rem;color:var(--muted);}

        @media (min-width:960px){
          .nav-links{display:block;}
          .nav-cta{display:inline-flex;}
          .nav-burger{display:none;}
        }
      `}</style>
    </header>
  );
}
