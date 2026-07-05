import Image from "next/image";
import GlowButton from "@/components/GlowButton";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hud-grid mask-fade-b opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-fade"
      />
      <div className="relative flex max-w-md flex-col items-center text-center">
        <Image
          src="/logo/lynxdock-icon.png"
          alt="LynxDock logo"
          width={72}
          height={72}
          className="h-16 w-16 drop-shadow-[0_0_30px_rgba(53,224,224,0.4)]"
        />
        <span className="hud-label mt-6">Signal lost</span>
        <h1 className="mt-3 text-6xl font-semibold tracking-tight text-white">
          404
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
          This page drifted off the grid. Let&rsquo;s get you back to a known
          coordinate.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <GlowButton href="/" variant="primary">
            Return home
          </GlowButton>
          <GlowButton href="/docs/" variant="secondary">
            Browse docs
          </GlowButton>
        </div>
      </div>
    </section>
  );
}
