import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";

const square = (i: number) =>
  screen.getByRole("button", { name: new RegExp(`^Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1},`) });
const status = () => screen.getByRole("status");
const score = (name: "Bolt" | "Gear") => screen.getByRole("group", { name: new RegExp(`^${name},`) });
const draws = () => screen.getByLabelText(/draws$/);

let user: ReturnType<typeof userEvent.setup>;
const play = async (...cells: number[]) => {
  for (const c of cells) await user.click(square(c));
};

beforeEach(() => {
  user = userEvent.setup();
  render(<Home />);
});

describe("Tic-tac-toe page", () => {
  it("starts with Bolt to move and an empty board", () => {
    expect(status()).toHaveTextContent("Next player: Bolt ⚡");
    for (let i = 0; i < 9; i++) expect(square(i)).toHaveAccessibleName(/empty$/);
  });

  it("detects a row win, highlights it and scores it once", async () => {
    await play(0, 3, 1, 4, 2);
    expect(status()).toHaveTextContent("Winner: Bolt ⚡");
    expect(screen.getAllByRole("button", { name: /winning square$/ })).toHaveLength(3);
    expect(score("Bolt")).toHaveAccessibleName(/1 win/);
  });

  it("detects a column win for Gear", async () => {
    await play(0, 1, 3, 4, 8, 7);
    expect(status()).toHaveTextContent("Winner: Gear ⚙️");
    expect(score("Gear")).toHaveAccessibleName(/1 win/);
  });

  it("detects a diagonal win", async () => {
    await play(2, 0, 4, 1, 6);
    expect(status()).toHaveTextContent("Winner: Bolt ⚡");
  });

  it("shows a draw on a full board with no winner, counted once", async () => {
    await play(0, 1, 2, 4, 3, 5, 7, 6, 8);
    expect(status()).toHaveTextContent("It's a draw!");
    await play(4);
    expect(draws()).toHaveTextContent("1");
  });

  it("does not let a filled square change", async () => {
    await play(0, 0);
    expect(square(0)).toHaveAccessibleName("Row 1, column 1, Bolt");
    expect(square(0)).toHaveAttribute("aria-disabled", "true");
    expect(status()).toHaveTextContent("Next player: Gear ⚙️");
  });

  it("blocks all moves after a win", async () => {
    await play(0, 3, 1, 4, 2);
    await play(5, 8);
    expect(square(5)).toHaveAccessibleName(/empty$/);
    expect(square(8)).toHaveAccessibleName(/empty$/);
    expect(score("Bolt")).toHaveAccessibleName(/1 win/);
  });

  it("New Game clears the board but keeps the scores", async () => {
    await play(0, 3, 1, 4, 2);
    await user.click(screen.getByRole("button", { name: "New Game" }));
    for (let i = 0; i < 9; i++) expect(square(i)).toHaveAccessibleName(/empty$/);
    expect(score("Bolt")).toHaveAccessibleName(/1 win/);
    expect(status()).toHaveTextContent("Next player: Bolt ⚡");
  });

  it("Reset All asks once, then clears the board and the scores", async () => {
    await play(0, 3, 1, 4, 2);
    await user.click(screen.getByRole("button", { name: "Reset All" }));
    expect(score("Bolt")).toHaveAccessibleName(/1 win/); // not yet cleared
    await user.click(screen.getByRole("button", { name: "Confirm reset" }));
    expect(score("Bolt")).toHaveAccessibleName(/0 wins/);
    expect(score("Gear")).toHaveAccessibleName(/0 wins/);
    expect(draws()).toHaveTextContent("0");
    for (let i = 0; i < 9; i++) expect(square(i)).toHaveAccessibleName(/empty$/);
  });

  it("can be played with the keyboard", async () => {
    square(4).focus();
    await user.keyboard("{Enter}");
    expect(square(4)).toHaveAccessibleName("Row 2, column 2, Bolt");
    expect(within(status()).getByText("Gear")).toBeInTheDocument();
  });
});
