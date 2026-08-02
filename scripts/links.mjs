// Cross-repo link and asset integrity check against a finished build.
import { readdir, readFile, access } from "node:fs/promises";
import path from "node:path";

const NEXT = ".next/server/app";
async function walk(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}
const toRoute = (f) => {
  const r = "/" + path.relative(NEXT, f).replace(/\.html$/, "");
  return r === "/index" ? "/" : r;
};
const files = (await walk(NEXT)).filter((f) => !f.includes("_not-found"));
const routes = new Set(files.map(toRoute));
routes.add("/");

const redirects = new Set(
  [...(await readFile("next.config.mjs", "utf8")).matchAll(/source: "([^"]+)"/g)].map((m) => m[1])
);

const deadLinks = new Map();
const missingAssets = new Map();
let links = 0, assets = 0;

for (const f of files) {
  const html = (await readFile(f, "utf8")).split(/<script>self\.__next_f/)[0];
  const from = toRoute(f);
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1].replace(/\/$/, "") || "/";
    if (href.startsWith("/api") || href.startsWith("/_next")) continue;
    if (/\.[a-z0-9]{2,5}$/i.test(href)) {           // static file reference
      assets++;
      try { await access("public" + href); } catch {
        missingAssets.set(href, (missingAssets.get(href) || new Set()).add(from));
      }
      continue;
    }
    links++;
    if (!routes.has(href) && !redirects.has(href)) {
      deadLinks.set(href, (deadLinks.get(href) || new Set()).add(from));
    }
  }
  for (const m of html.matchAll(/src="(\/[^"?]*)"/g)) {
    const src = m[1];
    if (src.startsWith("/_next") || src.startsWith("/api")) continue;
    assets++;
    try { await access("public" + src); } catch {
      missingAssets.set(src, (missingAssets.get(src) || new Set()).add(from));
    }
  }
}

console.log(`  routes: ${routes.size}  internal links: ${links}  asset refs: ${assets}`);
console.log(`  dead internal links : ${deadLinks.size}`);
for (const [href, from] of [...deadLinks].slice(0, 8)) console.log(`     ${href}  <- ${[...from].slice(0,3).join(", ")}`);
console.log(`  missing local assets: ${missingAssets.size}`);
for (const [src, from] of [...missingAssets].slice(0, 8)) console.log(`     ${src}  <- ${[...from].slice(0,2).join(", ")}`);
process.exit(deadLinks.size || missingAssets.size ? 1 : 0);
