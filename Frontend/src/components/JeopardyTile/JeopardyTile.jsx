import { useState } from "react";
import { motion } from "motion/react";
import styles from "./JeopardyTile.module.css";

export default function JeopardyTile({ value, question, answer }) {
  const [state, setState] = useState("value");

  // Beregn rotation basert på state (120 grader per side for at få trekant)
  const rotation = state === "value" ? 0 : state === "question" ? -120 : -240;

  const handleClick = () => {
    setState((prev) =>
      prev === "value" ? "question" : prev === "question" ? "answer" : "value"
    );
  };

  return (
    <div className={styles.tileContainer} onClick={handleClick}>
      <motion.div
        className={styles.trianglePrismEffect}
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Side 1 - POINT VÆRDI */}
        <div className={`${styles.triangleSide} ${styles.side01}`}>
          <span className={styles.pointValue}>{value}</span>
        </div>

        {/* Side 2 - SPØRGSMÅL */}
        <div className={`${styles.triangleSide} ${styles.side02}`}>
          <div className={styles.content}>
            <div className={styles.questionContent}>{question}</div>
          </div>
        </div>

        {/* Side 3 - SVAR */}
        <div className={`${styles.triangleSide} ${styles.side03}`}>
          <div className={styles.content}>
            <div className={styles.answerTitle}>Svar:</div>
            <div className={styles.answerContent}>{answer}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
