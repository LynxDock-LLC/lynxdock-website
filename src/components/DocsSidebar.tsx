"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/data/docs";

export default function DocsSidebar() {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="flex flex-col gap-6">
      {docsNav.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <p className="hud-label text-[#7f939b]">{section.title}</p>
          <ul className="flex flex-col gap-1">
            {section.links.map((link) => {
              const active =
                pathname === link.href || pathname === link.href.replace(/\/$/, "");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-signal-cyan/10 text-signal-bright"
                        : "text-[#9fb2ba] hover:bg-graphite-700/40 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
