import type { Post } from "@/data/posts";
import { postKind, postTopics } from "@/data/posts";

/**
 * Category taxonomy, line icons, and procedural cover art.
 *
 * Design intent: the artwork is a technical *backdrop*, not a hero image. It
 * occupies a thin band (~15-20% of the card) drawn in fine CAD-weight strokes -
 * PCB traces, wireframes, scope captures, topology - so the headline stays the
 * strongest element on the card. Motifs are chosen by category and varied
 * deterministically by slug, so a post always renders the same strip.
 */

export type CategoryKey =
  | "engineering"
  | "security"
  | "ai"
  | "lynxbench"
  | "architecture"
  | "founder"
  | "release"
  | "research";

type CategoryStyle = { label: string; color: string };

export const CATEGORIES: Record<CategoryKey, CategoryStyle> = {
  engineering: { label: "Engineering", color: "#4ec9b0" },
  security: { label: "Security", color: "#f5a623" },
  ai: { label: "AI", color: "#bd7cf5" },
  lynxbench: { label: "LynxBench", color: "#7ed321" },
  architecture: { label: "Architecture", color: "#6ea8fe" },
  founder: { label: "Founder Journal", color: "#5ee0e6" },
  release: { label: "Release", color: "#ff8f6b" },
  research: { label: "Research", color: "#e07cc3" },
};

/**
 * Primary tag wins, then kind, then secondary topics. Searching one merged
 * haystack would let an incidental topic beat the post's own tag.
 */
const TAG_MAP: Record<string, CategoryKey> = {
  security: "security",
  lynxbench: "lynxbench",
  ai: "ai",
  architecture: "architecture",
  engineering: "engineering",
  research: "research",
  milestone: "release",
  release: "release",
  "release notes": "release",
  "founder update": "founder",
  "founder journal": "founder",
};

const TOPIC_PRIORITY: CategoryKey[] = [
  "security",
  "lynxbench",
  "research",
  "ai",
  "architecture",
  "engineering",
];

export function categoryOf(post: Post): CategoryKey {
  const tag = post.tag.trim().toLowerCase();
  if (TAG_MAP[tag]) return TAG_MAP[tag];
  if (postKind(post) === "founder") return "founder";
  const topics = postTopics(post).map((t) => t.trim().toLowerCase());
  for (const key of TOPIC_PRIORITY) if (topics.includes(key)) return key;
  return "engineering"; // guaranteed valid fallback
}

export const categoryStyle = (post: Post): CategoryStyle =>
  CATEGORIES[categoryOf(post)];

