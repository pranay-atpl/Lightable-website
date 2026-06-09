import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeader, SplitFeature, FeatureCards, CTASection } from "@/components/sections";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Shading Automation",
  description:
    "Motorized shades and blinds, integrated with your lighting scenes — glare, privacy and mood handled in a single gesture. Shading automation by Lightable.",
  path: "/shading",
});

const features = [
  { tag: "Integrated", title: "Moves with the light", body: "Shades ride on the same scenes as the lighting, so one press resolves glare, privacy and mood together." },
  { tag: "Glare", title: "Glare & heat control", body: "Position shades against the sun through the day — cut glare on screens, protect finishes, hold comfort." },
  { tag: "Privacy", title: "Privacy on schedule", body: "Sheers by day, blackout by night — automatically, or recalled on demand from keypad, app or voice." },
  { tag: "Quiet", title: "Silent, precise motors", body: "Whisper-quiet motorisation with synchronised alignment across a wall of windows." },
];

export default function ShadingPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Shading Automation",
            description:
              "Motorized shade and blind automation, integrated with lighting scenes for glare, privacy and mood control.",
            path: "/shading",
          }),
          breadcrumbJsonLd([{ name: "Shading", path: "/shading" }]),
        ]}
      />

      <PageHero
        eyebrow="Shading automation"
        title={<>Light and shade, moving as one.</>}
        lede="Daylight is the most powerful light source in any room. We automate shading so it works with the design — not against it — folded into the very same scenes."
        crumbs={[{ name: "Shading", href: "/shading" }]}
        aside={
          <div className="lit glow-edge" style={{ borderRadius: 16 }}>
            <Placeholder
              ratio="4 / 3"
              tone="cool"
              label="Shading hero — floor-to-ceiling windows with motorized sheers descending, soft daylight balanced against warm interior light."
              alt="Floor-to-ceiling windows with motorized sheer shades partly lowered, soft daylight balanced against the warm interior lighting."
            />
          </div>
        }
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="What it does"
            title="One gesture for glare, privacy and mood"
            lede="Because shading shares the lighting's control layer, it never feels like a separate system — it's just part of the scene."
          />
          <div style={{ marginTop: "3rem", ["--fcols" as string]: "4" } as React.CSSProperties}>
            <FeatureCards items={features} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SplitFeature
            eyebrow="Integration"
            title={<>Designed in from the first plan</>}
            body={[
              "We plan shading alongside the lighting from day one — so the blinds and the light are circuited, scened and commissioned together.",
              "An evening scene can dim the downlights, warm the cove and drop the blackout shades in a single, quiet move.",
            ]}
            points={["Scened with the lighting", "Sun-position scheduling", "Sheer + blackout layers", "KNX / Lutron control"]}
            imageLabel="Integration — an evening scene in progress: downlights dimming, cove warming, shades descending across a wall of glass."
            imageAlt="An evening lighting scene mid-transition — downlights dimming, a ceiling cove warming, and motorized shades descending across a wall of glass."
            tone="warm"
            reverse
          />
        </Container>
      </Section>

      <CTASection
        eyebrow="Add shading"
        title="Let daylight join the design."
        lede="We integrate motorized shading with new or existing lighting control, so the whole room responds as one."
        label="Discuss shading"
      />
    </>
  );
}
