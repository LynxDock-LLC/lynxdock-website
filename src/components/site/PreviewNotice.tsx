import { isPreview } from "@/lib/siteEnv";

/** Shown on every preview build (branch previews, local builds); never on the production build. */
export default function PreviewNotice() {
  if (!isPreview) return null;
  return (
    <div className="border-b border-[rgba(231,194,125,0.35)] bg-[rgba(231,194,125,0.07)]">
      <p className="wrap py-2 text-[0.8125rem] leading-snug text-[#ecd6a8]">
        <span className="font-semibold">Preview build.</span> This copy of the site is for review: it is not
        indexed by search engines, and forms are only delivered where the build is connected to the site&rsquo;s
        form service.
      </p>
    </div>
  );
}
