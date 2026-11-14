"use client";

import { useState } from "react";
import { Board } from "@/components/Board";
import { BoltMark, GearMark } from "@/components/marks";
import { ScoreBoard, type Scores } from "@/components/ScoreBoard";
import { StatusBanner } from "@/components/StatusBanner";
import { Button } from "@/components/ui/button";
import { calculateWinner, createEmptyBoard, isDraw, nextPlayer, type Board as BoardState } from "@/lib/game";

const EMPTY_SCORES: Scores = { P1: 0, P2: 0, draws: 0 };
const REPO_URL = "https://github.com/comp-engr/tic-tac-toe";

export default function Home() {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);
  const [scores, setScores] = useState<Scores>(EMPTY_SCORES);
  const [confirmingReset, setConfirmingReset] = useState(false);

  // Everything else is derived from the board, so it can never drift out of sync.
  const win = calculateWinner(board);
  const draw = isDraw(board);
  const gameOver = win !== null || draw;
  const next = nextPlayer(board);
  const hasScores = scores.P1 + scores.P2 + scores.draws > 0;

  function handlePlay(index: number) {
    if (gameOver || board[index] !== null) return;

    const nextBoard = board.slice();
    nextBoard[index] = next;
    setBoard(nextBoard);

    // Score here, in the event handler, at the one moment the game ends.
    // Moves are blocked afterwards, so each finished game is counted exactly once.
    const result = calculateWinner(nextBoard);
    if (result) {
      setScores((s) => ({ ...s, [result.winner]: s[result.winner] + 1 }));
    } else if (isDraw(nextBoard)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    }
  }

  function handleNewGame() {
    setBoard(createEmptyBoard());
    setConfirmingReset(false);
  }

  function handleResetAll() {
    // Wiping the scores can't be undone, so ask once when there is something to lose.
    if (hasScores && !confirmingReset) {
      setConfirmingReset(true);
      return;
    }
    setBoard(createEmptyBoard());
    setScores(EMPTY_SCORES);
    setConfirmingReset(false);
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <header className="flex items-center gap-3 sm:gap-4">
        <span
          aria-hidden="true"
          className="relative grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-card sm:size-12"
        >
          <BoltMark className="absolute left-1.5 top-1.5 size-5 sm:size-6" />
          <GearMark className="absolute bottom-1.5 right-1.5 size-5 sm:size-6" />
        </span>
        <div>
          <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">
            Engr. Marco&apos;s Tic-Tac-Toe
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">Two players, one board. Good luck!</p>
        </div>
      </header>

      <main
        className={[
          "mt-6 grid flex-1 content-start gap-4 sm:mt-8 sm:gap-5",
          "[grid-template-areas:'status'_'scores'_'board'_'actions']",
          "lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[auto_auto_1fr] lg:gap-x-10",
          "lg:[grid-template-areas:'board_status'_'board_scores'_'board_actions']",
        ].join(" ")}
      >
        <div className="[grid-area:status]">
          <StatusBanner winner={win?.winner ?? null} draw={draw} next={next} />
        </div>

        <div className="[grid-area:scores]">
          <ScoreBoard scores={scores} active={gameOver ? null : next} winner={win?.winner ?? null} />
        </div>

        <div className="mx-auto w-full max-w-[30rem] [grid-area:board] lg:mx-0 lg:max-w-[min(100%,calc(100dvh-13rem))]">
          <Board
            board={board}
            next={next}
            winner={win?.winner ?? null}
            winningLine={win?.line ?? null}
            gameOver={gameOver}
            onPlay={handlePlay}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 self-start [grid-area:actions]">
          <Button size="lg" className="h-11 rounded-xl text-base font-semibold" onClick={handleNewGame}>
            New Game
          </Button>
          <Button
            size="lg"
            variant={confirmingReset ? "destructive" : "outline"}
            className="h-11 rounded-xl text-base font-semibold"
            onClick={handleResetAll}
            onBlur={() => setConfirmingReset(false)}
          >
            {confirmingReset ? "Confirm reset" : "Reset All"}
          </Button>
          <p aria-live="polite" className="col-span-2 min-h-5 text-center text-xs text-muted-foreground lg:text-left">
            {confirmingReset ? "This clears the board and every score. Press it again to confirm." : ""}
          </p>
        </div>
      </main>

      <footer className="mt-10 flex flex-col gap-1 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>Built with React 19, Next.js 15, Tailwind CSS, and shadcn/ui</p>
        <a
          href={REPO_URL}
          className="underline-offset-4 hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline focus-visible:outline-none"
        >
          View the source on GitHub
        </a>
      </footer>
    </div>
  );
}
