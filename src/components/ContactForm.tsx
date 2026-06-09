"use client";

import { useState } from "react";
import { PROJECT_TYPES } from "@/lib/site";
import { Check, ArrowRight } from "./icons";

type Status = "idle" | "submitting" | "done";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    // Stub handler — no backend. Swap for a real POST (e.g. /api/contact or a form service).
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="cf-done panel lit" role="status" aria-live="polite">
        <span className="cf-done-led" aria-hidden="true">
          <Check width={22} height={22} />
        </span>
        <h3 className="t-h3">Thank you — your enquiry is in.</h3>
        <p>
          We&rsquo;ll be in touch within two working days to arrange a consultation. In the
          meantime, feel free to send over any plans or references.
        </p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus("idle")}>
          Send another enquiry
        </button>
        <style>{doneStyles}</style>
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={handleSubmit} noValidate={false}>
      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required placeholder="Your name" />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required placeholder="you@email.com" />
        </div>
      </div>

      <div className="cf-row">
        <div className="cf-field">
          <label htmlFor="cf-phone">Phone <span className="cf-opt">(optional)</span></label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+44 …" />
        </div>
        <div className="cf-field">
          <label htmlFor="cf-type">Project type</label>
          <select id="cf-type" name="projectType" defaultValue="" required>
            <option value="" disabled>
              Select…
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cf-field">
        <label htmlFor="cf-message">About the project</label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about the space, the rooms involved and how you'd like it to feel…"
        />
      </div>

      <div className="cf-actions">
        <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry"}
          {status === "submitting" ? null : <ArrowRight width={18} height={18} />}
        </button>
        <p className="cf-fine">No backend wired — this is a working demo with a stub handler.</p>
      </div>

      <style>{`
        .cf{display:flex;flex-direction:column;gap:1.1rem;}
        .cf-row{display:grid;grid-template-columns:1fr;gap:1.1rem;}
        .cf-field{display:flex;flex-direction:column;gap:.5rem;}
        .cf-field label{font-family:var(--font-jetbrains),monospace;font-size:.62rem;letter-spacing:.14em;
          text-transform:uppercase;color:var(--muted);}
        .cf-opt{color:var(--faint);}
        .cf input,.cf select,.cf textarea{width:100%;font:inherit;color:var(--text);
          background:color-mix(in oklch,var(--bg),white 2.5%);border:1px solid var(--line-strong);
          border-radius:11px;padding:.85rem 1rem;transition:border-color .3s ease,box-shadow .3s ease,background .3s;}
        .cf textarea{resize:vertical;min-height:120px;}
        .cf input::placeholder,.cf textarea::placeholder{color:var(--faint);}
        .cf input:focus,.cf select:focus,.cf textarea:focus{outline:none;
          border-color:color-mix(in oklch,var(--accent),transparent 30%);
          box-shadow:0 0 0 3px color-mix(in oklch,var(--accent),transparent 78%);
          background:color-mix(in oklch,var(--bg),white 4%);}
        .cf select{appearance:none;cursor:pointer;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23999' stroke-width='1.5'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E");
          background-repeat:no-repeat;background-position:right 1rem center;padding-right:2.4rem;}
        .cf-actions{display:flex;flex-direction:column;gap:.8rem;align-items:flex-start;margin-top:.4rem;}
        .cf-fine{font-family:var(--font-jetbrains),monospace;font-size:.6rem;letter-spacing:.04em;color:var(--faint);}
        @media (min-width:620px){.cf-row{grid-template-columns:1fr 1fr;}}
      `}</style>
    </form>
  );
}

const doneStyles = `
  .cf-done{display:flex;flex-direction:column;gap:1rem;align-items:flex-start;padding:clamp(1.8rem,4vw,2.6rem);}
  .cf-done-led{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;
    color:var(--bg);background:var(--glow);box-shadow:0 0 calc(10px + var(--bloom)*20px) var(--glow);}
  .cf-done p{color:var(--muted);max-width:46ch;}
`;
