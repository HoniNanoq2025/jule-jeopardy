// ...existing code...
import React, { useState } from "react";
import styles from "./ChooseGame.module.css";
import Button from "../../components/Button/Button.jsx";

export default function ChooseGame() {
  const [selectedGame, setSelectedGame] = useState("");

  const handleSubmit = (action = "start") => {
    if (!selectedGame) {
      alert("Vælg et spil først");
      return;
    }
    if (action === "start") {
      console.log("Starting game:", selectedGame);
      alert(`Starter spil: ${selectedGame}`);
    } else {
      console.log("Editing game:", selectedGame);
      alert(`Redigerer spil: ${selectedGame}`);
    }
  };

  return (
    <div className={styles.choosegamePage}>
      <select
        className={styles.gameSelect}
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="">vælg et spil</option>
        
      </select>

      <Button
        onButtonClick={() => handleSubmit("start")}
        disabled={!selectedGame}
        buttonText="Start spil"
      />
      <Button
        onButtonClick={() => handleSubmit("edit")}
        disabled={!selectedGame}
        buttonText="Rediger spil"
      />
    </div>
  );
}
