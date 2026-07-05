import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of the LynxDock website and products from LynxDock LLC.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="These preliminary terms govern your use of this website. Last updated July 2026."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-[#9fb2ba]">
          <div>
            <h2 className="text-lg font-semibold text-white">Acceptance</h2>
            <p className="mt-3">
              By accessing this website you agree to these terms. If you do not
              agree, please do not use the site.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Use of the site</h2>
            <p className="mt-3">
              This website is provided for informational purposes about LynxDock
              products. Content is offered &ldquo;as is&rdquo; and may change as
              products evolve. LynxDock products themselves are governed by their
              own licenses, published with each product.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Intellectual property
            </h2>
            <p className="mt-3">
              The LynxDock name, logo, and brand assets are the property of
              LynxDock LLC. Open-source components are licensed under the terms
              published in their respective repositories.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Changes</h2>
            <p className="mt-3">
              These terms are preliminary and will be expanded as products reach
              general availability. Continued use of the site after changes
              constitutes acceptance of the updated terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
