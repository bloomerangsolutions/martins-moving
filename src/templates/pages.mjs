import { page, hero, quoteForm, site } from "./layout.mjs";
import { movingCompanySchema, serviceSchema, faqSchema, breadcrumbSchema, reviewSchema, speakableSchema } from "./schema.mjs";
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

// AEO: concise, citable answer block
function quickAnswer(text) {
  return `<div class="quick-answer glass-card rounded-2xl border-l-4 border-action-orange p-6 mb-10 max-w-3xl">
    <p class="font-label-bold text-label-bold uppercase tracking-wider text-primary mb-2">In short</p>
    <p class="font-body-lg text-body-lg text-on-surface">${esc(text)}</p></div>`;
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
  const bodyHtml = `${proposedNote}${hero({ badge: "Moving Services", h1: `${svc.label} in ${site.address.city} & Sarasota`, sub: svc.summary || `Professional ${svc.label.toLowerCase()} across ${R}.`, crumbs, pageName: svc.label, primaryCta: { label: "Get a free estimate", href: "/contact" }, secondaryCta: { label: "All services", href: "/services" } })}
${wrap(`${quickAnswer(qa)}${prose(intro)}${body}${relatedCards("Areas we serve", areas.slice(0, 8).map(areaCard))}${relatedCards("Related moving services", relatedServices(svc.slug))}<p class="mt-10 text-body-md text-on-surface-variant max-w-3xl">New to moving? Read our <a class="text-primary underline hover:text-action-orange" href="/guides/${guideLink.slug}">${esc(guideLink.label.toLowerCase())}</a>.</p>${faqBlock(faqs)}`)}
${recognitionBar()}${ctaBand()}`;
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
  const faqs = c?.faqs || [
    { q: `Do you move within ${area.name}?`, a: `Yes. We handle local moves inside ${area.name} and moves between ${area.name} and anywhere in ${R}.` },
    { q: "How far ahead should I book?", a: "Two to three weeks in the winter season, about a week off season. Earlier is safer for weekend dates." },
    { q: "Are you licensed and insured?", a: `Yes, Florida Mover Registration #${site.licenses.flIm}, fully insured.` },
  ];
  const qa = `Martin's Moving is a licensed, family-owned mover serving ${area.name} in ${area.county}. We handle residential, commercial, and local moves with free written estimates. Call ${site.phone}.`;
  const bodyHtml = `${hero({ badge: "Areas Served", h1: `${area.name} Movers`, sub: `Local and long-distance moving in ${area.name}, ${area.county}.`, crumbs, pageName: `${area.name} Movers`, primaryCta: { label: "Get a free estimate", href: "/contact" }, secondaryCta: { label: "All areas", href: "/areas-served" } })}
${wrap(`${quickAnswer(qa)}${prose(intro)}${area.neighborhoods ? bullets(c?.localTitle || `Parts of ${area.name} we move`, area.neighborhoods) : ""}${relatedCards(`Our moving services in ${area.name}`, realServices.map(svcCard))}${relatedCards("Nearby areas we serve", nearbyAreas(area))}${faqBlock(faqs)}`)}
${recognitionBar()}${ctaBand()}`;
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
  const qa = c?.intro?.[0] || `${g.summary || g.label}. A practical guide from Martin's Moving for the ${R} area.`;
  const sectionsHtml = c?.sections ? c.sections.map((s) => `<div class="mt-8 max-w-3xl"><h2 class="font-headline-md text-headline-md text-primary mb-2">${esc(s.h)}</h2><p class="font-body-lg text-body-lg text-on-surface-variant">${esc(s.body)}</p></div>`).join("") : "";
  const bodyHtml = `${hero({ badge: "Moving Guide", h1: g.label, sub: g.summary || "", crumbs, pageName: g.label, primaryCta: { label: "Get a free quote", href: "/contact" }, secondaryCta: { label: "All guides", href: "/guides" } })}
${wrap(`${quickAnswer(qa)}${prose(intro)}${sectionsHtml}${relatedCards("Services that help", realServices.slice(0, 4).map(svcCard))}${relatedCards("Other guides", guides.filter((x) => x.slug !== g.slug).slice(0, 4).map((x) => ({ label: x.label, href: `/guides/${x.slug}` })))}${faqBlock(faqs)}`)}
${ctaBand()}`;
  const desc = (g.metaDesc || `${g.label} from Martin's Moving, serving ${R}.`).slice(0, 158);
  return page({ title: g.title || `${g.label} | Martin's Moving`, description: desc, canonicalPath: `/guides/${g.slug}`, jsonLd: [breadcrumbSchema(crumbs), faqSchema(faqs), speakableSchema(`/guides/${g.slug}`)], bodyHtml });
}

