import { site } from "../data/site.mjs";
import { services } from "../data/services.mjs";
import { areas } from "../data/areas.mjs";
import { guides } from "../data/guides.mjs";
import { resources, aboutPages } from "../data/content.mjs";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---- Tailwind config copied from the existing pages so the look matches exactly ----
const HEAD_STYLES = `
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&family=Sora:wght@400;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script id="tailwind-config">
tailwind.config = { darkMode: "class", theme: { extend: {
  colors: {
    "on-background":"#1a1c1e","on-surface":"#1a1c1e","surface":"#f9f9fc","on-primary":"#ffffff",
    "surface-container":"#eeeef0","primary":"#00682f","secondary-container":"#fe7119","background":"#f9f9fc",
    "on-surface-variant":"#3e4a3e","outline":"#6e7a6e","surface-container-low":"#f3f3f6","surface-tint":"#006d31",
    "primary-container":"#00843d","surface-variant":"#e2e2e5","surface-container-high":"#e8e8ea",
    "outline-variant":"#bdcabb","surface-container-lowest":"#ffffff","action-orange":"#fe7119","trust-blue":"#0055A4",
    "primary-fixed-dim":"#71dc8a"
  },
  borderRadius:{ "DEFAULT":"0.5rem","lg":"0.75rem","xl":"1rem","full":"9999px" },
  spacing:{ "margin-mobile":"16px","max-width":"1280px","margin-desktop":"auto","base":"8px","gutter":"24px","content-gap":"24px","section-gap":"120px" },
  fontFamily:{ "headline-md":["Sora"],"body-lg":["Hanken Grotesk"],"caption":["Hanken Grotesk"],"display-lg":["Sora"],"headline-lg-mobile":["Sora"],"body-md":["Hanken Grotesk"],"headline-lg":["Sora"],"label-bold":["Hanken Grotesk"] },
  fontSize:{
    "headline-md":["32px",{"lineHeight":"40px","fontWeight":"600"}],"body-lg":["18px",{"lineHeight":"28px","fontWeight":"400"}],
    "caption":["12px",{"lineHeight":"16px","fontWeight":"500"}],"display-lg":["64px",{"lineHeight":"72px","letterSpacing":"-0.02em","fontWeight":"800"}],
    "headline-lg-mobile":["36px",{"lineHeight":"44px","fontWeight":"700"}],"body-md":["16px",{"lineHeight":"24px","fontWeight":"400"}],
    "headline-lg":["48px",{"lineHeight":"56px","letterSpacing":"-0.01em","fontWeight":"700"}],"label-bold":["14px",{"lineHeight":"20px","letterSpacing":"0.05em","fontWeight":"700"}]
  }
}}};
</script>
<style>
.material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24;}
.glass-card{background:rgba(255,255,255,0.9);backdrop-filter:blur(12px);border:1px solid rgba(0,132,61,0.1);}
.hero-gradient{background:linear-gradient(rgba(0,104,47,0.6),rgba(0,40,18,0.8));}
.dd-panel{opacity:0;visibility:hidden;transform:translateY(6px);transition:all .18s ease;}
.dd-wrap:hover .dd-panel,.dd-wrap:focus-within .dd-panel{opacity:1;visibility:visible;transform:translateY(0);}
</style>`;

const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBk0Brz-IBMxgnwgRA2qJkQT-woplFgGr_ZyhZGirpn8YkFKcxjDTgRNw4Mo3mw4kOWW4NF44XRQM00uwt-f0IhXVt6OBykO7Lt-fEZzaO91TDAcqEOjpAWL-ekwE-4Rwuugs5cH-3W9x1F8NzmhsSHcN85Lu1IhG37E89o6kUBpj2YbaNZcZQ_kE28oBmbkcHemzg98xPttqSQAhUdueHW531qGVgOENCXdCR_w9zLHo7iFtu9BAgxzx9sV_FZ-pUwyUggLu0xSq0";

