import { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import { updateScore } from "../../hooks/fetch";
import plusImage from "../../assets/img/PlusPakke.png";
import minusImage from "../../assets/img/MinusPakke.png";
import styles from "./TeamScoreBoard.module.css";

export default function TeamScoreBoard({ teams }) {
  const [teamState, setTeamState] = useState(teams);
  const { lastValue } = useGame();

  useEffect(() => {
    setTeamState(teams);
  }, [teams]);

  const handleScore = async (team, isCorrect) => {
    if (!lastValue) return;

    const newScore = isCorrect
      ? (team.score || 0) + lastValue
      : (team.score || 0) - lastValue;

    setTeamState((prev) =>
      prev.map((t) => (t._id === team._id ? { ...t, score: newScore } : t))
    );

    try {
      // Opdatér backend
      await updateScore(team._id, { score: newScore });
    } catch (err) {
      console.error("Could not update score:", err);
      setTeamState(teams);
    }
  };

  return (
    <div className={styles.scoreboardContainer}>
      {teamState.map((team) => (
        <div key={team._id} className={styles.team}>
          <div className={styles.imageContainer}>
            <img
              src={team.image}
              alt={team.name}
              className={styles.teamMascot}
            />
          </div>
          <div className={styles.teamScoreboard}>
            <h3 className={styles.teamName}>{team.name}</h3>
            <hr className={styles.divider} />
            <h3 className={styles.teamScore}>{team.score}</h3>
            <div className={styles.scoreButtons}>
              <img
                src={plusImage}
                alt="Korrekt svar"
                className={styles.ctaButton}
                onClick={() => handleScore(team, true)}
              />
              <img
                src={minusImage}
                alt="Forkert svar"
                className={styles.ctaButton}
                onClick={() => handleScore(team, false)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
