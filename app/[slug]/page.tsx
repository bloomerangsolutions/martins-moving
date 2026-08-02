import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { rootPageBuilders, rootParams } from "@/lib/routes.mjs";
import { Rendered, toMetadata, type Descriptor } from "@/lib/render";

export const dynamicParams = false;

export function generateStaticParams() {
  return rootParams;
}

function load(slug: string): Descriptor {
  const build = rootPageBuilders[slug as keyof typeof rootPageBuilders];
  if (!build) notFound();
  return build() as Descriptor;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return toMetadata(load(slug));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <Rendered descriptor={load(slug)} />;
}
