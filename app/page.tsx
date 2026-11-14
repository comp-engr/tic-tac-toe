"use client";

import { useState } from "react";
import { Board } from "@/components/Board";
import { ScoreBoard, type Scores } from "@/components/ScoreBoard";
import { StatusBanner } from "@/components/StatusBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateWinner, createEmptyBoard, isDraw, nextPlayer, type Board as BoardState } from "@/lib/game";

const EMPTY_SCORES: Scores = { P1: 0, P2: 0, draws: 0 };

export default function Home() {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);
  const [scores, setScores] = useState<Scores>(EMPTY_SCORES);

  // Everything else is derived from the board, so it can never drift out of sync.
  const win = calculateWinner(board);
  const draw = isDraw(board);
  const gameOver = win !== null || draw;
  const next = nextPlayer(board);

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
  }

  function handleResetAll() {
    setBoard(createEmptyBoard());
    setScores(EMPTY_SCORES);
  }

  return (
    <div className="flex min-h-dvh flex-col items-center px-4 py-8 sm:py-12">
      <main className="flex w-full max-w-md flex-1 flex-col gap-5">
        <header className="text-center">
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="whitespace-nowrap text-bolt glow-bolt">Engr. Marco&apos;s</span>{" "}
            <span className="whitespace-nowrap text-gear glow-gear">Tic-Tac-Toe</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Two players, one board. Good luck!
          </p>
        </header>

        <Card className="w-full rounded-2xl bg-card shadow-[0_0_40px_-12px_var(--bolt)] backdrop-blur-sm">
          <CardContent className="flex flex-col gap-5">
            <StatusBanner winner={win?.winner ?? null} draw={draw} next={next} />
            <Board board={board} winningLine={win?.line ?? null} gameOver={gameOver} onPlay={handlePlay} />
            <div className="grid grid-cols-2 gap-3">
              <Button size="lg" className="h-11 rounded-xl text-base font-semibold" onClick={handleNewGame}>
                New Game
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 rounded-xl border-gear/50 text-base font-semibold text-gear hover:bg-gear/10 hover:text-gear dark:border-gear/50 dark:hover:bg-gear/10"
                onClick={handleResetAll}
              >
                Reset All
              </Button>
            </div>
          </CardContent>
        </Card>

        <ScoreBoard scores={scores} />
      </main>

      <footer className="mt-8 text-center text-xs text-muted-foreground">
        Built with React 19, Next.js 15, Tailwind CSS, and shadcn/ui
      </footer>
    </div>
  );
}
