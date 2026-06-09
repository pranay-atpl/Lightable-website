import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("container", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
  tight,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
}) {
  return (
    <section id={id} className={clsx(tight ? "section-tight" : "section", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center mx-auto",
        className
      )}
      style={align === "center" ? { maxWidth: "52rem" } : undefined}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="t-h2" style={{ maxWidth: "20ch" }}>
        {title}
      </h2>
      {lede ? (
        <p className="lede" style={align === "center" ? { marginInline: "auto" } : undefined}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "default" | "ghost";
  arrow?: "right" | "up" | "none";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "default",
  arrow = "right",
  className,
}: ButtonLinkProps) {
  const external = href.startsWith("http");
  const cls = clsx(
    "btn",
    variant === "primary" && "btn-primary",
    variant === "ghost" && "btn-ghost",
    className
  );
  const inner = (
    <>
      {children}
      {arrow === "right" ? <ArrowRight width={18} height={18} /> : null}
      {arrow === "up" ? <ArrowUpRight width={18} height={18} /> : null}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}
