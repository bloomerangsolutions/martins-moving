import { page, hero, quoteForm, site } from "./layout.mjs";
import { movingCompanySchema, serviceSchema, faqSchema, breadcrumbSchema, reviewSchema, speakableSchema, articleSchema } from "./schema.mjs";
import { services } from "../data/services.mjs";
import { areas } from "../data/areas.mjs";
import { guides } from "../data/guides.mjs";
import { resources } from "../data/content.mjs";

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const R = site.serviceRegion;
const Y = site.foundedYear;
const realServices = services.filter((s) => s.real);

// ---------- shared layout helpers ----------
const wrap = (inner, cls = "") => `<section class="py-section-gap px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto ${cls}">${inner}</section>`;
const prose = (paras) => paras.map((p) => `<p class="font-body-lg text-body-lg text-on-surface-variant mb-4 max-w-3xl">${esc(p)}</p>`).join("");

const slugify = (s = "") => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// Rich prose sections (resources, about, and the guide article body)
function contentSections(sections, { anchored = false } = {}) {
  if (!sections || !sections.length) return "";
  return sections
    .map((s) => {
      const id = anchored ? ` id="${slugify(s.h)}"` : "";
      return `<section${id} class="mb-9 max-w-3xl scroll-mt-28"><h2 class="font-headline-md text-headline-md text-primary mb-3">${esc(s.h)}</h2><p class="font-body-lg text-body-lg text-on-surface-variant">${esc(s.body)}</p></section>`;
    })
    .join("");
}
// Sticky table of contents for long articles (desktop only)
function tocList(sections) {
  if (!sections || sections.length < 3) return "";
  return `<nav aria-label="On this page" class="hidden lg:block sticky top-28 self-start"><p class="font-label-bold text-label-bold uppercase tracking-widest text-on-surface-variant/70 mb-3">On this page</p><ul class="space-y-2 border-l-2 border-outline-variant/40 pl-4">${sections
    .map((s) => `<li><a class="block text-body-md text-on-surface-variant hover:text-primary hover:border-primary transition-colors" href="#${slugify(s.h)}">${esc(s.h)}</a></li>`)
    .join("")}</ul></nav>`;
}
// E-E-A-T byline for guides
function articleMeta(readTime) {
  const item = (icon, text, tint = "primary") => `<span class="inline-flex items-center gap-1.5"><span class="material-symbols-outlined text-base text-${tint}">${icon}</span>${esc(text)}</span>`;
  return `<div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-on-surface-variant mb-8 max-w-3xl pb-6 border-b border-outline-variant/40">${item("schedule", readTime || "Quick read", "action-orange")}${item("verified_user", "By the Martin's Moving crew")}${item("location_on", `Serving ${R} since ${Y}`)}</div>`;
}

// AEO: concise, citable answer block. Phone renders as a button + stays clickable in the text.
// mascot:true shows the Martin's snail running in on the right (homepage).
const SNAIL = "/images/snail.png";
function linkifyPhone(escapedText) {
  const p = esc(site.phone);
  return escapedText.split(p).join(`<a href="${site.phoneHref}" class="font-bold text-primary underline decoration-action-orange/70 underline-offset-2 hover:text-action-orange">${p}</a>`);
}
function callButton() {
  return `<a href="${site.phoneHref}" class="inline-flex items-center gap-2 bg-action-orange text-white px-6 py-3 rounded-xl font-headline-md text-body-md shadow-md hover:brightness-110 hover:-translate-y-0.5 transition-all whitespace-nowrap"><span class="material-symbols-outlined">call</span>Call ${esc(site.phone)}</a>`;
}
function quickAnswer(text) {
  return `<div class="quick-answer glass-card rounded-2xl border-l-4 border-action-orange p-6 md:p-8 mb-10 max-w-3xl">
    <p class="font-label-bold text-label-bold uppercase tracking-wider text-primary mb-2">In short</p>
    <p class="font-body-lg text-body-lg text-on-surface mb-5">${linkifyPhone(esc(text))}</p>
    ${callButton()}</div>`;
}

