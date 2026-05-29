import { HEAD_STYLES } from "./head.mjs";
import { site } from "../data/site.mjs";
import { services } from "../data/services.mjs";
import { areas } from "../data/areas.mjs";
import { guides } from "../data/guides.mjs";
import { resources, aboutPages } from "../data/content.mjs";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const LOGO = "/images/logo.png";
export const HERO_IMG = "/images/hero.jpg";
export const HERO_OG = "/images/hero-og.jpg";

// ---------- functional glass-card quote form (Web3Forms) ----------
let formSeq = 0;
export function quoteForm({ title = "Fast Quote Request", compact = true, pageName = "" } = {}) {
  const id = `qf${++formSeq}`;
  const field = (label, name, type = "text", req = false) =>
    `<div class="space-y-1">
      <label class="font-label-bold text-label-bold text-on-surface-variant uppercase" for="${id}-${name}">${esc(label)}</label>
      <input id="${id}-${name}" name="${name}" type="${type}" ${req ? "required" : ""} class="w-full bg-white border border-outline-variant rounded-lg p-3 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"/>
    </div>`;
  return `<div class="glass-card p-8 rounded-2xl shadow-2xl border-2 border-primary/20">
    <h3 class="font-headline-md text-headline-md text-primary mb-6 text-center">${esc(title)}</h3>
    <form class="quote-form space-y-4" data-page="${esc(pageName)}" novalidate>
      <input type="checkbox" name="botcheck" class="hidden" style="display:none" tabindex="-1" autocomplete="off"/>
      ${field("Full name", "name", "text", true)}
      <div class="grid grid-cols-2 gap-4">${field("Phone", "phone", "tel", true)}${field("Move date", "move_date", "date")}</div>
      ${field("Email", "email", "email")}
      ${compact ? "" : `<div class="grid grid-cols-2 gap-4">${field("Moving from", "move_from")}${field("Moving to", "move_to")}</div><div class="space-y-1"><label class="font-label-bold text-label-bold text-on-surface-variant uppercase" for="${id}-details">Details</label><textarea id="${id}-details" name="details" rows="3" class="w-full bg-white border border-outline-variant rounded-lg p-3 focus:border-primary outline-none"></textarea></div>`}
      <button type="submit" class="w-full bg-primary text-white py-4 rounded-lg font-label-bold text-body-md hover:bg-primary-container transition-all">Request call back</button>
      <p class="form-status text-caption text-center" role="status" aria-live="polite"></p>
      <p class="text-caption text-on-surface-variant text-center">Family owned &amp; operated. Licensed, bonded &amp; insured.</p>
    </form>
  </div>`;
}

// ---------- top nav (original flat design) ----------
// navData powers the footer link columns (full IA lives in the footer + index pages).
export function navData() {
  return {
    about: aboutPages.map((p) => ({ label: p.label, href: `/${p.slug}` })),
    services: services.map((s) => ({ label: s.label, href: `/services/${s.slug}`, note: !s.real })),
    areas: [...areas.map((a) => ({ label: `${a.name} Movers`, href: `/areas-served/${a.slug}` })), { label: "View all areas", href: "/areas-served" }],
    guides: guides.map((g) => ({ label: g.label, href: `/guides/${g.slug}` })),
    resources: resources.map((r) => ({ label: r.label, href: `/resources/${r.slug}` })),
  };
}

