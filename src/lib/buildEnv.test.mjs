// buildEnv.test.mjs — a preview build can never send a form or load the site's analytics (node --test).
//
// Owner instruction (2026-10-27): keep previews disconnected from production submissions. Cloudflare Pages may give a
// preview build the same NEXT_PUBLIC_FORM_ENDPOINT as production, so the guard cannot rely on the variable being
// unset. It works at build time: next.config.mjs inlines only what browserBuildValues() returns, which is empty for
// every preview. These tests pin that function and the code that consumes it. scripts/check-site.mjs proves the same
// on a real build: run `npm run build` and `npm run check` with NEXT_PUBLIC_FORM_ENDPOINT set, and it fails if the
// value, any Formspree endpoint or the beacon appears anywhere in out/, or if any form can be sent.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { browserBuildValues, isProductionHost, PRODUCTION_HOSTS, resolveSiteEnv } from "./buildEnv.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const read = (...p) => readFileSync(join(root, ...p), "utf8");

const ENDPOINT = "https://formspree.io/f/production-endpoint";
const TOKEN = "production-beacon-token";
const withSecrets = (extra) => ({ NEXT_PUBLIC_FORM_ENDPOINT: ENDPOINT, NEXT_PUBLIC_CF_BEACON_TOKEN: TOKEN, ...extra });

test("a preview build gets no endpoint and no token, even when both are set", () => {
  for (const env of [
    withSecrets({ CF_PAGES_BRANCH: "site/privacy-and-18plus" }),
    withSecrets({}),
    withSecrets({ CF_PAGES_BRANCH: "main", LYNXDOCK_SITE_ENV: "preview" }),
    withSecrets({ CF_PAGES_BRANCH: "Main" }),
  ]) {
    assert.equal(resolveSiteEnv(env), "preview", JSON.stringify(env));
    assert.deepEqual(browserBuildValues(env), {
      LYNXDOCK_BUILD_ENV: "preview",
      LYNXDOCK_FORM_ENDPOINT: "",
      LYNXDOCK_CF_BEACON_TOKEN: "",
    });
  }
});

test("only a production build passes the endpoint and token through", () => {
  for (const env of [withSecrets({ CF_PAGES_BRANCH: "main" }), withSecrets({ LYNXDOCK_SITE_ENV: "production" })]) {
    assert.deepEqual(browserBuildValues(env), {
      LYNXDOCK_BUILD_ENV: "production",
      LYNXDOCK_FORM_ENDPOINT: ENDPOINT,
      LYNXDOCK_CF_BEACON_TOKEN: TOKEN,
    });
  }
  assert.equal(browserBuildValues({ CF_PAGES_BRANCH: "main" }).LYNXDOCK_FORM_ENDPOINT, "", "production without an endpoint");
});

test("the bundle only ever sees the guarded values", () => {
  const config = read("next.config.mjs");
  assert.match(config, /env: browserBuildValues\(process\.env\)/, "next.config inlines the guarded values");
  for (const file of [
    ["src", "components", "site", "EnquiryForm.tsx"],
    ["src", "components", "Analytics.tsx"],
    ["src", "lib", "siteEnv.ts"],
  ]) {
    const code = read(...file).replace(/^\s*\/\/.*$/gm, "");
    assert.ok(!/process\.env\.NEXT_PUBLIC_/.test(code), `${file.join("/")} must not read a NEXT_PUBLIC_ variable directly`);
  }
});

