import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameProvider } from "../../context/GameContext";
import { fetchGameById, updateScore } from "../../hooks/fetch";
import LoadingThreeDotsJumping from "../../components/LoadingThreeDotsJumping/LoadingThreeDotsJumping";
import JeopardyGrid from "../../components/JeopardyGrid/JeopardyGrid";
import TeamScoreBoard from "../../components/TeamScoreBoard/TeamScoreBoard";
import Button from "../../components/Button/Button";
import styles from "./Jeopardy.module.css";

export default function Jeopardy() {
  const [game, setGame] = useState([]);
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadGame = async () => {
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

  useEffect(() => {
    loadGame();
  }, []);

  const handleResetGame = async () => {
    const confirmed = window.confirm(
      "Er du sikker på at du vil nulstille spillet? Dette vil slette alle scores og nulstille alle tiles."
    );

    if (!confirmed) return;

    try {
      // Nulstil alle team scores i backend
      const resetPromises = teams.map((team) =>
        updateScore(team._id, { score: 0 })
      );
      await Promise.all(resetPromises);

      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("tile_")) {
          localStorage.removeItem(key);
        }
      });

      await loadGame(); // Genindlæs spil

      // Refresh siden, for at sikre at alle components opdateres
      window.location.reload();
    } catch (err) {
      console.error("Error resetting game:", err);
      alert("Fejl ved nulstilling af spillet");
    }
  };

  const navigateToChooseGame = () => {
    navigate("/choose-game");
  };

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
        <div className={styles.buttonContainer}>
          <Button buttonText="Nyt spil" onButtonClick={navigateToChooseGame} btnSize={styles.navigateBtn} />
          <Button
            buttonText="Nulstil"
            onButtonClick={handleResetGame}
            btnSize={styles.resetButton}
          />
        </div>
      </div>
    </GameProvider>
  );
}
