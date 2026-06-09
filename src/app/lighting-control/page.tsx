import { PageHero } from "@/components/PageHero";
import {
  Container,
  Section,
  SectionHeader,
  SplitFeature,
  FeatureCards,
  CTASection,
  Reveal,
} from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Control & Automation",
  description:
    "Lighting control and automation with KNX and Lutron — scenes, tuning, dimming, scheduling and daylight-follow, recalled from a keypad, an app or your voice. By Lightable.",
  path: "/lighting-control",
});

const capabilities = [
  { tag: "Scenes", title: "Set and recall moods", body: "Whole rooms — or a whole home — captured as a scene and recalled by name from a keypad, the app or your voice." },
  { tag: "Tuning", title: "Tunable white", body: "Shift colour temperature on schedule or on demand, from crisp daylight to candle-warm, with daylight-follow." },
  { tag: "Dimming", title: "Flicker-free curves", body: "Smooth, deep dimming with curves tuned per fixture so low levels stay warm, even and silent." },
  { tag: "Scheduling", title: "Time & astronomy", body: "Scenes that follow the clock and the sun — fading up at dusk, settling down at night, automatically." },
  { tag: "Daylight", title: "Daylight-follow", body: "Sensors balance interior light against the changing daylight outside, holding a constant, comfortable level." },
  { tag: "Voice + app", title: "One way to control it all", body: "A single app and voice control across lighting, shading and the wider system — legible and reliable." },
];

export default function LightingControlPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Lighting Control & Automation",
            description:
              "Lighting control and automation using KNX and Lutron — scenes, tuning, dimming, scheduling, daylight-follow, keypad, app and voice control.",
            path: "/lighting-control",
          }),
          breadcrumbJsonLd([
            { name: "Lighting", path: "/lighting-design" },
            { name: "Control & Automation", path: "/lighting-control" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Lighting · Control & automation"
        title={<>KNX &amp; Lutron, made effortless.</>}
        lede="The design only lives once it's controlled. We program scenes, dimming, schedules and daylight-follow onto rock-solid KNX and Lutron systems — then make them feel like a single touch."
        crumbs={[{ name: "Control & Automation", href: "/lighting-control" }]}
        aside={
          <Reveal className="lc-aside panel lit">
            <span className="eyebrow">Live demo</span>
            <p className="lc-aside-text">
              The keypad at the bottom-right of this page is a working taste of it. Press a scene
              and watch the whole site re-light, cool to warm — exactly how a room responds.
            </p>
            <span className="lc-aside-fine">↘ Try Bright, Evening or Cinema</span>
          </Reveal>
        }
      />

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Capabilities"
            title="Everything light should do, on demand"
            lede="Scene-based control is the heart of it — but the system also tunes, schedules and adapts on its own."
          />
          <div style={{ marginTop: "3rem" }}>
            <FeatureCards items={capabilities} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="KNX vs Lutron"
            title="Two great systems, simply explained"
            lede="We design and commission both, and recommend the right one for your space — never the one that's easiest for us."
          />
          <div className="lc-compare">
            <Reveal className="lc-sys panel lit">
              <h3 className="t-h3">KNX</h3>
              <p className="lc-sys-tag">Open standard · whole-building</p>
              <p>
                A vendor-neutral, internationally standardised bus. KNX shines on larger,
                multi-discipline projects where lighting, shading, HVAC and more share one
                resilient backbone — flexible, future-proof and not tied to a single brand.
              </p>
              <ul>
                <li>Best for larger / mixed-use projects</li>
                <li>Open, multi-vendor hardware</li>
                <li>Deep integration across systems</li>
              </ul>
            </Reveal>
            <Reveal className="lc-sys panel lit" delay={0.08}>
              <h3 className="t-h3">Lutron</h3>
              <p className="lc-sys-tag">Refined · residential-first</p>
              <p>
                A beautifully resolved ecosystem with class-leading dimming and elegant keypads.
                Lutron is often the perfect fit for high-end homes — exquisite low-end dimming,
                gorgeous hardware and a famously dependable experience.
              </p>
              <ul>
                <li>Best for premium residential</li>
                <li>Class-leading dimming quality</li>
                <li>Elegant keypads &amp; app</li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SplitFeature
            eyebrow="One interface"
            title={<>Keypad, app and voice — in concert</>}
            body={[
              "We design the control layout the way we design the light: legibly. Keypads carry the scenes you use daily; the app holds everything; voice handles the rest.",
              "Shading rides on the same scenes, so a single press settles the light and the blinds together.",
            ]}
            points={["Tactile wall keypads", "One app across the home", "Voice control", "Shading on the same scenes"]}
            imageLabel="Control hero — a premium metal keypad on a stone wall, LEDs glowing warm, beside a tablet showing the scene app."
            imageAlt="A premium metal lighting keypad mounted on a stone wall with softly glowing indicator LEDs, beside a tablet displaying the scene-control app."
            tone="warm"
            reverse
          />
        </Container>
      </Section>

      <CTASection
        eyebrow="Specify control"
        title="Make the light answer to one touch."
        lede="Whether it's KNX, Lutron or a system already part-installed, we'll design the control and program it to feel effortless."
        label="Talk control systems"
      />

      <style>{`
        .lc-aside{padding:1.5rem;display:flex;flex-direction:column;gap:.9rem;}
        .lc-aside-text{color:var(--muted);font-size:.95rem;}
        .lc-aside-fine{font-family:var(--font-jetbrains),monospace;font-size:.62rem;letter-spacing:.06em;
          color:var(--accent);}
        .lc-compare{display:grid;grid-template-columns:1fr;gap:1.2rem;margin-top:3rem;}
        .lc-sys{padding:1.8rem;display:flex;flex-direction:column;gap:.8rem;}
        .lc-sys-tag{font-family:var(--font-jetbrains),monospace;font-size:.62rem;letter-spacing:.1em;
          text-transform:uppercase;color:var(--accent);}
        .lc-sys p{color:var(--muted);}
        .lc-sys ul{list-style:none;margin:.5rem 0 0;padding:0;display:flex;flex-direction:column;gap:.5rem;}
        .lc-sys li{position:relative;padding-left:1.2rem;color:var(--text);font-size:.92rem;}
        .lc-sys li::before{content:"";position:absolute;left:0;top:.55em;width:6px;height:6px;border-radius:50%;
          background:var(--glow);box-shadow:0 0 8px var(--glow);}
        @media (min-width:820px){.lc-compare{grid-template-columns:1fr 1fr;}}
      `}</style>
    </>
  );
}
