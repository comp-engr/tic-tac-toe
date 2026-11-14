import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PLAYERS, BOARD_SIZE, type Cell } from "@/lib/game";

interface SquareProps {
  index: number;
  value: Cell;
  isWinning: boolean;
  gameOver: boolean;
  onPlay: (index: number) => void;
}

export function Square({ index, value, isWinning, gameOver, onPlay }: SquareProps) {
  const row = Math.floor(index / BOARD_SIZE) + 1;
  const col = (index % BOARD_SIZE) + 1;
  const player = value ? PLAYERS[value] : null;
  const playable = value === null && !gameOver;

  const label = `Row ${row}, column ${col}, ${player ? player.name : "empty"}${
    isWinning ? ", winning square" : ""
  }`;

  return (
    <Button
      variant="outline"
      aria-label={label}
      // Stays in the tab order when unplayable, announced via aria-disabled.
      disabled={!playable}
      focusableWhenDisabled
      onClick={() => {
        if (playable) onPlay(index);
      }}
      className={cn(
        "relative aspect-square h-auto w-full rounded-2xl p-0",
        "border-border bg-secondary/60 dark:bg-secondary/60 text-4xl sm:text-5xl",
        "transition-[background-color,box-shadow,transform] duration-200",
        "focus-visible:ring-4 focus-visible:ring-ring/60",
        // Base UI marks unplayable squares with data-disabled; keep them fully visible.
        "disabled:opacity-100 data-disabled:opacity-100 aria-disabled:opacity-100",
        playable && "cursor-pointer hover:bg-accent dark:hover:bg-accent hover:-translate-y-0.5",
        !playable && "cursor-not-allowed",
        isWinning && "animate-win-pulse",
        isWinning && value === "P1" && "bg-bolt/15 dark:bg-bolt/15 [--win-color:var(--bolt)]",
        isWinning && value === "P2" && "bg-gear/15 dark:bg-gear/15 [--win-color:var(--gear)]",
      )}
    >
      {player && (
        <span
          aria-hidden="true"
          className={cn(
            "motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:fade-in motion-safe:duration-300",
            value === "P1" ? "glow-bolt" : "glow-gear",
          )}
        >
          {player.icon}
        </span>
      )}
    </Button>
  );
}
