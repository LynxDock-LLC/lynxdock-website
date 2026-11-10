import type { Metadata } from "next";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import { betaLicence, betaLicenceKeyed, betaLicenceKeyed12 } from "@/data/siteStatus";

// Version 1.2 of the beta evaluation licence, for the keyed 0.3.1 beta builds that ship with it (owner, 2026-11-10;
// C R250 GO on the text, sha256 931a4482...). The same terms as version 1.1; its references to beta communities and
// participants say 0.3.0 or 0.3.1. It has its own address beside versions 1.0 and 1.1, which stay exactly as published
// (O2: a published URL keeps serving the version the shipping licence names). Same pattern as /beta/licence/v1.1/: the
// page links the plain-text file rather than rendering it, and the effective date, size and SHA-256 are read from that
// file at build time, so the page and the file cannot disagree. Unlisted like the whole tester hub: noindex and absent
// from the sitemap.
export const metadata: Metadata = {
  title: "Beta evaluation licence, version 1.2",
  description:
    "Version 1.2 of the LynxDock Beta Evaluation Licence (LYNXDOCK-BETA-EVAL-1.2), for the keyed LynxDock 0.3.1 beta builds that ship with it: the full text, its version, effective date and a downloadable copy.",
  robots: { index: false, follow: false },
};

const FILE = betaLicenceKeyed12.file;
const bytes = readFileSync(join(process.cwd(), "public", "legal", FILE));
const text = bytes.toString("utf8");
const sha256 = createHash("sha256").update(bytes).digest("hex");
const effectiveDate = (text.match(/^Effective date: (.+)$/m) || [])[1];
// Fail the build rather than publish a page that misstates the file (C R195 W1).
if (!text.includes(`Licence ID: ${betaLicenceKeyed12.id}`)) throw new Error(`${FILE}: licence ID is not ${betaLicenceKeyed12.id}`);
if (text.includes("INTERNAL FIXTURE")) throw new Error(`${FILE}: is a fixture, not the reviewed text`);
if (!effectiveDate || effectiveDate.includes("[[")) throw new Error(`${FILE}: no effective date`);

export default function BetaLicenceV12Page() {
  const k = betaLicenceKeyed12;
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={`${k.name}, version ${k.version}`}
        intro={
          <p>
            Version {k.version} (licence ID {k.id}), effective {effectiveDate}. This version covers the keyed LynxDock
            0.3.1 beta builds that ship with it, the ones that ask for a{" "}
            <Link href="/beta/#keys" className="text-link">
              beta access key
            </Link>
            . Its terms are those of version 1.1. Only its scope changed, from the keyed 0.3.0 builds to the keyed 0.3.1
            builds, and its references to beta communities and participants (sections 12, 13 and 17) now say 0.3.0 or
            0.3.1. Version {betaLicenceKeyed.version} ({betaLicenceKeyed.id}), for the keyed 0.3.0 builds, and version 1.0 (
            {betaLicence.id}) stay published unchanged at their own addresses:{" "}
            <Link href={betaLicenceKeyed.textUrl} className="text-link">
              version {betaLicenceKeyed.version}
            </Link>{" "}
            and{" "}
            <Link href="/beta/licence/" className="text-link">
              version 1.0
            </Link>
            .
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