function bullets(title, items) {
  return `<div class="mt-10">${title ? `<h2 class="font-headline-md text-headline-md text-primary mb-5">${esc(title)}</h2>` : ""}
    <ul class="grid sm:grid-cols-2 gap-4 max-w-4xl">${items.map((b) => `<li class="flex gap-3"><span class="material-symbols-outlined text-primary">check_circle</span><span class="text-body-md text-on-surface-variant">${esc(b)}</span></li>`).join("")}</ul></div>`;
}
function steps(title, arr) {
  return `<div class="mt-12"><h2 class="font-headline-md text-headline-md text-primary mb-6">${esc(title)}</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-gutter">${arr.map((s, i) => `<div class="bg-white rounded-2xl p-6 border-2 border-transparent hover:border-primary hover:shadow-xl transition-all"><div class="text-action-orange font-display-lg text-3xl font-extrabold">${i + 1}</div><h3 class="font-headline-md text-body-lg text-primary mt-1 mb-1">${esc(s.step)}</h3><p class="text-body-md text-on-surface-variant">${esc(s.text)}</p></div>`).join("")}</div></div>`;
}
function faqBlock(faqs) {
  if (!faqs || !faqs.length) return "";
  return `<div class="faq-block mt-14 max-w-3xl"><h2 class="font-headline-lg text-headline-lg text-primary mb-6">Frequently asked questions</h2>
    <div class="space-y-3">${faqs.map((f) => `<details class="bg-white rounded-xl border border-outline-variant/40 p-5"><summary class="font-headline-md text-body-lg text-on-surface cursor-pointer flex justify-between gap-4 items-center">${esc(f.q)}<span class="material-symbols-outlined dd-chev text-primary transition-transform">expand_more</span></summary><p class="text-body-md text-on-surface-variant mt-3">${esc(f.a)}</p></details>`).join("")}</div></div>`;
}
// reciprocal/contextual link cards
function relatedCards(title, items, icon = "arrow_forward") {
  if (!items.length) return "";
  return `<div class="mt-14"><h2 class="font-headline-md text-headline-md text-primary mb-5">${esc(title)}</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-gutter">${items.map((i) => `<a class="group bg-white rounded-2xl p-5 border-2 border-transparent hover:border-primary hover:shadow-xl transition-all flex items-center justify-between gap-2" href="${i.href}"><span class="font-headline-md text-body-md text-primary">${esc(i.label)}</span><span class="material-symbols-outlined text-action-orange group-hover:translate-x-1 transition-transform">${icon}</span></a>`).join("")}</div></div>`;
}
function recognitionBar() {
  const items = [
    { icon: "verified", label: site.awards[0] },
    { icon: "verified", label: site.awards[1] },
    { icon: "award_star", label: site.awards[2] },
    { icon: "security", label: `Licensed & Insured · FL #${site.licenses.flIm}` },
  ];
  return `<section class="py-16 bg-surface-container-low overflow-hidden"><div class="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
    <div class="flex flex-col md:flex-row items-center justify-between gap-8">
      <h4 class="font-label-bold text-label-bold tracking-widest text-primary shrink-0">LOCAL RECOGNITION</h4>
      <div class="flex flex-wrap justify-center items-center gap-10 grayscale hover:grayscale-0 transition-all duration-700">
        ${items.map((i) => `<div class="flex flex-col items-center gap-1"><span class="material-symbols-outlined text-4xl ${i.icon === "security" ? "text-primary" : "text-tertiary"}">${i.icon}</span><span class="font-headline-md text-caption text-on-surface text-center">${esc(i.label)}</span></div>`).join("")}
      </div></div></div></section>`;
}
function ctaBand() {
  return `<section class="py-section-gap px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
    <div class="bg-primary-container rounded-3xl p-10 md:p-14 relative overflow-hidden border-4 border-primary text-center">
      <div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"><span class="material-symbols-outlined text-[300px] text-white">local_shipping</span></div>
      <div class="relative z-10">
        <h2 class="font-headline-lg text-headline-lg text-white mb-3">Ready for a smooth move?</h2>
        <p class="font-body-lg text-white/85 mb-8 max-w-xl mx-auto">Get a free, no-pressure quote from a local crew that has served ${esc(R)} since ${esc(Y)}.</p>
        <div class="flex flex-wrap gap-4 justify-center">
          <a class="bg-action-orange text-white px-8 py-4 rounded-xl font-headline-md text-body-lg hover:brightness-110 hover:-translate-y-1 transition-all shadow-lg" href="/contact">Get a free estimate</a>
          <a class="border-2 border-white text-white px-8 py-4 rounded-xl font-headline-md text-body-lg hover:bg-white hover:text-primary transition-all" href="${site.phoneHref}">Call ${esc(site.phone)}</a>
        </div></div></div></section>`;
}

// reciprocal helpers
const svcCard = (s) => ({ label: s.label, href: `/services/${s.slug}` });
const areaCard = (a) => ({ label: `${a.name}`, href: `/areas-served/${a.slug}` });
function relatedServices(slug, n = 4) {
  const pool = realServices.filter((s) => s.slug !== slug);
  return pool.slice(0, n).map(svcCard);
}
function nearbyAreas(area, n = 4) {
  const same = areas.filter((a) => a.county === area.county && a.slug !== area.slug);
  const other = areas.filter((a) => a.county !== area.county && a.slug !== area.slug);
  return [...same, ...other].slice(0, n).map(areaCard);
}

