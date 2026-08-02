// Composition boundary between the HTML body builders (lib/templates/pages.mjs)
// and the React chrome.
//
// hero() sits at the top level of every body, so it emits a marker that
// components/PageBody.tsx splits on and replaces with the real <Hero> component
// (next/image, priority LCP, typed props).
//
// quoteForm() is nested inside the sticky rail that twoCol() builds, so a
// marker there would leave unbalanced markup on either side of the split.
// It emits the real form markup instead, and components/QuoteFormEnhancer.tsx
// attaches the submit behaviour on the client. Same DOM as the previous build,
// so the rail has no layout shift and the form works before hydration.

const encode = (props) => Buffer.from(JSON.stringify(props ?? {}), "utf8").toString("base64");
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function hero(props = {}) {
  return `<!--SLOT:HERO:${encode(props)}-->`;
}

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

export function page({ title, description, canonicalPath, jsonLd = [], bodyHtml, robots, preloadImage }) {
  return {
    meta: { title, description, canonicalPath, robots, preloadImage },
    jsonLd: jsonLd.filter(Boolean),
    bodyHtml,
  };
}
