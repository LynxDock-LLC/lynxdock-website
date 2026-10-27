// Post-build checks for the static export in out/ (node scripts/check-site.mjs). No dependencies.
//
// It reads the generated HTML, so it checks what would be served, not the source. For every page:
// one <h1>, the main/header/footer landmarks, lang, unique ids, ARIA and label references that resolve,
// images with alt text and explicit dimensions, and internal links and #fragments that resolve to a built page
// (or to a rule in public/_redirects). Site-wide: preview builds are noindex, the tester hub is always noindex,
// download links exist only for the one release this site serves, the push-to-talk scope is stated where
// testers read it, and retired claims do not reappear on the primary routes.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = join(process.cwd(), "out");
const PREVIEW = process.argv.includes("--production") ? false : true;
if (!existsSync(OUT)) {
  console.error("out/ not found: run `npm run build` first.");
  process.exit(2);
}

const PRIMARY = [
  "/",
  "/products/lynxdock/",
  "/products/lynxdock-host/",
  "/technology/",
  "/company/",
  "/download/",
  "/beta/",
  "/blog/",
  "/blog/a-clearer-path-to-beta/",
  "/docs/",
  "/docs/getting-started/",
  "/roadmap/",
  "/releases/",
  "/support/",
];

const errors = [];
const warn = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(OUT);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const routeOf = (file) => {
  const rel = "/" + relative(OUT, file).split(sep).join("/");
  if (rel.endsWith("/index.html")) return rel.slice(0, -"index.html".length);
  return rel;
};
const pages = new Map(htmlFiles.map((f) => [routeOf(f), readFileSync(f, "utf8")]));

const redirects = new Map(
  readFileSync(join(process.cwd(), "public", "_redirects"), "utf8")
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => l.trim().split(/\s+/))
    .map(([from, to]) => [from, to]),
);

const ids = (html) => [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const attrs = (html, name) => [...html.matchAll(new RegExp(`\\s${name}="([^"]*)"`, "g"))].map((m) => m[1]);
const strip = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");

function resolveTarget(path) {
  if (pages.has(path)) return path;
  if (pages.has(path + "/")) return path + "/";
  if (files.some((f) => "/" + relative(OUT, f).split(sep).join("/") === path)) return path;
  return null;
}

// The draft post is built only in preview builds; in production its absence is correct.
const DRAFT = "/blog/a-clearer-path-to-beta/";
for (const route of PRIMARY) {
  if (!PREVIEW && route === DRAFT) {
    if (pages.has(route)) fail(route, "draft post was built in a production build");
    continue;
  }
  if (!pages.has(route)) fail(route, "primary route was not built");
}

for (const [route, raw] of pages) {
  if (route === "/404.html" || route === "/_not-found/") continue;
  const html = strip(raw);

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(route, `has ${h1s} <h1> elements`);
  for (const tag of ["main", "header", "footer"]) {
    if (!new RegExp(`<${tag}[\\s>]`).test(html)) fail(route, `no <${tag}> landmark`);
  }
  if (!/<html[^>]*\slang="en"/.test(raw)) fail(route, "no lang on <html>");

  const all = ids(html);
  const seen = new Set();
  for (const id of all) {
    if (seen.has(id)) fail(route, `duplicate id "${id}"`);
    seen.add(id);
  }
  for (const name of ["aria-controls", "aria-labelledby", "aria-describedby", "for"]) {
    for (const v of attrs(html, name)) {
      for (const ref of v.split(/\s+/).filter(Boolean)) {
        if (!seen.has(ref)) fail(route, `${name}="${ref}" does not match an id`);
      }
    }
  }

  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt="/.test(img)) fail(route, `image without alt: ${img.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(img) || !/\sheight="\d+"/.test(img)) fail(route, `image without width/height: ${img.slice(0, 80)}`);
    const src = (img.match(/\ssrc="([^"]+)"/) || [])[1];
    if (src && src.startsWith("/") && !resolveTarget(decodeURI(src.split("?")[0]))) fail(route, `image not found: ${src}`);
  }

  for (const href of attrs(html, "href")) {
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    if (href.startsWith("/_next/")) continue;
    let [path, frag] = href.split("#");
    if (path === "") path = route;
    if (!path.startsWith("/")) continue;
    let target = resolveTarget(path);
    let targetHtml = target ? pages.get(target) : null;
    if (!target) {
      const r = redirects.get(path);
      if (!r) {
        fail(route, `link does not resolve: ${href}`);
        continue;
      }
      // A redirected URL also has its static fallback page, which must exist.
      if (!resolveTarget(path)) fail(route, `redirected URL has no fallback page: ${path}`);
      continue;
    }
    if (frag && targetHtml && !ids(strip(targetHtml)).includes(frag)) fail(route, `fragment #${frag} not found on ${target}`);
  }

  const robots = (raw.match(/<meta name="robots" content="([^"]+)"/) || [])[1] || "";
  if (PREVIEW && !/noindex/.test(robots)) fail(route, "preview build page is indexable");
  if (route === "/beta/" && !/noindex/.test(robots)) fail(route, "the tester hub must be noindex");
}

