import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  const stars = Array.from({ length: 50 });

  return (
    <div className={styles.Header}>
      <div className={styles.starContainer}>
        {stars.map((_, i) => {
          const size = Math.random() * 3 + 2;
          const top = Math.random() * 50 + 25;
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          return (
            <div
              key={i}
              className={styles.star}
              style={{
                width: size + "px",
                height: size + "px",
                top: top + "%",
                left: left + "%",
                animationDelay: delay + "s",
              }}
            ></div>
          );
        })}
      </div>
      <Link to="/">
        Jule<span className={styles.jeopardy}>Jeopardy</span>
      </Link>
    </div>
  );
}