// ---------- GDS layout components (two-col + sticky rail, stat bars, reciprocal linking) ----------
// Stat trust bar under the hero
function statBar() {
  const stats = [
    { num: site.yearsInBusiness, label: "Years in business" },
    { num: Y, label: "Family owned since" },
    { num: "IM595", label: "FL licensed mover" },
    { num: "24/7", label: "Emergency service" },
    { num: "Free", label: "Written estimates" },
  ];
  return `<section class="bg-primary text-on-primary"><div class="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto grid grid-cols-2 md:grid-cols-5 divide-x divide-white/10">${stats
    .map((s) => `<div class="py-7 px-3 text-center"><div class="font-display-lg text-2xl md:text-3xl font-extrabold text-tertiary-fixed leading-none">${esc(s.num)}</div><div class="font-label-bold text-caption uppercase tracking-wider text-white/70 mt-2">${esc(s.label)}</div></div>`)
    .join("")}</div></section>`;
}
// In-content stat boxes
function statRow(items) {
  return `<div class="grid grid-cols-3 gap-4 my-10 max-w-3xl">${items
    .map((s) => `<div class="bg-surface-container-low rounded-2xl p-5 text-center border border-outline-variant/30"><div class="font-display-lg text-2xl font-extrabold text-primary leading-none">${esc(s.num)}</div><div class="text-caption text-on-surface-variant mt-1">${esc(s.label)}</div></div>`)
    .join("")}</div>`;
}
// Accent callout
function highlightBox(text) {
  return `<div class="my-8 bg-tertiary/10 border-l-4 border-tertiary rounded-r-xl p-6 max-w-3xl"><p class="text-body-md text-on-surface">${esc(text)}</p></div>`;
}
// Mid-page CTA band
function midCta(headline) {
  return `<div class="my-12 bg-primary-container rounded-3xl p-8 md:p-10 text-center border-2 border-primary max-w-3xl">
    <h2 class="font-headline-md text-headline-md text-white mb-2">${esc(headline)}</h2>
    <p class="text-white/85 mb-6">Free written estimate, no pressure. Family owned since ${esc(Y)}.</p>
    <div class="flex flex-wrap gap-3 justify-center">
      <a class="bg-action-orange text-white px-7 py-3.5 rounded-xl font-headline-md hover:brightness-110 transition-all" href="/contact">Get a free estimate</a>
      <a class="border-2 border-white text-white px-7 py-3.5 rounded-xl font-headline-md hover:bg-white hover:text-primary transition-all" href="${site.phoneHref}">Call ${esc(site.phone)}</a>
    </div></div>`;
}
// Dense reciprocal text-link grid
function reciprocalGrid(title, items) {
  if (!items.length) return "";
  return `<div class="mt-10"><h2 class="font-headline-md text-headline-md text-primary mb-4">${esc(title)}</h2><div class="flex flex-wrap gap-2">${items
    .map((i) => `<a class="inline-flex items-center px-4 py-2 bg-surface-container-low text-primary rounded-lg text-body-md border border-outline-variant/30 hover:bg-primary hover:text-white transition-colors" href="${i.href}">${esc(i.label)}</a>`)
    .join("")}</div></div>`;
}
// ---- sticky rail cards ----
function railGuides(list) {
  const picks = (list || guides).slice(0, 3);
  return `<div class="bg-white rounded-2xl border border-outline-variant/30 p-6 shadow-sm"><p class="font-label-bold text-label-bold uppercase tracking-widest text-action-orange mb-4">From our moving guides</p><div class="space-y-4">${picks
    .map((g) => `<a class="block group" href="/guides/${g.slug}"><h4 class="font-headline-md text-body-md text-primary group-hover:text-action-orange transition-colors leading-snug">${esc(g.label)}</h4><p class="text-caption text-on-surface-variant mt-1">${esc(g.summary || "")}</p></a>`)
    .join("")}</div><a class="mt-5 inline-flex items-center gap-1 text-primary font-label-bold text-label-bold uppercase tracking-wider hover:gap-2 transition-all" href="/blog">All guides &amp; blog <span class="material-symbols-outlined text-base">arrow_forward</span></a></div>`;
}
function railTrust() {
  const rows = [
    { icon: "verified_user", t: `Licensed FL mover #${site.licenses.flIm}` },
    { icon: "family_restroom", t: `Family owned since ${Y}` },
    { icon: "award_star", t: site.awards[0] },
    { icon: "emergency", t: "24/7 emergency service" },
  ];
  return `<div class="bg-primary text-on-primary rounded-2xl p-6 shadow-sm"><p class="font-label-bold text-label-bold uppercase tracking-widest text-tertiary-fixed mb-4">Why Martin's Moving</p><ul class="space-y-3">${rows
    .map((r) => `<li class="flex items-center gap-3 text-body-md"><span class="material-symbols-outlined text-tertiary-fixed">${r.icon}</span><span>${esc(r.t)}</span></li>`)
    .join("")}</ul><a class="mt-5 block text-center bg-action-orange text-white py-3 rounded-lg font-label-bold hover:brightness-110 transition-all" href="${site.phoneHref}">Call ${esc(site.phone)}</a></div>`;
}
function railLinks(title, items, icon = "chevron_right") {
  return `<div class="bg-white rounded-2xl border border-outline-variant/30 p-6 shadow-sm"><p class="font-label-bold text-label-bold uppercase tracking-widest text-action-orange mb-4">${esc(title)}</p><ul class="space-y-1.5">${items
    .map((i) => `<li><a class="flex items-center gap-2 text-body-md text-on-surface hover:text-primary transition-colors" href="${i.href}"><span class="material-symbols-outlined text-base text-primary">${icon}</span>${esc(i.label)}</a></li>`)
    .join("")}</ul></div>`;
}
function railServing(area) {
  return `<div class="bg-white rounded-2xl border border-outline-variant/30 p-6 shadow-sm"><div class="flex items-center gap-2 mb-2"><span class="material-symbols-outlined text-primary">location_on</span><p class="font-label-bold text-label-bold uppercase tracking-widest text-action-orange">Serving ${esc(area.name)}</p></div><p class="text-body-md text-on-surface-variant mb-3">Local and long-distance moving across ${esc(area.name)}, ${esc(area.county)}.</p><a class="text-primary font-label-bold hover:text-action-orange" href="${site.phoneHref}">${esc(site.phone)}</a></div>`;
}
function tocCard(sections) {
  if (!sections || sections.length < 3) return "";
  return `<div class="bg-white rounded-2xl border border-outline-variant/30 p-6 shadow-sm"><p class="font-label-bold text-label-bold uppercase tracking-widest text-action-orange mb-3">On this page</p><ul class="space-y-2">${sections
    .map((s) => `<li><a class="block text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#${slugify(s.h)}">${esc(s.h)}</a></li>`)
    .join("")}</ul></div>`;
}
// Two-column section: main content + sticky right rail
function twoCol(main, rail) {
  return `<section class="py-section-gap px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto"><div class="grid lg:grid-cols-[1fr_350px] gap-10 items-start"><div class="min-w-0">${main}</div><aside class="lg:sticky lg:top-28 space-y-6">${rail}</aside></div></section>`;
}