// ---- desktop dropdown builders ----
function ddTrigger(label) {
  return `<button type="button" class="flex items-center gap-1 font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant hover:text-action-orange transition-colors py-2">
    ${esc(label)}<span class="material-symbols-outlined text-base">expand_more</span></button>`;
}
function simpleDropdown(label, items) {
  const links = items
    .map(
      (i) =>
        `<a class="block px-4 py-2 text-body-md text-on-surface hover:bg-surface-container-low hover:text-primary rounded-md transition-colors" href="${i.href}">${esc(i.label)}</a>`
    )
    .join("");
  return `<div class="dd-wrap relative">${ddTrigger(label)}
    <div class="dd-panel absolute left-0 top-full pt-2 z-50">
      <div class="bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 p-2 w-64">${links}</div>
    </div></div>`;
}
function megaDropdown(label, items, cols = 3, width = "w-[640px]") {
  const links = items
    .map(
      (i) =>
        `<a class="block px-3 py-2 text-body-md text-on-surface hover:bg-surface-container-low hover:text-primary rounded-md transition-colors" href="${i.href}">${esc(i.label)}${i.note ? `<span class="text-action-orange"> *</span>` : ""}</a>`
    )
    .join("");
  return `<div class="dd-wrap relative">${ddTrigger(label)}
    <div class="dd-panel absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
      <div class="bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 p-3 ${width}">
        <div class="grid grid-cols-${cols} gap-1">${links}</div>
      </div>
    </div></div>`;
}

function navData() {
  return {
    about: aboutPages.map((p) => ({ label: p.label, href: `/${p.slug}` })),
    services: services.map((s) => ({ label: s.label, href: `/services/${s.slug}`, note: !s.real })),
    areas: [
      ...areas.map((a) => ({ label: `${a.name} Movers`, href: `/areas-served/${a.slug}` })),
      { label: "View all areas", href: "/areas-served" },
    ],
    guides: guides.map((g) => ({ label: g.label, href: `/guides/${g.slug}` })),
    resources: resources.map((r) => ({ label: r.label, href: `/resources/${r.slug}` })),
  };
}

function header() {
  const n = navData();
  return `
<nav class="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
  <div class="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto">
    <a class="flex items-center gap-2 shrink-0" href="/"><img alt="Martin's Moving logo" class="h-12 w-auto object-contain" src="${LOGO}"/></a>
    <div class="hidden lg:flex items-center gap-5">
      <a class="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant hover:text-action-orange transition-colors" href="/">Home</a>
      ${simpleDropdown("About", n.about)}
      ${megaDropdown("Moving Services", n.services, 3, "w-[680px]")}
      ${megaDropdown("Areas Served", n.areas, 3, "w-[680px]")}
      ${simpleDropdown("Moving Guides", n.guides)}
      ${simpleDropdown("Resources", n.resources)}
      <a class="font-label-bold text-label-bold uppercase tracking-wider text-on-surface-variant hover:text-action-orange transition-colors" href="/blog">Blog</a>
      <a class="bg-action-orange text-white px-5 py-3 rounded-lg font-label-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all whitespace-nowrap" href="/contact">Get Quote</a>
    </div>
    <button id="menu-btn" type="button" aria-label="Open menu" class="lg:hidden text-primary"><span class="material-symbols-outlined text-3xl">menu</span></button>
  </div>
  <!-- mobile panel -->
  <div id="mobile-menu" class="hidden lg:hidden bg-surface-container-lowest border-t border-outline-variant/30 max-h-[80vh] overflow-y-auto">
    <div class="px-margin-mobile py-4 space-y-1">
      <a class="block py-2 font-label-bold uppercase tracking-wide text-on-surface" href="/">Home</a>
      ${mobileAccordion("About", n.about)}
      ${mobileAccordion("Moving Services", n.services)}
      ${mobileAccordion("Areas Served", n.areas)}
      ${mobileAccordion("Moving Guides", n.guides)}
      ${mobileAccordion("Resources", n.resources)}
      <a class="block py-2 font-label-bold uppercase tracking-wide text-on-surface" href="/blog">Blog</a>
      <a class="block mt-2 bg-action-orange text-white text-center px-5 py-3 rounded-lg font-label-bold uppercase tracking-wider" href="/contact">Get Quote</a>
      <a class="block mt-2 text-center py-2 text-primary font-label-bold" href="${site.phoneHref}">Call ${esc(site.phone)}</a>
    </div>
  </div>
</nav>`;
}

