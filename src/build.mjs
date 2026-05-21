import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { site } from "./data/site.mjs";
import { services } from "./data/services.mjs";
import { serviceCities } from "./data/service-cities.mjs";
import { areas } from "./data/areas.mjs";
import { guides } from "./data/guides.mjs";
import { resources, aboutPages, corePages } from "./data/content.mjs";
import { servicePage, areaPage, guidePage, genericPage, indexPage, homePage } from "./templates/pages.mjs";

const ROOT = new URL("../", import.meta.url).pathname;
const out = (p) => ROOT + p;
const written = [];
async function emit(relPath, html, { index = true } = {}) {
  const full = out(relPath);
  const dir = full.substring(0, full.lastIndexOf("/"));
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  await writeFile(full, html, "utf8");
  written.push({ relPath, index });
}

for (const stale of ["residential.html", "commercial.html"]) if (existsSync(out(stale))) await rm(out(stale));

// Home + indexes
await emit("index.html", homePage());
await emit("services.html", indexPage({ kind: "services" }));
await emit("areas-served.html", indexPage({ kind: "areas" }));
await emit("guides.html", indexPage({ kind: "guides" }));
await emit("resources.html", indexPage({ kind: "resources" }));

// Services / Areas / Guides
for (const s of services) {
  if (serviceCities[s.slug]) {
    await emit(`services/${s.slug}.html`, servicePage(s, "bradenton"));
    await emit(`services/${s.slug}-sarasota.html`, servicePage(s, "sarasota"));
  } else {
    await emit(`services/${s.slug}.html`, servicePage(s));
  }
}
for (const a of areas) await emit(`areas-served/${a.slug}.html`, areaPage(a));
for (const g of guides) await emit(`guides/${g.slug}.html`, guidePage(g));

// Resources
for (const r of resources) await emit(`resources/${r.slug}.html`, genericPage({ slug: r.slug, label: r.label, title: r.title, metaDesc: r.metaDesc, section: "resources", crumbName: "Resources", content: r.content, related: "guides" }));

// About pages
for (const p of aboutPages) await emit(`${p.slug}.html`, genericPage({ slug: p.slug, label: p.label, title: p.title, metaDesc: p.metaDesc, content: p.content, related: "services" }));

// Core / footer pages (content from corePages)
const core = (slug) => corePages.find((p) => p.slug === slug) || {};
const blog = core("blog");
await emit("blog.html", genericPage({ slug: "blog", label: "Moving Tips & Guides", title: blog.title, metaDesc: blog.metaDesc, content: blog.content, relatedItems: guides.map((g) => ({ label: g.label, href: `/guides/${g.slug}` })), relatedTitle: "Our moving guides" }));
const reviews = core("reviews");
await emit("reviews.html", genericPage({ slug: "reviews", label: "Customer Reviews", title: reviews.title, metaDesc: reviews.metaDesc, content: reviews.content, related: "services" }));
await emit("contact.html", genericPage({ slug: "contact", label: "Get a Free Quote", title: "Contact Martin's Moving | Free Moving Quote", metaDesc: `Get a free moving quote from Martin's Moving. Serving ${site.serviceRegion}. Call ${site.phone} or use the form.`, related: "services", qa: `Reach Martin's Moving at ${site.phone} or ${site.email}. Hours ${site.hoursDisplay}, plus 24/7 emergency service across ${site.serviceRegion}.`, bodyIntro: [`Call ${site.phone} for the fastest quote, or email ${site.email}. We serve ${site.serviceRegion}, ${site.hoursDisplay}, with 24/7 emergency service.`, "Use the quote form to tell us your pickup, destination, home or office size, and preferred date, and we will send a written estimate."] }));
const priv = core("privacy-policy");
await emit("privacy-policy.html", genericPage({ slug: "privacy-policy", label: "Privacy Policy", title: priv.title, metaDesc: priv.metaDesc, content: priv.content, robots: "noindex,follow", related: "services" }), { index: false });
const acc = core("accessibility");
await emit("accessibility.html", genericPage({ slug: "accessibility", label: "Accessibility Statement", title: acc.title, metaDesc: acc.metaDesc, content: acc.content, related: "services" }));

// 404
await emit("404.html", genericPage({ slug: "404", label: "Page not found", title: "Page Not Found | Martin's Moving", metaDesc: "That page could not be found. Explore our moving services and areas served.", robots: "noindex,follow", bodyIntro: ["The page you were looking for is not here. Use the menu, or jump to our services and areas below.", `Need a quote now? Call ${site.phone}.`], related: "services" }), { index: false });

// sitemap.xml
const urls = written.filter((w) => w.index).map((w) => {
  let loc = "/" + w.relPath.replace(/index\.html$/, "").replace(/\.html$/, "");
  if (loc !== "/") loc = loc.replace(/\/$/, "");
  return `${site.domain}${loc === "" ? "/" : loc}`;
});
await emit("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`, { index: false });
await emit("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`, { index: false });

// llms.txt (machine-readable summary for answer engines / AEO)
const llms = `# Martin's Moving
> ${site.positioning}. Family-owned moving company serving ${site.serviceRegion}, ${site.address.regionName} since ${site.foundedYear}. Licensed, bonded, and insured (Florida Mover Registration #${site.licenses.flIm}).

Phone: ${site.phone}
Email: ${site.email}
Hours: ${site.hoursDisplay} (24/7 emergency service)
Service area: ${site.serviceRegion}
Awards: ${site.awards.join(", ")}

## Moving services
Each service has a Bradenton page and a Sarasota page.
${services.map((s) => serviceCities[s.slug]
  ? `- [${s.label} in Bradenton](${site.domain}/services/${s.slug})\n- [${s.label} in Sarasota](${site.domain}/services/${s.slug}-sarasota)`
  : `- [${s.label}](${site.domain}/services/${s.slug})`).join("\n")}

## Areas served
${areas.map((a) => `- [${a.name} Movers](${site.domain}/areas-served/${a.slug})`).join("\n")}

## Guides
${guides.map((g) => `- [${g.label}](${site.domain}/guides/${g.slug})`).join("\n")}

## Contact
- [Get a free quote](${site.domain}/contact)
`;
await emit("llms.txt", llms, { index: false });

console.log(`Generated ${written.length} files.`);