/* ------------------------------------------------------------------ icons */
/** 14px monochrome line icons - sized to sit with the label, not shout over it. */
export function CategoryIcon({
  kind,
  size = 14,
}: {
  kind: CategoryKey;
  size?: number;
}) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "security": // shield
      return (
        <svg {...p}>
          <path d="M8 1.9l5 1.9v4c0 2.9-2 4.9-5 6-3-1.1-5-3.1-5-6v-4z" />
          <path d="M8 7.2v2.1" />
        </svg>
      );
    case "ai": // node graph
      return (
        <svg {...p}>
          <circle cx="8" cy="8" r="1.6" />
          <circle cx="3" cy="4" r="1.2" />
          <circle cx="13" cy="4" r="1.2" />
          <circle cx="3" cy="12" r="1.2" />
          <circle cx="13" cy="12" r="1.2" />
          <path d="M4.1 4.8L6.7 7M11.9 4.8L9.3 7M4.1 11.2L6.7 9M11.9 11.2L9.3 9" />
        </svg>
      );
    case "lynxbench": // chip with pins
      return (
        <svg {...p}>
          <rect x="4.5" y="4.5" width="7" height="7" rx="1" />
          <path d="M6.5 2.2v2.3M9.5 2.2v2.3M6.5 11.5v2.3M9.5 11.5v2.3M2.2 6.5h2.3M2.2 9.5h2.3M11.5 6.5h2.3M11.5 9.5h2.3" />
        </svg>
      );
    case "architecture": // wireframe stack
      return (
        <svg {...p}>
          <rect x="5" y="1.8" width="6" height="3.4" rx="0.6" />
          <rect x="1.6" y="10.8" width="5" height="3.4" rx="0.6" />
          <rect x="9.4" y="10.8" width="5" height="3.4" rx="0.6" />
          <path d="M8 5.2v2.6M4.1 10.8V7.8h7.8v3" />
        </svg>
      );
    case "founder": // trend line
      return (
        <svg {...p}>
          <path d="M1.8 12.4l3.6-3.5 2.5 2 5.3-5.4" />
          <path d="M10.4 5.5h2.8v2.8" />
        </svg>
      );
    case "release": // tag
      return (
        <svg {...p}>
          <path d="M2.2 7.4V2.6h4.8l7 7-4.8 4.8z" />
          <circle cx="5" cy="5" r="0.9" />
        </svg>
      );
    case "research": // flask
      return (
        <svg {...p}>
          <path d="M6.4 1.9v4L3 12.3a1 1 0 00.9 1.5h8.2a1 1 0 00.9-1.5L9.6 5.9v-4" />
          <path d="M5.6 1.9h4.8M4.6 9.6h6.8" />
        </svg>
      );
    default: // engineering - terminal
      return (
        <svg {...p}>
          <rect x="1.8" y="2.8" width="12.4" height="10.4" rx="1.2" />
          <path d="M4.6 6.6l1.9 1.6-1.9 1.6M8.6 10.2h3" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------- strip */
/** Stable per-slug hash so each post gets its own variation of the motif. */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Motifs are drawn for a wide, short viewBox (400x64) in hairline strokes, so
 * they read as engineering drawing rather than illustration.
 */
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

function Motif({ kind, seed }: { kind: CategoryKey; seed: number }) {
  /*
   * Unsigned shift is required, not stylistic. hash() returns a uint32 via
   * `>>> 0`, so slugs routinely hash above 2^31. A signed `>>` coerces those to
   * int32, goes negative, and `negative % length` stays negative - which indexes
   * off the front of the array and yields undefined. That crashed the whole
   * archive on the first slug unlucky enough to hash high.
   */
  const j = (n: number, span: number) => ((seed >>> n) % span) - span / 2;
  /** Falls back to the first entry rather than returning undefined. */
  const pick = <T,>(n: number, xs: T[]): T =>
    xs[(seed >>> n) % xs.length] ?? xs[0];

  switch (kind) {
    // ---- LynxBench: a real board fragment - traces, vias, pads, silkscreen ----
    case "lynxbench": {
      const ref = pick(3, [
        ["R102", "C41", "U7", "TP3"],
        ["R220", "C18", "U3", "TP1"],
        ["R47", "C205", "U12", "TP6"],
      ]);
      return (
        <g fill="none" stroke="currentColor" strokeWidth="0.9">
          {/* routed traces with right-angle and 45-degree bends */}
          <g opacity=".55">
            <path d="M0 14h44l8 8h58l8-8h40" />
            <path d="M0 30h30l10 10h74M0 46h58l10-8h44" />
            <path d="M244 22h52l10 10h94M232 46h48l12-12h108M300 58h100" />
            <path d="M92 22v-14M158 40v18M340 32v-16" />
          </g>
          {/* vias: annulus with drill */}
          <g opacity=".7">
            <circle cx="44" cy="14" r="2.6" />
            <circle cx="40" cy="30" r="2.6" />
            <circle cx="296" cy="22" r="2.6" />
            <circle cx={280 + j(5, 8)} cy="34" r="2.6" />
          </g>
          <g fill="currentColor" stroke="none" opacity=".5">
            <circle cx="44" cy="14" r="1" />
            <circle cx="40" cy="30" r="1" />
            <circle cx="296" cy="22" r="1" />
          </g>
          {/* SOIC-style component with pins + pin-1 dot */}
          <g opacity=".6">
            <rect x="168" y="18" width="52" height="28" rx="1.5" />
            <path d="M176 18v-5M190 18v-5M204 18v-5M176 46v5M190 46v5M204 46v5" />
          </g>
          <circle cx="174" cy="24" r="1.4" fill="currentColor" stroke="none" opacity=".75" />
          {/* passives */}
          <g opacity=".55">
            <rect x="96" y="46" width="14" height="7" rx="1" />
            <rect x="330" y="12" width="14" height="7" rx="1" />
            <rect x="248" y="6" width="7" height="14" rx="1" />
          </g>
          {/* test point */}
          <g opacity=".6">
            <circle cx="366" cy="46" r="3.4" />
            <circle cx="366" cy="46" r="1.2" fill="currentColor" stroke="none" />
          </g>
          {/* silkscreen reference designators */}
          <g
            fill="currentColor"
            stroke="none"
            fontFamily={MONO}
            fontSize="6"
            opacity=".72"
          >
            <text x="96" y="43">{ref[0]}</text>
            <text x="248" y="26">{ref[1]}</text>
            <text x="168" y="14">{ref[2]}</text>
            <text x="356" y="58">{ref[3]}</text>
          </g>
        </g>
      );
    }

    // ---- AI: attention matrix feeding an inference graph ----
    case "ai": {
      const cells: React.ReactNode[] = [];
      for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 10; c++) {
          const v = ((seed >>>((r * 10 + c) % 24)) % 10) / 10;
          cells.push(
            <rect
              key={`${r}-${c}`}
              x={14 + c * 8}
              y={12 + r * 7}
              width="6.4"
              height="5.4"
              fill="currentColor"
              opacity={0.08 + v * 0.5}
            />
          );
        }
      }
      return (
        <g fill="none" stroke="currentColor" strokeWidth="0.9">
          <g>{cells}</g>
          <rect x="13" y="11" width="81" height="43" opacity=".3" />
          {/* token flow into the graph */}
          <g opacity=".4">
            <path d="M96 32h34M300 32h34" strokeDasharray="2 3" />
            <path d="M150 32L200 16L250 32L200 48z" />
            <path d="M150 32h100M200 16v32" />
          </g>
          <g fill="currentColor" stroke="none" opacity=".8">
            <circle cx="150" cy="32" r="2.6" />
            <circle cx="200" cy="16" r="2.6" />
            <circle cx="250" cy="32" r="3.2" />
            <circle cx="200" cy="48" r="2.6" />
          </g>
          <g opacity=".45">
            <rect x="336" y="20" width="52" height="24" rx="1.5" />
            <path d="M336 32h52" strokeDasharray="2 3" />
          </g>
          <g fill="currentColor" stroke="none" fontFamily={MONO} fontSize="5.5" opacity=".6">
            <text x="14" y="61">attention</text>
            <text x="338" y="17">logits</text>
          </g>
        </g>
      );
    }

    // ---- Security: certificate chain, digest, key ----
    case "security": {
      const digest = pick(2, [
        "a3f9c1d4e7b20c85",
        "7e21b8fa0c4d9e13",
        "c05d3a7f21e8b6d4",
      ]);
      return (
        <g fill="none" stroke="currentColor" strokeWidth="0.9">
          {/* cert chain */}
          <g opacity=".5">
            <rect x="14" y="18" width="40" height="28" rx="2" />
            <rect x="74" y="18" width="40" height="28" rx="2" />
            <rect x="134" y="18" width="40" height="28" rx="2" />
            <path d="M54 32h20M114 32h20" strokeDasharray="2 3" />
            <path d="M20 26h20M20 32h28M20 38h14M80 26h20M80 32h28M140 26h20M140 32h24" opacity=".7" />
          </g>
          {/* key */}
          <g opacity=".6">
            <circle cx="204" cy="32" r="6" />
            <path d="M210 32h26M230 32v6M236 32v5" />
          </g>
          {/* fingerprint arcs */}
          <g opacity=".35">
            <path d="M262 32a10 10 0 0120 0M266 32a6 6 0 0112 0M258 32a14 14 0 0128 0" />
          </g>
          {/* digest */}
          <g fill="currentColor" stroke="none" fontFamily={MONO} fontSize="6" opacity=".7">
            <text x="298" y="28">sha256:</text>
            <text x="298" y="38">{digest}</text>
          </g>
          <g opacity=".3" strokeWidth="1.1">
            <path d="M298 46h18M320 46h10M334 46h22M360 46h14" />
          </g>
        </g>
      );
    }

    // ---- Architecture: labelled service topology ----
    case "architecture":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="0.9">
          <g opacity=".55">
            <rect x="12" y="22" width="46" height="20" rx="2" />
            <rect x="96" y="8" width="46" height="20" rx="2" />
            <rect x="96" y="36" width="46" height="20" rx="2" />
            <rect x="182" y="22" width="46" height="20" rx="2" />
            <rect x="266" y="8" width="46" height="20" rx="2" />
            <rect x="266" y="36" width="46" height="20" rx="2" />
          </g>
          <g opacity=".4" strokeDasharray="2 3">
            <path d="M58 32h38M58 32h20v-14h18M58 32h20v14h18M142 18h20v14h20M142 46h20V32h20M228 32h20v-14h18M228 32h20v14h18" />
          </g>
          {/* database cylinder */}
          <g opacity=".5">
            <path d="M334 20c0-3 8-5 18-5s18 2 18 5v22c0 3-8 5-18 5s-18-2-18-5z" />
            <path d="M334 20c0 3 8 5 18 5s18-2 18-5" />
          </g>
          <g fill="currentColor" stroke="none" fontFamily={MONO} fontSize="6" opacity=".75">
            <text x="22" y="35">EDGE</text>
            <text x="106" y="21">API</text>
            <text x="104" y="49">AUTH</text>
            <text x="190" y="35">QUEUE</text>
            <text x="274" y="21">WORKER</text>
            <text x="274" y="49">CACHE</text>
            <text x="342" y="35">DB</text>
          </g>
        </g>
      );

    // ---- Founder: gantt bars, milestone diamonds, quarter ticks ----
    case "founder":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="0.9">
          <g opacity=".22">
            <path d="M0 52h400" />
            <path d="M60 46v6M140 46v6M220 46v6M300 46v6M380 46v6" />
          </g>
          <g fill="currentColor" stroke="none">
            <rect x="20" y="10" width="96" height="6" rx="3" opacity=".55" />
            <rect x="70" y="22" width="120" height="6" rx="3" opacity=".45" />
            <rect x="150" y="34" width="88" height="6" rx="3" opacity=".38" />
            <rect x={214 + j(4, 10)} y="10" width="104" height="6" rx="3" opacity=".3" />
            <rect x="262" y="22" width="76" height="6" rx="3" opacity=".25" />
          </g>
          {/* milestone diamonds */}
          <g opacity=".8">
            <path d="M116 13l5 5-5 5-5-5z" fill="currentColor" stroke="none" />
            <path d="M190 25l5 5-5 5-5-5z" fill="currentColor" stroke="none" />
            <path d="M238 37l5 5-5 5-5-5z" fill="currentColor" stroke="none" opacity=".7" />
          </g>
          <g fill="currentColor" stroke="none" fontFamily={MONO} fontSize="5.5" opacity=".55">
            <text x="20" y="62">Q1</text>
            <text x="100" y="62">Q2</text>
            <text x="180" y="62">Q3</text>
            <text x="260" y="62">Q4</text>
          </g>
        </g>
      );

    // ---- Release: version tags on a timeline ----
    case "release": {
      const vers = pick(4, [
        ["v0.1", "v0.2", "v0.3", "v0.4", "v0.5"],
        ["v1.2", "v1.3", "v1.4", "v1.5", "v2.0"],
        ["v0.6", "v0.7", "v0.8", "v0.9", "v1.0"],
      ]);
      // Which release is "the big one" shifts per post, so adjacent release
      // cards don't share an identical silhouette.
      const hi = (seed >>>6) % 5;
      const xs = [50, 128, 206, 284, 362];
      return (
        <g fill="none" stroke="currentColor" strokeWidth="0.9">
          <path d="M0 38h400" opacity=".4" />
          <g opacity=".55">
            {xs.map((x, i) => (
              <path key={x} d={`M${x} 38v-${i === hi ? 18 : 8 + ((seed >>>i) % 3) * 2}`} />
            ))}
          </g>
          <g fill="currentColor" stroke="none">
            {xs.map((x, i) => (
              <circle
                key={x}
                cx={x}
                cy={i === hi ? 20 : 30}
                r={i === hi ? 3.2 : 1.8}
                opacity={i === hi ? 0.85 : 0.42}
              />
            ))}
          </g>
          <g fill="currentColor" stroke="none" fontFamily={MONO} fontSize="6" opacity=".7">
            {xs.map((x, i) => (
              <text key={x} x={x - 12} y="52">
                {vers[i]}
              </text>
            ))}
          </g>
        </g>
      );
    }

    // ---- Research: scope capture with cursors and measurements ----
    case "research":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="0.9">
          <g opacity=".2">
            <path d="M0 32h400" />
            <path d="M40 12v40M90 12v40M140 12v40M190 12v40M240 12v40M290 12v40M340 12v40" />
            <path d="M0 18h400M0 46h400" />
          </g>
          <path
            d="M0 32h30l8-14 10 28 10-22 8 14h34l8-18 10 32 10-24 8 12h38l8-10 10 22 10-18 8 10h40l8-16 10 26 10-20 8 10h84"
            opacity=".7"
            strokeWidth="1.1"
          />
          <g opacity=".45" strokeDasharray="3 3">
            <path d="M140 8v48M240 8v48" />
          </g>
          <g fill="currentColor" stroke="none" fontFamily={MONO} fontSize="5.5" opacity=".6">
            <text x="144" y="14">t1</text>
            <text x="244" y="14">t2</text>
            <text x="332" y="60">2.00V/div</text>
          </g>
        </g>
      );

    // ---- Engineering: build output + resource telemetry ----
    default: {
      // Varied per slug: two posts in the same category sitting next to each
      // other in the grid must not look like the same image pasted twice.
      const build = pick(3, [
        ["$ cargo build --release", "Compiling lynxdock v0.1.0", "Finished in 12.4s"],
        ["$ pnpm typecheck", "Checking 214 files...", "No errors found"],
        ["$ cargo test --workspace", "running 186 tests", "test result: ok"],
        ["$ pnpm gen:protocol", "Emitting TS from protocol", "Up to date"],
      ]);
      const bars = [0, 1, 2, 3].map(
        (i) => 0.22 + (((seed >>>(i * 3 + 1)) % 64) / 64) * 0.7
      );
      return (
        <g fill="none" stroke="currentColor" strokeWidth="0.9">
          {/* terminal */}
          <g opacity=".45">
            <rect x="12" y="8" width="184" height="48" rx="2" />
            <path d="M12 18h184" />
            <circle cx="22" cy="13" r="1.5" />
            <circle cx="30" cy="13" r="1.5" />
            <circle cx="38" cy="13" r="1.5" />
          </g>
          <g fill="currentColor" stroke="none" fontFamily={MONO} fontSize="6" opacity=".75">
            <text x="20" y="30">{build[0]}</text>
            <text x="20" y="40" opacity=".7">{build[1]}</text>
            <text x="20" y="50" opacity=".55">{build[2]}</text>
          </g>
          {/* telemetry bars */}
          <g>
            {["CPU", "RAM", "NET", "I/O"].map((lbl, i) => (
              <g key={lbl} transform={`translate(216 ${12 + i * 12})`}>
                <text
                  x="0"
                  y="5"
                  fill="currentColor"
                  stroke="none"
                  fontFamily={MONO}
                  fontSize="5.5"
                  opacity=".6"
                >
                  {lbl}
                </text>
                <rect x="24" y="0" width="90" height="5" rx="1" opacity=".25" />
                <rect
                  x="24"
                  y="0"
                  width={90 * bars[i]}
                  height="5"
                  rx="1"
                  fill="currentColor"
                  stroke="none"
                  opacity=".55"
                />
              </g>
            ))}
          </g>
          {/* trace */}
          <path
            d="M330 42h10l6-12 8 24 8-18 6 6h26"
            opacity=".5"
            strokeWidth="1.1"
          />
        </g>
      );
    }
  }
}

