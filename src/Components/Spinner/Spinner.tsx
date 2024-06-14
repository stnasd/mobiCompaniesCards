import styles from "./styles.module.css";
export function Spinner() {
  return (
    <div className={styles.spinner__block}>
      <div className={styles.loader}></div>
      <h1>Подгрузка компаний</h1>
    </div>
  );
}
