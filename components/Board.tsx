import { Square } from "@/components/Square";
import type { Board as BoardState, Mark, WinLine } from "@/lib/game";

interface BoardProps {
  board: BoardState;
  next: Mark;
  winner: Mark | null;
  winningLine: WinLine | null;
  gameOver: boolean;
  onPlay: (index: number) => void;
}

// Square centers in a 0–300 coordinate space laid over the 3x3 grid.
const CENTER = [50, 150, 250];
const point = (i: number) => ({ x: CENTER[i % 3], y: CENTER[Math.floor(i / 3)] });

const COLUMNS = ["A", "B", "C"];
const ROWS = ["1", "2", "3"];

export function Board({ board, next, winner, winningLine, gameOver, onPlay }: BoardProps) {
  return (
    <div className="relative rounded-[22px] border border-border bg-panel p-5 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.8)] sm:p-7">
      {/* Silkscreen coordinates, like the edge markings on a circuit board. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-5 top-0.5 grid grid-cols-3 font-heading text-[11px] font-medium text-muted-foreground/60 sm:inset-x-7 sm:top-1.5"
      >
        {COLUMNS.map((c) => (
          <span key={c} className="text-center">
            {c}
          </span>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-y-5 left-1 grid grid-rows-3 font-heading text-[11px] font-medium text-muted-foreground/60 sm:inset-y-7 sm:left-2.5"
      >
        {ROWS.map((r) => (
          <span key={r} className="flex items-center">
            {r}
          </span>
        ))}
      </div>

      {/* isolate: keeps the trace/piece layering contained inside the board. */}
      <div className="relative isolate">
        <div role="group" aria-label="Tic-tac-toe board" className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {board.map((value, index) => {
            const isWinning = winningLine?.includes(index) ?? false;
            return (
              <Square
                key={index}
                index={index}
                value={value}
                next={next}
                isWinning={isWinning}
                dimmed={winner !== null && !isWinning}
                gameOver={gameOver}
                onPlay={onPlay}
              />
            );
          })}
        </div>

        {winner && winningLine && <WinTrace line={winningLine} winner={winner} />}
      </div>
    </div>
  );
}

/**
 * A glowing circuit trace drawn through the winning squares. It sits between the
 * square backgrounds and the pieces, so it reads as wiring connecting three parts.
 */
function WinTrace({ line, winner }: { line: WinLine; winner: Mark }) {
  const a = point(line[0]);
  const b = point(line[2]);
  const color = winner === "P1" ? "var(--bolt)" : "var(--gear)";

  return (
    <svg
      viewBox="0 0 300 300"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 size-full overflow-visible"
    >
      <line
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        pathLength={1}
        strokeDasharray={1}
        stroke={color}
        strokeWidth={14}
        strokeLinecap="round"
        opacity={0.22}
        className="anim-trace"
        style={{ filter: "blur(6px)" }}
      />
      <line
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        pathLength={1}
        strokeDasharray={1}
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        className="anim-trace"
      />
    </svg>
  );
}
