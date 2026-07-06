"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import GlowButton from "./GlowButton";

const links = [
  { href: "/mission-control/", label: "Mission Control" },
  { href: "/products/", label: "Products" },
  { href: "/roadmap/", label: "Roadmap" },
  { href: "/docs/", label: "Docs" },
  { href: "/blog/", label: "Blog" },
  { href: "/community/", label: "Community" },
];

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-graphite-950/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="LynxDock home"
        >
          <Image
            src="/logo/lynxdock-icon.png"
            alt="LynxDock logo"
            width={30}
            height={30}
            className="h-7 w-7 rounded-md"
            priority
          />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Lynx<span className="text-signal-cyan">Dock</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#9fb2ba] transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <GlowButton href={GITHUB_ORG} external variant="ghost">
            GitHub
          </GlowButton>
          <GlowButton href="/download/" variant="primary">
            Get LynxDock
          </GlowButton>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-[#9fb2ba] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-line/70 bg-graphite-900/95 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2.5 text-sm text-[#c3d0d6] hover:bg-graphite-700/50 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <GlowButton href={GITHUB_ORG} external variant="secondary">
                GitHub
              </GlowButton>
              <GlowButton href="/download/" variant="primary">
                Get LynxDock
              </GlowButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
