import { site } from "./data/site.mjs";
import { services } from "./data/services.mjs";
import { areas } from "./data/areas.mjs";
import { guides } from "./data/guides.mjs";
import { resources, aboutPages } from "./data/content.mjs";

export type NavItem = { label: string; href: string; note?: boolean };

export type SiteConfig = {
  brand: string; legalName: string; descriptor: string; positioning: string;
  tagline: string; foundedYear: string; yearsInBusiness: string;
  phone: string; phoneHref: string; domain: string;
  address: { street: string; city: string; region: string; regionName: string; postalCode: string; country: string };
  geo: { lat: string; lng: string };
  hoursDisplay: string; hoursSchema: string; emergency: string; awards: string[];
  licenses: { flIm: string; usdot: string; mc: string };
  serviceRegion: string; primaryCity: string;
};

type Service = { slug: string; label: string; real: boolean };
type Area = { slug: string; name: string };
type Slugged = { slug: string; label: string };

export const siteConfig = site as SiteConfig;

export const nav: Record<"about" | "services" | "areas" | "guides" | "resources", NavItem[]> = {
  about: (aboutPages as Slugged[]).map((p) => ({ label: p.label, href: `/${p.slug}` })),
  services: (services as Service[]).map((s) => ({ label: s.label, href: `/services/${s.slug}`, note: !s.real })),
  areas: [
    ...(areas as Area[]).map((a) => ({ label: `${a.name} Movers`, href: `/areas-served/${a.slug}` })),
    { label: "View all areas", href: "/areas-served" },
  ],
  guides: (guides as Slugged[]).map((g) => ({ label: g.label, href: `/guides/${g.slug}` })),
  resources: (resources as Slugged[]).map((r) => ({ label: r.label, href: `/resources/${r.slug}` })),
};

export const realServiceLinks = nav.services.filter((s) => !s.note);
