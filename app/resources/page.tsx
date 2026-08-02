import type { Metadata } from "next";
import { indexPage } from "@/lib/routes.mjs";
import { Rendered, toMetadata, type Descriptor } from "@/lib/render";

const descriptor = () => indexPage({ kind: "resources" }) as Descriptor;
export const metadata: Metadata = toMetadata(descriptor());
export default function Page() {
  return <Rendered descriptor={descriptor()} />;
}
