// Pure game logic. No React, no DOM — safe to import anywhere and easy to test.

export type Mark = "P1" | "P2";
export type Cell = Mark | null;
export type Board = Cell[];
export type WinLine = readonly [number, number, number];

export interface PlayerInfo {
  name: string;
  icon: string;
}

export const PLAYERS: Record<Mark, PlayerInfo> = {
  P1: { name: "Bolt", icon: "⚡" },
  P2: { name: "Gear", icon: "⚙️" },
};

export const BOARD_SIZE = 3;

/** All 8 winning lines: 3 rows, 3 columns, 2 diagonals. */
export const WINNING_LINES: readonly WinLine[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function createEmptyBoard(): Board {
  return Array<Cell>(BOARD_SIZE * BOARD_SIZE).fill(null);
}

export interface WinResult {
  winner: Mark;
  line: WinLine;
}

/** Returns the winner and the winning line, or null if nobody has won. */
export function calculateWinner(board: Board): WinResult | null {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const mark = board[a];
    if (mark && mark === board[b] && mark === board[c]) {
      return { winner: mark, line };
    }
  }
  return null;
}

/** True only when every square is filled and there is no winner. */
export function isDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && calculateWinner(board) === null;
}

/** Player 1 always moves first, so the turn follows from how many marks are on the board. */
export function nextPlayer(board: Board): Mark {
  const filled = board.filter((cell) => cell !== null).length;
  return filled % 2 === 0 ? "P1" : "P2";
}
