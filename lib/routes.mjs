// Single routing table. Mirrors the emit order the previous src/build.mjs used,
// so URL parity with the live site is verifiable rather than assumed.
// app/ routes and app/sitemap.ts both read from here.
import { services } from "./data/services.mjs";
import { serviceCities } from "./data/service-cities.mjs";
import { areas } from "./data/areas.mjs";
import { guides } from "./data/guides.mjs";
import { resources, aboutPages, corePages } from "./data/content.mjs";
import { site } from "./data/site.mjs";
import { servicePage, areaPage, guidePage, genericPage, indexPage, homePage } from "./templates/pages.mjs";

const core = (slug) => corePages.find((p) => p.slug === slug) || {};

/** Every /services/<slug> route, including the per-city variants. */
export function serviceSlugs() {
  const out = [];
  for (const s of services) {
    out.push({ slug: s.slug, service: s.slug, city: "bradenton" });
    if (serviceCities[s.slug]) out.push({ slug: `${s.slug}-sarasota`, service: s.slug, city: "sarasota" });
  }
  return out;
}

export function servicePageBySlug(slug) {
  const entry = serviceSlugs().find((e) => e.slug === slug);
  if (!entry) return null;
  const svc = services.find((s) => s.slug === entry.service);
  return serviceCities[svc.slug] ? servicePage(svc, entry.city) : servicePage(svc);
}

export function areaPageBySlug(slug) {
  const area = areas.find((a) => a.slug === slug);
  return area ? areaPage(area) : null;
}

export function guidePageBySlug(slug) {
  const g = guides.find((x) => x.slug === slug);
  return g ? guidePage(g) : null;
}

export function resourcePageBySlug(slug) {
  const r = resources.find((x) => x.slug === slug);
  if (!r) return null;
  return genericPage({
    slug: r.slug, label: r.label, title: r.title, metaDesc: r.metaDesc,
    section: "resources", crumbName: "Resources", content: r.content, related: "guides",
  });
}

/** Flat root routes: the about pages plus the core pages. */
export const rootPageBuilders = {
  ...Object.fromEntries(
    aboutPages.map((p) => [
      p.slug,
      () => genericPage({ slug: p.slug, label: p.label, title: p.title, metaDesc: p.metaDesc, content: p.content, related: "services" }),
    ])
  ),
  blog: () => {
    const blog = core("blog");
    return genericPage({
      slug: "blog", label: "Moving Tips & Guides", title: blog.title, metaDesc: blog.metaDesc, content: blog.content,
      relatedItems: guides.map((g) => ({ label: g.label, href: `/guides/${g.slug}` })),
      relatedTitle: "Our moving guides",
    });
  },
  reviews: () => {
    const r = core("reviews");
    return genericPage({ slug: "reviews", label: "Customer Reviews", title: r.title, metaDesc: r.metaDesc, content: r.content, related: "services" });
  },
  contact: () =>
    genericPage({
      slug: "contact", label: "Get a Free Quote",
      title: "Contact Martin's Moving | Free Moving Quote",
      metaDesc: `Get a free moving quote from Martin's Moving. Serving ${site.serviceRegion}. Call ${site.phone} or use the form.`,
      related: "services",
      qa: `Reach Martin's Moving at ${site.phone}. Hours ${site.hoursDisplay}, plus 24/7 emergency service across ${site.serviceRegion}.`,
      bodyIntro: [
        `Call ${site.phone} for the fastest quote, or use the form below. We serve ${site.serviceRegion}, ${site.hoursDisplay}, with 24/7 emergency service.`,
        "Use the quote form to tell us your pickup, destination, home or office size, and preferred date, and we will send a written estimate.",
      ],
    }),
  "privacy-policy": () => {
    const p = core("privacy-policy");
    return genericPage({ slug: "privacy-policy", label: "Privacy Policy", title: p.title, metaDesc: p.metaDesc, content: p.content, robots: "noindex,follow", related: "services" });
  },
  accessibility: () => {
    const a = core("accessibility");
    return genericPage({ slug: "accessibility", label: "Accessibility Statement", title: a.title, metaDesc: a.metaDesc, content: a.content, related: "services" });
  },
};

export const rootSlugs = Object.keys(rootPageBuilders);

export function notFoundPage() {
  return genericPage({
    slug: "404", label: "Page not found",
    title: "Page Not Found | Martin's Moving",
    metaDesc: "That page could not be found. Explore our moving services and areas served.",
    robots: "noindex,follow",
    bodyIntro: [
      "The page you were looking for is not here. Use the menu, or jump to our services and areas below.",
      `Need a quote now? Call ${site.phone}.`,
    ],
    related: "services",
  });
}

/** Indexable URL paths, in the same order the old sitemap.xml listed them. */
export function indexablePaths() {
  const noindex = new Set(["/privacy-policy"]);
  const paths = [
    "/", "/services", "/areas-served", "/guides", "/resources",
    ...serviceSlugs().map((e) => `/services/${e.slug}`),
    ...areas.map((a) => `/areas-served/${a.slug}`),
    ...guides.map((g) => `/guides/${g.slug}`),
    ...resources.map((r) => `/resources/${r.slug}`),
    ...aboutPages.map((p) => `/${p.slug}`),
    "/blog", "/reviews", "/contact", "/privacy-policy", "/accessibility",
  ];
  return paths.filter((p) => !noindex.has(p));
}

export { homePage, indexPage, services, areas, guides, resources, aboutPages, site };

// generateStaticParams payloads
export const serviceParams = serviceSlugs().map((e) => ({ slug: e.slug }));
export const areaParams = areas.map((a) => ({ slug: a.slug }));
export const guideParams = guides.map((g) => ({ slug: g.slug }));
export const resourceParams = resources.map((r) => ({ slug: r.slug }));
export const rootParams = rootSlugs.map((slug) => ({ slug }));