// ---------- builders ----------
export function servicePage(svc) {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Moving Services", href: "/services" }, { name: svc.label, href: `/services/${svc.slug}` }];
  const c = svc.content;
  const intro = c?.intro || [
    `Martin's Moving handles ${svc.label.toLowerCase()} across ${R}. We have moved homes and businesses here since ${Y}, and you get the same crew start to finish, careful handling, and a written quote that holds on the day.`,
    `Tell us what you are moving and where it is going, and we will give you a clear estimate up front. No surprise surcharges and no day-labor crews, just licensed and insured movers who do this every day.`,
  ];
  const faqs = c?.faqs || [
    { q: `Do you offer ${svc.label.toLowerCase()} in my area?`, a: `We serve ${R}. Call ${site.phone} with your pickup and destination and we will confirm right away.` },
    { q: "How do you price the job?", a: "We give you a written estimate before we lift anything, so you know the price up front. It does not change unless you add to the job." },
    { q: "Are you licensed and insured?", a: `Yes. We are licensed, bonded, and insured (Florida Mover Registration #${site.licenses.flIm}) and we show up in marked trucks with a professional crew.` },
  ];
  const qa = `Martin's Moving provides ${svc.label.toLowerCase()} across ${R}. Family owned since ${Y}, licensed and insured (FL Mover Reg #${site.licenses.flIm}), with free written estimates. Call ${site.phone}.`;
  let body = c?.bullets ? bullets(c.bulletsTitle, c.bullets) : bullets("What's included", [
    "A walkthrough so the quote matches the real job, not a phone guess.",
    "Furniture wrapped and protected before it leaves the room.",
    "Disassembly and reassembly of standard furniture.",
    "Floor and doorway protection at both ends.",
  ]);
  body += c?.process ? steps(c.processTitle, c.process) : "";
  const proposedNote = svc.real ? "" : "<!-- PROPOSED SERVICE: confirm Martin's Moving fulfills this before publishing -->";
  const guideLink = guides[0];
  const main = `${quickAnswer(qa)}${prose(intro)}${body}
${statRow([{ num: site.yearsInBusiness, label: "Years moving homes" }, { num: "IM595", label: "FL licensed mover" }, { num: "24/7", label: "Emergency service" }])}
${highlightBox(`Every ${svc.label.toLowerCase()} with Martin's Moving includes a written quote that holds on moving day, the same crew from the first box to the last, and licensed, insured handling. No day labor, no surprise surcharges.`)}
${midCta(`Need ${svc.label.toLowerCase()} in the ${site.address.city} area?`)}
${reciprocalGrid("Areas we serve", areas.map(areaCard))}
${reciprocalGrid("Related moving services", relatedServices(svc.slug, 10))}
<p class="mt-10 text-body-md text-on-surface-variant max-w-3xl">Planning ahead? Read our <a class="text-primary underline hover:text-action-orange" href="/guides/${guideLink.slug}">${esc(guideLink.label.toLowerCase())}</a>.</p>
${faqBlock(faqs)}`;
  const rail = `${quoteForm({ title: "Get a free quote", pageName: svc.label })}${railGuides()}${railTrust()}${railLinks("Popular services", realServices.slice(0, 7).map(svcCard), "local_shipping")}`;
  const bodyHtml = `${proposedNote}${hero({ badge: "Moving Services", h1: `${svc.label} in ${site.address.city} & Sarasota`, sub: svc.summary || `Professional ${svc.label.toLowerCase()} across ${R}.`, crumbs, pageName: svc.label, primaryCta: { label: "Get a free estimate", href: "/contact" }, secondaryCta: { label: "All services", href: "/services" } })}
${statBar()}
${twoCol(main, rail)}
${ctaBand()}`;
  const desc = (svc.metaDesc || `${svc.label} across ${R} from Martin's Moving. Licensed, insured, honest quotes. Call ${site.phone} for a free estimate.`).slice(0, 158);
  return page({
    title: svc.title || `${svc.label} | Martin's Moving`,
    description: desc,
    canonicalPath: `/services/${svc.slug}`,
    jsonLd: [movingCompanySchema(), serviceSchema({ name: svc.label, description: desc }), faqSchema(faqs), breadcrumbSchema(crumbs), speakableSchema(`/services/${svc.slug}`)],
    bodyHtml,
  });
}

