import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GuideFigure from "@/components/GuideFigure";

export const metadata: Metadata = {
  title: "Plan, Deploy, and Coordinate an Operation",
  description:
    "A step-by-step LynxDock V5 guide: create an operation, organize wings and ships, prepare comms, build the tactical plan, brief, go live, coordinate, handle a refuel request, and close with a debrief — illustrated with authentic captures from a staged demo server.",
};

// ---------------------------------------------------------------------------------------------
// Every screenshot on this page is the real desktop application (qualified V5 build
// 0.1.0+5a53bff) captured from its own window while the sequence below was executed on an
// ISOLATED demo server on 2026-09-20. The organisation "Vega Reach Consortium", its 32 members,
// their callsigns, messages, positions and numbers are staged demonstration data. Nothing is
// live game telemetry, no real community's data appears, and no control was drawn in.
// ---------------------------------------------------------------------------------------------

const G = "/screenshots/v5/guide";
const shot = (name: string) => `${G}/${name}.webp`;
const detail = (name: string) => `${G}/detail/${name}.webp`;
const detailFull = (name: string) => `${G}/detail/${name}.png`;

const sections = [
  { id: "prerequisites", n: 1, title: "Prerequisites" },
  { id: "create", n: 2, title: "Create the operation" },
  { id: "team", n: 3, title: "Organize the team" },
  { id: "comms", n: 4, title: "Prepare communications" },
  { id: "plan", n: 5, title: "Build the tactical plan" },
  { id: "brief", n: 6, title: "Brief and deploy" },
  { id: "coordinate", n: 7, title: "Coordinate during the operation" },
  { id: "incident", n: 8, title: "Handle a support incident" },
  { id: "close", n: 9, title: "Extract and close" },
  { id: "troubleshooting", n: 10, title: "Troubleshooting and limits" },
];

function Who({ children }: { children: ReactNode }) {
  return (
    <span className="mr-2 inline-block rounded border border-signal-cyan/30 bg-signal-cyan/10 px-1.5 py-0.5 align-middle font-mono text-[0.62rem] uppercase tracking-[0.16em] text-signal-bright">
      {children}
    </span>
  );
}