function header() {
  const n = navData();
  // simple top-level link
  const navLink = (label, href) => `<a class="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant hover:text-action-orange transition-colors duration-300" href="${href}">${esc(label)}</a>`;
  // dropdown trigger + panel
  const trigger = (label) => `<button type="button" aria-haspopup="true" aria-expanded="false" class="flex items-center gap-1 font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant hover:text-action-orange transition-colors">${esc(label)}<span class="material-symbols-outlined text-base dd-chev transition-transform">expand_more</span></button>`;
  const panelLink = (i) => `<a class="block px-3 py-2 rounded-lg text-body-md text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors" href="${i.href}">${esc(i.label)}</a>`;
  const viewAll = (label, href) => `<a class="mt-2 inline-flex items-center gap-1 px-3 font-label-bold text-label-bold text-action-orange hover:gap-2 transition-all" href="${href}">${esc(label)}<span class="material-symbols-outlined text-base">arrow_forward</span></a>`;
  const dropdown = (label, width, inner) => `<div class="dd-wrap relative">${trigger(label)}<div class="dd-panel absolute left-0 top-full pt-3 z-50"><div class="bg-surface-container-lowest rounded-2xl shadow-2xl ring-1 ring-on-surface/5 p-4 ${width}">${inner}</div></div></div>`;
  const heading = (t) => `<p class="px-3 pb-2 font-label-bold text-label-bold uppercase tracking-widest text-on-surface-variant/70">${esc(t)}</p>`;

  const svcItems = n.services.filter((s) => !s.note); // the confirmed-real services
  const servicesPanel = dropdown("Services", "w-[540px]", `${heading("Moving services")}<div class="grid grid-cols-2 gap-1">${svcItems.map((i) => panelLink(i)).join("")}</div>${viewAll("View all services", "/services")}`);
  const areasPanel = dropdown("Areas Served", "w-[540px]", `${heading("Areas served")}<div class="grid grid-cols-3 gap-1">${n.areas.slice(0, 12).map((i) => panelLink(i)).join("")}</div>${viewAll("View all areas", "/areas-served")}`);
  const guidesPanel = dropdown("Guides", "w-80", `${heading("Moving guides")}<div class="grid grid-cols-1 gap-1">${n.guides.map((i) => panelLink(i)).join("")}</div>`);
  const resourcesPanel = dropdown("Resources", "w-80", `${heading("Resources")}<div class="grid grid-cols-1 gap-1">${n.resources.map((i) => panelLink(i)).join("")}</div>`);

  return `
<nav class="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
  <div class="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
    <a class="flex items-center gap-2 shrink-0" href="/"><img alt="Martin's Moving logo" class="h-12 w-auto object-contain" src="${LOGO}"/></a>
    <div class="hidden lg:flex items-center gap-6">
      ${servicesPanel}${areasPanel}${guidesPanel}${resourcesPanel}
      ${navLink("About", "/about")}${navLink("Blog", "/blog")}
      <a class="bg-action-orange text-white px-6 py-3 rounded-lg font-label-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all whitespace-nowrap" href="/contact">Request Call Back</a>
    </div>
    <button id="menu-btn" type="button" aria-label="Open menu" class="lg:hidden text-primary"><span class="material-symbols-outlined text-3xl">menu</span></button>
  </div>
  <div id="mobile-menu" class="hidden lg:hidden bg-surface-container-lowest border-t border-outline-variant/30 max-h-[80vh] overflow-y-auto">
    <div class="px-margin-mobile py-3">
      ${mobileAccordion("Services", [...svcItems, { label: "View all services", href: "/services" }])}
      ${mobileAccordion("Areas Served", n.areas)}
      ${mobileAccordion("Guides", n.guides)}
      ${mobileAccordion("Resources", n.resources)}
      <a class="block py-3 font-label-bold text-label-bold uppercase tracking-wider text-on-surface hover:text-action-orange border-b border-outline-variant/20" href="/about">About</a>
      <a class="block py-3 font-label-bold text-label-bold uppercase tracking-wider text-on-surface hover:text-action-orange border-b border-outline-variant/20" href="/blog">Blog</a>
      <a class="block mt-3 bg-action-orange text-white text-center px-5 py-3 rounded-lg font-label-bold uppercase tracking-wider" href="/contact">Request Call Back</a>
      <a class="block mt-2 text-center py-2 text-primary font-label-bold" href="${site.phoneHref}">Call ${esc(site.phone)}</a>
    </div>
  </div>
</nav>`;
}
function mobileAccordion(label, items) {
  const links = items.map((i) => `<a class="block py-2 pl-3 text-body-md text-on-surface-variant hover:text-primary" href="${i.href}">${esc(i.label)}</a>`).join("");
  return `<details class="border-b border-outline-variant/20"><summary class="flex items-center justify-between py-3 font-label-bold text-label-bold uppercase tracking-wider text-on-surface cursor-pointer">${esc(label)}<span class="material-symbols-outlined dd-chev transition-transform">expand_more</span></summary><div class="pb-2">${links}</div></details>`;
}

