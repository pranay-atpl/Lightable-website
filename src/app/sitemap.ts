import type { MetadataRoute } from "next";
import { SITE, PROJECTS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/lighting-design",
    "/lighting-fixtures",
    "/lighting-control",
    "/shading",
    "/automation",
    "/projects",
    "/process",
    "/about",
    "/contact",
  ];

  const pages = routes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const projects = PROJECTS.map((p) => ({
    url: `${SITE.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...projects];
}