function UI({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-white">{children}</strong>;
}

function Steps({ children }: { children: ReactNode }) {
  return <ol className="guide-steps">{children}</ol>;
}

function Step({ who, children }: { who: string; children: ReactNode }) {
  return (
    <li>
      <Who>{who}</Who>
      {children}
    </li>
  );
}

function Outcome({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 rounded-lg border border-line bg-graphite-800/50 px-3 py-2 text-[13.5px] text-[#b7c5cb]">
      <span className="hud-label mr-2 text-[0.62rem]">What you should see</span>
      {children}
    </p>
  );
}

function H2({ id, n, children }: { id: string; n: number; children: ReactNode }) {
  return (
    <h2 id={id} className="flex items-baseline gap-3">
      <span className="font-mono text-base text-signal-bright">{String(n).padStart(2, "0")}</span>
      <span>{children}</span>
    </h2>
  );
}

export default function OperationsGuide() {
  return (
    <div>
      <PageHeader
        eyebrow="Guide · V5 closed beta"
        title="Plan, Deploy, and Coordinate an Operation"
        description={
          <>
            A complete run of one operation in LynxDock V5 — from an empty Operations page to a closed debrief — as a
            commander and as a member. Every screenshot is the real application captured on an isolated demo server;
            the organisation, its 32 members, and every position and number are staged demonstration data, not game
            telemetry.
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#9fb2ba]">
          <span className="hud-label text-signal-bright">Staged demonstration</span>
          <span>Build 0.1.0+5a53bff · captured 2026-09-20 · Operation Halcyon Convoy (SIMULATED)</span>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[230px_1fr]">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <nav aria-label="Contents" className="flex flex-col gap-2">
              <p className="hud-label text-[#7f939b]">Contents</p>
              <ol className="flex flex-col gap-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block rounded-md px-3 py-1.5 text-sm text-[#9fb2ba] transition-colors hover:bg-graphite-700/40 hover:text-white"
                    >
                      <span className="mr-2 font-mono text-[0.7rem] text-signal-bright">{String(s.n).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-4 hidden flex-col gap-1 text-xs text-[#7d919a] lg:flex">
                <Link href="/docs/" className="underline underline-offset-2 hover:text-white">
                  ← All documentation
                </Link>
                <Link href="/#v5-gallery" className="underline underline-offset-2 hover:text-white">
                  V5 gallery
                </Link>
              </div>
            </nav>
          </aside>

          {/* Guide body */}
          <div className="doc-prose min-w-0">
            <GlassPanel className="mb-8 p-4 text-[13.5px] leading-relaxed">
              <p className="mb-2">
                <strong className="text-white">How to read this guide.</strong> Each step names who performs it, the exact
                label you click, what to enter, and what should happen. Two accounts are followed throughout: the
                commander <strong>ANVIL</strong> (owner of the demo workspace) and the hauler pilot{" "}
                <strong>CARAVAN-3</strong>; the logistics operator <strong>ANCHOR-2</strong> joins for the refuel
                incident. Click any screenshot to open the original capture at full size.
              </p>
              <p className="mb-0">
                The scenario: escort three haulers carrying 1,200 SCU of laranite from Everus Harbor to Port Tressler
                through the Yela lane, with a six-fighter screen, scouts ahead, medical and recovery on standby, and a
                refuel point at the Starfarer. A debris strike at WP2 forces a hold and a recovery; a Freelancer MAX runs
                low on fuel and is topped up. Everything shown was executed in order on the demo server.
              </p>
            </GlassPanel>

            {/* 01 ------------------------------------------------------------------------------ */}
            <H2 id="prerequisites" n={1}>
              Prerequisites
            </H2>
            <p>Before the commander creates anything, make sure these are in place.</p>
            <ul>
              <li>
                <strong>A V5 server and the V5 desktop client.</strong> Operations, the Tactical board, Requests, Logistics
                and the in-game overlay all live on the V5 build. Connect the client to the server from the Connect form
                (server address, username, password) — the demo used <code>http://127.0.0.1:8797</code>.
              </li>
              <li>
                <strong>Permissions.</strong> Creating an operation, publishing it, issuing orders and editing the board
                require a leadership role; the Tactical toolbar shows your effective role as a chip (
                <code>owner · commander</code> in the captures). Members without those permissions still see the
                operation, check in, acknowledge orders and raise requests. Roles are managed under{" "}
                <UI>Workspace</UI> by the server owner.
              </li>
              <li>
                <strong>Each member&rsquo;s own setup.</strong> The <UI>Setup</UI> page tracks it per account: callsign,
                privacy, availability, qualifications, ships and vehicles, a microphone test, joining an operation and a
                practice room. Ships entered here are what members can commit to an operation.
              </li>
              <li>
                <strong>Verse Catalog (optional but useful).</strong> With a catalog import in place, objectives can take a{" "}
                <UI>Location from catalog</UI> and members can pick real ship definitions. The demo server carried a
                17,029-entity import from the Star Citizen Wiki API (CC BY-SA 4.0).
              </li>
            </ul>
            <GuideFigure
              src={shot("89-prereq-setup")}
              alt="The Setup page listing per-member setup items: Callsign done, Privacy, Availability, Qualifications, Ships and vehicles done, Microphone test, Join an operation, Join a practice room — 2 of 8 done"
              caption="Setup — each member's own checklist. Callsign and Ships and vehicles are done for this account; the rest are open. Organization setup follows below it."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src="/screenshots/v5/verse-catalog.png"
              full="/screenshots/v5/verse-catalog.png"
              alt="Verse Catalog searching for Gladius: card results for ships, components, paints and weapons with manufacturer and summary, 80 matches, patch 4.10.0-LIVE"
              caption="Verse Catalog on the demo server after the Wiki import — the source for catalog locations and ship definitions used later in the guide."
              viewer="ANVIL"
              width={1600}
              height={900}
            />

            {/* 02 ------------------------------------------------------------------------------ */}
            <H2 id="create" n={2}>
              Create the operation
            </H2>
            <p>
              Operations are created from the <UI>Operations</UI> page in the sidebar. A new operation starts as a{" "}
              <em>Draft</em> that only leadership works on; nobody is notified until it is published.
            </p>
            <Steps>
              <Step who="Commander">
                Open <UI>Operations</UI> and click <UI>+ New operation</UI>. An empty workspace shows{" "}
                <em>No operations yet. Create one to start planning.</em>
              </Step>
              <Step who="Commander">
                Fill the form: <UI>Name</UI> (<code>Operation Halcyon Convoy (SIMULATED)</code>), <UI>Kind</UI> (
                <code>convoy escort</code>), <UI>Scheduled start</UI>, <UI>At the scheduled time</UI> (
                <code>Open staging</code> — the server moves the operation on time and creates rooms at each stage),{" "}
                <UI>Assigned comms</UI> (<code>Prompt to join</code>), and a <UI>Description</UI>. Leave{" "}
                <UI>Tactical board ID</UI> empty — the board is linked in step 5.
              </Step>
              <Step who="Commander">
                Click <UI>Create operation</UI>.
                <Outcome>
                  The operation appears in the list with a <em>DRAFT</em> badge, <em>0 participants</em>, and the header
                  buttons <UI>Publish</UI>, <UI>Cancel operation</UI> and <UI>Delete operation</UI>. The tabs Roster,
                  Units, Ships &amp; assets, Comms, Orders, Requests, Preflight and Debrief are all at zero.
                </Outcome>
              </Step>
              <Step who="Commander">
                Click <UI>Join operation</UI> under <em>My participation</em> so the commander is a participant too — an
                operation cannot go live with nobody in it.
              </Step>
            </Steps>
            <GuideFigure
              src={shot("10-operations-empty")}
              alt="Operations page with no operations yet and the + New operation button"
              caption="The empty Operations page. + New operation sits above the list."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("11-new-operation-form")}
              alt="The New operation form filled in: name, kind convoy escort, scheduled start 09/26/2026 12:45 PM, Open staging at the scheduled time, Prompt to join for assigned comms, an empty tactical board ID and a description"
              caption="The New operation form, filled in for the convoy. The two policy fields explain themselves under the inputs."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-new-operation-form")}
              full={detailFull("d-new-operation-form")}
              alt="Close-up of the New operation form fields and the Cancel / Create operation buttons"
              caption="Detail — the form at native size."
              width={684}
              height={484}
              detail
            />
            <GuideFigure
              src={shot("12-operation-created-draft")}
              alt="The created operation in Draft: Publish, Cancel operation and Delete operation buttons, a Join operation button under My participation, and empty tabs"
              caption="After Create operation: a Draft with a Join operation button and every tab at (0)."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />

            {/* 03 ------------------------------------------------------------------------------ */}
            <H2 id="team" n={3}>
              Organize the team
            </H2>
            <p>
              The operation&rsquo;s structure lives in three tabs. <UI>Units</UI> holds the wings and who leads them,{" "}
              <UI>Roster</UI> shows every participant grouped by unit with their RSVP and state, and{" "}
              <UI>Ships &amp; assets</UI> lists what each member has committed. In the demo the 32 members joined and
              picked their units from their own clients; the commander then set the leaders.
            </p>
            <Steps>
              <Step who="Commander">
                On <UI>Units</UI>, use <UI>Add unit</UI> at the bottom to create each wing with a name and kind (command,
                wing, transport, recon, medical, salvage, logistics, custom). The convoy used eight: Command,{" "}
                <em>Talon — escort</em>, <em>Caravan — transport</em>, <em>Lynx — scouts</em>, <em>Mercy — medical</em>,{" "}
                <em>Salvor — recovery</em>, <em>Anchor — logistics</em> and Reserve.
              </Step>
              <Step who="Member">
                Open the operation, click <UI>Join operation</UI>, set <UI>RSVP</UI> to <code>Going</code>, choose your{" "}
                <UI>Unit</UI> and enter your <UI>Callsign</UI>, then <UI>Save</UI>. Unit choice is free while the
                operation is a draft; once staging begins the page notes that{" "}
                <em>unit assignments are managed by leadership</em>.
              </Step>
              <Step who="Commander">
                Back on <UI>Units</UI>, pick the leader for each unit from the callsign selector on its row (the star
                marks the current leader). Remove a unit with <UI>×</UI>.
                <Outcome>
                  Each row shows its kind badge, participant count and leader — <em>Talon — escort · WING · 6
                  participants · ★ demo-talon1 · TALON-1</em>.
                </Outcome>
              </Step>
              <Step who="Commander">
                Check <UI>Roster (32)</UI>: participants are grouped under their unit with <em>GOING</em> and their
                operational state, and each group shows <em>0/6 checked in</em> until staging.
              </Step>
              <Step who="Member">
                On <UI>Ships &amp; assets</UI>, commit the ship you will fly (from the ships entered on Setup). The
                commander can change a row&rsquo;s <UI>Committed</UI> state or move it to another unit.
              </Step>
            </Steps>
            <GuideFigure
              src={shot("20-team-units")}
              alt="Units tab of the draft operation: eight units with kind badges, participant counts, leader names and callsign selectors, and an Add unit control below"
              caption="Units (8) — the eight wings with their kind, participant count and leader. Add unit is at the bottom of the list."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("21-team-roster")}
              alt="Roster tab with participants grouped by unit: Command 0/3 checked in with ANVIL, LANTERN, SIGNAL; Talon — escort 0/6 with TALON-1 to TALON-6, all GOING and OFFLINE"
              caption="Roster (32) before staging: RSVP Going everywhere, nobody checked in yet, states Offline."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("22-team-ships")}
              alt="Ships & assets tab listing committed ships with crew tags, a Committed state selector and a unit selector per row"
              caption="Ships & assets (28) — every committed ship, its crew stations, and which unit it flies with."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />

            {/* 04 ------------------------------------------------------------------------------ */}
            <H2 id="comms" n={4}>
              Prepare communications
            </H2>
            <p>
              Comms are planned before anything is created. The <UI>Comms</UI> tab holds a <em>room plan</em>: which rooms
              exist, who they are for, at which stage they appear and whether they are kept afterwards. The server creates
              the rooms when the operation reaches each stage, so nothing clutters the sidebar during planning.
            </p>
            <Steps>
              <Step who="Commander">
                Open <UI>Comms</UI>. While the operation is a draft it says <em>Rooms are created when their stage is
                reached.</em> Check the two policies carried over from the form — <UI>At the scheduled time</UI> and{" "}
                <UI>Assigned comms</UI> — and the scheduled date under them.
              </Step>
              <Step who="Commander">
                Review the <UI>Room plan</UI>. The default plan for this operation was a text room for everyone (
                <em>PUBLISHED · KEEP</em>), a <em>Staging</em> net for everyone and a <em>Command</em> net for leaders (
                <em>STAGING · DELETE</em>), and a per-unit <em>chat</em> at <em>LIVE</em>. Rows are removed with{" "}
                <UI>×</UI>; the <UI>Add starter rooms</UI> control adds a default set.
              </Step>
              <Step who="Commander">
                After the operation is staging (step 6), the same tab lists the nets that now exist with <UI>Open</UI> /{" "}
                <UI>Join net</UI> buttons, and <UI>Recompile comms</UI> re-derives them if the plan or the roster changed.
              </Step>
              <Step who="Member">
                When your net is ready, an <em>ASSIGNED COMMS</em> banner appears at the top of every page —{" "}
                <em>Your assigned net for Operation Halcyon Convoy (SIMULATED) is Staging.</em> — with{" "}
                <UI>Join (muted)</UI> and <UI>Not now</UI>. Joining lands you in the room, muted, with a{" "}
                <em>Connected</em> chip. The <UI>Comms</UI> tab keeps a <em>Lifecycle</em> log of when rooms were
                compiled and by whom.
              </Step>
            </Steps>
            <GuideFigure
              src={shot("23-comms-room-plan")}
              alt="Comms tab of the draft: Rooms are created when their stage is reached, the scheduled-time and assigned-comms policies, and the room plan with a chat for everyone, Staging and Command nets and a per-unit chat"
              caption="Comms (0) while drafting: the room plan with audience, stage and keep/delete for each row. Nothing exists yet."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("41-staging-comms")}
              alt="Comms tab once staging: three comms nets — the operation chat (Open), Staging (Join net, open to all participants) and Command (Join net, leadership, 10 members) — with a Recompile comms button and the room plan below"
              caption="The same tab once the operation is staging: the nets exist, each with its audience and a Join net button, plus Recompile comms."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-comms-nets")}
              full={detailFull("d-comms-nets")}
              alt="Close-up of the three comms nets with OPERATIONS / LEADERSHIP badges, PLANNED state and Open / Join net buttons"
              caption="Detail — the compiled nets."
              width={1242}
              height={264}
              detail
            />
            <GuideFigure
              src={shot("49-member-comms-tab")}
              alt="A member's Comms tab: the operation chat and Staging net joinable, the Command net greyed out for a non-leader, the room plan, and a Lifecycle log of rooms compiled and status transitions"
              caption="A member's view: Command is not joinable for a hauler pilot, and the Lifecycle log records each compile and status change."
              viewer="CARAVAN-3"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("49b-member-joined-net")}
              alt="Inside the #staging net after Join (muted): a Connected chip, voice controls showing Voice unavailable, a red notice that voice isn't set up on this server, the member list with demo-caravan3 online and the message composer"
              caption="After Join (muted): connected to #staging. The demo server has no media plane, so the app reports Voice unavailable and the net is text-only — see Troubleshooting."
              viewer="CARAVAN-3"
              width={1920}
              height={1080}
            />

            {/* 05 ------------------------------------------------------------------------------ */}
            <H2 id="plan" n={5}>
              Build the tactical plan
            </H2>
            <p>
              The plan is drawn on the <UI>Tactical</UI> board: units placed by hand, wings for colour and grouping, zones
              for the areas that matter, routes with waypoints, objectives per wing, and a written briefing. The board is
              then linked to the operation so the roster, orders and phases stay in sync.
            </p>
            <Steps>
              <Step who="Commander">
                Open <UI>Tactical</UI>, choose or create the board in the selector (<em>Halcyon Convoy</em>). Add each
                member with <UI>+ Add unit</UI> and drag the cards into place.
                Positions are placed by you — LynxDock does not read the game.
              </Step>
              <Step who="Commander">
                Open the <UI>WINGS</UI> panel on the right, type a name in <UI>New wing…</UI>, pick a colour and click{" "}
                <UI>Add</UI>. Then, as the panel says, <em>select unit(s) on the canvas, then click a wing to assign</em>.
                The colours carry through every later view: blue Talon, amber Caravan, violet Lynx, red Mercy, green
                Salvor, yellow Anchor.
              </Step>
              <Step who="Commander">
                Draw the areas with <UI>+ Zone…</UI>: a rally circle for <em>Staging — Everus Harbor</em>, a staging
                rectangle for <em>Transit — Yela lane</em>, a hexagonal area of operations for <em>Objective — WP2
                hold</em>, a danger circle for the <em>Recovery — debris field</em>, an LZ for casualty pickup and an
                extraction circle at <em>Port Tressler</em>.
              </Step>
              <Step who="Commander">
                Add routes with <UI>→ Route</UI>: the convoy&rsquo;s supply route and Talon&rsquo;s escort screen from the
                staging circle to Port Tressler, a recon leg for LYNX-1 ahead of them, and two contingency routes —
                Salvor&rsquo;s search leg into the debris field and Mercy&rsquo;s medical leg to the LZ. Name the waypoints
                as you go (<em>WP1 — Yela lane</em>, <em>WP2 — hold</em>, <em>Screen A/B/C</em>…).
              </Step>
              <Step who="Commander">
                In the <UI>OBJ</UI> panel, type each objective in <UI>New objective…</UI>, set its priority and click{" "}
                <UI>Add</UI>; <UI>Location from catalog</UI> pins it to a Verse Catalog place. Objectives are listed
                under the wing that owns them.
              </Step>
              <Step who="Commander">
                Click <UI>Brief</UI> in the toolbar to write the operation briefing; it opens for everyone who opens the
                board, with <UI>Edit</UI> for leaders. Set <UI>PHASE</UI> to <em>Planning</em>; the summary card in the
                lower-left shows units ready, objectives complete and wing count.
              </Step>
              <Step who="Commander">
                Open the <UI>ROSTER</UI> panel and link the board to the operation. The panel then shows the operation
                name with its status chip (<em>DRAFT</em>) and every unit grouped as on the Operations roster. Click{" "}
                <UI>Save</UI> in the toolbar when the board reads the way you want it; <UI>Restore…</UI> lists earlier
                revisions and <em>32 units · rev 7</em> in the corner is the board revision.
              </Step>
            </Steps>
            <GuideFigure
              src={shot("30-plan-board-staging")}
              alt="The Tactical board in the Planning phase: 32 unit cards arranged inside a green staging circle at Everus Harbor, the transit rectangle, the hexagonal WP2 objective area, the red debris-field circle, the casualty LZ and the extraction circle at Port Tressler, with blue escort, amber convoy, violet recon, green search and red medical routes; the objectives panel open on the right"
              caption="The finished plan in Planning: staging → transit → objective → extraction from left to right, recovery and the LZ below, routes that do not cross. Summary card: 28/32 ready · 0/6 complete · 8 wings."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("31-plan-briefing-dialog")}
              alt="The Operation briefing — Halcyon Convoy dialog over the board, with the simulated-demonstration notice, the mission, the plan by wing and the comms plan, and an Edit button"
              caption="Brief opens the written briefing over the board. Leaders see Edit."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("32-plan-wings-panel")}
              alt="The WINGS panel: New wing input with colour swatches and Add, the hint to select units then click a wing, and the eight wings with their member counts — Command 3/3, Talon 6/6, Caravan 5/5, Lynx 3/3, Mercy 3/3, Salvor 4/4, Anchor 4/4, Reserve 0/4"
              caption="WINGS-8 — one colour per wing; the counts show how many members are placed."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("34-plan-roster-linked")}
              alt="The ROSTER panel after linking: Operation Halcyon… with a DRAFT chip, and units grouped by wing — Command 0/3, Talon — escort 0/6, Caravan — transport 0/5, Lynx — scouts 0/3"
              caption="ROSTER after linking the board to the operation: the same groups as the Operations roster, with check-in counts."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />

            {/* 06 ------------------------------------------------------------------------------ */}
            <H2 id="brief" n={6}>
              Brief and deploy
            </H2>
            <p>
              The operation moves through <em>Draft → Published → Staging → Live</em>. Publishing tells the members;
              staging opens the nets and starts check-ins; going live starts the clock. Orders are issued from the{" "}
              <UI>Orders</UI> tab and acknowledged by the people they are for, and <UI>Preflight</UI> tells you what
              would stop you before you click <UI>Go live</UI>.
            </p>
            <Steps>
              <Step who="Commander">
                Click <UI>Publish</UI>.
                <Outcome>
                  The badge changes to <em>PUBLISHED</em>, the message <em>Operation is now Published.</em> appears, and
                  the buttons become <UI>Start staging</UI>, <UI>Back to draft</UI>, <UI>Cancel operation</UI> and{" "}
                  <UI>Open Tactical</UI>. The operation chat now exists (<em>Comms (1)</em>).
                </Outcome>
              </Step>
              <Step who="Commander">
                Click <UI>Start staging</UI>.
                <Outcome>
                  <em>STAGING</em>, buttons <UI>Publish</UI>, <UI>Go live</UI>, <UI>Cancel operation</UI>,{" "}
                  <UI>Open Tactical</UI>. A banner above the page now follows you everywhere —{" "}
                  <em>OPERATION HALCYON CONVOY (SIMULATED) · STAGING · 142h 6m · Command · … · 2 of 5 ready</em> — with{" "}
                  <UI>Check in</UI>, <UI>Comms</UI>, <UI>Tactical</UI> and <UI>Requests</UI> links.
                </Outcome>
              </Step>
              <Step who="Everyone">
                Click <UI>Check in</UI> under <em>My participation</em>, set <UI>Operational state</UI> to{" "}
                <code>Operational</code>, type your <UI>Location</UI> and click <UI>Update</UI>, and enter{" "}
                <UI>Fuel % / Ammo % / Hull %</UI> then <UI>Update</UI>.
                <Outcome>
                  <em>✓ Checked in 2 minutes ago · Check out</em>; the location and resources read{" "}
                  <em>REPORTED BY PLAYER · LIVE</em>. On the Roster the group counters climb — <em>3/3 checked in</em>,{" "}
                  <em>6/6 checked in</em> — and states turn <em>OPERATIONAL</em>.
                </Outcome>
              </Step>
              <Step who="Commander">
                Open <UI>Orders</UI>. Below your own action deck is the <UI>Issue order</UI> form: type the{" "}
                <UI>Order</UI> (120 characters max), choose <UI>Kind</UI>, <UI>To unit</UI>, <UI>Priority</UI> and an
                optional <UI>Target / reference</UI>, then click <UI>Issue order</UI>. The convoy got three: Caravan&rsquo;s
                departure order (High), Talon&rsquo;s screen and Mercy&rsquo;s standby.
                <Outcome>
                  Each order lists as <em>ISSUED</em> with its unit chip, <em>0 acknowledged · 5 pending · 0 unable</em>,
                  a receipt chip per recipient (<em>demo-caravan1: Pending</em>) and <UI>Mark complete</UI> /{" "}
                  <UI>Cancel order</UI>. Cancelled and superseded orders stay in the list with their badge (the two{" "}
                  <em>SUPERSEDED</em> rows below are earlier wordings).
                </Outcome>
              </Step>
              <Step who="Member">
                On <UI>My Dock</UI> the active-operation card shows the readiness chips (<em>RSVP · ASSIGNMENT ·
                CHECK-IN · SHIP · ORDERS · COMMS</em>), the line <em>Order awaiting your acknowledgement: …</em> and, under{" "}
                <em>Needs your action</em>, an <UI>Acknowledge</UI> link. On the operation&rsquo;s <UI>Orders</UI> tab the
                order sits in an <em>ORDERS FOR YOU</em> box with <UI>Acknowledge</UI>, <UI>Unable</UI> and{" "}
                <UI>Request clarification</UI>; click <UI>Acknowledge</UI>.
                <Outcome>
                  Your receipt chip reads <em>You: Acknowledged</em>, the order&rsquo;s counter becomes{" "}
                  <em>1 acknowledged · 4 pending</em>, and your deck&rsquo;s <em>Next step</em> moves on from{" "}
                  <em>Acknowledge</em> to <em>Engaging</em>. A <UI>Completed</UI> button appears on the order for when
                  you have carried it out.
                </Outcome>
              </Step>
              <Step who="Commander">
                Open <UI>Preflight</UI> and read the verdict. <em>GO · No blockers (0 overridden) · 1 warning · 1
                suggestion</em> with the sources it was derived from; each finding has a badge and, for warnings,{" "}
                <UI>Override…</UI>. <UI>Snapshot this preflight</UI> keeps the verdict for the debrief.
              </Step>
              <Step who="Commander">
                Click <UI>Go live</UI>.
                <Outcome>
                  <em>LIVE</em> with a running clock (<em>LIVE 00:00:10</em>), <em>Operation is now Live.</em>, buttons{" "}
                  <UI>Begin completion</UI>, <UI>Abort</UI> and <UI>Open Tactical</UI>; the per-unit chats are created (
                  <em>Comms (23)</em>) and the assigned-comms banner switches to the Command net.
                </Outcome>
              </Step>
            </Steps>
            <GuideFigure
              src={shot("40-published")}
              alt="The operation after Publish: PUBLISHED badge, Start staging / Back to draft / Cancel operation / Open Tactical buttons and the message Operation is now Published"
              caption="Published. The lifecycle buttons change with each status."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-lifecycle-published")}
              full={detailFull("d-lifecycle-published")}
              alt="Close-up of the Published header with its four lifecycle buttons"
              caption="Detail — the header after Publish."
              width={1260}
              height={165}
              detail
            />
            <GuideFigure
              src={shot("41-staging-header")}
              alt="The operation in STAGING with Publish / Go live / Cancel operation / Open Tactical buttons, the persistent operation banner above the page with Check in, Comms, Tactical and Requests links, and the Comms tab showing three nets"
              caption="Staging: the banner at the top of every page carries the operation, its clock, your unit and a ready count."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-checkin-panel")}
              full={detailFull("d-checkin-panel")}
              alt="Close-up of My participation after check-in: Checked in 2 minutes ago with Check out, Operational state Operational, location Everus Harbor — staging reported by player live, fuel 91 ammo 100 hull 100"
              caption="Detail — My participation after Check in, with location and resources reported by the player."
              width={1242}
              height={304}
              detail
            />
            <GuideFigure
              src={shot("42-staging-roster")}
              alt="The Roster during staging: Command 3/3 checked in and Talon — escort 6/6 checked in, every row OPERATIONAL"
              caption="Roster during staging — check-ins and states arriving from each member's client."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("43-staging-orders")}
              alt="The commander's Orders tab: the What you can do now deck with Next step (Start mission, Returning to base), Other options (Servicing, Disabled) and Call for support buttons, with the note that actions marked in red ask once before they fire"
              caption="Orders (3), top half: your own action deck. Red actions confirm once before they fire."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("43b-staging-orders-list")}
              alt="The Issue order form (Order, Kind, To unit, Priority, Target / reference, Issue order) and the issued orders below it: Mercy stand by (Normal), Talon 2-2-2 screen (Normal), Caravan depart Everus 19:45 UTC (High), each with pending receipt chips, plus two superseded earlier versions"
              caption="Orders (3), lower half: the Issue order form and the issued orders with a receipt chip per recipient. The two SUPERSEDED rows are earlier wordings that were re-issued."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-issue-order-form")}
              full={detailFull("d-issue-order-form")}
              alt="Close-up of the Issue order form fields"
              caption="Detail — Issue order."
              width={1242}
              height={176}
              detail
            />
            <GuideFigure
              src={shot("45-member-my-dock")}
              alt="A member's My Dock during staging: the assigned-comms banner, the active operation card with readiness chips RSVP, ASSIGNMENT and CHECK-IN done and SHIP, ORDERS, COMMS open, the order awaiting acknowledgement, and Needs your action with Confirm your ship and Acknowledge"
              caption="My Dock for CARAVAN-3: what the operation needs from this member, and the order waiting for acknowledgement."
              viewer="CARAVAN-3"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("47b-member-orders-for-you")}
              alt="The member's Orders tab with the ORDERS FOR YOU box: the Caravan departure order from demo-anvil, High priority, with Acknowledge, Unable and Request clarification buttons, above the full order list"
              caption="Orders for you — the order addressed to this member, with the three possible receipts."
              viewer="CARAVAN-3"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-orders-for-you")}
              full={detailFull("d-orders-for-you")}
              alt="Close-up of the Orders for you box"
              caption="Detail — Acknowledge, Unable, Request clarification."
              width={1242}
              height={134}
              detail
            />
            <GuideFigure
              src={shot("48-member-order-acknowledged")}
              alt="After acknowledging: the deck's Next step is now Engaging / Returning to base, the Caravan order shows 1 acknowledged · 4 pending with the chip You: Acknowledged and a Completed button"
              caption="After Acknowledge: the receipt chip reads You: Acknowledged and the member's next step advances to Engaging."
              viewer="CARAVAN-3"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-deck-after-ack")}
              full={detailFull("d-deck-after-ack")}
              alt="Close-up of the member's action deck after acknowledging"
              caption="Detail — the deck after acknowledgement."
              width={690}
              height={286}
              detail
            />
            <GuideFigure
              src={shot("44-staging-preflight")}
              alt="The Preflight tab: GO, no blockers, 1 warning, 1 suggestion, with the sources used; findings list a warning that voice rooms are planned but the server has no media plane (with Override…) and a suggestion that no qualification requirements are defined"
              caption="Preflight (1): a GO verdict with one warning (no media plane on the demo server) and one suggestion."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("50-go-live")}
              alt="The operation LIVE with a running clock, Begin completion / Abort / Open Tactical buttons, Operation is now Live, Comms (23) and the assigned-comms banner now naming the Command net"
              caption="Go live: the clock starts, per-unit chats appear (Comms 23) and the Command net becomes the commander's assigned comms."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />

            {/* 07 ------------------------------------------------------------------------------ */}
            <H2 id="coordinate" n={7}>
              Coordinate during the operation
            </H2>
            <p>
              While live there are two places to work from. The <UI>Tactical</UI> board in the main app is the full
              picture — phases, routes, alerts, orders, the log. The in-game overlay is the compact one: a small,
              click-through window with the current operation, your state and numbered quick actions, for pilots who
              are in the game rather than at the board.
            </p>
            <h3>The main-app Tactical board</h3>
            <Steps>
              <Step who="Commander">
                Advance the phase from the toolbar: the <UI>PHASE</UI> selector or the <UI>Advance ▸ Objective</UI>{" "}
                button move <em>Briefing → Forming up → En route → Objective → Extraction → Debrief</em>. The summary card
                follows (<em>EN ROUTE · 28/32 ready · 1/6 complete</em>).
              </Step>
              <Step who="Wing leader">
                Open <UI>ROUTES</UI> to set each route&rsquo;s status and tick off waypoints as the wing reaches them:{" "}
                <em>Caravan — transport · MOVING · 2/5</em>, <em>SALVOR-1 · HOLDING · 0/4</em>. Move your wing&rsquo;s
                cards along the route as positions are reported on the net — the board never guesses.
              </Step>
              <Step who="Commander">
                Mark objectives as they resolve in the <UI>OBJ</UI> panel (<em>Pending → Active → Complete</em>); the
                completion time is recorded on the card.
              </Step>
              <Step who="Everyone">
                Use the mouse wheel to zoom and drag the canvas to pan; the <em>Msn / Me / Wing</em> toggles at the top
                right filter what is drawn, and the minimap in the corner shows where you are. Your viewport is saved
                per account, so the board reopens where you left it.
              </Step>
              <Step who="Commander">
                When something changes the plan, raise an alert on the board — it appears as a card for everyone who has
                the board open — and put the decision in the <UI>ORDERS</UI> panel with{" "}
                <UI>Issue an order…</UI> → <UI>Issue</UI>. Board orders are short and situational; the operation&rsquo;s
                Orders tab keeps the formal, receipted ones.
              </Step>
            </Steps>
            <GuideFigure
              src={shot("51-live-board-en-route")}
              alt="The board live in the EN ROUTE phase: Command near the lane, Talon in two rows either side of the convoy, the five Caravan haulers together inside the objective hexagon, Lynx scouts ahead near Port Tressler, Anchor at the staging circle, Mercy at the LZ, Salvor at the debris field, Reserve below; the objectives panel shows Form up complete and Deliver the cargo pending"
              caption="Live, EN ROUTE: the convoy in the lane with its screen, scouts ahead, support elements on station. Summary: 28/32 ready · 1/6 complete."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("52-live-routes-panel")}
              alt="The ROUTES panel open on the live board: Caravan MOVING 2/5, Talon MOVING 2/4, LYNX-1 MOVING 1/3, SALVOR-1 HOLDING 0/4, MERCY-1 HOLDING 0/4"
              caption="ROUTES-5 — status and waypoint progress per route; the contingency routes hold until needed."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("54-live-objective-zoom")}
              alt="The board zoomed in on the objective area: the Talon cards above and below the five Caravan cards inside the WP2 hexagon, Lynx cards on the recon leg, waypoint labels readable"
              caption="Zoomed with the mouse wheel on the objective area — the escort screen around the haulers, waypoint labels legible."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("60-hold-board-alert")}
              alt="The board in the OBJECTIVE phase with a WARNING alert card: Debris strike at WP2 — CARAVAN-2 (Hull C) drives down. Convoy holds; Salvor recovering. CARAVAN-2 is now red inside the debris-field circle next to SALVOR-1; the summary card reads 27/32 ready · 1 down · 1 open order · 1 active alert"
              caption="The hold: an alert card on the board, CARAVAN-2 down in the debris field, one open board order, one active alert."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
              <GuideFigure
                src={detail("d-alert-card")}
                full={detailFull("d-alert-card")}
                alt="Close-up of the WARNING alert card"
                caption="Detail — the alert card."
                width={319}
                height={96}
                detail
              />
              <GuideFigure
                src={detail("d-summary-card")}
                full={detailFull("d-summary-card")}
                alt="Close-up of the OBJECTIVE summary card: Units 27/32 ready · 1 down, Objectives 1/6 complete, Orders 1 open, Alerts 1 active, Wings 8"
                caption="Detail — the summary card."
                width={217}
                height={161}
                detail
              />
            </div>
            <GuideFigure
              src={shot("61-hold-recovery-zoom")}
              alt="Zoomed on the recovery area with the ORDERS panel open: the issued board order ALL: convoy holds at WP2 until the Hull C is under tow; CARAVAN-2 red beside SALVOR-1 in the debris field, Mercy at the LZ, Talon-4/5/6 holding under the convoy"
              caption="Zoomed on the recovery with ORDERS-1 open: the hold order beside the units it concerns."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />

            <h3>The compact in-game overlay and Quick Actions</h3>
            <p>
              The overlay is a second window that stays click-through while passive, so the game keeps your keyboard and
              mouse. In its <em>Compact</em> layout it shows the operation name, your operational state, the current
              primary action and up to eight numbered quick actions; <em>Micro</em> is a single line. The actions are the
              same ones as the <em>What you can do now</em> deck in the app — <em>Log progress</em>, <em>Returning to
              base</em>, <em>Mission complete</em>, <em>Servicing</em>, <em>Disabled</em>, <em>Mission failed</em>,{" "}
              <em>Under attack</em>, <em>Request rearm</em> — derived on the server from your role and the operation&rsquo;s
              state, so a repeated press replays instead of applying twice.
            </p>
            <Steps>
              <Step who="Member">
                Set it up once under <UI>Settings → Game overlay</UI>: choose how it activates, bind the{" "}
                <em>interaction</em> key, and bind the two controls — <em>Quick Action</em> fires the highlighted action
                without taking the mouse, <em>Pointer / Menu</em> hands the cursor over deliberately; <em>Escape</em> hands
                input back. Pick the monitor, position, layout, scale and opacity.
              </Step>
              <Step who="Member">
                In the game, press the Quick Action binding to fire the primary action, or the number of any other. When
                the deck shows <em>Request rearm</em> and you fire it, the request is created for the operation exactly as
                from the Requests tab. The overlay also shows the open-request count for your operation.
              </Step>
            </Steps>
            <p>
              <strong>Honest note on hotkeys.</strong> A fresh install has <em>no hotkey bound</em>, and the overlay says
              so in its footer (see below) until you bind one in Settings. The capture here is of the overlay window
              itself, with no game running on the demo machine, so it shows the deck exactly as rendered but not
              composited over a game.
            </p>
            <GuideFigure
              src={shot("53-live-overlay-compact")}
              full={`${G}/full/53-live-overlay-compact.png`}
              alt="The in-game overlay window in Compact layout: Operation Halcyon Convoy (SIMULATED), Operational, primary action Log progress, eight numbered quick actions, and the footer No hotkey bound"
              caption="The overlay, Compact layout, captured from the overlay window: the same actions as the in-app deck, numbered for the keyboard — and the No hotkey bound footer of an unbound install."
              viewer="ANVIL"
              width={998}
              height={198}
            />
            <GuideFigure
              src="/screenshots/v5/overlay-settings.png"
              full="/screenshots/v5/overlay-settings.png"
              alt="Settings → Game overlay: activation sources, the interaction binding, Quick Action and Pointer/Menu controls, monitor, position, layout, scale and opacity"
              caption="Settings → Game overlay — where the bindings, layout and placement are set."
              viewer="ANVIL"
              width={1600}
              height={900}
            />

            {/* 08 ------------------------------------------------------------------------------ */}
            <H2 id="incident" n={8}>
              Handle a support incident
            </H2>
            <p>
              One concrete example, end to end: after the hold at WP2 the Freelancer MAX (CARAVAN-3) is down to 14 %
              fuel and will not make Port Tressler. The pilot raises a refuel request; the logistics operator ANCHOR-2
              takes it, brings the Starfarer up the lane, resolves it, and the delivered fuel is booked against the stock
              that was staged for the operation.
            </p>
            <Steps>
              <Step who="Member (CARAVAN-3)">
                Report the state first: on the operation page set <UI>Fuel %</UI> to <code>14</code>, the{" "}
                <UI>Location</UI> to <code>Yela lane — WP2 hold</code>, and click <UI>Update</UI> on each.
              </Step>
              <Step who="Member (CARAVAN-3)">
                Open the <UI>Requests</UI> tab. Under <em>Quick request</em> choose the priority (<code>High</code>), type
                the note — <code>Freelancer MAX at 14 % after the WP2 hold - will not make Tressler without a top-up</code>{" "}
                — and click <UI>Refuel</UI>. (The same request can be fired from the overlay deck or from the{" "}
                <em>Call for support</em> row of your Orders deck; those carry no note.)
                <Outcome>
                  A row appears under <em>Support requests</em>: <em>Refuel · You · CARAVAN — TRANSPORT · @ Yela lane —
                  WP2 hold · HIGH · OPEN</em>, with the note and <UI>Take</UI>, <UI>Resolve</UI> and <UI>Cancel</UI>. The
                  tab counter becomes <em>Requests (2)</em> — the recovery request for the Hull C is already in progress
                  above it.
                </Outcome>
              </Step>
              <Step who="Logistics (ANCHOR-2)">
                Open <UI>Operations → Requests</UI> (the operation banner&rsquo;s <UI>Requests</UI> link goes straight there)
                and click <UI>Take</UI> on the refuel row.
                <Outcome>
                  The row changes to <em>IN PROGRESS · Handled by You</em> and, for everyone else,{" "}
                  <em>Handled by demo-anchor2</em>. Your own Orders deck now offers <em>Resolved</em> and{" "}
                  <em>Returning to base</em> as next steps.
                </Outcome>
              </Step>
              <Step who="Logistics (ANCHOR-2)">
                Coordinate on your net: in <UI>#logistics</UI> post what you are doing (<em>refuel request from
                CARAVAN-3 taken. Starfarer moving up the lane to WP2, 60 SCU hydrogen on the boom</em>). The channel is
                where the earlier staging note (<em>Starfarer Gemini on station at Everus with 480 SCU of hydrogen</em>)
                already lives, so the thread reads as one record.
              </Step>
              <Step who="Logistics (ANCHOR-2)">
                When the top-up is done, click <UI>Resolve</UI> on the request row, and post the result on the net.
                <Outcome>
                  The row leaves the open list (<em>Requests (1)</em> — only the recovery remains). The fuel reading is
                  updated afterwards by the pilot, or by the commander on their behalf (<em>88 %</em>) — resolving a
                  request does not edit anyone&rsquo;s participation record.
                </Outcome>
              </Step>
              <Step who="Logistics (ANCHOR-2)">
                Book the fuel on <UI>Logistics</UI>. The <UI>Operations</UI> tab of Logistics shows the requirement that
                was staged for the convoy — <em>STAGED · 300 × Convoy transit fuel · High · @ Everus Harbor — Starfarer
                refuel point</em>, readiness <em>100 % covered</em>. On <UI>Overview</UI>, a stock recount records the
                delivery; it appears under <em>Recent stock activity</em> as <em>COUNT / ADJUST · Hydrogen fuel · 480 →
                420 — Recount after refuelling CARAVAN-3 at WP2: 60 SCU delivered</em> with who booked it and when.
              </Step>
            </Steps>
            <GuideFigure
              src={shot("70-incident-request-form")}
              alt="CARAVAN-3's Requests tab: fuel 14 % and location Yela lane — WP2 hold in My participation; the Quick request row with Medical, Repair, Rearm, Refuel, Resupply, Recovery, Escort, Under attack, Attacking and Intel, priority High and the typed note; below it the recovery request for the Hull C in progress"
              caption="Raising the request: fuel and location reported, priority High, the note typed, Refuel about to be clicked."
              viewer="CARAVAN-3"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-quick-request")}
              full={detailFull("d-quick-request")}
              alt="Close-up of the Quick request row with the priority selector and the note"
              caption="Detail — Quick request."
              width={1242}
              height={110}
              detail
            />
            <GuideFigure
              src={shot("71-incident-request-raised")}
              alt="The new refuel request row: Refuel · You · CARAVAN — TRANSPORT · @ Yela lane — WP2 hold · HIGH · OPEN, with the note, 48 seconds ago, and Take / Resolve / Cancel buttons; the recovery request in progress above it; Requests (2)"
              caption="The request is open. The requester can still Cancel it; anyone who can help can Take it."
              viewer="CARAVAN-3"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-request-open")}
              full={detailFull("d-request-open")}
              alt="Close-up of the open refuel request row"
              caption="Detail — the open request."
              width={1242}
              height={117}
              detail
            />
            <GuideFigure
              src={shot("73-incident-support-dock")}
              alt="ANCHOR-2's My Dock: the assigned Anchor — logistics net, the active operation card with 2 of 4 ready, and Live now listing the operation, the convoy escort mission and the Hull C recovery mission"
              caption="The logistics operator's My Dock while the request is open."
              viewer="ANCHOR-2"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("74-incident-support-requests")}
              alt="ANCHOR-2's Requests tab with both support requests: Recovery demo-caravan2 CRITICAL IN PROGRESS handled by demo-salvor1 with Resolve, and Refuel demo-caravan3 HIGH OPEN with Take and Resolve"
              caption="Requests as ANCHOR-2 sees them: the recovery already handled by SALVOR-1, the refuel open with a Take button."
              viewer="ANCHOR-2"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("75-incident-taken")}
              alt="After Take: the refuel row reads HIGH · IN PROGRESS · Handled by You with a Resolve button"
              caption="After Take: IN PROGRESS · Handled by You."
              viewer="ANCHOR-2"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-request-in-progress")}
              full={detailFull("d-request-in-progress")}
              alt="Close-up of the refuel request row in progress"
              caption="Detail — the request in progress."
              width={1242}
              height={123}
              detail
            />
            <GuideFigure
              src={shot("76-incident-support-deck")}
              alt="ANCHOR-2's Orders tab deck while handling the request: Next step Resolved / Returning to base, Other options Servicing / Disabled, Call for support row"
              caption="The handler's own deck offers Resolved and Returning to base as next steps while a request is in progress."
              viewer="ANCHOR-2"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("76b-incident-logistics-net")}
              alt="The #logistics channel: ANCHOR-1's staging note that the Starfarer Gemini is on station at Everus with 480 SCU of hydrogen, then ANCHOR-2's two messages — refuel request from CARAVAN-3 taken, Starfarer moving to WP2 with 60 SCU on the boom; CARAVAN-3 topped up to 88 %, back to the staging point — with 30 members online in the sidebar"
              caption="#logistics — the coordination thread: fuel staged at Everus, the request taken, the top-up done."
              viewer="ANCHOR-2"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("77-incident-resolved")}
              alt="After Resolve: Requests (1) — only the recovery request remains in the support requests list"
              caption="After Resolve the refuel request leaves the open list; only the Hull C recovery is still in progress."
              viewer="ANCHOR-2"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("79-incident-logistics-operation")}
              alt="Logistics → Operations for Halcyon Convoy: readiness 100 % covered; the requirement STAGED 300 × Convoy transit fuel, High, at Everus Harbor — Starfarer refuel point, with Requested 0, Approved 0, Reserved 0, In transit 0, Staged 300, Missing 0, Disputed 0; and the Add requirement form"
              caption="Logistics → Operations: the fuel requirement staged for the convoy before departure, fully covered."
              viewer="ANCHOR-2"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("78-incident-logistics")}
              alt="Logistics → Overview: counters (1 available, 0 reserved, 0 checked out, 0 active requests, 0 pending approvals, 0 active transfers, 0 due deliveries, 0 low stock, 0 discrepancies) and Recent stock activity with two COUNT / ADJUST rows for Hydrogen fuel: 480 → 420 recount after refuelling CARAVAN-3 at WP2 (60 SCU delivered), and 0 → 480 Starfarer Gemini topped up before departure"
              caption="Logistics → Overview after the incident: the recount that books the 60 SCU delivered, under the original 480 SCU staging entry."
              viewer="ANCHOR-2"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-stock-activity")}
              full={detailFull("d-stock-activity")}
              alt="Close-up of the two stock activity rows"
              caption="Detail — Recent stock activity."
              width={1566}
              height={97}
              detail
            />

            {/* 09 ------------------------------------------------------------------------------ */}
            <H2 id="close" n={9}>
              Extract and close
            </H2>
            <p>
              Closing has two halves. On the board, finish the plan: routes complete, objectives complete, alerts cleared,
              the phase advanced to <em>Extraction</em> then <em>Debrief</em>. On the operation, run the lifecycle to its
              end: <em>Live → Completing → Completed</em>, then <em>Archive</em>. The debrief is computed from the
              durable event stream, so everything acknowledged, requested and booked during the run is still there.
            </p>
            <Steps>
              <Step who="Commander">
                On <UI>Tactical</UI>, set <UI>PHASE</UI> to <em>Extraction</em>, move the wings to Port Tressler (Mercy
                back to the clinic, Anchor still at the Starfarer), set every route to <em>complete</em> in <UI>ROUTES</UI>,
                mark the remaining objectives <em>Complete</em> in <UI>OBJ</UI>, clear the alert and mark the board order
                done.
                <Outcome>
                  The summary card reads <em>EXTRACTION · 28/32 ready · 6/6 complete · Orders all done</em>. Once the
                  Hull C is under tow, CARAVAN-2 turns green again.
                </Outcome>
              </Step>
              <Step who="Commander">
                On <UI>Operations</UI>, click <UI>Begin completion</UI>.
                <Outcome>
                  <em>COMPLETING</em>, <em>Operation is now Completing.</em>, buttons <UI>Go live</UI> (to reopen),{" "}
                  <UI>Complete</UI>, <UI>Abort</UI>, <UI>Open Tactical</UI>. The open orders and requests tabs read (0).
                </Outcome>
              </Step>
              <Step who="Commander">
                Click <UI>Complete</UI>.
                <Outcome>
                  <em>✓ COMPLETED</em>, <em>Operation is now Completed.</em>, buttons <UI>Archive</UI>,{" "}
                  <UI>Open Tactical</UI>, <UI>Delete operation</UI>. Comms (0): the nets are no longer listed for the
                  operation; rooms marked <em>KEEP</em> in the room plan stay in the sidebar.
                </Outcome>
              </Step>
              <Step who="Commander">
                Open <UI>Debrief</UI>. <em>Planned vs actual</em> summarises the run from the durable events — confirmed
                vs checked in, orders issued and acknowledged, requests resolved, assets committed, the preflight verdict
                — with a chip per lifecycle transition and its time, and <UI>Open Mission Log (Tactical)</UI> for the
                board&rsquo;s own log. The <em>Timeline</em> below can be filtered by stage (<em>Before staging · Staging
                · Live · After</em>) and kind (<em>Status, Roster, Assignment, Check-in, State, Report, Order, Receipt,
                Request, Asset, Logistics, Comms, Preflight</em>) and by person or unit; every entry has a <UI>Note</UI>{" "}
                link. Under <em>Notes, lessons, actions</em>, write the after-action items and choose who they are
                visible to.
              </Step>
              <Step who="Commander">
                Check <UI>Missions</UI> → <UI>Completed</UI>: the escort and the recovery missions are listed as{" "}
                <em>COMPLETED</em> with their location, risk and reward.
              </Step>
              <Step who="Commander">
                Click <UI>Archive</UI> when the debrief is done.
                <Outcome>
                  The operation leaves the Operations list. The debrief, timeline, logistics ledger and mission history
                  remain on the server; the board remains under Tactical.
                </Outcome>
              </Step>
            </Steps>
            <GuideFigure
              src={shot("80-close-board-extraction")}
              alt="The board in the EXTRACTION phase: all Talon, Caravan, Lynx, Command and Salvor cards gathered inside the Port Tressler extraction circle, Mercy back at the staging circle, Anchor at the Starfarer, Reserve below; every route drawn complete; summary 28/32 ready · 6/6 complete · Orders all done"
              caption="Extraction: everyone at Port Tressler except the support elements, every route and objective complete."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("81-close-board-extraction-focus")}
              alt="Zoomed on the extraction circle: Lynx scouts on top, the Talon screen in two rows, the five Caravan haulers in the middle with 5/5 waypoint progress, Command beside them, CARAVAN-2 recovered and green, Salvor below"
              caption="Zoomed on Port Tressler: the haulers at 5/5, CARAVAN-2 recovered and green beside Salvor."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("82-close-completing")}
              alt="The operation COMPLETING with Go live / Complete / Abort / Open Tactical buttons and the message Operation is now Completing; every member at Port Tressler and still Operational"
              caption="Begin completion: the operation is COMPLETING and can still be reopened with Go live."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-lifecycle-completing")}
              full={detailFull("d-lifecycle-completing")}
              alt="Close-up of the Completing header and its buttons"
              caption="Detail — the header while Completing."
              width={1260}
              height={160}
              detail
            />
            <GuideFigure
              src={shot("83-close-completed")}
              alt="The operation COMPLETED with Archive / Open Tactical / Delete operation buttons, Operation is now Completed, and the tabs Comms (0), Orders (0), Requests (0)"
              caption="Completed. Stage rooms are gone; the roster, ships and debrief remain."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("84-close-debrief")}
              alt="The Debrief tab: Planned vs actual — 28 confirmed, 28 checked in of 28 confirmed, 5 orders issued 1/25 acknowledged, 2/2 requests resolved, 28 assets committed, preflight v1 Go, 0 open actions — lifecycle chips Published, Staging, Live, Completing, Completed with times, Open Mission Log (Tactical), and the timeline filters below"
              caption="Debrief — computed from 326 durable events. The 1/25 acknowledged is honest: only one acknowledgement was recorded in this run."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={detail("d-debrief-summary")}
              full={detailFull("d-debrief-summary")}
              alt="Close-up of Planned vs actual and the lifecycle chips"
              caption="Detail — Planned vs actual."
              width={1242}
              height={232}
              detail
            />
            <GuideFigure
              src={shot("86-close-debrief-requests")}
              alt="The debrief timeline filtered to Request and Logistics: the staged fuel requirement during staging, then during live the recovery request raised and taken, the refuel request raised by demo-caravan3, taken and resolved by demo-anchor2, and the recovery resolved by demo-salvor1, each with a time, a REPORTED or OBSERVED badge, the actor and a Note link; the Notes, lessons, actions form below"
              caption="Timeline filtered to Request + Logistics: the whole refuel incident, in order, with who did what and when. Notes, lessons and actions are written underneath."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("87-close-missions-completed")}
              alt="Missions → Completed: Convoy escort: Everus Harbor → Port Tressler (escort, High risk, Org cargo share) and Recover the disabled Hull C (recovery, Medium risk, Salvage share), both COMPLETED with Details buttons"
              caption="Missions → Completed after the close."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />
            <GuideFigure
              src={shot("88-close-archived")}
              alt="The Operations page after Archive: No operations yet. Create one to start planning."
              caption="After Archive the operation is no longer listed under Operations."
              viewer="ANVIL"
              width={1920}
              height={1080}
            />

            {/* 10 ------------------------------------------------------------------------------ */}
            <H2 id="troubleshooting" n={10}>
              Troubleshooting and limits
            </H2>
            <p>
              What to check when something in the flow above does not appear, and what this closed-beta build does not
              do. Everything here was observed on the demo server while capturing this guide.
            </p>
            <h3>Missing permissions</h3>
            <ul>
              <li>
                No <UI>+ New operation</UI>, <UI>Publish</UI> or <UI>Issue order</UI>: your role does not carry the
                leadership permission. The Tactical toolbar chip shows your effective role; ask the server owner to adjust
                it under <UI>Workspace</UI>.
              </li>
              <li>
                A net shows <UI>Join net</UI> greyed out: you are not in its audience (the Command net is{" "}
                <em>LEADERSHIP</em>). That is by design, not a fault.
              </li>
              <li>
                <UI>Unit</UI> cannot be changed on your participation once staging began — the page says so:{" "}
                <em>Unit assignments are managed by leadership once staging begins.</em> Ask your commander to move you on
                the Units tab.
              </li>
            </ul>
            <h3>Disconnected or stale members</h3>
            <ul>
              <li>
                A member&rsquo;s location or resources read <em>REPORTED BY PLAYER · DELAYED</em> or <em>Stale</em> with
                an age: the last report is old. Nothing on the board or the roster is inferred; it stays until the
                member reports again or the commander sets it (<em>REPORTED BY COMMAND</em>).
              </li>
              <li>
                <em>My Dock</em> shows a <em>STALE</em> chip when the assembled view is behind the server; the refresh
                control next to it re-assembles it, and the footer says which update it was assembled from.
              </li>
              <li>
                Presence goes <em>Away</em> automatically when a member is idle; the roster dot and the member list reflect
                it. Orders and requests are unaffected.
              </li>
            </ul>
            <h3>Empty catalog</h3>
            <ul>
              <li>
                <UI>Location from catalog</UI> on an objective, and catalog-backed ship definitions, need a provider
                import. Without one the Verse Catalog page is empty and the coverage dashboard says so; objectives can
                still be typed by hand. The import is run by the server owner through the server&rsquo;s admin tooling (the demo used the
                built-in Star Citizen Wiki provider).
              </li>
            </ul>
            <h3>Unavailable controls</h3>
            <ul>
              <li>
                <strong>Voice.</strong> If the server has no media plane, Preflight warns <em>Voice rooms are planned but
                this server has no media plane</em> (derived, overridable), My Dock says <em>Voice is not configured on
                this server — comms nets are text only</em>, and a joined net shows <em>Voice unavailable</em> with a{" "}
                <UI>Retry</UI>. Voice is enabled by the host in LynxDock Host; the nets work as text rooms meanwhile.
              </li>
              <li>
                <strong>Overlay hotkeys.</strong> The overlay shows <em>No hotkey bound</em> until you bind the controls
                in <UI>Settings → Game overlay</UI>. The overlay cannot draw over a game in exclusive fullscreen; use
                borderless or windowed.
              </li>
              <li>
                <strong>Red actions</strong> on the deck (<em>Under attack</em>, <em>Disabled</em>, <em>Unable to
                comply</em>, <em>Request medical</em>) confirm once before they fire — the amber line under the deck says
                so. A stale press is refused with a reason; a repeated press replays.
              </li>
              <li>
                <strong>Confirm your ship</strong> stays open in the readiness chips until the member picks a{" "}
                <UI>Current ship / asset</UI> on their participation, even when a ship is committed under Ships &amp;
                assets — the two are separate records.
              </li>
            </ul>
            <h3>Beta limitations seen in this run</h3>
            <ul>
              <li>
                Board positions, routes and statuses are entered by people. There is no game telemetry, no automatic
                movement and no position sync from Star Citizen.
              </li>
              <li>
                The deck&rsquo;s next-step labels are generic (<em>Resolved</em>, <em>Returning to base</em>) and do not
                name the request or order they refer to; the context is on the Requests and Orders tabs.
              </li>
              <li>
                Superseded orders remain in the Orders list (as <em>SUPERSEDED</em>); there is no filter to hide them.
              </li>
              <li>
                The Units tab shows leaders by username (<em>demo-talon1</em>) rather than callsign; the Roster and the
                board use callsigns.
              </li>
              <li>
                After <UI>Archive</UI> the operation is not listed under Operations and this build has no archived
                view; the records stay on the server (debrief, timeline, logistics history, mission history).
              </li>
              <li>
                The debrief timeline shows the first 100 of its entries (<em>100 of 287 entries</em>); use the stage,
                kind, person and unit filters to narrow it.
              </li>
              <li>
                Orders are limited to 120 characters; longer text is refused by the server.
              </li>
            </ul>

            <GlassPanel className="mt-10 p-4 text-[13.5px] leading-relaxed">
              <p className="mb-2">
                <span className="hud-label mr-2 text-signal-bright">About these captures</span>
                Taken with the application&rsquo;s own window capture from the qualified V5 build against an isolated demo
                server on 2026-09-20, in the order shown. No control was added, no element was hidden and nothing was
                drawn in; where the interface has a limitation it is described above rather than worked around.
                Detail images are 1:1 crops of the originals. The Verse Catalog contents come from the Star Citizen Wiki
                API (CC BY-SA 4.0).
              </p>
              <p className="mb-0">
                See the <Link href="/#v5-gallery">V5 gallery</Link> for the feature overview, or go back to{" "}
                <Link href="/docs/">Documentation</Link>.
              </p>
            </GlassPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