export function areaPage(area) {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Areas Served", href: "/areas-served" }, { name: area.name, href: `/areas-served/${area.slug}` }];
  const c = area.content;
  const intro = c?.intro || [
    `Looking for movers in ${area.name}? Martin's Moving serves ${area.name} and the rest of ${area.county} with local and long-distance moves for homes, condos, and offices.`,
    `You get a written flat quote, a crew that protects your floors and furniture, and a company that has worked ${R} since ${Y}. Call ${site.phone} for a free estimate.`,
  ];
  const faqs = c?.faqs
    ? [...c.faqs, { q: "Is Martin's Moving licensed and insured?", a: `Yes. We are a licensed Florida mover, registration #${site.licenses.flIm}, fully insured, and family owned since ${Y}.` }]
    : [
        { q: `Do you move within ${area.name}?`, a: `Yes. We handle local moves inside ${area.name} and moves between ${area.name} and anywhere in ${R}.` },
        { q: "How far ahead should I book?", a: "Two to three weeks in the winter season, about a week off season. Earlier is safer for weekend dates." },
        { q: "Are you licensed and insured?", a: `Yes, Florida Mover Registration #${site.licenses.flIm}, fully insured.` },
      ];
  const qa = `Martin's Moving is a licensed, family-owned mover serving ${area.name} in ${area.county}. We handle residential, commercial, and local moves with free written estimates. Call ${site.phone}.`;
  const neighborhoodHtml = area.neighborhoods ? bullets(c?.localTitle || `Parts of ${area.name} we move`, area.neighborhoods) : "";
  const localNoteHtml = c?.localNote ? `<div class="mt-8 max-w-3xl bg-surface-container-low rounded-2xl p-6 border-l-4 border-primary flex gap-4"><span class="material-symbols-outlined text-primary">map</span><p class="text-body-md text-on-surface-variant">${esc(c.localNote)}</p></div>` : "";
  const main = `${quickAnswer(qa)}${prose(intro)}${neighborhoodHtml}${localNoteHtml}
${statRow([{ num: site.yearsInBusiness, label: "Years serving the area" }, { num: "IM595", label: "FL licensed mover" }, { num: "24/7", label: "Emergency service" }])}
${reciprocalGrid(`Our moving services in ${area.name}`, realServices.map(svcCard))}
${highlightBox(`Martin's Moving has served ${area.county} since ${Y}. On every ${area.name} move you get the same crew start to finish, a written quote that holds, and licensed, insured handling.`)}
${midCta(`Looking for movers in ${area.name}?`)}
${reciprocalGrid("Nearby areas we serve", nearbyAreas(area, 8))}
${reciprocalGrid("All areas we serve", areas.filter((a) => a.slug !== area.slug).map(areaCard))}
<p class="mt-10 text-body-md text-on-surface-variant max-w-3xl">Planning your ${area.name} move? Start with our <a class="text-primary underline hover:text-action-orange" href="/guides/${guides[0].slug}">${esc(guides[0].label.toLowerCase())}</a>.</p>
${faqBlock(faqs)}`;
  const rail = `${quoteForm({ title: `Free ${area.name} quote`, pageName: `${area.name} Movers` })}${railServing(area)}${railGuides()}${railTrust()}`;
  const bodyHtml = `${hero({ badge: "Areas Served", h1: `${area.name} Movers`, sub: `Local and long-distance moving in ${area.name}, ${area.county}.`, crumbs, pageName: `${area.name} Movers`, primaryCta: { label: "Get a free estimate", href: "/contact" }, secondaryCta: { label: "All areas", href: "/areas-served" } })}
${statBar()}
${twoCol(main, rail)}
${ctaBand()}`;
  const desc = (area.metaDesc || `Movers in ${area.name}, ${site.address.regionName}. Martin's Moving handles homes and offices across ${area.county}. Free quote: ${site.phone}.`).slice(0, 158);
  return page({
    title: area.title || `${area.name} Movers | Martin's Moving`,
    description: desc,
    canonicalPath: `/areas-served/${area.slug}`,
    jsonLd: [movingCompanySchema(`${area.name}, ${area.county}`), serviceSchema({ name: "Moving services", description: desc, areaName: area.name }), faqSchema(faqs), breadcrumbSchema(crumbs), speakableSchema(`/areas-served/${area.slug}`)],
    bodyHtml,
  });
}