test("a form that is not connected cannot send: no action, no fetch, send button off", () => {
  const form = read("src", "components", "site", "EnquiryForm.tsx");
  assert.match(form, /const CONNECTED = !PREVIEW_BUILD && ENDPOINT !== "";/);
  assert.match(form, /action=\{CONNECTED \? ENDPOINT : undefined\}/, "only a connected form has an action");
  assert.match(form, /disabled=\{!CONNECTED \|\| status === "submitting"\}/, "the send button is off when not connected");
  // The only fetch comes after the CONNECTED guard at the top of onSubmit.
  assert.equal((form.match(/fetch\(/g) ?? []).length, 1, "one network call in the form");
  const submit = form.slice(form.indexOf("async function onSubmit"));
  assert.ok(submit.indexOf("if (!CONNECTED)") >= 0, "onSubmit checks CONNECTED");
  assert.ok(submit.indexOf("if (!CONNECTED)") < submit.indexOf("fetch("), "before any network call");
  assert.match(form, /This is a preview build, so its forms are switched off\./, "a preview says why");
});

test("the site's analytics beacon only loads with a token, which previews never get", () => {
  const analytics = read("src", "components", "Analytics.tsx");
  assert.match(analytics, /const TOKEN = process\.env\.LYNXDOCK_CF_BEACON_TOKEN \?\? "";/);
  assert.match(analytics, /if \(!TOKEN \|\| !onProductionHost\) return null;/);
});

test("the production build runs the production check, so placeholders cannot be deployed", () => {
  // Cloudflare Pages runs `npm run build`; without this gate a merge to main would deploy [OWNER] fields and
  // [UNCONFIRMED] claims (worker C R175). The gate runs check-site --production only for a production build.
  const pkg = JSON.parse(read("package.json"));
  assert.match(pkg.scripts.build, /^next build && node scripts\/production-gate\.mjs$/);
  const gate = read("scripts", "production-gate.mjs");
  assert.match(gate, /resolveSiteEnv\(process\.env\) !== "production"/, "the gate uses the shared production rule");
  assert.match(gate, /"scripts\/check-site\.mjs", "--production"/, "it runs the production check");
  assert.match(gate, /process\.exit\(r\.status \|\| 1\)/, "a failed check fails the build");
});

test("one analytics beacon: the site's own, rendered once, production only", () => {
  // Owner decision 2026-10-30: one production beacon, none on previews.
  const layout = read("src", "app", "layout.tsx");
  assert.equal((layout.match(/<Analytics \/>/g) ?? []).length, 1, "the layout renders the site's beacon once");
  const analytics = read("src", "components", "Analytics.tsx").replace(/^\s*\/\/.*$/gm, "");
  assert.equal((analytics.match(/beacon\.min\.js/g) ?? []).length, 1, "one beacon script");
  const check = read("scripts", "check-site.mjs");
  assert.match(check, /script chunks reference the beacon; exactly one \(the site's own\) is allowed/, "check-site allows one beacon chunk");
  assert.match(check, /a production build must carry the site's beacon token/, "check-site refuses a production build with no token");
  assert.match(check, /a production page's HTML carries an analytics beacon/, "check-site refuses a beacon in server-rendered HTML");
});

test("the beacon runs only on the production hosts, decided in the browser", () => {
  // Owner instruction 2026-10-30/31: the hostname boundary as well as the build environment.
  assert.deepEqual(PRODUCTION_HOSTS, ["lynxdock.app", "www.lynxdock.app"]);
  for (const h of ["lynxdock.app", "www.lynxdock.app", "LYNXDOCK.APP", "WWW.lynxdock.app"]) assert.equal(isProductionHost(h), true, h);
  for (const h of [
    "localhost",
    "127.0.0.1",
    "lynxdock-website.pages.dev",
    "b69b6f82.lynxdock-website.pages.dev",
    "site-privacy-and-18plus.lynxdock-website.pages.dev",
    "lynxdock.app.example.com",
    "evil-lynxdock.app",
    "app.lynxdock.app",
    "",
    null,
    undefined,
  ]) assert.equal(isProductionHost(h), false, String(h));
  const analytics = read("src", "components", "Analytics.tsx");
  assert.match(analytics, /^"use client";/, "the beacon component runs in the browser");
  assert.match(analytics, /setOnProductionHost\(isProductionHost\(window\.location\.hostname\)\)/, "it checks the page's own hostname");
  assert.match(analytics, /useState\(false\)/, "nothing loads before the check");
});
