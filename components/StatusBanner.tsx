import { cn } from "@/lib/utils";
import { PLAYERS, type Mark } from "@/lib/game";

interface StatusBannerProps {
  winner: Mark | null;
  draw: boolean;
  next: Mark;
}

export function StatusBanner({ winner, draw, next }: StatusBannerProps) {
  let message: string;
  let tone: Mark | "draw";

  if (winner) {
    message = `Winner: ${PLAYERS[winner].name} ${PLAYERS[winner].icon}`;
    tone = winner;
  } else if (draw) {
    message = "It's a draw!";
    tone = "draw";
  } else {
    message = `Next player: ${PLAYERS[next].name} ${PLAYERS[next].icon}`;
    tone = next;
  }

  return (
    <p
      role="status"
      aria-live="polite"
      // Remount when the game ends so the entrance animation plays.
      key={winner ? "win" : draw ? "draw" : "play"}
      className={cn(
        "rounded-xl border px-4 py-3 text-center font-heading text-lg font-semibold tracking-tight sm:text-xl",
        tone === "P1" && "border-bolt/40 bg-bolt/10 text-bolt",
        tone === "P2" && "border-gear/40 bg-gear/10 text-gear",
        tone === "draw" && "border-border bg-muted text-foreground",
        (winner || draw) &&
          "motion-safe:animate-in motion-safe:zoom-in-90 motion-safe:fade-in motion-safe:duration-500",
        winner === "P1" && "glow-bolt shadow-[0_0_24px_-4px_var(--bolt)]",
        winner === "P2" && "glow-gear shadow-[0_0_24px_-4px_var(--gear)]",
      )}
    >
      {message}
    </p>
  );
}
