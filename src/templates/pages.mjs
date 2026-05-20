import { page, breadcrumbsHtml, site } from "./layout.mjs";
import { movingCompanySchema, serviceSchema, faqSchema, breadcrumbSchema } from "./schema.mjs";
import { services } from "../data/services.mjs";
import { areas } from "../data/areas.mjs";
import { guides } from "../data/guides.mjs";
import { resources } from "../data/content.mjs";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const R = site.serviceRegion;
const Y = site.foundedYear;

// ---------- shared section helpers ----------
function hero({ eyebrow, h1, sub, crumbs }) {
  return `<section class="bg-primary text-on-primary">
  <div class="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20">
    <div class="mb-4 text-primary-fixed-dim">${breadcrumbsHtml(crumbs).replace(/text-on-surface-variant/g, "text-white/60").replace(/text-on-surface/g, "text-white")}</div>
    ${eyebrow ? `<p class="font-label-bold text-label-bold uppercase tracking-wider text-action-orange mb-3">${esc(eyebrow)}</p>` : ""}
    <h1 class="font-display-lg text-headline-lg-mobile md:text-headline-lg max-w-3xl">${esc(h1)}</h1>
    ${sub ? `<p class="text-body-lg text-white/85 mt-4 max-w-2xl">${esc(sub)}</p>` : ""}
    <div class="flex flex-wrap gap-3 mt-8">
      <a class="bg-action-orange text-white px-6 py-3 rounded-lg font-label-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all" href="/contact">Get a free quote</a>
      <a class="bg-white/10 border border-white/30 text-white px-6 py-3 rounded-lg font-label-bold uppercase tracking-wider hover:bg-white/20 transition-all" href="${site.phoneHref}">Call ${esc(site.phone)}</a>
    </div>
  </div></section>`;
}
const wrap = (inner) => `<div class="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-14 md:py-16">${inner}</div>`;
const prose = (paras) => paras.map((p) => `<p class="text-body-lg text-on-surface-variant mb-4 max-w-3xl">${esc(p)}</p>`).join("");
function bullets(title, items) {
  return `<div class="mt-8">${title ? `<h2 class="font-headline-md text-headline-md text-on-surface mb-4">${esc(title)}</h2>` : ""}
    <ul class="space-y-3 max-w-3xl">${items.map((b) => `<li class="flex gap-3"><span class="material-symbols-outlined text-primary">check_circle</span><span class="text-body-md text-on-surface-variant">${esc(b)}</span></li>`).join("")}</ul></div>`;
}
function steps(title, arr) {
  return `<div class="mt-12"><h2 class="font-headline-md text-headline-md text-on-surface mb-6">${esc(title)}</h2>
    <div class="grid md:grid-cols-2 gap-4">${arr.map((s, i) => `<div class="glass-card rounded-xl p-5"><div class="text-action-orange font-display-lg text-2xl font-extrabold">${i + 1}</div><h3 class="font-headline-md text-lg text-on-surface mt-1">${esc(s.step)}</h3><p class="text-body-md text-on-surface-variant mt-1">${esc(s.text)}</p></div>`).join("")}</div></div>`;
}
function faqBlock(faqs) {
  if (!faqs || !faqs.length) return "";
  return `<div class="mt-12 max-w-3xl"><h2 class="font-headline-md text-headline-md text-on-surface mb-4">Frequently asked questions</h2>
    <div class="divide-y divide-outline-variant/30 border-y border-outline-variant/30">${faqs.map((f) => `<details class="py-4"><summary class="font-label-bold text-on-surface cursor-pointer list-none flex justify-between gap-4">${esc(f.q)}<span class="material-symbols-outlined text-primary">expand_more</span></summary><p class="text-body-md text-on-surface-variant mt-3">${esc(f.a)}</p></details>`).join("")}</div></div>`;
}
function ctaBand() {
  return `<section class="bg-surface-container-low border-t border-outline-variant/30"><div class="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-14 text-center">
    <h2 class="font-display-lg text-headline-lg-mobile text-on-surface">Ready to move?</h2>
    <p class="text-body-lg text-on-surface-variant mt-2 mb-6 max-w-xl mx-auto">Get a free, no-pressure quote from a local crew that has worked ${esc(R)} since ${esc(Y)}.</p>
    <div class="flex flex-wrap gap-3 justify-center">
      <a class="bg-action-orange text-white px-7 py-3 rounded-lg font-label-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all" href="/contact">Get a free quote</a>
      <a class="bg-primary text-white px-7 py-3 rounded-lg font-label-bold uppercase tracking-wider hover:brightness-110 transition-all" href="${site.phoneHref}">Call ${esc(site.phone)}</a>
    </div></div></section>`;
}
function relatedGrid(title, items) {
  return `<div class="mt-12"><h2 class="font-headline-md text-headline-md text-on-surface mb-4">${esc(title)}</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">${items.map((i) => `<a class="block glass-card rounded-lg px-4 py-3 text-body-md text-on-surface hover:text-primary hover:shadow-md transition-all" href="${i.href}">${esc(i.label)}</a>`).join("")}</div></div>`;
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
    { q: `Do you offer ${svc.label.toLowerCase()} in my area?`, a: `We serve ${R}. Call ${site.phone} and tell us your pickup and destination and we will confirm right away.` },
    { q: "How do you price the job?", a: "We give you a written estimate before we lift anything, so you know the price up front. It does not change unless you add to the job." },
    { q: "Are you licensed and insured?", a: "Yes. We are a licensed and insured moving company and we show up in marked trucks with a professional crew." },
  ];
  let body = c?.bullets ? bullets(c.bulletsTitle, c.bullets) : "";
  body += c?.process ? steps(c.processTitle, c.process) : "";
  const areaLinks = areas.slice(0, 8).map((a) => ({ label: `${a.name} Movers`, href: `/areas-served/${a.slug}` }));
  const proposedNote = svc.real ? "" : "<!-- PROPOSED SERVICE: confirm Martin's Moving fulfills this before publishing -->";
  const bodyHtml = `${proposedNote}${hero({ eyebrow: "Moving Services", h1: `${svc.label} in ${site.address.city} & Sarasota`, sub: svc.summary || `Professional ${svc.label.toLowerCase()} across ${R}.`, crumbs })}
${wrap(`${prose(intro)}${body}${relatedGrid("Areas we serve", areaLinks)}${faqBlock(faqs)}`)}${ctaBand()}`;
  const desc = svc.metaDesc || `${svc.label} across ${R} from Martin's Moving. Licensed, insured, honest quotes. Call ${site.phone} for a free estimate.`;
  return page({
    title: svc.title || `${svc.label} | Martin's Moving`,
    description: desc,
    canonicalPath: `/services/${svc.slug}`,
    jsonLd: [movingCompanySchema(), serviceSchema({ name: svc.label, description: desc }), faqSchema(faqs), breadcrumbSchema(crumbs)].filter(Boolean),
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
  const faqs = c?.faqs || [
    { q: `Do you move within ${area.name}?`, a: `Yes. We handle local moves inside ${area.name} and moves between ${area.name} and anywhere in ${R}.` },
    { q: "How far ahead should I book?", a: "Two to three weeks in the winter season, about a week off season. Earlier is safer for weekend dates." },
  ];
  const svcLinks = services.filter((s) => s.real).map((s) => ({ label: s.label, href: `/services/${s.slug}` }));
  const bodyHtml = `${hero({ eyebrow: "Areas Served", h1: `${area.name} Movers`, sub: `Local and long-distance moving in ${area.name}, ${area.county}.`, crumbs })}
${wrap(`${prose(intro)}${area.neighborhoods ? bullets(c?.localTitle || `Areas of ${area.name} we move`, area.neighborhoods) : ""}${relatedGrid("Our moving services", svcLinks)}${faqBlock(faqs)}`)}${ctaBand()}`;
  const desc = area.metaDesc || `Movers in ${area.name}, ${site.address.regionName}. Martin's Moving handles homes and offices across ${area.county}. Free quote: ${site.phone}.`;
  return page({
    title: area.title || `${area.name} Movers | Martin's Moving`,
    description: desc,
    canonicalPath: `/areas-served/${area.slug}`,
    jsonLd: [movingCompanySchema(), serviceSchema({ name: "Moving services", description: desc, areaName: area.name }), faqSchema(faqs), breadcrumbSchema(crumbs)].filter(Boolean),
    bodyHtml,
  });
}

export function guidePage(g) {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Moving Guides", href: "/guides" }, { name: g.label, href: `/guides/${g.slug}` }];
  const c = g.content;
  const intro = c?.intro || [
    `${g.summary || g.label + " for the " + R + " area."}`,
    `Martin's Moving put this together from real moves we have done since ${Y}. If you would rather hand the whole thing off, call ${site.phone} for a free quote.`,
  ];
  let sectionsHtml = "";
  if (c?.sections) {
    sectionsHtml = c.sections.map((s) => `<div class="mt-8 max-w-3xl"><h2 class="font-headline-md text-headline-md text-on-surface mb-2">${esc(s.h)}</h2><p class="text-body-lg text-on-surface-variant">${esc(s.body)}</p></div>`).join("");
  }
  const bodyHtml = `${hero({ eyebrow: "Moving Guide", h1: g.label, sub: g.summary || "", crumbs })}
${wrap(`${prose(intro)}${sectionsHtml}${faqBlock(c?.faqs)}`)}${ctaBand()}`;
  const desc = g.metaDesc || `${g.label} from Martin's Moving, serving ${R}.`;
  return page({
    title: g.title || `${g.label} | Martin's Moving`,
    description: desc,
    canonicalPath: `/guides/${g.slug}`,
    jsonLd: [breadcrumbSchema(crumbs), faqSchema(c?.faqs)].filter(Boolean),
    bodyHtml,
  });
}

export function genericPage({ slug, label, title, metaDesc, section = "", crumbName, bodyIntro, robots }) {
  const base = section ? `/${section}` : "";
  const crumbs = [{ name: "Home", href: "/" }];
  if (section) crumbs.push({ name: crumbName || section, href: base });
  crumbs.push({ name: label, href: `${base}/${slug}`.replace(/\/+$/, "") || "/" });
  const intro = bodyIntro || [`${label} for ${site.brand}, serving ${R}.`, `Call ${site.phone} for a free quote.`];
  const bodyHtml = `${hero({ eyebrow: crumbName || "", h1: label, sub: "", crumbs })}${wrap(prose(intro))}${ctaBand()}`;
  return page({
    title: title || `${label} | Martin's Moving`,
    description: metaDesc || `${label} from Martin's Moving in ${R}.`,
    canonicalPath: `${base}/${slug}`.replace(/\/+$/, "") || "/",
    jsonLd: [breadcrumbSchema(crumbs)],
    robots,
    bodyHtml,
  });
}

export function indexPage({ kind }) {
  if (kind === "areas") {
    const links = areas.map((a) => ({ label: `${a.name} Movers`, href: `/areas-served/${a.slug}` }));
    const crumbs = [{ name: "Home", href: "/" }, { name: "Areas Served", href: "/areas-served" }];
    const bodyHtml = `${hero({ eyebrow: "Areas Served", h1: `Moving services across ${R}`, sub: "Find your town below for local moving help.", crumbs })}${wrap(relatedGrid("All areas we serve", links))}${ctaBand()}`;
    return page({ title: "Areas We Serve | Martin's Moving", description: `Martin's Moving serves ${R}. Find local movers for your town.`, canonicalPath: "/areas-served", jsonLd: [movingCompanySchema(), breadcrumbSchema(crumbs)], bodyHtml });
  }
  if (kind === "services") {
    const links = services.map((s) => ({ label: s.label, href: `/services/${s.slug}` }));
    const crumbs = [{ name: "Home", href: "/" }, { name: "Moving Services", href: "/services" }];
    const bodyHtml = `${hero({ eyebrow: "Moving Services", h1: "Our moving services", sub: `Everything from a studio apartment to a full office relocation across ${R}.`, crumbs })}${wrap(relatedGrid("All services", links))}${ctaBand()}`;
    return page({ title: "Moving Services | Martin's Moving", description: `Residential, commercial, local, and long-distance moving across ${R}. Free quote: ${site.phone}.`, canonicalPath: "/services", jsonLd: [movingCompanySchema(), breadcrumbSchema(crumbs)], bodyHtml });
  }
  if (kind === "guides") {
    const links = guides.map((g) => ({ label: g.label, href: `/guides/${g.slug}` }));
    const crumbs = [{ name: "Home", href: "/" }, { name: "Moving Guides", href: "/guides" }];
    const bodyHtml = `${hero({ eyebrow: "Moving Guides", h1: "Moving guides", sub: "Free, practical guides for planning your move.", crumbs })}${wrap(relatedGrid("All guides", links))}${ctaBand()}`;
    return page({ title: "Moving Guides | Martin's Moving", description: `Free moving guides from Martin's Moving for the ${R} area.`, canonicalPath: "/guides", jsonLd: [breadcrumbSchema(crumbs)], bodyHtml });
  }
  if (kind === "resources") {
    const links = resources.map((r) => ({ label: r.label, href: `/resources/${r.slug}` }));
    const crumbs = [{ name: "Home", href: "/" }, { name: "Resources", href: "/resources" }];
    const bodyHtml = `${hero({ eyebrow: "Resources", h1: "Moving resources", sub: "Tips, forms, and tools to make your move easier.", crumbs })}${wrap(relatedGrid("All resources", links))}${ctaBand()}`;
    return page({ title: "Moving Resources | Martin's Moving", description: `Packing tips, forms, and checklists from Martin's Moving.`, canonicalPath: "/resources", jsonLd: [breadcrumbSchema(crumbs)], bodyHtml });
  }
}

export function homePage() {
  const svc = services.filter((s) => s.real).map((s) => ({ label: s.label, href: `/services/${s.slug}` }));
  const ar = areas.slice(0, 8).map((a) => ({ label: `${a.name} Movers`, href: `/areas-served/${a.slug}` }));
  const crumbs = [{ name: "Home", href: "/" }];
  const bodyHtml = `${hero({ eyebrow: site.descriptor, h1: `${site.brand}: ${site.tagline}`, sub: `Family owned and operated since ${Y}. Licensed, bonded, and insured moving across ${R}.`, crumbs })}
${wrap(`${prose([
    `Martin's Moving is a family owned moving company serving ${R}. We move homes, condos, and offices with the same crew start to finish, careful handling, and a written quote that holds on moving day.`,
    `Whether you are moving across town or across the state, you get licensed and insured movers in marked trucks, not day labor in a rental van.`,
  ])}${relatedGrid("Our moving services", svc)}${relatedGrid("Areas we serve", ar)}`)}${ctaBand()}`;
  return page({
    title: "Martin's Moving | Bradenton & Sarasota Movers Since 2002",
    description: `Family owned movers serving ${R} since ${Y}. Residential, commercial, local, and long-distance moving. Free quote: ${site.phone}.`,
    canonicalPath: "/",
    jsonLd: [movingCompanySchema(), breadcrumbSchema(crumbs)],
    bodyHtml,
  });
}
