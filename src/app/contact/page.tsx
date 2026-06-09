import { PageHero } from "@/components/PageHero";
import { Container, Section, Reveal } from "@/components/sections";
import { ContactForm } from "@/components/ContactForm";
import { Placeholder } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Book a lighting design consultation with Lightable. Tell us about your space — residential, commercial or façade — and how you’d like it to feel.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />

      <PageHero
        eyebrow="Book a consultation"
        title={<>Let&rsquo;s talk about your space.</>}
        lede="Tell us about the rooms, the architecture and the moods you want. We’ll arrange a consultation and take it from there."
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <Section tight>
        <Container>
          <div className="ct-grid">
            <Reveal className="ct-form panel lit">
              <ContactForm />
            </Reveal>

            <Reveal className="ct-aside" delay={0.08}>
              <div className="ct-detail">
                <p className="eyebrow">Studio</p>
                <address className="ct-address">
                  {SITE.address.street}
                  <br />
                  {SITE.address.city} {SITE.address.postal}
                  <br />
                  United Kingdom
                </address>
              </div>
              <div className="ct-detail">
                <p className="eyebrow">Direct</p>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
              </div>
              <div className="ct-detail">
                <p className="eyebrow">Hours</p>
                <p className="ct-muted">Mon–Fri · 9:00–18:00</p>
                <p className="ct-muted">Consultations by appointment</p>
              </div>

              <div className="ct-map lit">
                <Placeholder
                  ratio="16 / 10"
                  tone="cool"
                  label="Map — studio location in Clerkenwell, London. Swap for an embedded map or static map image."
                  alt="Map showing the Lightable studio location in Clerkenwell, London."
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <style>{`
        .ct-grid{display:grid;grid-template-columns:1fr;gap:2rem;}
        .ct-form{padding:clamp(1.6rem,4vw,2.4rem);}
        .ct-aside{display:flex;flex-direction:column;gap:1.6rem;}
        .ct-detail{display:flex;flex-direction:column;gap:.5rem;}
        .ct-address{font-style:normal;color:var(--text);line-height:1.7;}
        .ct-detail a{color:var(--text);text-decoration:underline;text-underline-offset:4px;
          text-decoration-color:var(--line-strong);width:fit-content;}
        .ct-detail a:hover{text-decoration-color:var(--accent);}
        .ct-muted{color:var(--muted);}
        .ct-map{border-radius:14px;overflow:hidden;margin-top:.5rem;}
        @media (min-width:880px){.ct-grid{grid-template-columns:1.3fr .9fr;gap:3rem;align-items:start;}}
      `}</style>
    </>
  );
}
