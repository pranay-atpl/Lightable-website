import { PageHero } from "@/components/PageHero";
import {
  Container,
  Section,
  SectionHeader,
  SplitFeature,
  FeatureCards,
  StatGrid,
  CTASection,
  Reveal,
} from "@/components/sections";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PROCESS } from "@/lib/site";

export const metadata = pageMeta({
  title: "Lighting Design",
  description:
    "Full-service architectural lighting design from Lightable — layered light plans, scene and mood strategy, tunable white, and complete documentation, from first brief to commissioning.",
  path: "/lighting-design",
});

const layers = [
  { tag: "Layer 01", title: "Ambient", body: "The quiet base — a soft, even wash that makes a room feel calm and complete before anything is accented." },
  { tag: "Layer 02", title: "Task", body: "Directed light where life happens: the island, the reading chair, the desk — tuned for the work at hand." },
  { tag: "Layer 03", title: "Accent", body: "Framing projectors and adjustable spots that place light on art, joinery and texture, giving a room its focus." },
  { tag: "Layer 04", title: "Feature", body: "Light as architecture itself — grazed walls, glowing coves and integrated detail that model the space." },
];

export default function LightingDesignPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Architectural Lighting Design",
            description:
              "Full-service architectural lighting design — layered light planning, scene strategy, tunable white, technical specification, documentation and commissioning.",
            path: "/lighting-design",
          }),
          breadcrumbJsonLd([
            { name: "Lighting", path: "/lighting-design" },
            { name: "Lighting Design", path: "/lighting-design" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Primary service · Lighting design"
        title={<>Lighting design, from first brief to final scene.</>}
        lede="Our flagship discipline. We design layered, intentional light — and we engineer it all the way through to a commissioned, tuned, recallable system."
        crumbs={[{ name: "Lighting Design", href: "/lighting-design" }]}
        aside={
          <div className="lit glow-edge" style={{ borderRadius: 16 }}>
            <Placeholder
              ratio="4 / 3"
              tone="warm"
              label="Lighting design hero — a layered scheme in a double-height living space: cove light, recessed downlights and a single grazed stone wall."
              alt="A double-height living space showing layered lighting design — a glowing ceiling cove, recessed downlights over the seating, and warm light grazing a stone wall."
            />
          </div>
        }
      />

      <Section tight>
        <Container>
          <Reveal className="ld-intro">
            <p className="ld-lead">
              Most spaces are lit by accident — a grid of downlights and a switch by the door.
              We start somewhere else: with how you live in a room across a day, and with the
              moods you want to recall by name. Then we design the light to deliver them.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="The method"
            title="Four layers of light, composed"
            lede="Every room is built from the same four layers — balanced, dimmed and scened so one space can become many."
          />
          <div style={{ marginTop: "3rem", ["--fcols" as string]: "4" } as React.CSSProperties}>
            <FeatureCards items={layers} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SplitFeature
            eyebrow="Tunable white"
            title={<>Light that follows the day</>}
            body={[
              "We design a tunable-white backbone so colour temperature shifts with the hour — crisp and energising at noon, amber and intimate by night.",
              "It runs on schedule and on demand, with daylight-follow that keeps interiors balanced against the changing light outside.",
            ]}
            points={["1800–6500K range", "Daylight-follow scheduling", "Dim-to-warm curves", "Circadian-friendly settings"]}
            imageLabel="Tunable white — the same room at three times of day, shifting from cool morning light to warm evening."
            imageAlt="A triptych of the same interior at morning, afternoon and evening, the light shifting from cool white to warm amber."
            tone="cool"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Process"
            title="A start-to-finish journey"
            lede="Seven stages, from the first conversation to aftercare. Each one produces something you can build from."
          />
          <ol className="ld-steps">
            {PROCESS.map((s) => (
              <Reveal as="li" key={s.no} className="ld-step">
                <span className="ld-step-no">{s.no}</span>
                <div>
                  <h3 className="t-h3">{s.title}</h3>
                  <p>{s.body}</p>
                  <div className="ld-step-deliv">
                    {s.deliverables.map((d) => (
                      <span key={d} className="tag">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <SectionHeader eyebrow="Outcomes" title="What good lighting design returns" />
          <div style={{ marginTop: "2.5rem", ["--cols" as string]: "4" } as React.CSSProperties}>
            <StatGrid
              items={[
                { label: "Layers per room", value: "4" },
                { label: "Scenes, typical home", value: "30+" },
                { label: "Colour temperature", value: "1800–6500K" },
                { label: "Accent CRI", value: "95+" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <CTASection
        title="Let's design your light from the first layer up."
        lede="Bring us the architecture, the drawings or just the rooms. We'll shape the light around the life inside them."
      />

      <style>{`
        .ld-intro{max-width:52rem;}
        .ld-lead{font-family:var(--font-fraunces),serif;font-weight:360;
          font-size:clamp(1.4rem,3vw,2.1rem);line-height:1.3;letter-spacing:-.01em;
          color:color-mix(in oklch,var(--text),var(--light) 5%);}
        .ld-steps{list-style:none;margin:3rem 0 0;padding:0;display:flex;flex-direction:column;}
        .ld-step{display:grid;grid-template-columns:auto 1fr;gap:1.4rem;padding:1.8rem 0;
          border-top:1px solid var(--line);}
        .ld-step:last-child{border-bottom:1px solid var(--line);}
        .ld-step-no{font-family:var(--font-jetbrains),monospace;font-size:.8rem;color:var(--accent);
          padding-top:.4rem;}
        .ld-step h3{margin-bottom:.6rem;}
        .ld-step p{color:var(--muted);max-width:60ch;}
        .ld-step-deliv{display:flex;flex-wrap:wrap;gap:.45rem;margin-top:1rem;}
      `}</style>
    </>
  );
}