// Download links: only the release this site serves, only on the tester hub, all re-verified 0.2.6 objects.
for (const [route, html] of pages) {
  const links = [...html.matchAll(/href="(https:\/\/beta-dl\.lynxdock\.app\/[^"]+)"/g)].map((m) => m[1]);
  if (!links.length) continue;
  if (route !== "/beta/") fail(route, `download links outside the tester hub: ${links.length}`);
  for (const l of links) {
    if (!l.includes("/beta/0.2.6/facc36a/")) fail(route, `download link outside the published 0.2.6 round: ${l}`);
  }
  if (links.length !== 4) fail(route, `expected the 4 published 0.2.6 installers, found ${links.length}`);
}

// The push-to-talk scope, in body text, where members and testers read it.
const PTT = "Push-to-talk is foreground-only. The LynxDock window must have focus.";
for (const route of ["/beta/", "/products/lynxdock/", "/docs/getting-started/", "/releases/"]) {
  const text = (pages.get(route) || "").replace(/<[^>]+>/g, "").replace(/&#x27;|&rsquo;/g, "'");
  if (!text.includes(PTT)) fail(route, "the push-to-talk scope statement is missing");
}

// The current release state, in the owner's exact wording, wherever the site states it.
const STATEMENT = "The next tester release is in qualification and is not yet available for distribution.";
for (const route of ["/", "/beta/", "/releases/", "/roadmap/"]) {
  const text = (pages.get(route) || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ");
  if (!text.includes(STATEMENT)) fail(route, "the current-state statement is missing or reworded");
}

// Only published releases (and the provisional next number) may be named. An allow-list, so this script never
// has to name an unpublished build.
const ALLOWED_VERSIONS = new Set(["0.2.6", "0.3.0"]);
const ALLOWED_TAGS = new Set(["desktop-v0.2.6"]);
for (const [route, raw] of pages) {
  for (const v of raw.match(/\b0\.[23]\.\d+\b/g) ?? []) {
    if (!ALLOWED_VERSIONS.has(v)) fail(route, `names release ${v}, which is not a published release`);
  }
  for (const t of raw.match(/desktop-v\d+\.\d+\.\d+/g) ?? []) {
    if (!ALLOWED_TAGS.has(t)) fail(route, `names tag ${t}, which is not a published release`);
  }
}

// Owner-only facts: visible [OWNER: ...] fields are expected in review builds and must all be filled before a
// production build can pass.
for (const [route, raw] of pages) {
  const text = raw.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  const owner = text.match(/\[OWNER:/g) ?? [];
  if (owner.length) {
    if (PREVIEW) warn.push(`${route}: ${owner.length} [OWNER] field(s) still to fill before production`);
    else fail(route, `${owner.length} [OWNER] field(s) unfilled in a production build`);
  }
}

// Beta eligibility (owner decision 2026-10-26): 18+ for EVERYONE in the beta, self-declared, never presented as
// verified, and never worded as if it applied only to people who apply through this site.
const ELIGIBILITY = "Everyone in the LynxDock beta must be 18 or older.";
const SCOPE = "people a community invites directly, and people who run a community server with LynxDock Host";
for (const route of ["/beta/", "/download/", "/privacy/", "/docs/getting-started/"]) {
  const text = (pages.get(route) || "").replace(/<[^>]+>/g, " ").replace(/&#x27;|&rsquo;/g, "'").replace(/\s+/g, " ");
  if (!text.includes(ELIGIBILITY)) fail(route, "the 18+ eligibility statement is missing");
  if (!/(does not|doesn't) verify age/.test(text)) fail(route, "the page does not say that age is not verified");
  if (!text.includes(SCOPE)) fail(route, "the eligibility scope (invited members and server operators) is missing");
  if (/Testers must be 18/.test(text)) fail(route, "old applicant-only wording is back");
}
{
  const hub = pages.get("/beta/") || "";
  if (!/id="requirements"/.test(hub)) fail("/beta/", "the beta requirements section is missing");
  if (!/name="termsAcknowledged"/.test(hub) || !/name="ageConfirmed"/.test(hub))
    fail("/beta/", "the beta requirements confirmation form is missing its two self-declaration boxes");
}
{
  // Older-app (0.2.6) acceptance on the hub (owner request 2026-10-27): the steps and the operator's part are there.
  const hub = (pages.get("/beta/") || "").replace(/<script[\s\S]*?<\/script>/g, "");
  const text = hub.replace(/<[^>]+>/g, " ").replace(/&#x27;|&rsquo;/g, "'").replace(/\s+/g, " ");
  if (!/id="confirm"/.test(hub) || !/id="licence"/.test(hub)) fail("/beta/", "the older-app confirmation or the licence card is missing");
  if (!text.includes("wait until they tell you they have confirmed")) fail("/beta/", "the operator's step for older-app members is missing");
}
{
  // Privacy (owner direction 2026-10-25): nothing about licensing; the in-app acceptance record is described as
  // kept on the device and never sent.
  const privacy = (pages.get("/privacy/") || "").replace(/<script[\s\S]*?<\/script>/g, "");
  const text = privacy.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  if (/licen[cs]/i.test(text)) fail("/privacy/", "the privacy notice must not mention licensing");
  if (!text.includes("never sent to LynxDock or to any server")) fail("/privacy/", "the device-only in-app acceptance record is not described");
}
// Every built page (all of them, legacy pages and blog posts included): a sentence about age that mentions
// verifying, enforcing, checking, validating or proving it must be a negation. The policy is enforced nowhere, so
// no sentence may suggest otherwise. (It reads rendered page text; messages that only appear after interaction,
// such as the form's validation errors, are pinned by src/data/betaStanding.test.mjs instead.)
const AGE_CONTEXT = /\bages?\b|\b18 or older\b|\b18\+|\bover 18\b|\bunder 18\b/i;
const CONTROL_WORD = /\bverif\w*|\benforc\w*|\bcheck(s|ed|ing)?\b|\bvalidat\w*|\bprov(e|es|en|ing)\b/i;
const NEGATION = /\b(not|no|never|nothing|doesn't|cannot|can't)\b/i;
let sentencesChecked = 0;
for (const [route, raw] of pages) {
  const text = raw.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/&#x27;|&rsquo;/g, "'");
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    if (!AGE_CONTEXT.test(sentence)) continue;
    sentencesChecked++;
    if (CONTROL_WORD.test(sentence) && !NEGATION.test(sentence)) {
      fail(route, `a sentence could imply age verification or enforcement: "${sentence.trim().slice(0, 120)}"`);
    }
  }
}
console.log(`Age wording: ${sentencesChecked} age-related sentence(s) checked across all ${pages.size} pages.`);

// Retired claims must not come back on the primary routes.
const RETIRED = [/Quick Call/i, /\bP2P\b/, /(?<!not )peer-to-peer (calls|rooms)/i, /vs Discord/i, /exactly once/i, /Linux and macOS builds/i];
for (const route of PRIMARY) {
  const text = (pages.get(route) || "").replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  for (const re of RETIRED) if (re.test(text)) fail(route, `retired claim present: ${re}`);
}

// Nothing private in the export.
for (const f of files) {
  const rel = relative(OUT, f);
  if (/(^|[\\/])\.env|\.pem$|AAA-|CLAUDE-/.test(rel)) fail("/" + rel, "private or tooling file in the export");
}

if (!pages.has("/blog/a-clearer-path-to-beta/") && PREVIEW) warn.push("draft post not built in this preview build");

console.log(`Checked ${pages.size} pages (${PREVIEW ? "preview" : "production"} build).`);
for (const w of warn) console.log(`warning: ${w}`);
if (errors.length) {
  console.log(`${errors.length} problem(s):`);
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}
console.log("All checks passed.");
