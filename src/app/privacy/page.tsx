import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How LynxDock LLC approaches privacy - privacy-first by default, with no surveillance or data harvesting.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Privacy is the foundation of everything LynxDock builds. This page summarizes our approach. Last updated July 2026."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-[#9fb2ba]">
          <div>
            <h2 className="text-lg font-semibold text-white">Our principle</h2>
            <p className="mt-3">
              LynxDock is privacy-first by default. We do not sell your data, run
              advertising, or track you across the web. Self-hosted LynxDock
              servers keep your accounts and data with the server you choose, not
              with us.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Information we handle
            </h2>
            <p className="mt-3">
              This marketing website does not require an account and does not use
              advertising or third-party tracking. If we introduce analytics or
              sign-up features in the future, this policy will be updated to
              describe exactly what is collected and why.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Self-hosted data</h2>
            <p className="mt-3">
              When you run a LynxDock server, your community&rsquo;s data lives on
              infrastructure you control. LynxDock LLC does not have access to
              self-hosted server contents.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-3">
              Questions about privacy can be directed to the LynxDock
              organization on GitHub. This document is a preliminary summary and
              will be expanded as products reach general availability.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
