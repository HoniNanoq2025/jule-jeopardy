import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const stars = Array.from({ length: 50 }); 

  return (
    <div className={styles.Footer}>
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
      <p>&copy; 2025</p>
    </div>
  );
}
