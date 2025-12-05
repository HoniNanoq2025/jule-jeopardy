import { motion } from "motion/react";
import styles from "./JeopardyTile.module.css";

export default function JeopardyTile({
  value,
  question,
  answer,
  state,
  onClick,
}) {
  // Beregn rotation basert på state (120 grader per side for at få trekant)
  const rotation = state === "value" ? 0 : state === "question" ? -120 : -240;

  return (
    <div className="tileContainer" onClick={onClick}>
      <motion.div
        className={styles.trianglePrismEffect}
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Side 1 - POINT VÆRDI */}
        <div className={`${styles.triangleSide} ${styles.side01}`}>
          <span className={styles.pointValue}>{questions.value}</span>
        </div>

        {/* Side 2 - SPØRGSMÅL */}
        <div className={`${styles.triangleSide} ${styles.side02}`}>
          <div className={styles.content}>
            <div className={styles.questionContent}>{questions.question}</div>
          </div>
        </div>

        {/* Side 3 - SVAR */}
        <div className={`${triangleSide} ${styles.side03}`}>
          <div className={styles.content}>
            <div className={styles.answerTitle}>Svar:</div>
            <div className={styles.answerContent}>{questions.answer}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
