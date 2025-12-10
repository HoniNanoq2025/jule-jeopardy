import { useEffect, useState } from "react";
import styles from "./ChooseTeam.module.css";
import Button from "../Button/Button";

export default function ChooseTeam({ teams, onChooseTeam }) {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleChoose = () => {
    if (!selectedTeam) return;
    if (onChooseTeam) onChooseTeam(selectedTeam);
  };

  return (
    <div className={styles.chooseTeam}>
      <h2>Vælg dit hold</h2>

      <div className={styles.teamList}>
        {teams.map((team) => (
          <div
            key={team._id}
            className={`${styles.teamItem} ${
              selectedTeam?._id === team._id ? styles.selected : ""
            }`}
            onClick={() => setSelectedTeam(team)}
          >
            <img src={team.image} alt={team.name} />
            <p>{team.name}</p>
          </div>
        ))}
      </div>

      <Button
        onButtonClick={handleChoose}
        disabled={!selectedTeam}
        buttonText="Vælg hold"
      />
    </div>
  );
}
