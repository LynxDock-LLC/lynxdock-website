import Link from "next/link";
import GlassPanel from "./GlassPanel";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <GlassPanel
      as="article"
      hover
      className="group flex h-full flex-col p-6"
    >
      <div className="flex items-center justify-between">
        <span className="hud-label">{product.stage}</span>
        <span
          aria-hidden
          className="h-2 w-2 rounded-full bg-signal-cyan/70 shadow-glow"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-white">{product.name}</h3>
      <p className="mt-1 text-sm font-medium text-signal-cyan/90">
        {product.tagline}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#9fb2ba]">
        {product.summary}
      </p>

      <Link
        href={product.href}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal-bright transition-transform group-hover:gap-2.5"
      >
        Explore {product.name.replace("LynxDock ", "")}
        <span aria-hidden>&rarr;</span>
      </Link>
    </GlassPanel>
  );
}
