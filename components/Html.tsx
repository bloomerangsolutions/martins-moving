/**
 * Renders first-party markup produced by the builders in lib/templates.
 * Content is authored in repo data files and escaped at the source, never
 * user supplied, so innerHTML is safe here. Do not pass request data to this.
 */
export default function Html({ html, as: Tag = "div", className }: { html: string; as?: "div" | "section"; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
