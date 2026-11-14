import { PlayerMark } from "@/components/marks";
import { cn } from "@/lib/utils";
import { PLAYERS, type Mark } from "@/lib/game";

interface StatusBannerProps {
  winner: Mark | null;
  draw: boolean;
  next: Mark;
}

export function StatusBanner({ winner, draw, next }: StatusBannerProps) {
  const subject = winner ?? (draw ? null : next);
  const prefix = winner ? "Winner:" : "Next player:";

  return (
    <div
      role="status"
      aria-live="polite"
      // Remount when the game ends so the entrance animation plays once.
      key={winner ? "win" : draw ? "draw" : "play"}
      className={cn(
        "flex min-h-14 items-center gap-3 rounded-xl border px-4 py-3",
        "font-heading text-lg font-semibold sm:text-xl",
        (winner || draw) && "anim-banner",
        !winner && !draw && "border-border bg-card",
        winner === "P1" && "border-bolt/50 bg-bolt/10 text-bolt",
        winner === "P2" && "border-gear/50 bg-gear/10 text-gear",
        draw && "border-border bg-muted",
      )}
    >
      {subject ? (
        <>
          <PlayerMark mark={subject} className="size-6 shrink-0" />
          <p>
            <span className={cn(!winner && "text-muted-foreground")}>{prefix}</span>{" "}
            <span className={cn(!winner && (subject === "P1" ? "text-bolt" : "text-gear"))}>
              {PLAYERS[subject].name}
            </span>
            {/* The icon is drawn as SVG; this keeps the exact status text for screen readers. */}
            <span className="sr-only"> {PLAYERS[subject].icon}</span>
          </p>
        </>
      ) : (
        <p>It&apos;s a draw!</p>
      )}
    </div>
  );
}
