import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeader, CTASection, Reveal } from "@/components/sections";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { FIXTURES } from "@/lib/site";

export const metadata = pageMeta({
  title: "Fixtures & Supply",
  description:
    "Architectural lighting fixtures specified and supplied by Lightable — downlights, linear, track, façade, landscape and tunable white. Engineered light tools, never decorative lamps.",
  path: "/lighting-fixtures",
});

export default function FixturesPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Lighting Fixture Supply",
            description:
              "Specification and supply of architectural lighting fixtures — downlights, linear, track, façade, landscape and tunable white.",
            path: "/lighting-fixtures",
          }),
          breadcrumbJsonLd([
            { name: "Lighting", path: "/lighting-design" },
            { name: "Fixtures & Supply", path: "/lighting-fixtures" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Lighting · Fixtures & supply"
        title={<>Architectural fixtures. Never decorative.</>}
        lede="We specify and supply the tools that deliver the design — precise, low-glare, built to disappear into the architecture. If it's a feature lamp or an ornament, it isn't us."
        crumbs={[{ name: "Fixtures & Supply", href: "/lighting-fixtures" }]}
        aside={
          <div className="lit glow-edge" style={{ borderRadius: 16 }}>
            <Placeholder
              ratio="4 / 3"
              tone="default"
              label="Fixtures hero — a flat-lay of architectural fixtures: trimless downlight, linear profile, framing projector and an in-ground uplight."
              alt="A dark flat-lay of architectural lighting fixtures — a trimless recessed downlight, a linear profile, a framing projector and an in-ground uplight."
            />
          </div>
        }
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="The catalogue"
            title="A toolkit of light"
            lede="Each category is selected for optical quality, control compatibility and how cleanly it integrates — then matched to the scheme."
          />
          <RevealGroup className="fx-grid">
            {FIXTURES.map((f) => (
              <RevealItem key={f.name}>
                <article className="fx-card">
                  <div className="fx-img lit">
                    <Placeholder
                      ratio={f.ratio}
                      tone="warm"
                      label={`${f.name} — ${f.blurb}`}
                      alt={`${f.name}: ${f.blurb}`}
                    />
                  </div>
                  <div className="fx-meta">
                    <h3 className="t-h3">{f.name}</h3>
                    <span className="fx-spec">{f.spec}</span>
                    <p>{f.blurb}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <Reveal className="fx-note panel lit">
            <p className="eyebrow">Why we draw the line</p>
            <p className="fx-note-text">
              Decorative fixtures chase a look. Architectural fixtures serve a design — chosen for
              beam, glare control, colour rendering and how they vanish into ceiling, wall or
              ground. We supply the second kind, so the light is what you notice, not the hardware.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        eyebrow="Specify with us"
        title="A fixture schedule that matches the design."
        lede="We supply and coordinate fixtures as part of the wider scheme — or specify against a design already underway with your team."
        label="Discuss a specification"
      />

      <style>{`
        .fx-grid{display:grid;grid-template-columns:1fr;gap:1.6rem;margin-top:3rem;}
        .fx-card{display:flex;flex-direction:column;gap:1rem;}
        .fx-img{border-radius:14px;overflow:hidden;}
        .fx-meta{display:flex;flex-direction:column;gap:.5rem;}
        .fx-spec{font-family:var(--font-jetbrains),monospace;font-size:.62rem;letter-spacing:.1em;
          text-transform:uppercase;color:var(--accent);}
        .fx-meta p{color:var(--muted);font-size:.92rem;}
        @media (min-width:640px){.fx-grid{grid-template-columns:repeat(2,1fr);}}
        @media (min-width:1000px){.fx-grid{grid-template-columns:repeat(3,1fr);}}
        .fx-note{padding:clamp(1.8rem,4vw,3rem);display:flex;flex-direction:column;gap:1.2rem;max-width:60rem;}
        .fx-note-text{font-family:var(--font-fraunces),serif;font-weight:360;
          font-size:clamp(1.3rem,2.6vw,1.9rem);line-height:1.32;
          color:color-mix(in oklch,var(--text),var(--light) 5%);}
      `}</style>
    </>
  );
}
