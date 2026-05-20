import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { site } from "./data/site.mjs";
import { services } from "./data/services.mjs";
import { areas } from "./data/areas.mjs";
import { guides } from "./data/guides.mjs";
import { resources, aboutPages, corePages } from "./data/content.mjs";
import { servicePage, areaPage, guidePage, genericPage, indexPage, homePage } from "./templates/pages.mjs";

const ROOT = new URL("../", import.meta.url).pathname; // repo root
const out = (p) => ROOT + p;
const written = [];

async function emit(relPath, html, { index = true } = {}) {
  const full = out(relPath);
  const dir = full.substring(0, full.lastIndexOf("/"));
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  await writeFile(full, html, "utf8");
  written.push({ relPath, index });
}

// Clean stale standalone pages now replaced by /services/*
for (const stale of ["residential.html", "commercial.html"]) {
  if (existsSync(out(stale))) await rm(out(stale));
}

// Home + section indexes
await emit("index.html", homePage());
await emit("services.html", indexPage({ kind: "services" }));
await emit("areas-served.html", indexPage({ kind: "areas" }));
await emit("guides.html", indexPage({ kind: "guides" }));
await emit("resources.html", indexPage({ kind: "resources" }));

// Services
for (const s of services) await emit(`services/${s.slug}.html`, servicePage(s));
// Areas
for (const a of areas) await emit(`areas-served/${a.slug}.html`, areaPage(a));
// Guides
for (const g of guides) await emit(`guides/${g.slug}.html`, guidePage(g));
// Resources
for (const r of resources) await emit(`resources/${r.slug}.html`, genericPage({ slug: r.slug, label: r.label, title: r.title, metaDesc: r.metaDesc, section: "resources", crumbName: "Resources" }));

// About dropdown pages (top-level slugs)
const aboutIntro = {
  about: [
    `Martin's Moving is a family owned and operated moving company serving ${site.serviceRegion} since ${site.foundedYear}. We built our name on careful work and honest prices, one move at a time.`,
    `We are licensed, bonded, and insured. When you book us you get the same crew from the truck to the last box, not a rotating cast of subcontractors. Call ${site.phone} for a free estimate.`,
  ],
  "what-to-expect": [
    `From the first call to the final walkthrough, here is how a move with Martin's Moving goes: a free estimate, a written quote that holds, a careful crew on the day, and a walkthrough together before the truck leaves.`,
    `No surprise surcharges, no day labor. Call ${site.phone} and we will walk you through your specific move.`,
  ],
  careers: [
    `We are always looking for careful, reliable movers in the ${site.address.city} and Sarasota area. If you show up on time and treat people's homes with respect, we want to hear from you.`,
    `Call ${site.phone} or email ${site.email} to ask about open positions.`,
  ],
};
for (const p of aboutPages) await emit(`${p.slug}.html`, genericPage({ slug: p.slug, label: p.label, title: p.title, metaDesc: p.metaDesc, bodyIntro: aboutIntro[p.slug] }));

// Core / footer pages
await emit("blog.html", genericPage({ slug: "blog", label: "Moving Tips Blog", title: "Moving Tips Blog | Martin's Moving", metaDesc: "Moving tips and local guides from Martin's Moving in Bradenton and Sarasota.", bodyIntro: ["Moving tips, local guides, and advice from our crew. New posts are on the way.", `In the meantime, our guides cover most of what you need. Call ${site.phone} with any question.`] }));
await emit("reviews.html", genericPage({ slug: "reviews", label: "Customer Reviews", title: "Reviews | Martin's Moving", metaDesc: "What Bradenton and Sarasota customers say about moving with Martin's Moving.", bodyIntro: [`Customers across ${site.serviceRegion} trust Martin's Moving. Reviews are being added here.`, `Want to share your experience? Call ${site.phone}.`] }));
await emit("contact.html", genericPage({ slug: "contact", label: "Get a Free Quote", title: "Contact Martin's Moving | Free Moving Quote", metaDesc: `Get a free moving quote from Martin's Moving. Serving ${site.serviceRegion}. Call ${site.phone} or email us today.`, bodyIntro: [`Call ${site.phone} for the fastest quote, or email ${site.email}. We serve ${site.serviceRegion}.`, "Tell us your pickup and destination, your home or office size, and your preferred date, and we will send a written estimate."] }));
await emit("privacy-policy.html", genericPage({ slug: "privacy-policy", label: "Privacy Policy", title: "Privacy Policy | Martin's Moving", metaDesc: "How Martin's Moving collects and uses your information.", robots: "noindex,follow", bodyIntro: ["This page describes how Martin's Moving handles the information you share when you request a quote. Full policy text to be finalized.", `Questions? Call ${site.phone}.`] }), { index: false });
await emit("accessibility.html", genericPage({ slug: "accessibility", label: "Accessibility Statement", title: "Accessibility | Martin's Moving", metaDesc: "Martin's Moving is committed to keeping this site accessible to everyone.", bodyIntro: ["Martin's Moving is committed to keeping this website usable for everyone. If you have trouble accessing anything here, let us know.", `Call ${site.phone} and we will help directly.`] }));

// sitemap.xml
const urls = written.filter((w) => w.index).map((w) => {
  let loc = "/" + w.relPath.replace(/index\.html$/, "").replace(/\.html$/, "");
  if (loc !== "/") loc = loc.replace(/\/$/, "");
  return `${site.domain}${loc === "" ? "/" : loc}`;
});
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`;
await emit("sitemap.xml", sitemap, { index: false });
await emit("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`, { index: false });

console.log(`Generated ${written.length} files.`);
console.log("Pages by section:", {
  services: services.length, areas: areas.length, guides: guides.length, resources: resources.length, about: aboutPages.length,
});
