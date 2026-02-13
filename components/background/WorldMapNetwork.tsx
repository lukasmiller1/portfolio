"use client";

/** Map image 512×512 with meet occupies viewBox [250,750]×[0,500]. 15 endpoints in viewBox (x,y) on gray land. */
const CENTER: [number, number] = [500, 250];

// 15 endpoints in viewBox coordinates, chosen to sit on gray landmasses (no lon/lat → avoids projection mismatch).
const ENDPOINTS: [number, number][] = [
  [340, 168], // W Europe
  [400, 142], // Central Europe
  [455, 158], // E Europe / W Russia
  [378, 142], // N Europe
  [358, 262], // Spain / Mediterranean
  [308, 192], // N America
  [322, 238], // Mexico
  [390, 342], // Brazil
  [332, 212], // Argentina
  [598, 208], // India
  [648, 188], // China
  [448, 165], // Russia (W)
  [620, 242], // SE Asia
  [560, 182], // Australia
  [632, 162], // South Africa
  [632, 132],
];

type ActiveLine = { index: number; seed: number };

const FIXED_LINE_COUNT = 15;

/** Control point clamped to land area so the curve stays within gray. */
const LAND_X_MIN = 310;
const LAND_X_MAX = 665;
const LAND_Y_MIN = 145;
const LAND_Y_MAX = 398;

function curvePath(
  cx: number,
  cy: number,
  x: number,
  y: number,
  seed: number
): string {
  const mx = (cx + x) / 2;
  const my = (cy + y) / 2;
  const dist = Math.hypot(x - cx, y - cy) * 0.3;
  const angle = (seed * 2 * Math.PI) % (2 * Math.PI);
  const offset = (seed * 2 - 1) * dist;
  let qx = mx + Math.cos(angle) * offset;
  let qy = my + Math.sin(angle) * offset;
  qx = Math.max(LAND_X_MIN, Math.min(LAND_X_MAX, qx));
  qy = Math.max(LAND_Y_MIN, Math.min(LAND_Y_MAX, qy));
  return `M ${cx} ${cy} Q ${qx} ${qy} ${x} ${y}`;
}

const STROKE_WIDTH = 0.22;

/** Fixed set of 15 lines, one per location; stable seeds so curves don't change. */
const FIXED_ACTIVE_LINES: ActiveLine[] = Array.from(
  { length: FIXED_LINE_COUNT },
  (_, i) => ({ index: i, seed: 0.1 + i * 0.06 })
);

export function WorldMapNetwork() {
  const [cx, cy] = CENTER;

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full min-w-full"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 1 }}
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(0, 0, 255)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(0, 0, 255)" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <image
          href="/world-map.svg"
          x="0"
          y="0"
          width="1000"
          height="500"
          preserveAspectRatio="xMidYMid meet"
          style={{ opacity: 0.6 }}
        />

        <g stroke="url(#lineGrad)" strokeWidth={STROKE_WIDTH} fill="none" filter="url(#glow)">
          {FIXED_ACTIVE_LINES.map(({ index, seed }) => {
            const [dx, dy] = ENDPOINTS[index];
            return (
              <path
                key={index}
                d={curvePath(cx, cy, dx, dy, seed)}
              />
            );
          })}
        </g>

        <circle
          cx={cx}
          cy={cy}
          r="4"
          fill="rgb(56, 189, 248)"
          opacity="0.9"
        />

        {FIXED_ACTIVE_LINES.map(({ index }) => {
          const [dx, dy] = ENDPOINTS[index];
          return (
            <circle
              key={index}
              cx={dx}
              cy={dy}
              r="1.2"
              fill="rgb(56, 189, 248)"
              opacity="0.8"
            />
          );
        })}
      </svg>
    </div>
  );
}
