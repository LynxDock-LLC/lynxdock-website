import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "LynxDock, LynxDock Studio, and LynxDock Bootstrap - a privacy-first ecosystem for communication, development, and automation.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The ecosystem"
        title="Products"
        description="Three products, one philosophy: privacy-first, performance-focused software that serves the people using it."
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
