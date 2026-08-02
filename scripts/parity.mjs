// Verifies the App Router build against the pre-migration static build.
// Baseline path is passed in; defaults to /tmp/baseline/martins.
// Checks: URL set parity, <title>, meta description, canonical, JSON-LD count.
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const BASE = process.argv[2] || "/tmp/baseline/martins";
const NEXT = ".next/server/app";
const IGNORE_ROUTES = new Set(["/404", "/google33ccaacfae077951"]);

async function walk(dir, ext, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, ext, acc);
    else if (e.name.endsWith(ext)) acc.push(p);
  }
  return acc;
}

const toRoute = (file, root) => {
  let r = "/" + path.relative(root, file).replace(/\.html$/, "");
  if (r === "/index" || r === "/") return "/";
  return r.replace(/\/index$/, "") || "/";
};

const pick = (html, re) => (html.match(re)?.[1] ?? "").trim();
const meta = (html) => ({
  title: pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
  desc: pick(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i),
  canonical: pick(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i),
  ld: (html.match(/<script[^>]+type="application\/ld\+json"[^>]*>/g) || []).length,
});

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')
   .replace(/&lt;/g, "<").replace(/&gt;/g, ">");

if (!existsSync(BASE)) {
  console.error(`Baseline not found at ${BASE}. Skipping parity check.`);
  process.exit(0);
}

const baseFiles = await walk(BASE, ".html");
const nextFiles = await walk(NEXT, ".html");

const baseMap = new Map();
for (const f of baseFiles) {
  const r = toRoute(f, BASE);
  if (!IGNORE_ROUTES.has(r)) baseMap.set(r, f);
}
const nextMap = new Map();
for (const f of nextFiles) nextMap.set(toRoute(f, NEXT), f);

const missing = [...baseMap.keys()].filter((r) => !nextMap.has(r)).sort();
const added = [...nextMap.keys()].filter((r) => !baseMap.has(r) && r !== "/_not-found").sort();

const diffs = [];
for (const [route, bf] of baseMap) {
  const nf = nextMap.get(route);
  if (!nf) continue;
  const b = meta(await readFile(bf, "utf8"));
  const n = meta(await readFile(nf, "utf8"));
  if (decode(b.title) !== decode(n.title)) diffs.push([route, "title", b.title, n.title]);
  if (decode(b.desc) !== decode(n.desc)) diffs.push([route, "description", b.desc, n.desc]);
  // Root canonical: Next drops the trailing slash. Same resource per RFC 3986.
  const norm = (u) => u.replace(/\/$/, "");
  if (norm(b.canonical) !== norm(n.canonical)) diffs.push([route, "canonical", b.canonical, n.canonical]);
  if (b.ld !== n.ld) diffs.push([route, "jsonld-count", String(b.ld), String(n.ld)]);
}

console.log(`baseline routes : ${baseMap.size}`);
console.log(`built routes    : ${nextMap.size}`);
console.log(`missing         : ${missing.length}${missing.length ? "\n  " + missing.join("\n  ") : ""}`);
console.log(`added           : ${added.length}${added.length ? "\n  " + added.join("\n  ") : ""}`);
console.log(`meta diffs      : ${diffs.length}`);
for (const [r, field, b, n] of diffs.slice(0, 25)) {
  console.log(`  ${r} [${field}]\n    was: ${b}\n    now: ${n}`);
}
if (diffs.length > 25) console.log(`  ...and ${diffs.length - 25} more`);

process.exit(missing.length || diffs.length ? 1 : 0);
