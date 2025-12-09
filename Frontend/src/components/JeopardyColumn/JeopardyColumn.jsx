import styles from "./JeopardyColumn.module.css";
import JeopardyTile from "../JeopardyTile/JeopardyTile";

export default function JeopardyColumn({ questions }) {
  return (
    <div className={styles.columnContainer}>
      {questions.map((question) => (
        <JeopardyTile
          key={question._id}
          value={question.value}
          answer={question.answer}
          question={question.question}
        />
      ))}
    </div>
  );
}
