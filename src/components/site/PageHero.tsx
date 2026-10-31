import type { ReactNode } from "react";

/** The opening block of an inner page: eyebrow, the page's one h1, an intro and optional actions. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_10%_0%,rgba(92,225,223,0.08),transparent_60%)]"
      />
      <div
        className={`wrap relative grid gap-10 pb-12 pt-12 sm:pb-16 sm:pt-16 ${
          aside ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center" : ""
        }`}
      >
        <div className="enter max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h-page mt-3">{title}</h1>
          {intro && <div className="lead mt-5">{intro}</div>}
          {children && <div className="mt-7">{children}</div>}
        </div>
        {aside && <div className="enter-delay">{aside}</div>}
      </div>
    </section>
  );
}
