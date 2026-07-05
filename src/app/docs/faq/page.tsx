import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about LynxDock - privacy, self-hosting, availability, and how it compares.",
};

const faqs = [
  {
    q: "Do I have to self-host to use LynxDock?",
    a: "No. A Quick Call is a temporary peer-to-peer room that needs no server at all. Self-hosting is for when you want a persistent community with accounts, history, and admin controls that you fully own.",
  },
  {
    q: "Is it really private?",
    a: "Yes. LynxDock runs no advertising, sells no data, and does no cross-site tracking. When you self-host, your community's messages, accounts, and files live on infrastructure you control - LynxDock LLC has no access to them.",
  },
  {
    q: "How is this different from the big chat platforms?",
    a: "LynxDock is lightweight, privacy-first, and self-hostable. The difference is ownership and incentives: no engagement-maximizing design, no lock-in, and your data stays with the server you choose.",
  },
  {
    q: "Who is LynxDock for?",
    a: "Creators, gamers, developers, and self-hosted communities - anyone who wants fast, quiet communication tools they can trust and own.",
  },
  {
    q: "Is it hard to set up a server?",
    a: "No. The Guided Server Setup wizard creates a real config with safe defaults, no config files or terminal commands required. See the self-hosting guide for a full walkthrough.",
  },
  {
    q: "Is LynxDock built in the open?",
    a: "Yes. Development happens in the open on the LynxDock GitHub organization, and each product's license is published with its repository.",
  },
  {
    q: "When can I use it?",
    a: "LynxDock is early, and early access is opening in phases. Follow the roadmap or register interest to be notified as builds become available.",
  },
];

export default function FaqDoc() {
  return (
    <div>
      <span className="hud-label">Reference</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Frequently asked questions
      </h1>

      <div className="doc-prose mt-6">
        {faqs.map((item) => (
          <div key={item.q}>
            <h2 id={item.q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}>
              {item.q}
            </h2>
            <p>{item.a}</p>
          </div>
        ))}

        <p>
          Still have a question? Reach out via the{" "}
          <Link href="/support/">support page</Link> or the LynxDock GitHub
          organization.
        </p>
      </div>
    </div>
  );
}