function mobileAccordion(label, items) {
  const links = items
    .map((i) => `<a class="block py-2 pl-3 text-body-md text-on-surface-variant" href="${i.href}">${esc(i.label)}</a>`)
    .join("");
  return `<details class="border-b border-outline-variant/20">
    <summary class="flex items-center justify-between py-2 font-label-bold uppercase tracking-wide text-on-surface cursor-pointer list-none">${esc(label)}<span class="material-symbols-outlined">expand_more</span></summary>
    <div class="pb-2">${links}</div></details>`;
}

function footer() {
  const n = navData();
  const col = (title, items, n2 = 6) =>
    `<div><h3 class="font-headline-md text-sm uppercase tracking-wider text-primary-fixed-dim mb-3">${esc(title)}</h3>
      <ul class="space-y-2">${items.slice(0, n2).map((i) => `<li><a class="text-body-md text-white/80 hover:text-action-orange transition-colors" href="${i.href}">${esc(i.label)}</a></li>`).join("")}</ul></div>`;
  return `
<footer class="bg-primary text-on-primary w-full pt-16 pb-8">
  <div class="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
    <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
      <div class="col-span-2 md:col-span-1">
        <div class="font-display-lg text-2xl font-extrabold mb-2">Martin's Moving</div>
        <p class="text-body-md text-white/80 mb-4">${esc(site.descriptor)}. Family owned since ${esc(site.foundedYear)}. Licensed, bonded, and insured.</p>
        <a class="block text-white/90 hover:text-action-orange font-label-bold" href="${site.phoneHref}">${esc(site.phone)}</a>
        <a class="block text-white/70 hover:text-action-orange text-body-md" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
      </div>
      ${col("Services", n.services)}
      ${col("Areas Served", n.areas)}
      ${col("Guides", n.guides)}
      ${col("Resources", n.resources)}
    </div>
    <div class="border-t border-white/15 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <p class="text-caption text-white/60">© ${new Date().getFullYear()} Martin's Moving. ${esc(site.descriptor)}.${site.licenses.usdot.startsWith("{{") ? " Licensed, bonded & insured." : ` USDOT ${esc(site.licenses.usdot)} · FL IM ${esc(site.licenses.flIm)}.`}</p>
      <div class="flex gap-4 text-caption text-white/60">
        <a class="hover:text-action-orange" href="/privacy-policy">Privacy Policy</a>
        <a class="hover:text-action-orange" href="/accessibility">Accessibility</a>
        <a class="hover:text-action-orange" href="/reviews">Reviews</a>
      </div>
    </div>
  </div>
</footer>`;
}

const SCRIPTS = `
<script>
(function(){
  var btn=document.getElementById('menu-btn'),menu=document.getElementById('mobile-menu');
  if(btn&&menu){btn.addEventListener('click',function(){menu.classList.toggle('hidden');});}
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var href=a.getAttribute('href');
      if(href==='#'||href.length<2)return;
      var t=document.querySelector(href);
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
    });
  });
})();
</script>`;

export function breadcrumbsHtml(crumbs) {
  // crumbs: [{name, href}]
  return `<nav aria-label="Breadcrumb" class="text-caption text-on-surface-variant"><ol class="flex flex-wrap gap-1 items-center">${crumbs
    .map((c, i) =>
      i < crumbs.length - 1
        ? `<li><a class="hover:text-primary" href="${c.href}">${esc(c.name)}</a> <span class="mx-1">/</span></li>`
        : `<li class="text-on-surface">${esc(c.name)}</li>`
    )
    .join("")}</ol></nav>`;
}

export function page({ title, description, canonicalPath, jsonLd = [], bodyHtml, robots }) {
  const canonical = `${site.domain}${canonicalPath}`;
  const ld = jsonLd
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`)
    .join("\n");
  return `<!DOCTYPE html>
<html class="scroll-smooth" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}"/>
${robots ? `<meta name="robots" content="${esc(robots)}"/>` : ""}
<link rel="canonical" href="${canonical}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(description)}"/>
<meta property="og:url" content="${canonical}"/>
<meta name="twitter:card" content="summary_large_image"/>
${HEAD_STYLES}
${ld}
</head>
<body class="bg-background text-on-background font-body-md selection:bg-primary/20">
${header()}
<main class="pt-20">${bodyHtml}</main>
${footer()}
${SCRIPTS}
</body></html>`;
}

export { site };