// ---------- hero with original design + functional form ----------
export function hero({ badge, h1, sub, primaryCta, secondaryCta, crumbs, big = false, pageName = "", showForm = true, bgImage = "/images/hero", bgAlt = "Moving crew loading cardboard boxes into a moving van" }) {
  const crumbHtml = crumbs
    ? `<nav aria-label="Breadcrumb" class="text-caption text-white/70 mb-4"><ol class="flex flex-wrap items-center gap-1">${crumbs
        .map((c, i) => (i < crumbs.length - 1 ? `<li><a class="hover:text-tertiary-fixed" href="${c.href}">${esc(c.name)}</a></li><li class="mx-1 text-white/40">/</li>` : `<li class="text-white">${esc(c.name)}</li>`))
        .join("")}</ol></nav>`
    : "";
  const pCta = primaryCta || { label: "Get a free estimate", href: "/contact" };
  const sCta = secondaryCta || { label: "Our services", href: "/services" };
  return `<header class="relative pt-20 ${big ? "min-h-[90vh]" : "min-h-[60vh]"} flex items-center overflow-hidden">
  <div class="absolute inset-0 z-0"><picture><source srcset="${bgImage}.webp" type="image/webp"/><img alt="${esc(bgAlt)}" class="w-full h-full object-cover" src="${bgImage}.jpg" width="1920" height="1256" fetchpriority="high" decoding="async"/></picture><div class="absolute inset-0 hero-gradient"></div></div>
  <div class="relative z-10 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto grid md:grid-cols-[2fr_1fr] gap-12 items-center py-16 md:py-20 w-full">
    <div class="text-white space-y-6">
      ${crumbHtml}
      ${badge ? `<span class="inline-block px-4 py-1 bg-tertiary text-on-tertiary rounded-full font-label-bold text-caption uppercase tracking-[0.2em]">${esc(badge)}</span>` : ""}
      <h1 class="font-display-lg text-headline-lg-mobile ${big ? "md:text-display-lg" : "md:text-headline-lg"} leading-tight">${esc(h1)}</h1>
      ${sub ? `<p class="font-body-lg text-body-lg text-surface-variant opacity-90 max-w-lg">${esc(sub)}</p>` : ""}
      <div class="flex flex-wrap gap-4">
        <a class="bg-action-orange hover:brightness-110 text-white px-8 py-4 rounded-xl font-headline-md text-body-lg transition-all shadow-lg hover:-translate-y-1" href="${pCta.href}">${esc(pCta.label)}</a>
        <a class="border-2 border-tertiary-fixed text-tertiary-fixed backdrop-blur-sm px-8 py-4 rounded-xl font-headline-md text-body-lg hover:bg-tertiary-fixed/10 transition-all" href="${sCta.href}">${esc(sCta.label)}</a>
      </div>
    </div>
    <div class="${showForm ? "" : "hidden"} md:block">${showForm ? quoteForm({ pageName }) : ""}</div>
  </div>
</header>`;
}

// ---------- original footer, expanded to new IA ----------
function footer() {
  const n = navData();
  const col = (title, items, max = 6) => `<div><h4 class="font-label-bold text-label-bold uppercase tracking-widest mb-6 text-tertiary-fixed">${esc(title)}</h4><ul class="space-y-3 font-body-md text-body-md">${items.slice(0, max).map((i) => `<li><a class="text-white/80 hover:text-tertiary-fixed transition-colors" href="${i.href}">${esc(i.label)}</a></li>`).join("")}</ul></div>`;
  const licenseLine = `FL Mover Reg. #${esc(site.licenses.flIm)}` + (site.licenses.usdot.startsWith("{{") ? "" : ` · USDOT ${esc(site.licenses.usdot)}`);
  return `
<footer class="bg-primary text-on-primary w-full pt-section-gap pb-8">
  <div class="grid grid-cols-2 md:grid-cols-5 gap-gutter px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
    <div class="col-span-2 md:col-span-1 space-y-6">
      <div class="inline-block bg-white rounded-lg p-2"><img alt="Martin's Moving logo" class="h-12 w-auto object-contain" src="${LOGO}"/></div>
      <p class="font-body-md text-body-md opacity-80">Serving ${esc(site.serviceRegion)} with precision relocation services since ${esc(site.foundedYear)}.</p>
      <a class="block text-white/90 hover:text-tertiary-fixed font-label-bold" href="${site.phoneHref}">${esc(site.phone)}</a>
    </div>
    ${col("Moving Services", n.services)}
    ${col("Areas Served", n.areas)}
    ${col("Guides & Resources", [...n.guides.slice(0, 4), ...n.resources.slice(0, 2)])}
    <div>
      <h4 class="font-label-bold text-label-bold uppercase tracking-widest mb-6 text-tertiary-fixed">Contact Us</h4>
      <ul class="space-y-4 font-body-md text-body-md">
        <li class="flex items-center gap-3"><span class="material-symbols-outlined text-tertiary-fixed">call</span><a class="hover:text-tertiary-fixed" href="${site.phoneHref}">${esc(site.phone)}</a></li>
        <li class="flex items-center gap-3"><span class="material-symbols-outlined text-tertiary-fixed">mail</span><a class="hover:text-tertiary-fixed break-all" href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>
        <li class="flex items-center gap-3"><span class="material-symbols-outlined text-tertiary-fixed">schedule</span><span>${esc(site.hoursDisplay)}</span></li>
        <li class="flex items-center gap-3"><span class="material-symbols-outlined text-action-orange">emergency</span><span class="text-action-orange font-bold">${esc(site.emergency)}</span></li>
      </ul>
    </div>
  </div>
  <div class="mt-section-gap pt-8 border-t border-white/10 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto flex flex-col md:flex-row md:justify-between gap-3 text-center md:text-left">
    <p class="font-body-md text-body-md opacity-60">© ${new Date().getFullYear()} Martin's Moving. ${esc(site.positioning)}. ${licenseLine}.</p>
    <div class="flex flex-wrap gap-4 justify-center text-body-md opacity-60">
      <a class="hover:text-tertiary-fixed" href="/about">About</a>
      <a class="hover:text-tertiary-fixed" href="/blog">Blog</a>
      <a class="hover:text-tertiary-fixed" href="/reviews">Reviews</a>
      <a class="hover:text-tertiary-fixed" href="/privacy-policy">Privacy</a>
      <a class="hover:text-tertiary-fixed" href="/accessibility">Accessibility</a>
    </div>
  </div>
</footer>`;
}

