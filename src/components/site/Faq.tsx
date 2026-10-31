import type { ReactNode } from "react";

export type FaqItem = { q: string; a: ReactNode };

/** Native disclosure widgets: keyboard-operable and readable without JavaScript. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-b border-line">
      {items.map((f) => (
        <details key={f.q} className="faq">
          <summary>{f.q}</summary>
          <div className="body pb-5 pr-8">{f.a}</div>
        </details>
      ))}
    </div>
  );
}
