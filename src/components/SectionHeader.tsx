import type { ReactNode } from "react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left";
  return (
    <div
      className={`flex max-w-2xl flex-col gap-3 ${alignment} ${className}`}
    >
      {eyebrow && (
        <span className="hud-label flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan shadow-glow"
          />
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-[15px] leading-relaxed text-[#9fb2ba] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
