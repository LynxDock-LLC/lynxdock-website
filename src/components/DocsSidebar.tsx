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
          <p className="text-[0.8125rem] font-bold text-muted">{section.title}</p>
          <ul className="flex flex-col">
            {section.links.map((link) => {
              const active = pathname === link.href || pathname === link.href.replace(/\/$/, "");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-[40px] items-center rounded-lg px-3 py-1.5 text-[0.9375rem] transition-colors ${
                      active ? "bg-panel-2 font-semibold text-ink" : "text-muted hover:bg-panel hover:text-ink"
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
