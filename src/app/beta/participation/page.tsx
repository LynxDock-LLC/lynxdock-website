import type { Metadata } from "next";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import { participationDocument } from "@/data/siteStatus";
import { supportEmail } from "@/data/siteShell";

// The beta participation requirements that members on an earlier (0.2.6) build acknowledge on the tester hub
// (licence LYNXDOCK-BETA-EVAL-1.0, section 17; owner decisions 2026-11-05: a self-contained document, option A,
// hosted on this site, its version and effective date shown). Like /beta/licence/, this page links to the published
// plain-text file rather than restating it, so the document has exactly one published wording and what the reader
// opens is the file itself, byte for byte (C R195 W2); the version, effective date and SHA-256 shown here are read
// from that file at build time. Unlisted like the whole tester hub: noindex and absent from the sitemap.
export const metadata: Metadata = {
  title: "Beta participation requirements",
  description:
    "The LynxDock 0.3.0 beta participation requirements (v1.0) that members joining with an earlier app build acknowledge, as one plain-text document with its version, effective date and hash.",
  robots: { index: false, follow: false },
};

const FILE = "PARTICIPATION-REQUIREMENTS-v1.0.txt";
const text = readFileSync(join(process.cwd(), "public", "legal", FILE), "utf8");
const sha256 = createHash("sha256").update(text, "utf8").digest("hex");
const effectiveDate = (text.match(/^Effective date: (.+)$/m) || [])[1];
const title = participationDocument.title;
// Fail the build rather than publish a page that misstates the file (C R195 W1).
if (!effectiveDate || effectiveDate.includes("[[")) throw new Error(`${FILE}: no effective date`);
if (!title) throw new Error("participationDocument.title is unset");
if (!text.includes("LYNXDOCK 0.3.0 BETA PARTICIPATION REQUIREMENTS") || !text.includes("Version 1.0"))
  throw new Error(`${FILE}: missing the document title or version`);

export default function ParticipationRequirementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title ?? "Beta participation requirements"}
        intro={
          <p>
            Version 1.0, effective {effectiveDate}. Issued by LynxDock LLC (&ldquo;LynxDock&rdquo;). This is the
            document members acknowledge on the{" "}
            <Link href="/beta/" className="text-link">
              tester page
            </Link>{" "}
            before a community&rsquo;s operator invites them, when they join with an earlier app build that shows no
            licence screen. The acknowledgement form names this document.
          </p>
        }
      />

      <div className="wrap-narrow flex flex-col gap-6 py-12 sm:py-16">
        <p className="body">
          The requirements are published as one plain-text file, so what you read is exactly the acknowledged
          document:
        </p>
        <p className="body">
          <a href={`/legal/${FILE}`} className="text-link">
            Read the participation requirements
          </a>{" "}
          (opens the plain-text file) or{" "}
          <a href={`/legal/${FILE}`} download className="text-link">
            download it
          </a>{" "}
          ({FILE}, {text.length.toLocaleString("en-US")} bytes). Its SHA-256 is{" "}
          <code className="break-all text-sm">{sha256}</code>.
        </p>
        <p className="body">
          Questions:{" "}
          <a href={`mailto:${supportEmail}`} className="text-link">
            {supportEmail}
          </a>
          . Back to the{" "}
          <Link href="/beta/" className="text-link">
            tester hub
          </Link>
          .
        </p>
      </div>
    </>
  );
}
