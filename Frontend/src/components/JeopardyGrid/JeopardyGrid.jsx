import JeopardyColumn from "../JeopardyColumn/JeopardyColumn";
import styles from "./JeopardyGrid.module.css";

export default function JeopardyGrid({ categories, onTileClick }) {
  console.log(categories);
  return (
    <div className={styles.backgroundContainer}>
      <div className={styles.grid}>
        {categories.map((category) => (
          <div className={styles.column} key={category._id}>
            <div className={styles.headerTile}>
              <h3>{category.name}</h3>
            </div>
            <JeopardyColumn
              key={category._id}
              questions={category?.questions}
              onTileClick={onTileClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