const SCRIPTS = `
<script>
(function(){
  var btn=document.getElementById('menu-btn'),menu=document.getElementById('mobile-menu');
  if(btn&&menu)btn.addEventListener('click',function(){menu.classList.toggle('hidden');});
  function closeAllDropdowns(except){
    document.querySelectorAll('.dd-wrap.is-open').forEach(function(w){
      if(w===except)return;
      w.classList.remove('is-open');
      var b=w.querySelector(':scope > button');
      if(b)b.setAttribute('aria-expanded','false');
    });
  }
  document.querySelectorAll('.dd-wrap > button').forEach(function(b){
    b.addEventListener('click',function(e){
      e.stopPropagation();
      var w=b.parentElement;
      var open=!w.classList.contains('is-open');
      closeAllDropdowns(w);
      w.classList.toggle('is-open',open);
      b.setAttribute('aria-expanded',open?'true':'false');
    });
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.dd-wrap'))closeAllDropdowns();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAllDropdowns();});
  document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var h=a.getAttribute('href');if(h==='#'||h.length<2)return;var t=document.querySelector(h);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}});});
  document.querySelectorAll('form.quote-form').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var st=f.querySelector('.form-status');
      if(f.botcheck&&f.botcheck.checked)return;
      if(!f.name.value.trim()||!f.phone.value.trim()){st.textContent='Please add your name and phone.';st.style.color='#ba1a1a';return;}
      st.textContent='Sending...';st.style.color='';
      var data=Object.fromEntries(new FormData(f).entries());
      data.page=f.dataset.page||'';
      fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json().then(function(j){return {status:r.status,body:j};});})
        .then(function(res){if(res.status>=200&&res.status<300&&res.body&&res.body.ok){f.reset();st.textContent='Thanks. We will call you back shortly.';st.style.color='#00682f';}else{st.textContent='Something went wrong. Please call (941) 809-5777.';st.style.color='#ba1a1a';}})
        .catch(function(){st.textContent='Network error. Please call (941) 809-5777.';st.style.color='#ba1a1a';});
    });
  });
})();
</script>`;

export function breadcrumbsHtml(crumbs) {
  return `<nav aria-label="Breadcrumb" class="text-caption text-on-surface-variant"><ol class="flex flex-wrap gap-1 items-center">${crumbs
    .map((c, i) => (i < crumbs.length - 1 ? `<li><a class="hover:text-primary" href="${c.href}">${esc(c.name)}</a> <span class="mx-1">/</span></li>` : `<li class="text-on-surface">${esc(c.name)}</li>`))
    .join("")}</ol></nav>`;
}

export function page({ title, description, canonicalPath, jsonLd = [], bodyHtml, robots, bodyClass = "", preloadImage = "/images/hero.webp" }) {
  const canonical = `${site.domain}${canonicalPath}`;
  const ld = jsonLd.filter(Boolean).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");
  return `<!DOCTYPE html>
<html class="scroll-smooth" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}"/>
${robots ? `<meta name="robots" content="${esc(robots)}"/>` : ""}
<link rel="canonical" href="${canonical}"/>
<meta property="og:type" content="website"/><meta property="og:title" content="${esc(title)}"/><meta property="og:description" content="${esc(description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:image" content="${site.domain}${HERO_OG}"/>
<meta name="twitter:card" content="summary_large_image"/>
<link rel="preload" as="image" href="${preloadImage}" type="image/webp" fetchpriority="high"/>
${HEAD_STYLES}
${ld}
</head>
<body class="bg-background text-on-background font-body-md selection:bg-primary/20${bodyClass ? " " + bodyClass : ""}">
${header()}
<main>${bodyHtml}</main>
${footer()}
${SCRIPTS}
</body></html>`;
}

export { site };
