import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium tracking-tight transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-bright";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal-cyan/15 text-signal-bright border border-signal-cyan/40 shadow-[0_0_24px_-6px_rgba(53,224,224,0.5)] hover:bg-signal-cyan/25 hover:border-signal-cyan/70 hover:shadow-[0_0_36px_-6px_rgba(53,224,224,0.65)]",
  secondary:
    "bg-graphite-700/40 text-[#dbe6ea] border border-line hover:border-signal-cyan/40 hover:text-white",
  ghost:
    "text-[#9fb2ba] hover:text-signal-bright border border-transparent hover:border-line",
};

export default function GlowButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
