import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllGames } from "../../hooks/fetch";
import Button from "../../components/Button/Button.jsx";
import styles from "./ChooseGame.module.css";

export default function ChooseGame() {
  const [games, setGames] = useState([]); // Gem listen af spil
  const [selectedGame, setSelectedGame] = useState(""); // Gem det valgte spil-id
  const navigate = useNavigate(); // Hook til navigation

  //Hent alle spil
  useEffect(() => {
    const loadGames = async () => {
      try {
        // Hent data fra backend via fetch.js
        const data = await fetchAllGames();
        // Gem spillene i state (skal håndtere to mulige formater af det svar, der kommer fra API'et)
        setGames(data.data || data);
      } catch (err) {
        console.error("Error fetching all games:", err);
      }
    };

    loadGames();
  }, []); // Tom afhængighedsliste, som kun kører én gang ved første render

  // Håndter start/redigering af spil
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
      {/* Dropdown til at vælge et spil */}
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

      {/* Knap til at starte spillet */}
      <Button
        onButtonClick={() => handleSubmit("start")}
        disabled={!selectedGame}
        buttonText="Start spil"
      />
      {/* Knap til at redigere det valgte spil */}
      <Button
        onButtonClick={() => handleSubmit("edit")}
        disabled={!selectedGame}
        buttonText="Rediger spil"
      />
    </div>
  );
}
