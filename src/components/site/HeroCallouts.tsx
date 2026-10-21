"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Shot } from "@/data/screenshots";

export type Callout = { title: string; text: string; /** marker position, % of the image */ x: number; y: number };

/**
 * The hero screenshot with three numbered callouts and a matching legend. The legend buttons are the keyboard
 * controls (Tab, or the arrow keys between them); the numbered markers on the image are larger pointer targets
 * for the same choice. Selecting one shows its text below. Nothing depends on hover, and without JavaScript all
 * three texts are listed instead.
 */
export default function HeroCallouts({ shot, callouts }: { shot: Shot; callouts: Callout[] }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const current = callouts[active];

  const onKeyDown = (e: KeyboardEvent<HTMLOListElement>) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + callouts.length) % callouts.length;
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <div>
      <figure>
        <div className="shot relative">
          <Image
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={shot.alt}
            sizes="(min-width: 1240px) 1240px, 100vw"
            priority
          />
          <span className="label-chip absolute left-3 top-3">{shot.label}</span>
          {callouts.map((c, i) => (
            <span
              key={c.title}
              aria-hidden="true"
              onClick={() => setActive(i)}
              className={`js-only absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border text-sm font-bold sm:h-9 sm:w-9 ${
                i === active
                  ? "border-accent bg-accent text-[#04201f]"
                  : "border-accent bg-[rgba(9,14,18,0.85)] text-accent"
              } after:absolute after:-inset-2 after:content-['']`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <figcaption className="caption">{shot.caption}</figcaption>
      </figure>

      <div className="js-only mt-5 grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
        <ol aria-label="Screenshot callouts" className="flex flex-col gap-2" onKeyDown={onKeyDown}>
          {callouts.map((c, i) => (
            <li key={c.title}>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                aria-pressed={i === active}
                aria-controls="hero-callout-detail"
                onClick={() => setActive(i)}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded-[10px] border px-3 py-2 text-left text-[0.9375rem] font-semibold transition-colors ${
                  i === active ? "border-accent bg-panel-2 text-ink" : "border-line text-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border text-[0.8125rem] ${
                    i === active ? "border-accent bg-accent text-[#04201f]" : "border-accent text-accent"
                  }`}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="sr-only">Callout {i + 1}: </span>
                  {c.title}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div id="hero-callout-detail" aria-live="polite" className="card-2 min-h-[7.5rem]">
          <p className="strong">
            {active + 1}. {current.title}
          </p>
          <p className="small mt-2">{current.text}</p>
        </div>
      </div>

      <ol className="nojs-only num-list mt-5">
        {callouts.map((c) => (
          <li key={c.title} className="small">
            <span className="strong">{c.title}.</span> {c.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
