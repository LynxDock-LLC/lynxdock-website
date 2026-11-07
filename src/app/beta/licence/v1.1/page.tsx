import type { Metadata } from "next";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import Fixture from "@/components/site/Fixture";
import { betaLicence, betaLicenceKeyed } from "@/data/siteStatus";

// Version 1.1 of the beta evaluation licence, for the keyed 0.3.0 beta builds that ship with it (licence section 1;
// approved by the owner by hash 13a83f87... on 2026-11-06; ADR-0029 decision K8b, 2026-11-06: the key
// clauses get their own licence version). It has its own address beside version 1.0, which stays exactly as
// published at /beta/licence/ (O2: a published URL keeps serving the version the shipping licence names). Same
// pattern as /beta/licence/: the page links the plain-text file rather than rendering it, and the effective date,
// size and SHA-256 are read from that file at build time, so the page and the file cannot disagree.
//
// Until the reviewed text replaces public/legal/LYNXDOCK-BETA-EVAL-1.1.txt, that file is an INTERNAL FIXTURE with no
// licence terms: the page then shows fixture markers in place of the effective date, and scripts/check-site.mjs fails
// a production build. Unlisted like the whole tester hub: noindex and absent from the sitemap.
export const metadata: Metadata = {
  title: "Beta evaluation licence, version 1.1",
  description:
    "Version 1.1 of the LynxDock Beta Evaluation Licence (LYNXDOCK-BETA-EVAL-1.1), for the keyed LynxDock 0.3.0 beta builds that ship with it: the full text, its version, effective date and a downloadable copy.",
  robots: { index: false, follow: false },
};

const FILE = betaLicenceKeyed.file;
const bytes = readFileSync(join(process.cwd(), "public", "legal", FILE));
const text = bytes.toString("utf8");
const sha256 = createHash("sha256").update(bytes).digest("hex");
const FIXTURE = text.includes("INTERNAL FIXTURE");
const effectiveDate = (text.match(/^Effective date: (.+)$/m) || [])[1];
// Fail the build rather than publish a page that misstates the file (C R195 W1). A fixture has no effective date by
// design; the reviewed text must have one.
if (!text.includes(`Licence ID: ${betaLicenceKeyed.id}`)) throw new Error(`${FILE}: licence ID is not ${betaLicenceKeyed.id}`);
if (!FIXTURE && (!effectiveDate || effectiveDate.includes("[["))) throw new Error(`${FILE}: no effective date`);

export default function BetaLicenceV11Page() {
  const k = betaLicenceKeyed;
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={`${k.name}, version ${k.version}`}
        intro={
          <p>
            Version {k.version} (licence ID {k.id}), effective{" "}
            {FIXTURE ? <Fixture>the effective date, from the reviewed version {k.version} text</Fixture> : effectiveDate}.
            This version covers the keyed LynxDock 0.3.0 beta builds that ship with it, the ones that ask for a{" "}
            <Link href="/beta/#keys" className="text-link">
              beta access key
            </Link>
            . Version 1.0 ({betaLicence.id}), for the beta builds that need no key, stays published unchanged at{" "}
            <Link href="/beta/licence/" className="text-link">
              its own address
            </Link>
            .
          </p>
        }
      />

      <div className="wrap-narrow flex flex-col gap-6 py-12 sm:py-16">
        {FIXTURE && (
          <p className="body">
            <Fixture>
              the reviewed version {k.version} text replaces public/legal/{FILE}; the file linked below is a
              placeholder with no licence terms
            </Fixture>
          </p>
        )}
        <p className="body">
          The licence is published as one plain-text file, so what you read is exactly what ships:
        </p>
        <p className="body">
          <a href={`/legal/${FILE}`} className="text-link">
            Read the licence text
          </a>{" "}
          (opens the plain-text file) or{" "}
          <a href={`/legal/${FILE}`} download className="text-link">
            download it
          </a>{" "}
          ({FILE}, {bytes.length.toLocaleString("en-US")} bytes). Its SHA-256 is{" "}
          <code className="break-all text-sm">{sha256}</code>.
        </p>
        <p className="body">
          Back to the <Link href="/beta/" className="text-link">tester hub</Link>.
        </p>
      </div>
    </>
  );
}
