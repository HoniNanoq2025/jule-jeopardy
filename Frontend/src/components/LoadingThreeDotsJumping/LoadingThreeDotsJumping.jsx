import { motion } from "motion/react";
import styles from "./LoadingThreeDotsJumping.module.css";

export default function LoadingThreeDotsJumping() {
  const dotVariants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className={styles.container}
    >
      <motion.div className={styles.dot} variants={dotVariants} />
      <motion.div className={styles.dot} variants={dotVariants} />
      <motion.div className={styles.dot} variants={dotVariants} />
    </motion.div>
  );
}
