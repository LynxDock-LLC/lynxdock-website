import Image from "next/image";
import GlowButton from "./GlowButton";

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient background layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hud-grid mask-fade-b opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-fade"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-signal-cyan/10 blur-[120px]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-20 pt-20 text-center sm:pt-28">
        <div className="animate-fade-up">
          <Image
            src="/logo/lynxdock-icon.png"
            alt="LynxDock logo — a glowing isometric cube"
            width={132}
            height={132}
            priority
            className="mx-auto h-24 w-24 drop-shadow-[0_0_40px_rgba(53,224,224,0.45)] sm:h-28 sm:w-28"
          />
        </div>

        <span className="hud-label mt-8 flex items-center gap-2 animate-fade-up">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan animate-pulse-soft"
          />
          Private &middot; Powerful &middot; Self-hosted
        </span>

        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white animate-fade-up sm:text-6xl md:text-7xl">
          LynxDock
        </h1>

        <p className="mt-4 text-lg font-medium text-gradient animate-fade-up sm:text-xl">
          Built for People. Not Platforms.
        </p>

        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#9fb2ba] animate-fade-up sm:text-base">
          Privacy-first software for creators, gamers, developers, and
          self-hosted communities. A quiet, high-end command center for the way
          you actually work and play.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 animate-fade-up sm:flex-row">
          <GlowButton href="/roadmap/" variant="primary">
            View Roadmap
          </GlowButton>
          <GlowButton href={GITHUB_ORG} external variant="secondary">
            GitHub
          </GlowButton>
          <GlowButton href="/docs/" variant="ghost">
            Documentation
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
