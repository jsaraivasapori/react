import styles from "./styles.module.css";

export function Cycles() {
  return (
    <div className={styles.circles}>
      <span>Ciclos:</span>

      <div className={styles.circlesDot}>
        <span className={`${styles.circleDot} ${styles.workTime}`}></span>
        <span className={`${styles.circleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.circleDot} ${styles.workTime}`}></span>
        <span className={`${styles.circleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.circleDot} ${styles.workTime}`}></span>
        <span className={`${styles.circleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.circleDot} ${styles.workTime}`}></span>
        <span className={`${styles.circleDot} ${styles.longBreakTime}`}></span>
      </div>
    </div>
  );
}
