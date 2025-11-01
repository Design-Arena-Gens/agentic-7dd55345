"use client";

import { useMemo, useState } from "react";
import { ActionBar } from "@/components/ActionBar";
import { GameBoard, type SquareValue } from "@/components/GameBoard";
import { ScorePanel } from "@/components/ScorePanel";
import styles from "./page.module.css";

type GameResult =
  | {
      winner: "X" | "O";
      line: number[];
    }
  | {
      winner: null;
      line: null;
    };

const INITIAL_BOARD: SquareValue[] = Array(9).fill(null);

const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function calculateWinner(squares: SquareValue[]): GameResult {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line
      };
    }
  }

  return {
    winner: null,
    line: null
  };
}

export default function Home() {
  const [history, setHistory] = useState<SquareValue[][]>([INITIAL_BOARD]);
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const board = history[step];
  const nextPlayer = step % 2 === 0 ? "X" : "O";

  const result = useMemo(() => calculateWinner(board), [board]);
  const isBoardFull = useMemo(() => board.every(Boolean), [board]);
  const isDraw = !result.winner && isBoardFull;

  const statusMessage = result.winner
    ? `Player ${result.winner} wins!`
    : isDraw
      ? "It's a draw!"
      : `Player ${nextPlayer}, it's your turn.`;

  const canUndo = step > 0 && !result.winner && !isDraw;
  const canReset = step > 0 || result.winner !== null || isDraw;

  const handleSquareClick = (index: number) => {
    if (board[index] || result.winner || isDraw) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = nextPlayer;

    const nextHistory = [...history.slice(0, step + 1), updatedBoard];
    const nextStep = step + 1;

    const { winner } = calculateWinner(updatedBoard);
    const willDraw = !winner && updatedBoard.every(Boolean);

    setHistory(nextHistory);
    setStep(nextStep);

    if (winner) {
      setScores((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    } else if (willDraw) {
      setScores((prev) => ({
        ...prev,
        draws: prev.draws + 1
      }));
    }
  };

  const handleUndo = () => {
    if (!canUndo) {
      return;
    }
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setHistory([INITIAL_BOARD]);
    setStep(0);
  };

  return (
    <main className={styles.container}>
      <ScorePanel
        scores={scores}
        currentPlayer={
          result.winner ? result.winner : isDraw ? null : nextPlayer
        }
        statusMessage={statusMessage}
      />
      <GameBoard
        squares={board}
        onSquareClick={handleSquareClick}
        winningLine={result.line}
        disabled={Boolean(result.winner || isDraw)}
      />
      <ActionBar
        onReset={handleReset}
        onUndo={handleUndo}
        canUndo={canUndo}
        canReset={canReset}
      />
    </main>
  );
}
