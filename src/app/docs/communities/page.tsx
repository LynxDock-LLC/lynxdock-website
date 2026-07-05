import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calls & communities",
  description:
    "How LynxDock handles quick calls, persistent community servers, channels, and squadron mission control.",
};

export default function Communities() {
  return (
    <div>
      <span className="hud-label">Guides</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Calls &amp; communities
      </h1>

      <div className="doc-prose mt-6">
        <p>
          LynxDock scales from a one-off conversation to a large, organized
          community — without changing tools. Here&rsquo;s how the pieces fit
          together.
        </p>

        <h2 id="quick-calls">Quick Calls</h2>
        <p>
          A Quick Call is a temporary peer-to-peer room for voice, chat, and
          screen sharing. Rooms are created on demand, shared by code, and
          disappear after inactivity. They&rsquo;re ideal for spontaneous
          conversations that don&rsquo;t need to be kept.
        </p>

        <h2 id="persistent">Persistent servers</h2>
        <p>
          When you want a lasting home, a persistent server adds accounts, rooms,
          message history, and admin controls. Members connect to the server you
          host, and their data stays there. See{" "}
          <Link href="/docs/self-hosting/">Self-hosting a server</Link> to run
          your own.
        </p>

        <h2 id="channels">Channels</h2>
        <p>
          Inside a server, organize conversation into text and voice channels —
          for example a <code>general</code> text channel alongside{" "}
          <code>Voice</code> rooms. Members move between channels freely, and
          admins control who can see and post where.
        </p>

        <h2 id="squadrons">Squadrons &amp; mission control</h2>
        <p>
          For larger groups, LynxDock offers a squadron-style command view — a
          mission-control dashboard for organizing people at scale. It brings
          together:
        </p>
        <ul>
          <li>
            <strong>Wings and squadrons</strong> — group members into structured
            units with readiness at a glance.
          </li>
          <li>
            <strong>Command tree</strong> — a live view of who reports to whom and
            how a group is organized.
          </li>
          <li>
            <strong>Roster</strong> — see who&rsquo;s online, assigned, and
            available across the community.
          </li>
          <li>
            <strong>Objectives &amp; operations feed</strong> — track active
            objectives and activity in real time.
          </li>
        </ul>
        <p>
          It&rsquo;s the same lightweight platform — just with the structure a big
          community needs, presented as a calm command center rather than clutter.
        </p>

        <p>
          New here? Start with the{" "}
          <Link href="/docs/getting-started/">quickstart</Link>.
        </p>
      </div>
    </div>
  );
}
