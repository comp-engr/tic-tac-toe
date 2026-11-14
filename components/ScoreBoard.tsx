import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PlayerMark } from "@/components/marks";
import { cn } from "@/lib/utils";
import { PLAYERS, type Mark } from "@/lib/game";

export interface Scores {
  P1: number;
  P2: number;
  draws: number;
}

interface ScoreBoardProps {
  scores: Scores;
  /** Whose turn it is, or null when the round is over. */
  active: Mark | null;
  winner: Mark | null;
}

export function ScoreBoard({ scores, active, winner }: ScoreBoardProps) {
  return (
    <section aria-label="Scoreboard" className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        <PlayerCard mark="P1" score={scores.P1} active={active === "P1"} won={winner === "P1"} />
        <PlayerCard mark="P2" score={scores.P2} active={active === "P2"} won={winner === "P2"} />
      </div>
      <p className="flex items-baseline justify-between rounded-xl border border-dashed border-border px-4 py-2.5 text-sm text-muted-foreground">
        <span>Draws</span>
        <span className="font-heading text-lg font-semibold tabular-nums text-foreground" aria-label={`${scores.draws} draws`}>
          {scores.draws}
        </span>
      </p>
    </section>
  );
}

interface PlayerCardProps {
  mark: Mark;
  score: number;
  active: boolean;
  won: boolean;
}

function PlayerCard({ mark, score, active, won }: PlayerCardProps) {
  const player = PLAYERS[mark];
  const isBolt = mark === "P1";
  const lit = active || won;

  return (
    <Card
      size="sm"
      role="group"
      aria-label={`${player.name}, ${player.label}: ${score} ${score === 1 ? "win" : "wins"}${
        active ? ", to move" : won ? ", won this round" : ""
      }`}
      className={cn(
        "relative gap-0 rounded-2xl px-3 py-3 ring-1 transition-[box-shadow,background-color] duration-300 sm:px-4",
        "bg-card ring-border",
        lit && isBolt && "bg-bolt/[0.06] ring-bolt/60 shadow-[0_0_28px_-10px_var(--bolt)]",
        lit && !isBolt && "bg-gear/[0.06] ring-gear/60 shadow-[0_0_28px_-10px_var(--gear)]",
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-xl border sm:size-11",
            isBolt ? "border-bolt/30 bg-bolt/10" : "border-gear/30 bg-gear/10",
          )}
        >
          <PlayerMark mark={mark} className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-base font-semibold leading-tight sm:text-lg">{player.name}</p>
          {/* Fixed-height line: swaps "Player 1" for a turn/result chip without the card jumping. */}
          <div className="flex h-5 items-center" aria-hidden="true">
            {lit ? (
              <Badge
                variant="outline"
                className={cn(
                  "anim-banner h-5 px-2 text-[11px]",
                  isBolt ? "border-bolt/50 text-bolt" : "border-gear/50 text-gear",
                )}
              >
                {won ? "Winner" : "Your move"}
              </Badge>
            ) : (
              <p className="truncate text-xs text-muted-foreground">{player.label}</p>
            )}
          </div>
        </div>
        <p
          aria-hidden="true"
          className={cn(
            "font-heading text-3xl font-bold leading-none tabular-nums",
            isBolt ? "text-bolt" : "text-gear",
          )}
        >
          {score}
        </p>
      </div>
    </Card>
  );
}
