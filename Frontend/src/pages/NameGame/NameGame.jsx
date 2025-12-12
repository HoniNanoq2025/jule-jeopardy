import { useNavigate } from "react-router-dom";
import styles from "./NameGame.module.css";
import Button from "../../components/Button/Button";
import { useState } from "react";

const API_URL = "https://jeopardy-gkiyb.ondigitalocean.app";

export default function NameGame() {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState("");
  const [loading, setLoading] = useState(false);

  const saveGame = async () => {
    if (!gameName.trim()) return;

    try {
      setLoading(true);

      
      const res = await fetch(`${API_URL}/game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: gameName }),
      });

      if (!res.ok) throw new Error("Fejl ved oprettelse af spil");

      const createdGame = await res.json();

    
      navigate("/create-category", {
        state: { gameId: createdGame._id },
      });

    } catch (err) {
      console.error("Kunne ikke oprette spil:", err);
      alert("Der opstod en fejl ved oprettelse af spillet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.gameName}>
      <div className={styles.gameNameContainer}>
        
        <input 
          type="text"
          placeholder="Giv spillet et navn..."
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />

        <div>

        <Button 
          buttonText={loading ? "Opretter..." : "Tilføj kategorier"} 
          onButtonClick={saveGame}
          disabled={loading}
        />
        </div>
      </div>
    </div>
  );
}
