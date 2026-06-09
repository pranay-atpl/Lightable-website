import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Section, StatGrid, CTASection, Reveal } from "@/components/sections";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight } from "@/components/icons";
import { pageMeta, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { PROJECTS, SITE } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMeta({
    title: project.title,
    description: `${project.title} — ${project.summary}`,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = PROJECTS[idx];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url: `${SITE.url}/projects/${project.slug}`,
            locationCreated: project.location,
            dateCreated: project.year,
            creator: { "@id": `${SITE.url}/#organization` },
          },
          serviceJsonLd({
            name: `${project.type} lighting design`,
            description: project.summary,
            path: `/projects/${project.slug}`,
          }),
        ]}
      />

      <Section tight>
        <Container>
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span aria-hidden="true">/</span>
                <Link href="/projects">Projects</Link>
              </li>
              <li aria-current="page">
                <span aria-hidden="true">/</span>
                <span>{project.title}</span>
              </li>
            </ol>
          </nav>

          <Reveal className="cs-head">
            <span className="tag">{project.type}</span>
            <h1 className="t-h1" style={{ maxWidth: "16ch" }}>
              {project.title}
            </h1>
            <p className="lede" style={{ maxWidth: "52ch" }}>
              {project.summary}
            </p>
            <dl className="cs-facts">
              <div>
                <dt>Location</dt>
                <dd>{project.location}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Systems</dt>
                <dd>{project.systems.join(" · ")}</dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <Reveal className="lit glow-edge" >
            <Placeholder
              ratio={project.ratio}
              tone={project.type === "Commercial" ? "cool" : "warm"}
              label={`${project.title} — hero shot: ${project.summary}`}
              alt={`${project.title}, ${project.location} — ${project.summary}`}
            />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="cs-body">
            <div className="cs-story">
              <p className="eyebrow">The work</p>
              {project.story.map((para, i) => (
                <Reveal as="div" key={i} delay={i * 0.04}>
                  <p className="cs-para">{para}</p>
                </Reveal>
              ))}
            </div>
            <aside className="cs-aside">
              <div className="panel cs-scope">
                <p className="eyebrow">Scope</p>
                <ul>
                  {project.scope.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <div style={{ ["--cols" as string]: String(project.outcomes.length) } as React.CSSProperties}>
            <StatGrid items={project.outcomes} />
          </div>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <Reveal>
            <div className="cs-gallery">
              <div className="lit" style={{ borderRadius: 14, overflow: "hidden" }}>
                <Placeholder
                  ratio="4 / 5"
                  tone="warm"
                  label={`${project.title} — detail: a lit feature wall or joinery, showing accent and grazing light.`}
                  alt={`${project.title} detail — a feature wall lit with accent and grazing light.`}
                />
              </div>
              <div className="lit" style={{ borderRadius: 14, overflow: "hidden" }}>
                <Placeholder
                  ratio="4 / 5"
                  tone="cool"
                  label={`${project.title} — detail: a keypad or control point in context, glowing softly.`}
                  alt={`${project.title} detail — a wall keypad in context, its indicators glowing softly.`}
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tight>
        <Container>
          <Link href={`/projects/${next.slug}`} className="cs-next panel lit">
            <div>
              <span className="eyebrow">Next project</span>
              <h2 className="t-h2">{next.title}</h2>
              <p>
                {next.type} · {next.location}
              </p>
            </div>
            <span className="cs-next-go">
              <ArrowRight width={26} height={26} />
            </span>
          </Link>
        </Container>
      </Section>

      <CTASection
        title="Start your own project."
        lede="Bring us the space and the brief. We'll design the light around it."
        label="Book a consultation"
      />

      <style>{`
        .cs-head{display:flex;flex-direction:column;gap:1.1rem;margin-top:1.5rem;}
        .cs-head .tag{align-self:flex-start;}
        .cs-facts{display:flex;flex-wrap:wrap;gap:2rem;margin:1rem 0 0;padding:1.4rem 0 0;
          border-top:1px solid var(--line);}
        .cs-facts dt{font-family:var(--font-jetbrains),monospace;font-size:.58rem;letter-spacing:.16em;
          text-transform:uppercase;color:var(--faint);margin-bottom:.3rem;}
        .cs-facts dd{margin:0;color:var(--text);font-size:.95rem;}
        .cs-body{display:grid;grid-template-columns:1fr;gap:2.5rem;}
        .cs-story{display:flex;flex-direction:column;gap:1.2rem;}
        .cs-para{color:var(--muted);font-size:1.05rem;line-height:1.7;max-width:60ch;}
        .cs-scope{padding:1.5rem;}
        .cs-scope ul{list-style:none;margin:1rem 0 0;padding:0;display:flex;flex-direction:column;gap:.6rem;}
        .cs-scope li{position:relative;padding-left:1.2rem;color:var(--text);font-size:.92rem;}
        .cs-scope li::before{content:"";position:absolute;left:0;top:.55em;width:6px;height:6px;border-radius:50%;
          background:var(--glow);box-shadow:0 0 8px var(--glow);}
        .cs-gallery{display:grid;grid-template-columns:1fr;gap:1.2rem;}
        .cs-next{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;
          padding:clamp(1.6rem,4vw,2.6rem);transition:transform .4s cubic-bezier(.33,0,.2,1);}
        .cs-next:hover{transform:translateY(-3px);}
        .cs-next p{color:var(--muted);margin-top:.3rem;}
        .cs-next-go{color:var(--accent);flex:none;}
        @media (min-width:820px){
          .cs-body{grid-template-columns:1.6fr .9fr;gap:3.5rem;}
          .cs-gallery{grid-template-columns:1fr 1fr;}
        }
      `}</style>
    </>
  );
}
