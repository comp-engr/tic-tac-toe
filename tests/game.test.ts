import { describe, expect, it } from "vitest";
import {
  WINNING_LINES,
  calculateWinner,
  createEmptyBoard,
  isDraw,
  nextPlayer,
  type Board,
} from "@/lib/game";

/** "1" = Bolt (P1), "2" = Gear (P2), "." = empty. Reads left-to-right, top-to-bottom. */
const board = (s: string): Board =>
  s.split("").map((c) => (c === "1" ? "P1" : c === "2" ? "P2" : null));

describe("calculateWinner", () => {
  it.each(WINNING_LINES.map((line) => [line.join("-"), line] as const))("detects line %s", (_, line) => {
    const b = createEmptyBoard();
    line.forEach((i) => (b[i] = "P2"));
    expect(calculateWinner(b)).toEqual({ winner: "P2", line });
  });

  it("detects a row, a column and a diagonal in real games", () => {
    expect(calculateWinner(board("11122...."))?.line).toEqual([0, 1, 2]);
    expect(calculateWinner(board("12.12.1.."))?.line).toEqual([0, 3, 6]);
    expect(calculateWinner(board("12..12..1"))?.line).toEqual([0, 4, 8]);
  });

  it("returns null when nobody has three in a row", () => {
    expect(calculateWinner(createEmptyBoard())).toBeNull();
    expect(calculateWinner(board("12.12...."))).toBeNull();
    expect(calculateWinner(board("121121212"))).toBeNull();
  });
});

describe("isDraw", () => {
  it("is true for a full board with no winner", () => {
    expect(isDraw(board("121121212"))).toBe(true);
  });

  it("is false when the board is full but someone won", () => {
    expect(isDraw(board("111221122"))).toBe(false);
  });

  it("is false while squares are still open", () => {
    expect(isDraw(board("12112121."))).toBe(false);
  });
});

describe("nextPlayer", () => {
  it("starts with Player 1 and alternates", () => {
    expect(nextPlayer(createEmptyBoard())).toBe("P1");
    expect(nextPlayer(board("1........"))).toBe("P2");
    expect(nextPlayer(board("12......."))).toBe("P1");
  });
});
