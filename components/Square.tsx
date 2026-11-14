import { Button } from "@/components/ui/button";
import { PlayerMark } from "@/components/marks";
import { cn } from "@/lib/utils";
import { PLAYERS, BOARD_SIZE, type Cell, type Mark } from "@/lib/game";

interface SquareProps {
  index: number;
  value: Cell;
  next: Mark;
  isWinning: boolean;
  /** A win happened and this square is not part of it: step back visually. */
  dimmed: boolean;
  gameOver: boolean;
  onPlay: (index: number) => void;
}

export function Square({ index, value, next, isWinning, dimmed, gameOver, onPlay }: SquareProps) {
  const row = Math.floor(index / BOARD_SIZE) + 1;
  const col = (index % BOARD_SIZE) + 1;
  const playable = value === null && !gameOver;

  const label = `Row ${row}, column ${col}, ${value ? PLAYERS[value].name : "empty"}${
    isWinning ? ", winning square" : ""
  }`;

  return (
    <Button
      variant="ghost"
      aria-label={label}
      // Stays in the tab order when unplayable; announced via aria-disabled.
      disabled={!playable}
      focusableWhenDisabled
      onClick={() => {
        if (playable) onPlay(index);
      }}
      className={cn(
        "group/sq relative aspect-square size-auto w-full rounded-[14px] p-0",
        "border border-border bg-secondary/70 dark:bg-secondary/70",
        "transition-[background-color,border-color,opacity] duration-200",
        "focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/35",
        // Base UI marks unplayable squares as disabled; keep them fully legible.
        "disabled:opacity-100 data-disabled:opacity-100 aria-disabled:opacity-100",
        playable && "cursor-pointer hover:border-[#35528a] hover:bg-accent dark:hover:bg-accent",
        !playable && "cursor-default",
        isWinning && value === "P1" && "border-bolt/70 bg-bolt/10 dark:bg-bolt/10",
        isWinning && value === "P2" && "border-gear/70 bg-gear/10 dark:bg-gear/10",
        dimmed && "opacity-50 data-disabled:opacity-50 aria-disabled:opacity-50",
      )}
    >
      {value ? (
        <PlayerMark
          mark={value}
          className={cn(
            // z-20 lifts the piece above the win trace (z-10), so the trace runs beneath it.
            "relative z-20 size-[46%]",
            value === "P1" ? "anim-bolt" : "anim-gear",
            isWinning && value === "P1" && "drop-shadow-[0_0_10px_rgb(63_224_245/0.75)]",
            isWinning && value === "P2" && "drop-shadow-[0_0_10px_rgb(247_178_59/0.75)]",
          )}
        />
      ) : (
        <>
          {/* Solder pad: shows the square is an open position. */}
          <span
            aria-hidden="true"
            className={cn(
              "size-[14%] rounded-full border-2 border-pad transition-opacity duration-150",
              playable && "group-hover/sq:opacity-0 group-focus-visible/sq:opacity-0",
            )}
          />
          {/* Preview of the piece that would land here. */}
          {playable && (
            <PlayerMark
              mark={next}
              className="absolute size-[46%] opacity-0 transition-opacity duration-150 group-hover/sq:opacity-25 group-focus-visible/sq:opacity-25"
            />
          )}
        </>
      )}
    </Button>
  );
}
