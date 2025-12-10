import { useNavigate } from "react-router-dom";
import styles from "./NameGame.module.css";
import Button from "../../components/Button/Button";
import { useState } from "react";

export default function NameGame() {

  const navigate = useNavigate();
  const [gameName, setGameName] = useState("");

  const handleChange = (e) => {
    setGameName(e.target.value);
  };

  const saveGame = () => {
    if (!gameName.trim()) return;

    
    const existing = JSON.parse(localStorage.getItem("games") || "[]");

    
    existing.push(gameName);

  
    localStorage.setItem("games", JSON.stringify(existing));

    
    navigate("/create-category");
  };

  return (
    <div className={styles.gameName}>
      <div className={styles.gameNameContainer}>
        
        <div>
          <input 
            type="text" 
            placeholder="Giv spillet et navn..." 
            value={gameName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Button buttonText="Tilføj kategorier" onButtonClick={saveGame}/>
        </div>

      </div>
    </div>
  );
}