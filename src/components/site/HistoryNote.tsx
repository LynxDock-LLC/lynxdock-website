import Link from "next/link";

/** A dated note on pages kept as engineering background or history. */
export default function HistoryNote({ era, children }: { era: string; children?: React.ReactNode }) {
  return (
    <aside aria-label="About this page" className="card-notice small">
      <span className="strong text-[#ecd6a8]">Engineering background, {era}.</span>{" "}
      {children ?? "This page describes the project as it was then and is kept for history and attribution."} For the
      current product see the{" "}
      <Link href="/technology/" className="text-link">
        technology page
      </Link>{" "}
      and{" "}
      <Link href="/releases/" className="text-link">
        release status
      </Link>
      .
    </aside>
  );
}
