"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = { id: string; label: string; panel: ReactNode };

/**
 * Accessible tabs (WAI-ARIA tabs pattern): one tab stop for the tab list, Left/Right arrows move between tabs
 * and select them, Home and End jump to the first and last. Nothing advances on its own. Without JavaScript the
 * tab list is hidden and every panel is shown in order under its own heading.
 */
export default function Tabs({
  items,
  label,
  idBase,
  headingLevel = 3,
  staticHeadings = true,
}: {
  items: TabItem[];
  label: string;
  idBase: string;
  headingLevel?: 3 | 4;
  /** Set false when each panel already starts with its own heading. */
  staticHeadings?: boolean;
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const Heading = headingLevel === 3 ? "h3" : "h4";

  const select = (i: number) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") select(active + 1);
    else if (e.key === "ArrowLeft") select(active - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(items.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div role="tablist" aria-label={label} className="js-only tablist" onKeyDown={onKeyDown}>
        {items.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${t.id}`}
            aria-controls={`${idBase}-panel-${t.id}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            className="tab"
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {items.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          data-tabpanel=""
          id={`${idBase}-panel-${t.id}`}
          aria-labelledby={`${idBase}-tab-${t.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="mt-6 rounded-[var(--radius-lg)] outline-offset-4"
        >
          {staticHeadings ? (
            <Heading className="nojs-only h-card mb-4 mt-10">{t.label}</Heading>
          ) : (
            <p className="nojs-only eyebrow mb-2 mt-10">{t.label}</p>
          )}
          {t.panel}
        </div>
      ))}
    </div>
  );
}
