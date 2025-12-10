import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useGame } from "../../context/GameContext"; //import af context
import styles from "./JeopardyTile.module.css";

export default function JeopardyTile({ value, question, answer }) {
  const tileId = `tile_${question}_${value}`;
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(tileId);
    return saved || "value";
  });

  const { setLastValue } = useGame(); // Hentes direkte fra context

  useEffect(() => {
    localStorage.setItem(tileId, state);
  }, [state, tileId]);

  // Beregn rotation basert på state (120 grader per side for at få trekant)
  const rotation = state === "value" ? 0 : state === "question" ? -120 : -240;

  const handleClick = () => {
    if (state === "value") {
      // Opdater begge states i separate calls
      setState("question");
      setLastValue(value); // Send point-værdi til context
    } else if (state === "question") {
      setState("answer");
    }
    // Hvis allerede på "answer", gør ingenting
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
