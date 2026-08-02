import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { areaPageBySlug, areaParams } from "@/lib/routes.mjs";
import { Rendered, toMetadata, type Descriptor } from "@/lib/render";

export const dynamicParams = false;

export function generateStaticParams() {
  return areaParams;
}

function load(slug: string): Descriptor {
  const d = areaPageBySlug(slug) as Descriptor | null;
  if (!d) notFound();
  return d;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return toMetadata(load(slug));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Rendered descriptor={load(slug)} />;
}
