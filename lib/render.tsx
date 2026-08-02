import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageBody from "@/components/PageBody";
import { siteConfig } from "./nav";

export type Descriptor = {
  meta: { title: string; description: string; canonicalPath: string; robots?: string; preloadImage?: string };
  jsonLd: unknown[];
  bodyHtml: string;
};

export function toMetadata(d: Descriptor): Metadata {
  const url = `${siteConfig.domain}${d.meta.canonicalPath}`;
  const meta: Metadata = {
    title: d.meta.title,
    description: d.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: d.meta.title,
      description: d.meta.description,
      url,
      images: ["/images/hero-og.jpg"],
    },
    twitter: { card: "summary_large_image" },
  };
  if (d.meta.robots) {
    const robots = d.meta.robots.toLowerCase();
    meta.robots = { index: !robots.includes("noindex"), follow: !robots.includes("nofollow") };
  }
  return meta;
}

export function Rendered({ descriptor }: { descriptor: Descriptor }) {
  return (
    <>
      <JsonLd data={descriptor.jsonLd} />
      <PageBody html={descriptor.bodyHtml} />
    </>
  );
}