export function guidePage(g) {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Moving Guides", href: "/guides" }, { name: g.label, href: `/guides/${g.slug}` }];
  const c = g.content;
  const intro = c?.intro || [`${g.summary || g.label + " for the " + R + " area."}`, `Martin's Moving built this from real moves we have done since ${Y}. To hand the whole thing off, call ${site.phone} for a free quote.`];
  const faqs = c?.faqs || [
    { q: "How early should I book a mover?", a: "Two to three weeks in season, about a week off season. Earlier is safer for a weekend date." },
    { q: "Does Martin's Moving serve my town?", a: `We cover ${R}. Call ${site.phone} to confirm your pickup and destination.` },
  ];
  const qa = intro[0];
  const proseParas = intro.slice(1); // first paragraph becomes the In short box; avoid duplicating it
  const sections = c?.sections || [];
  const otherGuides = guides.filter((x) => x.slug !== g.slug);
  const main = `${articleMeta(g.readTime)}${quickAnswer(qa)}${prose(proseParas)}${contentSections(sections, { anchored: true })}
${reciprocalGrid("Services that help", realServices.map(svcCard))}
${reciprocalGrid("More moving guides", otherGuides.map((x) => ({ label: x.label, href: `/guides/${x.slug}` })))}
${faqBlock(faqs)}`;
  const rail = `${tocCard(sections)}${quoteForm({ title: "Get a free quote", pageName: g.label })}${railGuides(otherGuides)}${railTrust()}`;
  const bodyHtml = `${hero({ badge: "Moving Guide", h1: g.label, sub: g.summary || "", crumbs, pageName: g.label, primaryCta: { label: "Get a free quote", href: "/contact" }, secondaryCta: { label: "All guides", href: "/guides" } })}
${statBar()}
${twoCol(main, rail)}
${ctaBand()}`;
  const desc = (g.metaDesc || `${g.label} from Martin's Moving, serving ${R}.`).slice(0, 158);
  return page({ title: g.title || `${g.label} | Martin's Moving`, description: desc, canonicalPath: `/guides/${g.slug}`, jsonLd: [breadcrumbSchema(crumbs), faqSchema(faqs), articleSchema(g), speakableSchema(`/guides/${g.slug}`)], bodyHtml });
}

export function genericPage({ slug, label, title, metaDesc, section = "", crumbName, content, bodyIntro, robots, related = "guides", relatedItems, relatedTitle, qa }) {
  const base = section ? `/${section}` : "";
  const canonicalPath = (`${base}/${slug}`).replace(/\/+$/, "") || "/";
  const crumbs = [{ name: "Home", href: "/" }];
  if (section) crumbs.push({ name: crumbName || section, href: base });
  crumbs.push({ name: label, href: canonicalPath });
  const introAll = content?.intro || bodyIntro || [`${label} for ${site.brand}, serving ${R}.`, `Call ${site.phone} for a free quote.`];
  const qaText = qa || introAll[0];
  const proseParas = qa ? introAll : introAll.slice(1); // first paragraph becomes the In short box unless an explicit qa is given
  const sections = content?.sections || [];
  const faqs = content?.faqs || [
    { q: "What areas does Martin's Moving serve?", a: `We serve ${R}, including Bradenton, Sarasota, and the surrounding towns.` },
    { q: "Is Martin's Moving licensed and insured?", a: `Yes. Family owned since ${Y}, licensed, bonded, and insured (FL Mover Reg #${site.licenses.flIm}).` },
  ];
  const relItems = relatedItems || (related === "services" ? realServices.map(svcCard) : guides.slice(0, 4).map((g) => ({ label: g.label, href: `/guides/${g.slug}` })));
  const relTitle = relatedTitle || (related === "services" ? "Our moving services" : "Helpful guides");
  const main = `${qaText ? quickAnswer(qaText) : ""}${prose(proseParas)}${contentSections(sections)}${reciprocalGrid(relTitle, relItems)}${faqBlock(faqs)}`;
  const rail = `${quoteForm({ title: "Get a free quote", pageName: label })}${railGuides()}${railTrust()}`;
  const bodyHtml = `${hero({ badge: crumbName || "", h1: label, sub: "", crumbs, pageName: label, primaryCta: { label: "Get a free quote", href: "/contact" }, secondaryCta: { label: "Our services", href: "/services" } })}
${statBar()}
${twoCol(main, rail)}
${ctaBand()}`;
  return page({ title: title || `${label} | Martin's Moving`, description: (metaDesc || `${label} from Martin's Moving in ${R}.`).slice(0, 158), canonicalPath, jsonLd: [movingCompanySchema(), breadcrumbSchema(crumbs), faqSchema(faqs), speakableSchema(canonicalPath)], robots, bodyHtml });
}

function richIndexCards(items, icon) {
  return `<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-gutter mt-4">${items
    .map((i) => `<a href="${i.href}" class="group bg-white rounded-2xl p-6 border-2 border-transparent hover:border-primary hover:shadow-xl transition-all flex flex-col">
      <div class="flex items-start justify-between gap-3 mb-2"><h3 class="font-headline-md text-body-lg text-primary">${esc(i.label)}</h3><span class="material-symbols-outlined text-action-orange shrink-0 group-hover:translate-x-1 transition-transform">${icon}</span></div>
      ${i.sub ? `<p class="text-body-md text-on-surface-variant flex-1">${esc(i.sub)}</p>` : ""}
      ${i.meta ? `<p class="mt-3 text-caption text-on-surface-variant inline-flex items-center gap-1"><span class="material-symbols-outlined text-base text-primary">schedule</span>${esc(i.meta)}</p>` : ""}
    </a>`)
    .join("")}</div>`;
}

