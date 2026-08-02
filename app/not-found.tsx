import { notFoundPage } from "@/lib/routes.mjs";
import { Rendered, type Descriptor } from "@/lib/render";

export default function NotFound() {
  return <Rendered descriptor={notFoundPage() as Descriptor} />;
}
