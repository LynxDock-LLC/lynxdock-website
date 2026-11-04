/**
 * The route-line motif: a thin cyan route with waypoint circles, used at selected section dividers. Purely
 * decorative (aria-hidden), native SVG and CSS on a transparent background. The route stretches with the
 * page width; the waypoints are positioned separately so they stay round.
 */
const ROUTES = {
  a: {
    d: "M0 30 H210 C250 30 262 12 300 12 H520 C560 12 572 34 612 34 H1000",
    points: [
      [210, 30],
      [520, 12],
      [612, 34],
    ],
  },
  b: {
    d: "M0 14 H260 C300 14 312 34 352 34 H640 C680 34 692 14 732 14 H1000",
    points: [
      [260, 14],
      [640, 34],
      [732, 14],
    ],
  },
} as const;

export default function RouteLine({ variant = "a", className = "" }: { variant?: "a" | "b"; className?: string }) {
  const route = ROUTES[variant];
  return (
    <div aria-hidden="true" className={`wrap pointer-events-none ${className}`}>
      <div className="relative h-[46px]">
        <svg
          viewBox="0 0 1000 46"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          focusable="false"
        >
          <path
            d={route.d}
            fill="none"
            stroke="#5ce1df"
            strokeOpacity="0.42"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {route.points.map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-bg"
            style={{
              left: `${x / 10}%`,
              top: `${y}px`,
              borderColor: i === 1 ? "rgba(92,225,223,0.95)" : "rgba(92,225,223,0.6)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
