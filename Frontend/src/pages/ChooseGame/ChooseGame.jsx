import React, { useState } from "react";
import styles from "./ChooseGame.module.css";
import Button from "../../components/Button/Button.jsx";

export default function ChooseGame() {
  const [selectedGame, setSelectedGame] = useState("");

  return (
    <div className={styles.choosegamePage}>

      <select
        className={styles.gameSelect}
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="">vælg et spil</option>
      </select>
      
      <Button onButtonClick={handleSubmit} disabled={!teamName || !selectedImage} buttonText="Start spil" />
      <Button onButtonClick={handleSubmit} disabled={!teamName || !selectedImage} buttonText="rediger spil" />


    </div>
  );
}
