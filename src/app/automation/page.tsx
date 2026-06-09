import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeader, SplitFeature, CTASection, Reveal } from "@/components/sections";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { AUTOMATION } from "@/lib/site";

export const metadata = pageMeta({
  title: "Automation & Smart Spaces",
  description:
    "One designed, automated environment — audio, video, AV over IP and security, unified with lighting and shading under a single app and voice control. By Lightable.",
  path: "/automation",
});

const toneFor: Record<string, "warm" | "cool" | "default"> = {
  audio: "warm",
  video: "cool",
  "av-ip": "default",
  security: "cool",
};

export default function AutomationPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "Smart Space Automation",
            description:
              "Whole-space automation — distributed audio, video, AV over IP and security — unified with lighting and shading under one app and voice control.",
            path: "/automation",
          }),
          breadcrumbJsonLd([{ name: "Automation", path: "/automation" }]),
        ]}
      />

      <PageHero
        eyebrow="Automation · Smart spaces"
        title={<>One space. One app. Led by light.</>}
        lede="Lighting leads, but it never works alone. We fold audio, video, AV/IP and security into the same control layer — so the whole environment behaves as one designed system."
        crumbs={[{ name: "Automation", href: "/automation" }]}
        aside={
          <div className="lit glow-edge" style={{ borderRadius: 16 }}>
            <Placeholder
              ratio="4 / 3"
              tone="default"
              label="Automation hero — a single app on a tablet controlling light, shade, audio and security across a connected home, glowing in a dark room."
              alt="A tablet displaying one control app for light, shading, audio and security, glowing in a darkened, connected home."
            />
          </div>
        }
      />

      <Section tight>
        <Container>
          <Reveal className="au-lead-wrap">
            <p className="au-lead">
              A designed environment shouldn&rsquo;t need five remotes and four apps. We unify
              everything beneath one interface — the same keypads, the same app, the same voice —
              so technology recedes and the space comes forward.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="The connected ecosystem"
            title="Four systems, one control layer"
            lede="Each is a discipline in its own right — and each is better for sharing scenes, schedules and a single way to control them."
          />
        </Container>
        <div className="au-services">
          {AUTOMATION.map((s, i) => (
            <Container key={s.id}>
              <SplitFeature
                id={s.id}
                eyebrow={`0${i + 1} · ${s.title}`}
                title={s.title}
                body={s.blurb}
                points={s.items}
                imageLabel={`${s.title} — ${s.blurb}`}
                imageAlt={`${s.title}: ${s.blurb}`}
                tone={toneFor[s.id] ?? "default"}
                reverse={i % 2 === 1}
              />
            </Container>
          ))}
        </div>
      </Section>

      <Section tight>
        <Container>
          <Reveal className="au-unify panel lit">
            <div className="au-unify-glow" aria-hidden="true" />
            <p className="eyebrow">The unifying layer</p>
            <h2 className="t-h2" style={{ maxWidth: "20ch" }}>
              Everything, controllable from one app and your voice.
            </h2>
            <p className="lede">
              Lighting, shading, audio, video and security meet in a single, legible interface —
              with scenes that span the whole space. Press &ldquo;Evening&rdquo; and the lights
              warm, the shades fall, the music lifts and the doors lock. One environment, one move.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        eyebrow="Plan a smart space"
        title="Design the whole environment around light."
        lede="From a single room of integrated AV to a whole-home system, we'll plan it as one — with lighting at its heart."
        label="Start a conversation"
      />

      <style>{`
        .au-lead-wrap{max-width:54rem;}
        .au-lead{font-family:var(--font-fraunces),serif;font-weight:360;
          font-size:clamp(1.4rem,3vw,2.1rem);line-height:1.3;letter-spacing:-.01em;
          color:color-mix(in oklch,var(--text),var(--light) 5%);}
        .au-services{display:flex;flex-direction:column;gap:clamp(3rem,7vh,5.5rem);margin-top:3.5rem;}
        .au-unify{position:relative;overflow:hidden;padding:clamp(2rem,5vw,3.5rem);
          display:flex;flex-direction:column;gap:1.2rem;}
        .au-unify-glow{position:absolute;top:-60%;left:-10%;width:60%;height:160%;
          background:radial-gradient(circle,color-mix(in oklch,var(--glow),transparent 62%),transparent 70%);
          filter:blur(44px);opacity:var(--bloom);pointer-events:none;transition:opacity 1100ms ease;}
      `}</style>
    </>
  );
}
