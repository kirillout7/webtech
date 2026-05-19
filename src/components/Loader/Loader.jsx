import styles from "./Loader.module.css";

/** Минималистичный спиннер в стиле Apple. */
export function Loader({ label = "Загрузка..." }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.spinner} />
      <p className={styles.label}>{label}</p>
    </div>
  );
}
