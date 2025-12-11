import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GameProvider } from "../../context/GameContext";
import { fetchGameById, updateScore, updateGame } from "../../hooks/fetch";
import LoadingThreeDotsJumping from "../../components/LoadingThreeDotsJumping/LoadingThreeDotsJumping";
import JeopardyGrid from "../../components/JeopardyGrid/JeopardyGrid";
import TeamScoreBoard from "../../components/TeamScoreBoard/TeamScoreBoard";
import Button from "../../components/Button/Button";
import styles from "./Jeopardy.module.css";

export default function Jeopardy() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState([]);
  const [categories, setCategories] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadGame = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Loading game with ID:", gameId);
      const data = await fetchGameById(gameId);
      console.log("Game data retrieved:", data);

      const gameData = data.data || data;
      setGame(gameData);
      setCategories(gameData.categories || []);
      setTeams(gameData.teams || []);
    } catch (err) {
      console.error("Error when fetching game:", err);
      setError("Kunne ikke hente spillet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameId) {
      loadGame();
    } else {
      setLoading(false);
      setError("Intet spil ID fundet");
    }
  }, [gameId]);

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

      // Ryd localStorage for tiles
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

  const navigateToChooseGame = async () => {
    const confirmed = window.confirm(
      "Er du sikker på at du vil starte et nyt spil? Dette vil nulstille alle teams, scores og tiles."
    );

    if (!confirmed) return;

    try {
      // Nulstil alle team scores i backend
      if (teams.length > 0) {
        const resetPromises = teams.map((team) =>
          updateScore(team._id, { score: 0 })
        );
        await Promise.all(resetPromises);
      }

      // Ryd localStorage for tiles
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("tile_")) {
          localStorage.removeItem(key);
        }
      });

      // Nulstil teams arrayet i backend
      await updateGame(gameId, { id: gameId, teams: [] });

      // Naviger til choose-game siden
      navigate("/choose-game");
    } catch (err) {
      console.error("Error resetting game and teams:", err);
      alert("Fejl ved nulstilling af spillet");

      // Spørg om brugeren vil fortsætte alligevel
      const continueAnyway = window.confirm(
        "Der opstod en fejl ved nulstilling. Vil du fortsætte til vælg spil alligevel?"
      );
      if (continueAnyway) {
        navigate("/choose-game");
      }
    }
  };

  // Vis loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingThreeDotsJumping />
      </div>
    );
  }

  // Vis error state
  if (error || !game) {
    return (
      <div className={styles.loadingContainer}>
        <h2>{error || "Spillet kunne ikke findes"}</h2>
        <Button
          buttonText="Tilbage til vælg spil"
          onButtonClick={navigateToChooseGame}
        />
      </div>
    );
  }

  return (
    <GameProvider>
      <div className={styles.mainContainer}>
        <div className={styles.gameContainer}>
          <div className={styles.scoreContainer}>
            {teams.length > 0 ? (
              <TeamScoreBoard teams={teams} />
            ) : (
              <p className={styles.noTeams}>Ingen teams tilføjet</p>
            )}
          </div>
          <div className={styles.jeopardyContainer}>
            <div className={styles.gameHeader}>
              <h1>{game.name}</h1>
            </div>
            {categories.length > 0 ? (
              <JeopardyGrid categories={categories} />
            ) : (
              <p className={styles.noCategories}>Ingen kategorier fundet!</p>
            )}
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            buttonText="Nyt spil"
            onButtonClick={navigateToChooseGame}
            btnSize={styles.navigateBtn}
          />
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
