import type { MetadataRoute } from "next";
import { indexablePaths } from "@/lib/routes.mjs";
import { siteConfig } from "@/lib/nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return (indexablePaths() as string[]).map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
