import styles from "./GameCreated.module.css";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function GameCreated() {
  const navigate = useNavigate();
  const { gameId } = useParams(); 

  
  const navigateAddTeam = () => {
    navigate(`/add-team/${gameId}`);
  };

  
  const navigateCategory = () => {
    navigate("/create-category", {
      state: { gameId },  
    });
  };

  return (
    <div className={styles.nameGame}>
      <div className={styles.gamediv}>
        <p>Du har nu skabt et spil med 6 kategorier</p>

        <div>
          <Button buttonText="Start spil" onButtonClick={navigateAddTeam} />
        </div>

        <div>
          <Button buttonText="Skab ny kategori" onButtonClick={navigateCategory} />
        </div>
      </div>
    </div>
  );
}