export function indexPage({ kind }) {
  const shortDesc = (r) => {
    const t = r.content?.intro?.[0] || "";
    return t.length > 120 ? t.slice(0, 117).trimEnd() + "..." : t;
  };
  const map = {
    services: { label: "Moving Services", h1: "Our moving services", sub: `Everything from a studio apartment to a full office relocation across ${R}.`, path: "/services", icon: "local_shipping",
      intro: [`Martin's Moving handles the full range of home and business moves across ${R}. Whatever you are moving, the same careful crews and honest written quotes apply.`],
      items: services.map((s) => ({ label: s.label, href: `/services/${s.slug}`, sub: s.summary || s.content?.intro?.[0]?.slice(0, 110) })) },
    areas: { label: "Areas Served", h1: `Moving services across ${R}`, sub: "Find your town below for local moving help.", path: "/areas-served", icon: "location_on",
      intro: [`We move homes and businesses throughout ${R} and the surrounding communities. Find your town for local details, or call ${site.phone} to confirm your move.`],
      items: areas.map((a) => ({ label: `${a.name}`, href: `/areas-served/${a.slug}`, sub: a.county })) },
    guides: { label: "Moving Guides", h1: "Moving guides", sub: "Free, practical guides written by a crew that moves homes here every day.", path: "/guides", icon: "menu_book",
      intro: [`Real, practical moving guides for the ${R} area, written from thousands of actual moves. Start planning, then call ${site.phone} when you want to hand it off.`],
      items: guides.map((g) => ({ label: g.label, href: `/guides/${g.slug}`, sub: g.summary, meta: g.readTime })) },
    resources: { label: "Resources", h1: "Moving resources", sub: "Tips, forms, and tools to make your move easier.", path: "/resources", icon: "description",
      intro: [`Quick tools and references for your move: packing tips, timelines, forms, and answers to the questions we hear most.`],
      items: resources.map((r) => ({ label: r.label, href: `/resources/${r.slug}`, sub: shortDesc(r) })) },
  }[kind];
  const crumbs = [{ name: "Home", href: "/" }, { name: map.label, href: map.path }];
  const qa = `Martin's Moving offers ${map.items.length} ${kind === "areas" ? "service areas" : kind} across ${R}, family owned since ${Y}. Call ${site.phone} for a free quote.`;
  const bodyHtml = `${hero({ badge: map.label, h1: map.h1, sub: map.sub, crumbs, pageName: map.label })}
${statBar()}
${wrap(`${quickAnswer(qa)}${prose(map.intro)}${richIndexCards(map.items, map.icon)}`)}
${ctaBand()}`;
  return page({ title: `${map.label} | Martin's Moving`, description: `${map.sub} Martin's Moving, ${R}. Call ${site.phone}.`.slice(0, 158), canonicalPath: map.path, jsonLd: [movingCompanySchema(), breadcrumbSchema(crumbs), speakableSchema(map.path)], bodyHtml });
}

