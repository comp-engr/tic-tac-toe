import { Square } from "@/components/Square";
import type { Board as BoardState, WinLine } from "@/lib/game";

interface BoardProps {
  board: BoardState;
  winningLine: WinLine | null;
  gameOver: boolean;
  onPlay: (index: number) => void;
}

export function Board({ board, winningLine, gameOver, onPlay }: BoardProps) {
  return (
    <div
      role="group"
      aria-label="Tic-tac-toe board"
      className="mx-auto grid w-full max-w-[22rem] grid-cols-3 gap-2.5 sm:gap-3"
    >
      {board.map((value, index) => (
        <Square
          key={index}
          index={index}
          value={value}
          isWinning={winningLine?.includes(index) ?? false}
          gameOver={gameOver}
          onPlay={onPlay}
        />
      ))}
    </div>
  );
}
