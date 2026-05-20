import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { site } from "./data/site.mjs";
import { services } from "./data/services.mjs";
import { areas } from "./data/areas.mjs";
import { guides } from "./data/guides.mjs";
import { resources, aboutPages } from "./data/content.mjs";
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
for (const s of services) await emit(`services/${s.slug}.html`, servicePage(s));
for (const a of areas) await emit(`areas-served/${a.slug}.html`, areaPage(a));
for (const g of guides) await emit(`guides/${g.slug}.html`, guidePage(g));

// Resources
for (const r of resources) await emit(`resources/${r.slug}.html`, genericPage({ slug: r.slug, label: r.label, title: r.title, metaDesc: r.metaDesc, section: "resources", crumbName: "Resources", related: "guides", qa: `${r.label} from Martin's Moving, serving ${site.serviceRegion}. Call ${site.phone} for help with your move.` }));

// About pages
const aboutIntro = {
  about: [`Martin's Moving is a family owned and operated moving company serving ${site.serviceRegion} since ${site.foundedYear}. We built our name on careful work and honest prices, one move at a time.`, `We are licensed, bonded, and insured (Florida Mover Registration #${site.licenses.flIm}). When you book us you get the same crew from the truck to the last box, not a rotating cast of subcontractors. Call ${site.phone} for a free estimate.`],
  "what-to-expect": [`From the first call to the final walkthrough, here is how a move with Martin's Moving goes: a free estimate, a written quote that holds, a careful crew on the day, and a walkthrough together before the truck leaves.`, `No surprise surcharges, no day labor. Call ${site.phone} and we will walk you through your specific move.`],
  careers: [`We are always looking for careful, reliable movers in the ${site.address.city} and Sarasota area. If you show up on time and treat people's homes with respect, we want to hear from you.`, `Call ${site.phone} or email ${site.email} to ask about open positions.`],
};
for (const p of aboutPages) await emit(`${p.slug}.html`, genericPage({ slug: p.slug, label: p.label, title: p.title, metaDesc: p.metaDesc, bodyIntro: aboutIntro[p.slug], related: "services", qa: `${p.label}: Martin's Moving, family owned since ${site.foundedYear}, serving ${site.serviceRegion}. Licensed and insured (FL Mover Reg #${site.licenses.flIm}). Call ${site.phone}.` }));

// Core / footer pages
await emit("blog.html", genericPage({ slug: "blog", label: "Moving Tips Blog", title: "Moving Tips Blog | Martin's Moving", metaDesc: `Moving tips and local guides from Martin's Moving in ${site.serviceRegion}.`, related: "guides", bodyIntro: ["Moving tips, local guides, and advice from our crew. New posts are on the way.", `In the meantime, our guides cover most of what you need. Call ${site.phone} with any question.`] }));
await emit("reviews.html", genericPage({ slug: "reviews", label: "Customer Reviews", title: "Reviews | Martin's Moving", metaDesc: `What ${site.serviceRegion} customers say about moving with Martin's Moving.`, related: "services", qa: `Customers across ${site.serviceRegion} rate Martin's Moving for on-time, careful, efficient moves. Call ${site.phone} for a free quote.`, bodyIntro: [`Customers across ${site.serviceRegion} trust Martin's Moving for careful, on-time moves. More reviews are being added here.`, `Want to share your experience? Call ${site.phone}.`] }));
await emit("contact.html", genericPage({ slug: "contact", label: "Get a Free Quote", title: "Contact Martin's Moving | Free Moving Quote", metaDesc: `Get a free moving quote from Martin's Moving. Serving ${site.serviceRegion}. Call ${site.phone} or use the form.`, related: "services", qa: `Reach Martin's Moving at ${site.phone} or ${site.email}. Hours ${site.hoursDisplay}, plus 24/7 emergency service across ${site.serviceRegion}.`, bodyIntro: [`Call ${site.phone} for the fastest quote, or email ${site.email}. We serve ${site.serviceRegion}, ${site.hoursDisplay}, with 24/7 emergency service.`, "Use the quote form to tell us your pickup, destination, home or office size, and preferred date, and we will send a written estimate."] }));
await emit("privacy-policy.html", genericPage({ slug: "privacy-policy", label: "Privacy Policy", title: "Privacy Policy | Martin's Moving", metaDesc: "How Martin's Moving collects and uses your information.", robots: "noindex,follow", bodyIntro: ["This page describes how Martin's Moving handles the information you share when you request a quote. Full policy text to be finalized.", `Questions? Call ${site.phone}.`] }), { index: false });
await emit("accessibility.html", genericPage({ slug: "accessibility", label: "Accessibility Statement", title: "Accessibility | Martin's Moving", metaDesc: "Martin's Moving is committed to keeping this site accessible to everyone.", bodyIntro: ["Martin's Moving is committed to keeping this website usable for everyone. If you have trouble accessing anything here, let us know.", `Call ${site.phone} and we will help directly.`] }));

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
${services.filter((s) => s.real).map((s) => `- [${s.label}](${site.domain}/services/${s.slug})`).join("\n")}

## Areas served
${areas.map((a) => `- [${a.name} Movers](${site.domain}/areas-served/${a.slug})`).join("\n")}

## Guides
${guides.map((g) => `- [${g.label}](${site.domain}/guides/${g.slug})`).join("\n")}

## Contact
- [Get a free quote](${site.domain}/contact)
`;
await emit("llms.txt", llms, { index: false });

console.log(`Generated ${written.length} files.`);
