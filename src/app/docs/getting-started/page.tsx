import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quickstart",
  description:
    "Launch LynxDock and start your first quick call or connect to a server in minutes.",
};

export default function GettingStarted() {
  return (
    <div>
      <span className="hud-label">Getting started</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Quickstart
      </h1>

      <div className="doc-prose mt-6">
        <p>
          LynxDock gives you two ways to connect: a lightweight, temporary{" "}
          <strong>Quick Call</strong>, or a persistent{" "}
          <strong>self-hosted server</strong>. You can start with a call and move
          to a server whenever you&rsquo;re ready.
        </p>

        <h2 id="quick-call">Start a Quick Call</h2>
        <p>
          A Quick Call is a temporary peer-to-peer room for voice, chat, and
          screen sharing. It&rsquo;s the fastest way to get talking.
        </p>
        <ol>
          <li>Open LynxDock and choose <strong>Quick Call</strong>.</li>
          <li>
            Select <strong>Start Quick Call</strong> to create a new room, or{" "}
            <strong>Join Quick Call</strong> and enter a code to join an existing
            one.
          </li>
          <li>Share the room code with anyone you want to invite.</li>
        </ol>
        <p>
          Quick Call rooms are ephemeral - they disappear after a period of
          inactivity, and nothing is stored on a central platform.
        </p>

        <h2 id="connect-to-server">Connect to a server</h2>
        <p>
          A persistent server is a self-hosted home with accounts, rooms,
          history, and admin controls. Accounts and data stay with the server you
          choose.
        </p>
        <ul>
          <li>
            <strong>Add Persistent Server</strong> - connect to an existing
            server using its address (for example{" "}
            <code>http://localhost:8080</code>).
          </li>
          <li>
            <strong>Host a New Server</strong> - spin up your own with the Guided
            Setup wizard. See{" "}
            <Link href="/docs/self-hosting/">Self-hosting a server</Link>.
          </li>
        </ul>

        <h2 id="next">Next steps</h2>
        <ul>
          <li>
            <Link href="/docs/self-hosting/">Self-host your own server</Link> with
            the guided wizard.
          </li>
          <li>
            Learn about{" "}
            <Link href="/docs/communities/">calls, channels, and communities</Link>.
          </li>
        </ul>
      </div>
    </div>
  );
}
