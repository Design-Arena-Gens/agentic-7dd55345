import styles from "./GameBoard.module.css";

export type SquareValue = "X" | "O" | null;

type GameBoardProps = {
  squares: SquareValue[];
  onSquareClick: (index: number) => void;
  winningLine?: number[] | null;
  disabled?: boolean;
};

export function GameBoard({
  squares,
  onSquareClick,
  winningLine,
  disabled = false
}: GameBoardProps) {
  return (
    <div
      className={styles.grid}
      role="grid"
      aria-label="Tic Tac Toe board"
    >
      {squares.map((value, index) => {
        const isWinning = winningLine?.includes(index);
        return (
          <button
            key={index}
            type="button"
            role="gridcell"
            aria-label={`Square ${index + 1}`}
            className={`${styles.square} ${isWinning ? styles.winning : ""}`}
            onClick={() => onSquareClick(index)}
            disabled={disabled || Boolean(value)}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}
