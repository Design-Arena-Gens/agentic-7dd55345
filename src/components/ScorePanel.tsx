import styles from "./ScorePanel.module.css";

type ScorePanelProps = {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  currentPlayer: "X" | "O" | null;
  statusMessage: string;
};

export function ScorePanel({
  scores,
  currentPlayer,
  statusMessage
}: ScorePanelProps) {
  return (
    <section className={styles.wrapper} aria-label="Game status">
      <header className={styles.header}>
        <h1 className={styles.title}>Tic Tac Toe</h1>
        <p className={styles.subtitle}>{statusMessage}</p>
      </header>
      <div className={styles.scoreGrid}>
        <div className={`${styles.card} ${currentPlayer === "X" ? styles.active : ""}`}>
          <p className={styles.label}>Player X</p>
          <span className={styles.value}>{scores.X}</span>
        </div>
        <div className={`${styles.card} ${currentPlayer === "O" ? styles.active : ""}`}>
          <p className={styles.label}>Player O</p>
          <span className={styles.value}>{scores.O}</span>
        </div>
        <div className={styles.card}>
          <p className={styles.label}>Draws</p>
          <span className={styles.value}>{scores.draws}</span>
        </div>
      </div>
    </section>
  );
}
