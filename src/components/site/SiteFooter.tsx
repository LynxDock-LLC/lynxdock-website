import Link from "next/link";
import Image from "next/image";
import { companyInfo } from "@/data/companyInfo";
import { footerColumns, githubOrg, legalLinks } from "@/data/siteShell";
import siteStatus from "@/data/siteStatus";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-[#070b0e]">
      <div className="wrap grid gap-10 py-14 lg:grid-cols-[1.3fr_3fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex w-fit min-h-[44px] items-center gap-2.5" aria-label="LynxDock home">
            <Image src="/apple-icon.png" alt="" width={32} height={32} className="h-8 w-8 rounded-[7px]" />
            <span className="font-heading text-[17px] font-bold tracking-tight text-ink">LynxDock</span>
          </Link>
          <p className="small max-w-xs">
            Voice, chat and operations for communities that play together, on a server you control.
          </p>
          <p className="small max-w-xs">
            <span className="strong">{siteStatus.stage}</span> · {siteStatus.platform}.{" "}
            <Link href="/releases/" className="text-link">
              Release status
            </Link>
          </p>
        </div>

        <nav id="site-footer-nav" aria-label="Footer" className="grid gap-8 sm:grid-cols-3">
          {footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h2 className="font-heading text-sm font-bold text-ink">{col.title}</h2>
              <ul className="flex flex-col">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex min-h-[40px] items-center text-[0.9375rem] text-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-3 py-6 text-[0.8125rem] text-[#8d9da6] sm:flex-row sm:items-center sm:justify-between">
          <p>{companyInfo.copyright}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-[40px] items-center hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              {/* Plain anchor: /rss.xml is a static file, not a page route. */}
              <a href="/rss.xml" className="inline-flex min-h-[40px] items-center hover:text-ink">
                RSS
              </a>
            </li>
            <li>
              <a
                href={githubOrg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center hover:text-ink"
              >
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
