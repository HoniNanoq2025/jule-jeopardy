import { useState } from "react";
import { useGame } from "../context/GameContext";
import styles from "./TeamScoreBoard.jsx";

export default function TeamScoreBoard({ teams }) {
  const { lastValue } = useGame();

  return (
    <div className={styles.scoreboardContainer}>
        {teams.map((team) => 
        <div className={styles.team}>
            <div className={styles.imageContainer}><img src={team.image} alt={team.name} /></div>
        </div>
            )}
    </div>
  )
}
