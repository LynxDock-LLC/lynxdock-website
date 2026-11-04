import DocsSidebar from "@/components/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-line">
      <div className="wrap py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <DocsSidebar />
          </aside>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
