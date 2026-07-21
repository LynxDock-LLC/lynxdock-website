import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import BlogArchive from "@/components/BlogArchive";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Engineering Journal",
  description:
    "What we built, the problem it solved, and what we learned - notes from the team building LynxDock.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notes from the build"
        title="Engineering Journal"
        description="What we built, what problem it solved, and what we learned. Dev logs from the codebase, founder updates on where the company is going, and research notes from the bench."
      />
      <BlogArchive posts={posts} />
    </>
  );
}
