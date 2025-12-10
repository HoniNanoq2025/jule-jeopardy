// ...existing code...
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllGames } from "../../hooks/fetch";
import Button from "../../components/Button/Button.jsx";
import styles from "./ChooseGame.module.css";

export default function ChooseGame() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const navigate = useNavigate();

  //Hent alle spil
  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchAllGames();
        setGames(data.data || data);
      } catch (err) {
        console.error("Error fetching all games:", err);
      }
    };

    loadGames();
  }, []);

  const handleSubmit = (action = "start") => {
    if (!selectedGame) {
      alert("Vælg et spil først");
      return;
    }
    if (action === "start") {
      // Navigér til AddTeam med spil-id
      navigate(`/add-team/${selectedGame}`);
    } else {
      // Navigér til EditGame
      navigate(`/edit-game/${selectedGame}`);
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
        {games.map((game) => (
          <option key={game._id} value={game._id}>
            {game.name || `Spil ${game._id}`}
          </option>
        ))}
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