// ---------- home: faithful original sections ----------
function whyUs() {
  const cards = [
    { icon: "emergency_home", tint: "primary", title: "24/7 Emergency Services", text: "Ready when you need us most, day or night." },
    { icon: "payments", tint: "action-orange", title: "Price Matching", text: "Premium service at the most competitive rates." },
    { icon: "family_restroom", tint: "tertiary", title: "Family Owned", text: "Personalized attention from our family to yours." },
    { icon: "assignment_turned_in", tint: "primary", title: "Expert Planning", text: "Seamless logistics for a stress-free transition." },
  ];
  return `<section class="py-section-gap px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto"><div class="grid md:grid-cols-2 gap-16 items-center">
    <div>
      <h2 class="font-headline-lg text-headline-lg text-primary mb-6">Why Bradenton trusts Martin's Moving</h2>
      <p class="font-body-lg text-body-lg text-on-surface-variant mb-12">Martin's Moving is the premier choice for reliable, efficient moving across ${esc(R)}. With over two decades of experience, our family-owned company treats your home like our own.</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
        ${cards.map((c) => `<div class="flex items-start gap-4"><div class="bg-${c.tint}/10 p-3 rounded-xl border border-${c.tint}/20"><span class="material-symbols-outlined text-${c.tint} text-3xl">${c.icon}</span></div><div><h3 class="font-headline-md text-body-md text-on-surface mb-1">${c.title}</h3><p class="text-caption text-on-surface-variant">${c.text}</p></div></div>`).join("")}
      </div></div>
    <div class="relative group">
      <div class="absolute -inset-4 bg-primary/5 rounded-[2rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
      <img alt="Martin's Moving team loading a truck in Bradenton" class="relative rounded-2xl shadow-xl w-full h-[500px] object-cover border-4 border-white" src="/images/team.jpg"/>
      <div class="absolute bottom-8 -left-8 glass-card p-6 rounded-xl shadow-lg border-2 border-primary/20 max-w-[200px]"><p class="font-display-lg text-headline-md text-primary leading-none">${esc(site.yearsInBusiness)}</p><p class="font-label-bold text-caption text-on-surface-variant uppercase tracking-tighter">Years of Excellence</p></div>
    </div></div></section>`;
}
function homeServiceCards() {
  const feat = realServices.slice(0, 4);
  const IMG = {
    "residential-moving": "/images/residential.jpg",
    "commercial-moving": "/images/commercial.jpg",
    "local-moving": "/images/local.jpg",
    "interstate-movers": "/images/interstate.jpg",
  };
  return `<section class="py-section-gap bg-surface-container-highest/30"><div class="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
    <div class="text-center mb-16 max-w-2xl mx-auto"><h2 class="font-headline-lg text-headline-lg text-primary mb-4">Precision relocation services</h2><p class="font-body-lg text-body-lg text-on-surface-variant">Tailored moving solutions designed to minimize downtime and maximize peace of mind.</p></div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
      ${feat.map((s) => `<a href="/services/${s.slug}" class="group bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary hover:shadow-xl transition-all duration-300 block">
        <div class="h-44 overflow-hidden relative"><img alt="${esc(s.label)}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${IMG[s.slug] || "/images/hero.jpg"}"/><div class="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors"></div></div>
        <div class="p-6"><h3 class="font-headline-md text-body-lg text-primary mb-2">${esc(s.label)}</h3><p class="text-body-md text-on-surface-variant mb-4">${esc(s.summary || "Handled with precision and care.")}</p><span class="inline-flex items-center text-primary font-label-bold group-hover:gap-3 transition-all">LEARN MORE <span class="material-symbols-outlined ml-1">arrow_forward</span></span></div></a>`).join("")}
    </div></div></section>`;
}
function testimonials() {
  const revs = [
    { stars: 5, text: "5 star, this was the best mover we have ever had. Eric, Tim, and Andrew arrived on time, were efficient and very careful.", name: "Mike M.", tag: "Verified Client" },
    { stars: 5, text: "Tim and his crew moved our piano and multiple larger pieces of furniture. They were fabulous and so efficient.", name: "Sarah K.", tag: "Piano Relocation" },
  ];
  return `<section class="py-section-gap px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
    <div class="grid lg:grid-cols-3 gap-12 items-center">
      <div class="lg:col-span-1">
        <div class="w-16 h-16 bg-action-orange rounded-2xl flex items-center justify-center mb-6 shadow-lg"><span class="material-symbols-outlined text-white text-3xl">reviews</span></div>
        <h2 class="font-headline-lg text-headline-lg text-primary mb-4">Voices of trust</h2>
        <p class="font-body-lg text-body-lg text-on-surface-variant mb-8">We take pride in serving our Bradenton and Sarasota community, one careful move at a time.</p>
        <a class="inline-block bg-primary text-white px-8 py-3 rounded-lg font-label-bold hover:brightness-110 transition-all shadow-md" href="/reviews">READ ALL REVIEWS</a>
      </div>
      <div class="lg:col-span-2 grid md:grid-cols-2 gap-6">${revs.map((r) => `<div class="bg-white p-8 rounded-2xl shadow-lg border border-outline-variant/40 border-t-4 border-t-tertiary"><div class="flex text-tertiary mb-4">${Array(r.stars).fill('<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">star</span>').join("")}</div><p class="italic text-on-surface-variant mb-6">"${esc(r.text)}"</p><div class="flex items-center gap-4"><div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">${esc(r.name.split(" ").map((x) => x[0]).join(""))}</div><div><h3 class="font-bold text-on-surface">${esc(r.name)}</h3><p class="text-caption text-on-surface-variant">${esc(r.tag)}</p></div></div></div>`).join("")}</div>
    </div></section>`;
}

export function homePage() {
  const crumbs = [{ name: "Home", href: "/" }];
  const qa = `Martin's Moving is a family-owned moving company serving ${R} since ${Y}. We offer residential, commercial, local, interstate, packing, piano, and specialty moving. Licensed and insured (FL Mover Reg #${site.licenses.flIm}). Free quotes at ${site.phone}.`;
  const bodyHtml = `${hero({ badge: `Established ${Y}`, h1: `Florida's trusted moving company since ${Y}`, sub: `Expert residential and commercial relocations in ${R}. We turn the chaos of moving into a smooth transition.`, big: true, pageName: "Homepage", primaryCta: { label: "Get a free estimate", href: "/contact" }, secondaryCta: { label: "Our services", href: "/services" } })}
${recognitionBar()}
<div class="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto pt-section-gap">
  <div class="lg:flex lg:items-center lg:gap-10 overflow-hidden">
    <div class="lg:[&>.quick-answer]:mb-0">${quickAnswer(qa)}</div>
    <div class="snail-fly hidden lg:block shrink-0 w-56 xl:w-64 pointer-events-none"><img src="${SNAIL}" alt="Martin's Moving snail mascot carrying a brick house on its shell" class="w-full h-auto drop-shadow-xl" width="256" height="237"/></div>
  </div>
</div>
${whyUs()}
${homeServiceCards()}
${testimonials()}
${ctaBand()}`;
  return page({
    title: `Martin's Moving | Bradenton & Sarasota Movers Since ${Y}`,
    description: `Family owned movers serving ${R} since ${Y}. Residential, commercial, local & long-distance moving. Free quote: ${site.phone}.`.slice(0, 158),
    canonicalPath: "/",
    jsonLd: [movingCompanySchema(), breadcrumbSchema(crumbs), ...reviewSchema(), speakableSchema("/")],
    bodyHtml,
  });
}