/**
 * Technical cover art.
 *   band     - thin strip above card content (default)
 *   backdrop - fills its container as faint decoration behind text; the caller
 *              positions it and lays content on top. Used by the magazine hero.
 */
export default function PostCover({
  post,
  className = "",
  variant = "band",
}: {
  post: Post;
  className?: string;
  variant?: "band" | "backdrop";
}) {
  const key = categoryOf(post);
  const { color } = CATEGORIES[key];
  const seed = hash(post.slug);
  const gid = `cv-${post.slug}-${variant}`;
  const backdrop = variant === "backdrop";

  return (
    <div
      className={`relative overflow-hidden ${backdrop ? "" : "border-b"} ${className}`}
      style={{
        color,
        borderColor: `${color}33`,
        // Faint enough that body text over it stays comfortably readable.
        opacity: backdrop ? 0.5 : 1,
        // Keeps the art tucked behind the headline in the hero's stacking order.
        ...(backdrop
          ? {
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 92%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 92%)",
            }
          : {}),
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 400 64"
        /*
         * band: crop to the strip. backdrop: `meet` anchored to the top - a tall
         * container with `slice` would zoom the 400x64 art ~5x and turn fine
         * hairlines into thick abstract bars.
         */
        preserveAspectRatio={backdrop ? "xMidYMin meet" : "xMidYMid slice"}
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.10" />
            <stop offset="70%" stopColor="currentColor" stopOpacity="0.03" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
          <pattern id={`${gid}-g`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M8 0H0v8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.13"
            />
          </pattern>
        </defs>
        {!backdrop && <rect width="400" height="64" fill="#0a0e13" />}
        <rect width="400" height="64" fill={`url(#${gid}-g)`} />
        <rect width="400" height="64" fill={`url(#${gid})`} />
        <Motif kind={key} seed={seed} />
      </svg>
    </div>
  );
}

/** Category chip - line icon at text scale, colour-coded per category. */
export function CategoryChip({
  post,
  size = "sm",
}: {
  post: Post;
  size?: "sm" | "md";
}) {
  const key = categoryOf(post);
  const { label, color } = CATEGORIES[key];
  return (
    <span
      className={`inline-flex w-fit self-start items-center gap-1.5 rounded-md border font-medium ${
        size === "md" ? "px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]"
      }`}
      style={{ color, borderColor: `${color}44`, backgroundColor: `${color}12` }}
    >
      <CategoryIcon kind={key} size={size === "md" ? 14 : 13} />
      {label}
    </span>
  );
}
