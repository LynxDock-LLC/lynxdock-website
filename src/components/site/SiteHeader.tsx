"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { betaAccessLink, demoLink, headerLinks } from "@/data/siteShell";

const normalize = (path: string) => (path !== "/" ? path.replace(/\/$/, "") : path);

export default function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // While the mobile menu is open: Escape closes it and returns focus to the button; a press outside closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !buttonRef.current?.contains(t)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  const isActive = (href: string) => !href.includes("#") && normalize(pathname) === normalize(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[rgba(9,14,18,0.92)] backdrop-blur-md">
      <div className="wrap flex h-[68px] items-center justify-between gap-4">
        <Link href="/" className="flex min-h-[44px] items-center gap-2.5" aria-label="LynxDock home">
          <Image src="/apple-icon.png" alt="" width={32} height={32} className="h-8 w-8 rounded-[7px]" priority />
          <span className="font-heading text-[17px] font-bold tracking-tight text-ink">LynxDock</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {headerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`inline-flex min-h-[44px] items-center rounded-lg px-3 text-[0.9375rem] font-medium transition-colors ${
                    isActive(l.href) ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={betaAccessLink.href}
            aria-current={isActive(betaAccessLink.href) ? "page" : undefined}
            className="btn btn-quiet"
          >
            {betaAccessLink.label}
          </Link>
          <a href={demoLink.href} data-demo-open="" className="btn btn-primary btn-sm">
            {demoLink.label}
          </a>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="js-only btn btn-secondary btn-sm lg:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
          {open ? "Close menu" : "Menu"}
        </button>
        {/* Without JavaScript the menu control is a link to the footer navigation, which lists every page. */}
        <a href="#site-footer-nav" className="nojs-only btn btn-secondary btn-sm lg:hidden">
          Menu
        </a>
      </div>

      <div id="site-menu" ref={menuRef} hidden={!open} className="border-t border-line bg-[#0c1317] lg:hidden">
        <nav aria-label="Primary" className="wrap py-4">
          <ul className="flex flex-col">
            {headerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  onClick={() => close(false)}
                  className="flex min-h-[48px] items-center border-b border-line/70 text-base font-medium text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={betaAccessLink.href}
                aria-current={isActive(betaAccessLink.href) ? "page" : undefined}
                onClick={() => close(false)}
                className="flex min-h-[48px] items-center text-base font-medium text-muted"
              >
                {betaAccessLink.label}
              </Link>
            </li>
          </ul>
          <a href={demoLink.href} data-demo-open="" onClick={() => close(false)} className="btn btn-primary mt-3 w-full">
            {demoLink.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
