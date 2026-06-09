import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, Section, CTASection } from "@/components/sections";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { ArrowUpRight } from "@/components/icons";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { PROJECTS } from "@/lib/site";

export const metadata = pageMeta({
  title: "Projects",
  description:
    "Selected lighting design and automation projects by Lightable — residential, boutique commercial and architectural façade schemes across the UK.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Projects", path: "/projects" }])} />

      <PageHero
        eyebrow="Selected work"
        title={<>Spaces designed around light.</>}
        lede="A selection of recent work across homes, boutique commercial interiors and architectural façades. Every image here is a labelled placeholder, ready to swap for the real shots."
        crumbs={[{ name: "Projects", href: "/projects" }]}
      />

      <Section>
        <Container>
          <RevealGroup className="pj-grid">
            {PROJECTS.map((p, i) => (
              <RevealItem key={p.slug}>
                <Link href={`/projects/${p.slug}`} className={`pj-card ${i === 0 ? "pj-feature" : ""}`}>
                  <div className="pj-img lit">
                    <Placeholder
                      ratio={i === 0 ? "16 / 10" : "4 / 5"}
                      tone={p.type === "Commercial" ? "cool" : "warm"}
                      label={`${p.title} — ${p.summary}`}
                      alt={`${p.title}, a ${p.type.toLowerCase()} project in ${p.location} — ${p.summary}`}
                    />
                  </div>
                  <div className="pj-meta">
                    <div className="pj-meta-top">
                      <span className="tag">{p.type}</span>
                      <span className="pj-year">{p.year}</span>
                    </div>
                    <h2 className="t-h3">{p.title}</h2>
                    <p>{p.location}</p>
                    <span className="pj-go">
                      View case study <ArrowUpRight width={16} height={16} />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CTASection
        title="Imagine your space on this page."
        lede="Tell us about the project. We'll design the light that makes it worth photographing."
        label="Book a consultation"
      />

      <style>{`
        .pj-grid{display:grid;grid-template-columns:1fr;gap:1.6rem;}
        .pj-card{display:flex;flex-direction:column;gap:1.1rem;}
        .pj-img{border-radius:16px;overflow:hidden;}
        .pj-meta{display:flex;flex-direction:column;gap:.45rem;}
        .pj-meta-top{display:flex;align-items:center;justify-content:space-between;}
        .pj-year{font-family:var(--font-jetbrains),monospace;font-size:.66rem;letter-spacing:.1em;color:var(--muted);}
        .pj-meta p{color:var(--muted);font-size:.92rem;}
        .pj-go{display:inline-flex;align-items:center;gap:.4rem;color:var(--accent);font-size:.85rem;
          font-weight:500;margin-top:.3rem;}
        .pj-card h2{transition:color .3s ease;}
        .pj-card:hover h2{color:color-mix(in oklch,var(--text),var(--light) 12%);}
        @media (min-width:760px){
          .pj-grid{grid-template-columns:repeat(2,1fr);}
          .pj-feature{grid-column:1 / -1;}
          .pj-feature .pj-meta{max-width:48ch;}
        }
      `}</style>
    </>
  );
}
