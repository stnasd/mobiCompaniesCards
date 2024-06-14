import styles from "./styles.module.css";
import Logo from "../../img/logo.png";
export function MainLogo() {
  return (
    <div className={styles.mainLogo}>
      <img src={Logo} alt="main logo" />
    </div>
  );
}
