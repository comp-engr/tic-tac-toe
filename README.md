# Engr. Marco's Tic-Tac-Toe

Two players, one board. Good luck!

A two-player tic-tac-toe game styled like a circuit board: **Bolt ⚡** (cyan) versus **Gear ⚙️** (amber). When someone wins, a glowing trace connects their three squares.

**Play it:** https://tic-tac-toe-sigma-six-42.vercel.app

![Preview of the game: Bolt wins down the diagonal](https://tic-tac-toe-sigma-six-42.vercel.app/opengraph-image)

## Features

- Two players take turns on a 3×3 board. Bolt always moves first.
- All 8 winning lines are checked after every move, and the winning squares are highlighted.
- A filled square can't be changed, and no moves are accepted after the game ends.
- Live status: whose move it is, the winner, or a draw.
- A scoreboard for Bolt wins, Gear wins and draws. Each finished game counts exactly once.
- **New Game** keeps the scores. **Reset All** clears everything after one confirmation.
- Responsive from phone to desktop. On wide screens the board and scoreboard sit side by side.
- Accessible: every square is a real button with a label such as "Row 1, column 2, empty". The board is fully playable with Tab and Enter, status changes are announced to screen readers, and animations respect `prefers-reduced-motion`.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router) and React 19 with TypeScript
- Tailwind CSS 4
- [shadcn/ui](https://ui.shadcn.com): Button, Card, Badge
- Vitest and Testing Library for tests
- Deployed on Vercel

## Project structure

```
app/
  page.tsx               Client component: holds game state with useState
  layout.tsx             Fonts, metadata, social preview tags
  icon.svg               Favicon
  opengraph-image.tsx    Social preview image, generated at build time
components/
  Board.tsx              3×3 grid, edge coordinates, and the winning trace
  Square.tsx             One square: an accessible button
  StatusBanner.tsx       Next player / winner / draw
  ScoreBoard.tsx         Player cards with scores and turn indicator
  marks.tsx              SVG Bolt and Gear pieces
  ui/                    shadcn/ui components
lib/
  game.ts                Pure game logic: calculateWinner, isDraw, nextPlayer
tests/
  game.test.ts           Unit tests for the game logic
  page.test.tsx          Full gameplay tests against the rendered page
```

Game logic is kept separate from the UI. `lib/game.ts` has no React or DOM code, so it's easy to test and reuse. The page stores only the board and the scores; whose turn it is, the winner and draws are calculated from the board on every render, so they can't fall out of sync.

## Running locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command             | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start the dev server            |
| `npm test`          | Run all tests once              |
| `npm run lint`      | Check the code with ESLint      |
| `npm run typecheck` | Check types with TypeScript     |
| `npm run build`     | Build for production            |

Every push and pull request runs lint, type checks, tests and a production build on GitHub Actions.
