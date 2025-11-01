import styles from "./ActionBar.module.css";

type ActionBarProps = {
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
  canReset: boolean;
};

export function ActionBar({
  onReset,
  onUndo,
  canUndo,
  canReset
}: ActionBarProps) {
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        className={`${styles.button} ${styles.secondary}`}
      >
        Undo
      </button>
      <button
        type="button"
        onClick={onReset}
        disabled={!canReset}
        className={`${styles.button} ${styles.primary}`}
      >
        New Round
      </button>
    </div>
  );
}
