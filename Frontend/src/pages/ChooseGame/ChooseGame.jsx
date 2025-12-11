// ...existing code...
import React, { useState } from "react";
import styles from "./ChooseGame.module.css";
import Button from "../../components/Button/Button.jsx";
import { FaDownLong } from "react-icons/fa6";


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

  <div className={styles.selectWrapper}>
    <select
      className={styles.gameSelect}
      value={selectedGame}
      onChange={(e) => setSelectedGame(e.target.value)}
    >
      <option value="">Vælg et spil</option>
    </select>

    <FaDownLong className={styles.arrowIcon} />
  </div>

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
