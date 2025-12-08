import { useState, useEffect } from "react";
import JeopardyGrid from "../../components/JeopardyGrid/JeopardyGrid";
import TeamScoreBoard from "../../components/TeamScoreBoard/TeamScoreBoard";
import styles from "./Jeopardy.module.css";
import { fetchGameById } from "../../hooks/fetch";

export default function Jeopardy() {
  const [game, setGame] = useState([]);
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const [lastValue, setLastValue] = useState(null);

  useEffect(() => {
    const getGame = async () => {
      try {
        setLoading(true);
        const data = await fetchGameById("69315ca0148c45db84738cec");
        setGame(data.data || []);
        setCategories(data.data.categories);
        setTeams(data.data.teams);
      } catch (err) {
        console.error("Error when fetching game:", err);
      } finally {
        setLoading(false);
      }
    };

    getGame();
  }, []);

  console.log(categories);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.jeopardyContainer}>
        <div className={styles.gameHeader}>
          <h1>{game.name}</h1>
        </div>
        <JeopardyGrid categories={categories} onTileClick={setLastValue} />
      </div>
      <div className={styles.scoreContainer}>
        <TeamScoreBoard teams={teams} lastValue={lastValue} />
      </div>
    </div>
  );
}
