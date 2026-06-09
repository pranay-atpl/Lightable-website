import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeader, StatGrid, CTASection, Reveal } from "@/components/sections";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { PartnerWall } from "@/components/PartnerWall";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "Lightable is an architectural lighting design and automation studio. We design with light — engineered, scene-based and intelligently controlled — for high-end homes and boutique spaces.",
  path: "/about",
});

const team = [
  { name: "Studio Director", role: "Lighting design", note: "Leads concept and design across all projects." },
  { name: "Technical Lead", role: "KNX · Lutron", note: "Owns control topology, programming and commissioning." },
  { name: "Project Designer", role: "Documentation", note: "Schedules, drawings and trade coordination." },
];

const values = [
  { tag: "Restraint", title: "Light, not hardware", body: "The best lighting is invisible. We design so you notice the room, never the fittings." },
  { tag: "Engineering", title: "Designed to be built", body: "Every scheme is documented and commissioned with the rigour of an engineering discipline." },
  { tag: "Service", title: "We stay after handover", body: "A designed environment is tuned over time. We’re on call to keep yours at its best." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />

      <PageHero
        eyebrow="The studio"
        title={<>We design with light.</>}
        lede="Lightable is an architectural lighting design and automation studio. We believe light is the most powerful — and most overlooked — material in any space. So we treat it like one."
        crumbs={[{ name: "About", href: "/about" }]}
        aside={
          <div className="lit glow-edge" style={{ borderRadius: 16 }}>
            <Placeholder
              ratio="4 / 3"
              tone="warm"
              label="Studio portrait — the Lightable team reviewing a lighting plan over a model, lit by a single warm task light in a dark studio."
              alt="The Lightable team reviewing a lighting plan over an architectural model, lit by a single warm task light in a darkened studio."
            />
          </div>
        }
      />

      <Section tight>
        <Container>
          <Reveal className="ab-philosophy">
            <p className="ab-text">
              We don&rsquo;t do decorative lighting. We design layered, scene-based light, supply
              the architectural fixtures that deliver it, and control it all with KNX and Lutron.
              The result is a space that feels effortless — calm at night, alive by day, and always
              exactly as intended.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <div style={{ ["--cols" as string]: "3" } as React.CSSProperties}>
            <StatGrid
              items={[
                { label: "Disciplines, unified", value: "6" },
                { label: "Standards we design on", value: "KNX · Lutron" },
                { label: "Where we work", value: "UK-wide" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="What we value" title="Three principles we hold to" />
          <div style={{ marginTop: "3rem" }}>
            <RevealGroup className="ab-values">
              {values.map((v) => (
                <RevealItem key={v.title}>
                  <div className="panel lit ab-value">
                    <span className="tag">{v.tag}</span>
                    <h3 className="t-h3">{v.title}</h3>
                    <p>{v.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="The team" title="Small studio, senior hands" lede="Placeholder team — swap in real people, photos and bios." />
          <RevealGroup className="ab-team">
            {team.map((m) => (
              <RevealItem key={m.role}>
                <div className="ab-member">
                  <div className="ab-member-img lit">
                    <Placeholder
                      ratio="1 / 1"
                      tone="default"
                      label={`Team portrait — ${m.name}, ${m.role}.`}
                      alt={`Portrait of ${m.name}, ${m.role} at Lightable.`}
                    />
                  </div>
                  <h3 className="ab-member-name">{m.name}</h3>
                  <span className="ab-member-role">{m.role}</span>
                  <p>{m.note}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <Reveal>
            <PartnerWall />
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title="Work with a studio that designs with light."
        lede="We collaborate with architects, interior designers and private clients. Let’s talk about your space."
        label="Get in touch"
      />

      <style>{`
        .ab-philosophy{max-width:54rem;}
        .ab-text{font-family:var(--font-fraunces),serif;font-weight:360;
          font-size:clamp(1.4rem,3vw,2.1rem);line-height:1.3;letter-spacing:-.01em;
          color:color-mix(in oklch,var(--text),var(--light) 5%);}
        .ab-values{display:grid;grid-template-columns:1fr;gap:1.1rem;}
        .ab-value{padding:1.6rem;display:flex;flex-direction:column;gap:.8rem;height:100%;}
        .ab-value .tag{align-self:flex-start;}
        .ab-value p{color:var(--muted);}
        @media (min-width:760px){.ab-values{grid-template-columns:repeat(3,1fr);}}
        .ab-team{display:grid;grid-template-columns:1fr;gap:1.6rem;margin-top:3rem;}
        .ab-member{display:flex;flex-direction:column;gap:.5rem;}
        .ab-member-img{border-radius:14px;overflow:hidden;margin-bottom:.6rem;}
        .ab-member-name{font-family:var(--font-fraunces),serif;font-size:1.3rem;}
        .ab-member-role{font-family:var(--font-jetbrains),monospace;font-size:.62rem;letter-spacing:.12em;
          text-transform:uppercase;color:var(--accent);}
        .ab-member p{color:var(--muted);font-size:.9rem;}
        @media (min-width:680px){.ab-team{grid-template-columns:repeat(3,1fr);}}
      `}</style>
    </>
  );
}
