import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Self-hosting a server",
  description:
    "Use the LynxDock Guided Server Setup wizard to run a persistent server you fully own — no config files or terminal commands.",
};

export default function SelfHosting() {
  return (
    <div>
      <span className="hud-label">Guides</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Self-hosting a server
      </h1>

      <div className="doc-prose mt-6">
        <p>
          Self-hosting has a reputation for being painful. LynxDock&rsquo;s{" "}
          <strong>Guided Server Setup</strong> is a calm first-run wizard that
          creates a local server without touching config files or terminal
          commands. It generates a real config with SQLite, local uploads, a
          random session secret, and safe self-hosting defaults.
        </p>

        <h2 id="purpose">1. Choose a purpose</h2>
        <p>
          Decide how the server will be used — a local test, a LAN party, or
          friends over the internet. This sets sensible defaults for the rest of
          the wizard.
        </p>

        <h2 id="basics">2. Server basics</h2>
        <ul>
          <li>
            <strong>Server name</strong> — a friendly name (for example{" "}
            <code>Jared&rsquo;s LynxDock</code>).
          </li>
          <li>
            <strong>Admin password</strong> — sets the administrator account for
            the server.
          </li>
          <li>
            <strong>Registration</strong> — choose <code>Invite only</code>,
            open, or closed registration.
          </li>
          <li>
            <strong>Max users</strong> — cap the number of accounts (defaults are
            provided).
          </li>
        </ul>

        <h2 id="network">3. Network and storage</h2>
        <ul>
          <li>
            <strong>Port</strong> — the port the server listens on (defaults to{" "}
            <code>8080</code>).
          </li>
          <li>
            <strong>Data folder</strong> — where the SQLite database and uploads
            are stored. The wizard picks a safe default location.
          </li>
        </ul>

        <h2 id="relay">4. Call &amp; screen-share relay</h2>
        <p>
          Configure how calls connect. The basic mode uses <code>STUN only</code>
          , which works for most setups. For more reliable calls and screen
          sharing across restrictive networks, add a TURN relay.
        </p>

        <h2 id="start">5. Save and start</h2>
        <p>
          Save the server config, then start the server. You can save a draft at
          any point and come back later — nothing is committed until you choose to
          generate and launch. Once running, connect to it from any client using
          its address (for example <code>http://localhost:8080</code>).
        </p>

        <h2 id="ownership">Your data, your server</h2>
        <p>
          Everything the server stores lives on infrastructure you control.
          Accounts, rooms, history, and uploads stay with the server — LynxDock
          LLC has no access to self-hosted server contents.
        </p>

        <p>
          Next: <Link href="/docs/communities/">calls &amp; communities</Link>.
        </p>
      </div>
    </div>
  );
}
