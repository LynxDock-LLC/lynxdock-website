import GlassPanel from "./GlassPanel";
import SectionHeader from "./SectionHeader";

export type Audience = { title: string; text: string };

export default function AudienceGrid({
  eyebrow = "Who it's for",
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: Audience[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeader eyebrow={eyebrow} title={title} className="mb-10" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <GlassPanel key={item.title} hover className="p-6">
            <h3 className="text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
              {item.text}
            </p>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
