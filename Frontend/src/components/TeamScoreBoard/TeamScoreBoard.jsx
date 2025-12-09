import { useState } from "react";
import { useGame } from "../../context/GameContext";
import plusImage from "../../assets/img/PlusPakke.png";
import minusImage from "../../assets/img/MinusPakke.png";
import styles from "./TeamScoreBoard.module.css";

export default function TeamScoreBoard({ teams }) {
  const [teamState, setTeamState] = useState(teams);
  const { lastValue } = useGame();

  const handleScore = async (team, isCorrect) => {
    if (!lastValue) return;

    const newScore = isCorrect
      ? team.score + lastValue
      : team.score - lastValue;

    try {
      // Opdatér backend
      await updateScore(team._id, { score: newScore });

      // Opdater Frontend state
      setTeamState((prev) =>
        prev.map((t) => (t._id === team._id ? { ...t, score: newScore } : t))
      );
    } catch (err) {
      console.error("Could not update score:", err);
    }
  };

  return (
    <div className={styles.scoreboardContainer}>
      {teams.map((team) => (
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
