import Link from "next/link";
import { Container, Section } from "@/components/primitives";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="nf">
          <p className="eyebrow">404 · Off the grid</p>
          <h1 className="t-h1">This page is in the dark.</h1>
          <p className="lede">
            The page you&rsquo;re looking for doesn&rsquo;t exist — or hasn&rsquo;t been lit yet.
            Let&rsquo;s get you back into the light.
          </p>
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
        <style>{`
          .nf{display:flex;flex-direction:column;gap:1.3rem;align-items:flex-start;
            min-height:50vh;justify-content:center;max-width:46rem;}
        `}</style>
      </Container>
    </Section>
  );
}
