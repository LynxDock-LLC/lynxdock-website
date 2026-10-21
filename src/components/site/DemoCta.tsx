import Link from "next/link";
import { demoLink } from "@/data/siteShell";

/** A focused closing call to action. The demo button opens the demo dialog (or the Support page without JS). */
export default function DemoCta({
  title = "See LynxDock with your own community in mind.",
  text = "We'll show you the workspace with demonstration data and talk through what running your own server involves.",
  secondary = { label: "Business enquiries", href: "/company/#contact" },
}: {
  title?: string;
  text?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="demo-cta-title" className="section">
      <div className="wrap">
        <div className="card-teal flex flex-col gap-6 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="demo-cta-title" className="h-section text-[clamp(1.5rem,2.6vw,2rem)]">
              {title}
            </h2>
            <p className="body mt-3">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={demoLink.href} data-demo-open="" className="btn btn-primary">
              {demoLink.label}
            </a>
            <Link href={secondary.href} className="btn btn-secondary">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
