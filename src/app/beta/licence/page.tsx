import type { Metadata } from "next";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import { betaLicence } from "@/data/siteStatus";

// The approved beta evaluation licence text, published read-only for testers and operators (owner decision,
// 2026-11-05: a stable URL, version and effective date shown, and a downloadable text file that matches the
// approved bytes; whether the path itself carries the version is the open owner question O2, C R195).
// The page links to public/legal/LYNXDOCK-BETA-EVAL-1.0.txt rather than rendering it as HTML: what
// the reader opens IS the approved file, byte for byte, and the licence's own wording stays out of the site-wide
// page-text checks, which it was never written for. The version, effective date and SHA-256 shown here are computed
// from that file at build time, so the page and the file can never disagree. Like the whole tester hub, it is
// unlisted: noindex and absent from the sitemap. The copy installed with a build governs that build (section 11).
export const metadata: Metadata = {
  title: "Beta evaluation licence",
  description:
    "The LynxDock Beta Evaluation Licence (LYNXDOCK-BETA-EVAL-1.0) for the 0.3.0 beta builds: the full text, its version, effective date and a downloadable copy.",
  robots: { index: false, follow: false },
};

const FILE = "LYNXDOCK-BETA-EVAL-1.0.txt";
const text = readFileSync(join(process.cwd(), "public", "legal", FILE), "utf8");
const sha256 = createHash("sha256").update(text, "utf8").digest("hex");
const effectiveDate = (text.match(/^Effective date: (.+)$/m) || [])[1];
// Fail the build rather than publish a page that misstates the file (C R195 W1).
if (!effectiveDate || effectiveDate.includes("[[")) throw new Error(`${FILE}: no effective date`);
if (!text.includes(`Licence ID: ${betaLicence.id}`)) throw new Error(`${FILE}: licence ID is not ${betaLicence.id}`);

export default function BetaLicencePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={betaLicence.name}
        intro={
          <p>
            Version 1.0 (licence ID {betaLicence.id}), effective {effectiveDate}. This licence covers the LynxDock
            0.3.0 beta builds; the copy installed with a build is the one that governs that build. No build has been
            released with this version: the 0.3.0 installers ship{" "}
            <Link href="/beta/licence/v1.1/" className="text-link">
              version 1.1
            </Link>
            , which adds beta access keys. Members who take
            part with the older 0.2.6 app do not accept this licence: they acknowledge the{" "}
            <Link href="/beta/participation/" className="text-link">
              beta participation requirements
            </Link>{" "}
            instead.
          </p>
        }
      />

      <div className="wrap-narrow flex flex-col gap-6 py-12 sm:py-16">
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
          ({FILE}, {text.length.toLocaleString("en-US")} bytes). Its SHA-256 is{" "}
          <code className="break-all text-sm">{sha256}</code>.
        </p>
        <p className="body">
          Back to the <Link href="/beta/" className="text-link">tester hub</Link>.
        </p>
      </div>
    </>
  );
}
