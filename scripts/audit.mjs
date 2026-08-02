// Structural audit across every prerendered page.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

async function walk(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p);
  }
  return acc;
}
const files = (await walk(".next/server/app")).filter((f) => !f.includes("_not-found"));
const fails = [];
let forms = 0;

for (const f of files) {
  const html = await readFile(f, "utf8");
  const route = "/" + path.relative(".next/server/app", f).replace(/\.html$/, "").replace(/^index$/, "");
  const body = html.split(/<script id="__NEXT_DATA__"|<script>self\.__next_f/)[0];
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  const nForms = (body.match(/<form[\s>]/g) || []).length;
  const nav = /class="[^"]*dd-wrap/.test(body);
  const footer = /<footer[\s>]/.test(body);
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || "";
  forms += nForms;

  if (h1 !== 1) fails.push(`${route}: expected 1 <h1>, found ${h1}`);
  if (nForms < 1) fails.push(`${route}: no <form> rendered`);
  if (!nav) fails.push(`${route}: nav dropdowns missing`);
  if (!footer) fails.push(`${route}: footer missing`);
  if (!title) fails.push(`${route}: empty <title>`);
  if (html.includes("SLOT:")) fails.push(`${route}: unrendered slot marker leaked`);
  if (/\u2014/.test(body)) fails.push(`${route}: em dash in body copy`);
}

console.log(`pages audited : ${files.length}`);
console.log(`forms rendered: ${forms}`);
console.log(`failures      : ${fails.length}`);
fails.slice(0, 20).forEach((f) => console.log("  " + f));
if (fails.length > 20) console.log(`  ...and ${fails.length - 20} more`);
process.exit(fails.length ? 1 : 0);
