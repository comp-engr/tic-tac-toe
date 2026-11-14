import { ImageResponse } from "next/og";

// Social preview card, rendered at build time.
export const alt = "Engr. Marco's Tic-Tac-Toe — Bolt versus Gear on a circuit-board grid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BOLT = "#3fe0f5";
const GEAR = "#f7b23b";
// A finished game: Bolt wins down the diagonal.
const CELLS = ["B", "G", "", "G", "B", "", "", "", "B"];

function Bolt({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      <path d="M13.6 1.8 4.2 13.4h6.6l-1.3 8.8 9.9-12.3h-6.7l.9-8.1Z" fill={BOLT} />
    </svg>
  );
}

function Gear({ s }: { s: number }) {
  return (
    <svg width={s} height={s} viewBox="-16 -16 32 32">
      <circle r="10" fill={GEAR} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
        <rect key={r} x="-3" y="-15" width="6" height="7" rx="1" fill={GEAR} transform={`rotate(${r})`} />
      ))}
      <circle r="4" fill="#0d1830" />
    </svg>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "#0a1428",
          backgroundImage:
            "linear-gradient(rgba(63,224,245,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(63,224,245,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#e6eef8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 560 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>Engr. Marco&apos;s Tic-Tac-Toe</div>
          <div style={{ fontSize: 30, color: "#8fa3c2", marginTop: 24 }}>Two players, one board. Good luck!</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 48, fontSize: 30 }}>
            <Bolt s={40} />
            <span style={{ color: BOLT }}>Bolt</span>
            <span style={{ color: "#8fa3c2", margin: "0 8px" }}>vs</span>
            <Gear s={40} />
            <span style={{ color: GEAR }}>Gear</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: 440,
            gap: 12,
            padding: 24,
            borderRadius: 28,
            background: "#0d1830",
            border: "2px solid #22365f",
          }}
        >
          {CELLS.map((c, i) => (
            <div
              key={i}
              style={{
                width: 116,
                height: 116,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 18,
                background: [0, 4, 8].includes(i) ? "rgba(63,224,245,0.12)" : "#16264a",
                border: [0, 4, 8].includes(i) ? `2px solid ${BOLT}` : "2px solid #22365f",
              }}
            >
              {c === "B" && <Bolt s={56} />}
              {c === "G" && <Gear s={56} />}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
