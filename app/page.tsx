import type { Metadata } from "next";
import { homePage } from "@/lib/routes.mjs";
import { Rendered, toMetadata, type Descriptor } from "@/lib/render";

const descriptor = () => homePage() as Descriptor;
export const metadata: Metadata = toMetadata(descriptor());
export default function Page() {
  return <Rendered descriptor={descriptor()} />;
}