export function genericPage({ slug, label, title, metaDesc, section = "", crumbName, bodyIntro, robots, related = "guides", qa }) {
  const base = section ? `/${section}` : "";
  const canonicalPath = (`${base}/${slug}`).replace(/\/+$/, "") || "/";
  const crumbs = [{ name: "Home", href: "/" }];
  if (section) crumbs.push({ name: crumbName || section, href: base });
  crumbs.push({ name: label, href: canonicalPath });
  const intro = bodyIntro || [`${label} for ${site.brand}, serving ${R}.`, `Call ${site.phone} for a free quote.`];
  const faqs = [
    { q: "What areas does Martin's Moving serve?", a: `We serve ${R}, including Bradenton, Sarasota, and the surrounding towns.` },
    { q: "Is Martin's Moving licensed and insured?", a: `Yes. Family owned since ${Y}, licensed, bonded, and insured (FL Mover Reg #${site.licenses.flIm}).` },
  ];
  const relatedItems = related === "services" ? realServices.map(svcCard) : guides.slice(0, 4).map((g) => ({ label: g.label, href: `/guides/${g.slug}` }));
  const bodyHtml = `${hero({ badge: crumbName || "", h1: label, sub: "", crumbs, pageName: label, primaryCta: { label: "Get a free quote", href: "/contact" }, secondaryCta: { label: "Our services", href: "/services" } })}
${wrap(`${qa ? quickAnswer(qa) : ""}${prose(intro)}${relatedCards(related === "services" ? "Our moving services" : "Helpful guides", relatedItems)}${faqBlock(faqs)}`)}
${ctaBand()}`;
  return page({ title: title || `${label} | Martin's Moving`, description: (metaDesc || `${label} from Martin's Moving in ${R}.`).slice(0, 158), canonicalPath, jsonLd: [movingCompanySchema(), breadcrumbSchema(crumbs), faqSchema(faqs), speakableSchema(canonicalPath)], robots, bodyHtml });
}

export function indexPage({ kind }) {
  const map = {
    services: { label: "Moving Services", items: services.map(svcCard), h1: "Our moving services", sub: `Everything from a studio apartment to a full office relocation across ${R}.`, path: "/services", icon: "arrow_forward" },
    areas: { label: "Areas Served", items: areas.map(areaCard), h1: `Moving services across ${R}`, sub: "Find your town below for local moving help.", path: "/areas-served", icon: "location_on" },
    guides: { label: "Moving Guides", items: guides.map((g) => ({ label: g.label, href: `/guides/${g.slug}` })), h1: "Moving guides", sub: "Free, practical guides for planning your move.", path: "/guides", icon: "menu_book" },
    resources: { label: "Resources", items: resources.map((r) => ({ label: r.label, href: `/resources/${r.slug}` })), h1: "Moving resources", sub: "Tips, forms, and tools to make your move easier.", path: "/resources", icon: "description" },
  }[kind];
  const crumbs = [{ name: "Home", href: "/" }, { name: map.label, href: map.path }];
  const qa = `Martin's Moving offers ${map.items.length} ${kind === "areas" ? "service areas" : kind} across ${R}, family owned since ${Y}. Call ${site.phone} for a free quote.`;
  const bodyHtml = `${hero({ badge: map.label, h1: map.h1, sub: map.sub, crumbs, pageName: map.label })}
${wrap(`${quickAnswer(qa)}${relatedCards(`All ${map.label.toLowerCase()}`, map.items, map.icon)}`)}
${recognitionBar()}${ctaBand()}`;
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
  return `<section class="py-section-gap px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto"><div class="bg-primary-container rounded-3xl p-12 relative overflow-hidden border-4 border-primary">
    <div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"><span class="material-symbols-outlined text-[300px] text-white">format_quote</span></div>
    <div class="relative z-10 grid lg:grid-cols-3 gap-12 items-center">
      <div class="lg:col-span-1"><div class="w-20 h-20 bg-action-orange rounded-2xl flex items-center justify-center mb-8 shadow-lg"><span class="material-symbols-outlined text-white text-4xl">reviews</span></div><h2 class="font-headline-lg text-headline-lg text-white mb-6">Voices of trust</h2><p class="font-body-lg text-white/80 mb-8">We take pride in serving our Bradenton and Sarasota community.</p><a class="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-label-bold hover:bg-white hover:text-primary transition-all" href="/reviews">READ ALL REVIEWS</a></div>
      <div class="lg:col-span-2 grid md:grid-cols-2 gap-6">${revs.map((r) => `<div class="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-tertiary"><div class="flex text-tertiary mb-4">${Array(r.stars).fill('<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">star</span>').join("")}</div><p class="italic text-on-surface-variant mb-6">"${esc(r.text)}"</p><div class="flex items-center gap-4"><div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">${esc(r.name.split(" ").map((x) => x[0]).join(""))}</div><div><h4 class="font-bold text-on-surface">${esc(r.name)}</h4><p class="text-caption text-on-surface-variant">${esc(r.tag)}</p></div></div></div>`).join("")}</div>
    </div></div></section>`;
}

export function homePage() {
  const crumbs = [{ name: "Home", href: "/" }];
  const qa = `Martin's Moving is a family-owned moving company serving ${R} since ${Y}. We offer residential, commercial, local, interstate, packing, piano, and specialty moving. Licensed and insured (FL Mover Reg #${site.licenses.flIm}). Free quotes at ${site.phone}.`;
  const bodyHtml = `${hero({ badge: `Established ${Y}`, h1: `Florida's trusted moving company since ${Y}`, sub: `Expert residential and commercial relocations in ${R}. We turn the chaos of moving into a smooth transition.`, big: true, pageName: "Homepage", primaryCta: { label: "Get a free estimate", href: "/contact" }, secondaryCta: { label: "Our services", href: "/services" } })}
${recognitionBar()}
<div class="px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto pt-section-gap">${quickAnswer(qa)}</div>
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
