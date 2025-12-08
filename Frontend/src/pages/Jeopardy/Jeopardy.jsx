import { useState, useEffect } from "react";
import { fetchGameById } from "../../hooks/fetch";
import { GameProvider } from "../../context/GameContext";
import LoadingThreeDotsJumping from "../../components/LoadingThreeDotsJumping/LoadingThreeDotsJumping";
import JeopardyGrid from "../../components/JeopardyGrid/JeopardyGrid";
import TeamScoreBoard from "../../components/TeamScoreBoard/TeamScoreBoard";
import styles from "./Jeopardy.module.css";

export default function Jeopardy() {
  const [game, setGame] = useState([]);
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Vis loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingThreeDotsJumping />
      </div>
    );
  }

  return (
    <GameProvider>
      <div className={styles.mainContainer}>
        <div className={styles.jeopardyContainer}>
          <div className={styles.gameHeader}>
            <h1>{game.name}</h1>
          </div>
          <JeopardyGrid categories={categories} />
        </div>
        <div className={styles.scoreContainer}>
          <TeamScoreBoard teams={teams} />
        </div>
      </div>
    </GameProvider>
  );
}
