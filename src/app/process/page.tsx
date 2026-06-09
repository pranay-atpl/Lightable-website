import { PageHero } from "@/components/PageHero";
import { Container, Section, SectionHeader, CTASection, Reveal } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { PROCESS } from "@/lib/site";

export const metadata = pageMeta({
  title: "Process",
  description:
    "How Lightable works — a start-to-finish lighting design journey, from consultation and concept through technical design, documentation, supply, commissioning and aftercare.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Process", path: "/process" }])} />

      <PageHero
        eyebrow="How we work"
        title={<>A considered journey, led by light.</>}
        lede="Lighting design is a process, not a product. Ours runs from the first conversation to long after handover — and every stage leaves you with something concrete."
        crumbs={[{ name: "Process", href: "/process" }]}
      />

      <Section>
        <Container>
          <SectionHeader eyebrow="Seven stages" title="From brief to aftercare" />
          <ol className="pr-list">
            {PROCESS.map((s) => (
              <Reveal as="li" key={s.no} className="pr-item">
                <div className="pr-rail" aria-hidden="true">
                  <span className="pr-led" />
                  <span className="pr-line" />
                </div>
                <div className="pr-no">{s.no}</div>
                <div className="pr-body">
                  <h3 className="t-h3">{s.title}</h3>
                  <p>{s.body}</p>
                  <div className="pr-deliv">
                    <span className="pr-deliv-label">Deliverables</span>
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

      <CTASection
        title="Start at stage one: a conversation."
        lede="Tell us about the space and how you want it to feel. Everything else follows from there."
        label="Book a consultation"
      />

      <style>{`
        .pr-list{list-style:none;margin:3rem 0 0;padding:0;display:flex;flex-direction:column;}
        .pr-item{position:relative;display:grid;grid-template-columns:24px auto 1fr;gap:1.2rem;
          padding-bottom:2.6rem;}
        .pr-rail{position:relative;display:flex;justify-content:center;}
        .pr-led{position:absolute;top:.5rem;width:14px;height:14px;border-radius:50%;
          background:var(--glow);box-shadow:0 0 calc(6px + var(--bloom)*18px) var(--glow);
          border:2px solid var(--bg);transition:box-shadow .6s,background .6s;}
        .pr-line{position:absolute;top:1.4rem;bottom:-1rem;width:1px;
          background:linear-gradient(var(--line-strong),transparent);}
        .pr-item:last-child .pr-line{display:none;}
        .pr-no{font-family:var(--font-jetbrains),monospace;font-size:.8rem;color:var(--accent);padding-top:.35rem;}
        .pr-body{display:flex;flex-direction:column;gap:.7rem;}
        .pr-body p{color:var(--muted);max-width:60ch;}
        .pr-deliv{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin-top:.6rem;}
        .pr-deliv-label{font-family:var(--font-jetbrains),monospace;font-size:.58rem;letter-spacing:.16em;
          text-transform:uppercase;color:var(--faint);margin-right:.3rem;}
      `}</style>
    </>
  );
}
