import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Container, Section, SectionHeader, ButtonLink } from "@/components/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { PartnerWall } from "@/components/PartnerWall";
import { ArrowUpRight } from "@/components/icons";
import { LIGHTING_SERVICES, PROJECTS, SITE } from "@/lib/site";

const storyLayers = [
  { k: "Design", t: "A layered light plan", d: "Ambient, task, accent and feature light, composed for every room and every hour." },
  { k: "Fixtures", t: "Architectural tools", d: "Trimless downlights, linear runs, framing and façade — specified, never decorative." },
  { k: "Control", t: "KNX & Lutron", d: "Scenes, dimming, scheduling and daylight-follow, recalled from keypad, app or voice." },
  { k: "Shading", t: "Light & shade as one", d: "Motorized shades move with the lighting scenes — glare, privacy and mood in a gesture." },
  { k: "Automation", t: "One designed space", d: "Audio, video, AV/IP and security folded into the same control layer." },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Positioning — no decorative lighting */}
      <Section tight>
        <Container>
          <Reveal className="home-stmt">
            <p className="eyebrow">Our position</p>
            <p className="home-stmt-text">
              We don&rsquo;t sell pretty lamps. Lightable designs, automates and tunes{" "}
              <span>engineered, architectural light</span> — the kind of work a space hires a
              lighting designer for, not a showroom.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Lighting services trio */}
      <Section id="services">
        <Container>
          <SectionHeader
            eyebrow="Lighting, first and deepest"
            title="Three disciplines, one designed result"
            lede="Lighting leads everything we do — from the first layered plan to the moment a scene is recalled by name."
          />
          <RevealGroup className="home-services">
            {LIGHTING_SERVICES.map((s) => (
              <RevealItem key={s.slug}>
                <Link href={s.href} className="home-service panel lit">
                  <span className="home-service-k tag">{s.kicker}</span>
                  <h3 className="t-h3">{s.title}</h3>
                  <p>{s.summary}</p>
                  <ul className="home-service-points">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <span className="home-service-go">
                    Explore <ArrowUpRight width={16} height={16} />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Scroll story — the layers switching on */}
      <Section className="home-story">
        <Container>
          <SectionHeader
            eyebrow="The whole story, led by light"
            title="One environment, switched on layer by layer"
          />
          <ol className="home-layers">
            {storyLayers.map((l, i) => (
              <Reveal as="li" key={l.k} delay={i * 0.05} className="home-layer">
                <span className="home-layer-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="home-layer-led" aria-hidden="true" />
                <div className="home-layer-body">
                  <span className="home-layer-k">{l.k}</span>
                  <h3 className="t-h3">{l.t}</h3>
                  <p>{l.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Featured projects */}
      <Section>
        <Container>
          <div className="home-proj-head">
            <SectionHeader eyebrow="Selected work" title={<>Spaces we&rsquo;ve lit</>} />
            <ButtonLink href="/projects" variant="ghost" arrow="up">
              All projects
            </ButtonLink>
          </div>
          <RevealGroup className="home-projects">
            {PROJECTS.map((p) => (
              <RevealItem key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="home-project">
                  <div className="home-project-img lit">
                    <Placeholder
                      ratio="4 / 5"
                      tone={p.type === "Commercial" ? "cool" : "warm"}
                      label={`Project hero — ${p.title}: ${p.summary}`}
                      alt={`${p.title}, a ${p.type.toLowerCase()} project in ${p.location} — ${p.summary}`}
                    />
                  </div>
                  <div className="home-project-meta">
                    <span className="tag">{p.type}</span>
                    <h3 className="t-h3">{p.title}</h3>
                    <p>
                      {p.location} · {p.year}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* Partners */}
      <Section tight>
        <Container>
          <Reveal>
            <PartnerWall />
          </Reveal>
        </Container>
      </Section>

      {/* CTA band */}
      <Section>
        <Container>
          <Reveal className="home-cta panel lit">
            <div className="home-cta-glow" aria-hidden="true" />
            <p className="eyebrow">Book a consultation</p>
            <h2 className="t-h1" style={{ maxWidth: "18ch" }}>
              Tell us about the space you want to light.
            </h2>
            <p className="lede">
              We work with architects, interior designers and private clients across the UK. Start
              with a conversation about the rooms, the light and the life inside them.
            </p>
            <ButtonLink href="/contact" variant="primary" arrow="right">
              Start your project
            </ButtonLink>
            <p className="home-cta-fine">
              {SITE.email} · {SITE.phone}
            </p>
          </Reveal>
        </Container>
      </Section>

      <style>{`
        .home-stmt{display:flex;flex-direction:column;gap:1.5rem;max-width:46rem;}
        .home-stmt-text{font-family:var(--font-fraunces),serif;font-weight:360;
          font-size:clamp(1.5rem,3.4vw,2.5rem);line-height:1.25;letter-spacing:-.01em;
          color:color-mix(in oklch,var(--text),var(--light) 5%);}
        .home-stmt-text span{font-style:italic;color:color-mix(in oklch,var(--light),white 6%);}

        .home-services{display:grid;grid-template-columns:1fr;gap:1.1rem;margin-top:3rem;}
        .home-service{display:flex;flex-direction:column;gap:.9rem;padding:1.6rem;height:100%;
          transition:transform .4s cubic-bezier(.33,0,.2,1),border-color .4s;}
        .home-service:hover{transform:translateY(-3px);}
        .home-service-k{align-self:flex-start;}
        .home-service p{color:var(--muted);}
        .home-service-points{list-style:none;margin:.3rem 0 0;padding:0;display:flex;flex-wrap:wrap;gap:.4rem;}
        .home-service-points li{font-family:var(--font-jetbrains),monospace;font-size:.62rem;
          letter-spacing:.06em;color:var(--muted);border:1px solid var(--line);
          padding:.35em .7em;border-radius:999px;}
        .home-service-go{margin-top:auto;display:inline-flex;align-items:center;gap:.45rem;
          color:var(--accent);font-size:.85rem;font-weight:500;padding-top:.6rem;}
        @media (min-width:760px){.home-services{grid-template-columns:repeat(3,1fr);}}

        .home-story{background:linear-gradient(180deg,transparent,color-mix(in oklch,var(--bg),#000 12%),transparent);}
        .home-layers{list-style:none;margin:3rem 0 0;padding:0;display:flex;flex-direction:column;}
        .home-layer{position:relative;display:grid;grid-template-columns:auto auto 1fr;gap:1.2rem;
          align-items:start;padding:1.6rem 0;border-top:1px solid var(--line);}
        .home-layer:last-child{border-bottom:1px solid var(--line);}
        .home-layer-no{font-family:var(--font-jetbrains),monospace;font-size:.7rem;color:var(--faint);
          padding-top:.4rem;}
        .home-layer-led{width:10px;height:10px;border-radius:50%;margin-top:.5rem;background:var(--glow);
          box-shadow:0 0 calc(6px + var(--bloom)*16px) var(--glow);transition:box-shadow .6s,background .6s;}
        .home-layer-k{font-family:var(--font-jetbrains),monospace;font-size:.62rem;letter-spacing:.18em;
          text-transform:uppercase;color:var(--accent);}
        .home-layer-body{display:flex;flex-direction:column;gap:.5rem;}
        .home-layer-body p{color:var(--muted);max-width:52ch;}
        @media (min-width:760px){.home-layer{align-items:center;}}

        .home-proj-head{display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:space-between;
          align-items:flex-end;margin-bottom:3rem;}
        .home-projects{display:grid;grid-template-columns:1fr;gap:1.6rem;}
        .home-project{display:flex;flex-direction:column;gap:1.1rem;}
        .home-project-img{border-radius:16px;overflow:hidden;}
        .home-project-meta{display:flex;flex-direction:column;gap:.4rem;}
        .home-project-meta .tag{align-self:flex-start;}
        .home-project-meta p{color:var(--muted);font-size:.9rem;}
        .home-project h3{transition:color .3s ease;}
        .home-project:hover h3{color:color-mix(in oklch,var(--text),var(--light) 12%);}
        @media (min-width:720px){.home-projects{grid-template-columns:repeat(3,1fr);}}

        .home-cta{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:1.4rem;
          align-items:flex-start;padding:clamp(2rem,5vw,4rem);}
        .home-cta-glow{position:absolute;top:-40%;right:-10%;width:50%;height:120%;
          background:radial-gradient(circle,color-mix(in oklch,var(--glow),transparent 60%),transparent 70%);
          filter:blur(40px);opacity:var(--bloom);pointer-events:none;transition:opacity 1100ms ease;}
        .home-cta-fine{font-family:var(--font-jetbrains),monospace;font-size:.66rem;letter-spacing:.08em;
          color:var(--faint);}
      `}</style>
    </>
  );
}
