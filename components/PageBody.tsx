import Hero, { type HeroProps } from "./Hero";

const SLOT = /<!--SLOT:HERO:([A-Za-z0-9+/=]*)-->/g;

/**
 * Splits a builder body on its hero marker and mounts the real <Hero>.
 * Markup either side of the marker is first-party, authored in lib/data and
 * escaped at the source, so innerHTML is safe. Never pass request data here.
 */
export default function PageBody({ html }: { html: string }) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  SLOT.lastIndex = 0;
  while ((match = SLOT.exec(html)) !== null) {
    if (match.index > cursor) {
      parts.push(<div key={key++} dangerouslySetInnerHTML={{ __html: html.slice(cursor, match.index) }} />);
    }
    const props = JSON.parse(Buffer.from(match[1], "base64").toString("utf8")) as HeroProps;
    parts.push(<Hero key={key++} {...props} />);
    cursor = match.index + match[0].length;
  }
  if (cursor < html.length) {
    parts.push(<div key={key++} dangerouslySetInnerHTML={{ __html: html.slice(cursor) }} />);
  }
  return <>{parts}</>;
}
