import Link from "next/link";
import Image from "next/image";
import { companyInfo } from "@/data/companyInfo";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/products/lynxdock/", label: "LynxDock" },
      { href: "/mission-control/", label: "Mission Control" },
      { href: "/products/studio/", label: "LynxDock Studio" },
      { href: "/products/bootstrap/", label: "LynxDock Bootstrap" },
      { href: "/download/", label: "Download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs/", label: "Documentation" },
      { href: "/roadmap/", label: "Roadmap" },
      { href: "/features/", label: "Future Features" },
      { href: "/blog/", label: "Blog" },
      { href: "/community/", label: "Community" },
      { href: "/compare/", label: "vs Discord" },
      { href: "/support/", label: "Support" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/company/", label: "About" },
      { href: "/vision/", label: "Vision" },
      { href: "/privacy/", label: "Privacy" },
      { href: "/terms/", label: "Terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line/70 bg-graphite-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label="LynxDock home">
            <Image
              src="/logo/lynxdock-icon.png"
              alt="LynxDock logo"
              width={30}
              height={30}
              className="h-7 w-7 rounded-md"
            />
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Lynx<span className="text-signal-cyan">Dock</span>
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-[#7f939b]">
            {companyInfo.footerBlurb}
          </p>
          <a
            href={companyInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 text-sm text-[#9fb2ba] transition-colors hover:text-signal-bright"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.7.5.5 5.7.5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.5 18.3 4.8 18.3 4.8c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12C23.5 5.7 18.3.5 12 .5Z" />
            </svg>
            {companyInfo.githubLabel}
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h3 className="hud-label text-[#8da3ad]">{col.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#9fb2ba] transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-[#6f838b] sm:flex-row sm:items-center sm:justify-between">
          <p>{companyInfo.copyright}</p>
          <div className="flex items-center gap-4">
            <Link
              href="/design-system/"
              className="transition-colors hover:text-[#9fb2ba]"
            >
              Design System
            </Link>
            <p className="hud-label text-[#5b6f77]">{companyInfo.motto}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
