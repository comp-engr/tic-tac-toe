import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PLAYERS } from "@/lib/game";

export interface Scores {
  P1: number;
  P2: number;
  draws: number;
}

interface ScoreBoardProps {
  scores: Scores;
}

export function ScoreBoard({ scores }: ScoreBoardProps) {
  const entries = [
    { key: "P1", label: PLAYERS.P1.name, icon: PLAYERS.P1.icon, value: scores.P1, tone: "bolt" },
    { key: "draws", label: "Draws", icon: "🤝", value: scores.draws, tone: "muted" },
    { key: "P2", label: PLAYERS.P2.name, icon: PLAYERS.P2.icon, value: scores.P2, tone: "gear" },
  ] as const;

  return (
    <Card className="w-full rounded-2xl bg-card backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-heading text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Scoreboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-3 gap-2 sm:gap-3">
          {entries.map((entry) => (
            <div
              key={entry.key}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3",
                entry.tone === "bolt" && "border-bolt/30 bg-bolt/5",
                entry.tone === "gear" && "border-gear/30 bg-gear/5",
                entry.tone === "muted" && "border-border bg-muted/40",
              )}
            >
              <dt>
                <Badge
                  variant="outline"
                  className={cn(
                    "h-6 px-2.5 text-xs",
                    entry.tone === "bolt" && "border-bolt/50 text-bolt",
                    entry.tone === "gear" && "border-gear/50 text-gear",
                  )}
                >
                  <span aria-hidden="true">{entry.icon}</span> {entry.label}
                </Badge>
              </dt>
              <dd
                className={cn(
                  "font-heading text-3xl font-bold tabular-nums",
                  entry.tone === "bolt" && "text-bolt glow-bolt",
                  entry.tone === "gear" && "text-gear glow-gear",
                )}
              >
                {entry.value}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
