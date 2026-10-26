import type { Metadata } from "next";
import Link from "next/link";
import siteStatus from "@/data/siteStatus";

export const metadata: Metadata = {
  title: "Quickstart",
  description:
    "For invited LynxDock testers: install the Windows app, join your community's server with an invitation, and set up voice and push-to-talk.",
};

export default function Quickstart() {
  const s = siteStatus;
  return (
    <div>
      <p className="eyebrow">Quickstart · for invited testers</p>
      <h1 className="h-page mt-3">Join your community on LynxDock.</h1>
      <p className="lead mt-4 max-w-2xl">
        This takes a few minutes. You need a 64-bit Windows PC, a headset or microphone, and an
        invitation from the person who runs your community&rsquo;s server.
      </p>

      <div className="card-notice mt-8 max-w-3xl">
        <p className="font-bold text-[#ecd6a8]">{s.pushToTalk.heading}</p>
        <p className="small mt-1.5">{s.pushToTalk.statement}</p>
      </div>

      <div className="doc-prose mt-8 max-w-3xl">
        <h2 id="before">Before you start</h2>
        <ul>
          <li>
            <strong>{s.eligibility.statement}</strong> {s.eligibility.scope} {s.eligibility.selfDeclaration} If you
            will use the older 0.2.6 app, confirm the <Link href="/beta/#requirements">beta requirements</Link> on
            the tester hub before your community invites you.
          </li>
          <li>
            <strong>Members</strong> install only the LynxDock app. <strong>The administrator</strong> who runs the
            server also uses LynxDock Host; see{" "}
            <Link href="/products/lynxdock-host/">LynxDock Host</Link>.
          </li>
          <li>
            Ask your administrator for the <strong>server address</strong>, an <strong>invite code</strong>, and which
            release the server runs, so you install the matching app.
          </li>
        </ul>

        <h2 id="install">1. Install the app</h2>
        <ol>
          <li>
            Install the LynxDock app release your community&rsquo;s server uses. Published installers are in the{" "}
            <Link href="/beta/#archive">tester hub&rsquo;s release archive</Link>. The .exe installs for your Windows
            user without administrator rights.
          </li>
          <li>
            Check the file before you run it. In PowerShell, run <code>Get-FileHash .\FILE -Algorithm SHA256</code>{" "}
            and compare the result with the value in the archive.
          </li>
          <li>
            Run the installer. If Windows warns about a new file, check that the publisher reads{" "}
            <strong>LynxDock LLC</strong>, then choose <strong>More info → Run anyway</strong>.
          </li>
        </ol>

        <h2 id="join">2. Join your community&rsquo;s server</h2>
        <ol>
          <li>Open LynxDock and enter the server address your administrator gave you.</li>
          <li>Enter your invite code and create your account. Your account lives on that server.</li>
          <li>You arrive in the community&rsquo;s workspace, with its channels and operations.</li>
        </ol>

        <h2 id="voice">3. Set up voice</h2>
        <ol>
          <li>Choose your microphone and speaker in the voice controls, then join a voice channel.</li>
          <li>
            If your community uses push-to-talk, set your key in <strong>Settings</strong>. Remember: it only works
            while the LynxDock window has focus. After you switch back to LynxDock, release the key and press it
            again.
          </li>
          <li>Ask someone to confirm they can hear you before an operation starts.</li>
        </ol>

        <h2 id="operations">4. Take part in an operation</h2>
        <ul>
          <li>
            <strong>My Dock</strong> shows your assignment, what needs your action and your operation&rsquo;s comms.
          </li>
          <li>
            When asked, check in and report your status. What you report is what leaders see; LynxDock does not read
            it from the game.
          </li>
          <li>
            The in-game overlay needs the game in <strong>windowed or borderless</strong> mode. See{" "}
            <Link href="/products/lynxdock/#overlay">the overlay</Link>.
          </li>
        </ul>

        <h2 id="help">If something goes wrong</h2>
        <p>
          Open <strong>Settings → About → Report a problem</strong>, copy your version and system information, and
          send it with what happened. Details are on the <Link href="/support/#testers">support page</Link>. Known
          limitations are listed in the <Link href="/beta/#limitations">tester hub</Link>.
        </p>
      </div>
    </div>
  );
}
